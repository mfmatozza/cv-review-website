# Database Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect Neon PostgreSQL to the Next.js app via Prisma with full schema for NextAuth v5 and CV storage.

**Architecture:** Prisma ORM with a singleton client in `lib/db.ts` to avoid connection exhaustion during Next.js hot-reload. Schema covers NextAuth adapter-required tables (User, Account, Session, VerificationToken) plus a hybrid CV model (typed metadata + JSON content blob). `prisma db push` syncs schema directly — no migration files until schema stabilises.

**Tech Stack:** Prisma 5.x, `@prisma/client`, `@auth/prisma-adapter`, Neon PostgreSQL (pooled connection string)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `.env.local` | Create | Neon connection string (gitignored) |
| `prisma/schema.prisma` | Create | Full DB schema |
| `lib/db.ts` | Create | Prisma client singleton |
| `package.json` | Modify | New dependencies |

---

### Task 1: Install packages

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Prisma and adapter**

```bash
cd C:\Users\mfmat\Desktop\cv-review-website
npm install @prisma/client @auth/prisma-adapter
npm install --save-dev prisma
```

Expected output: 3 packages added, no peer dependency errors.

- [ ] **Step 2: Verify installs**

```bash
npx prisma --version
```

Expected: prints Prisma CLI version (5.x).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install prisma and auth/prisma-adapter"
```

---

### Task 2: Create .env.local with Neon connection string

**Files:**
- Create: `.env.local`

- [ ] **Step 1: Get your Neon connection string**

In your Neon dashboard:
1. Open your project → **Connection Details**
2. Select **Pooled connection** (not Direct)
3. Copy the connection string — it looks like:
   `postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

- [ ] **Step 2: Create .env.local**

Create the file `C:\Users\mfmat\Desktop\cv-review-website\.env.local` with this content (replace the placeholder with your actual string):

```
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

`?sslmode=require` is mandatory for Neon — do not omit it.

- [ ] **Step 3: Verify .env.local is gitignored**

```bash
git status
```

Expected: `.env.local` does NOT appear in the output (it is covered by the `.env*` rule in `.gitignore`).

---

### Task 3: Create prisma/schema.prisma

**Files:**
- Create: `prisma/schema.prisma`

- [ ] **Step 1: Initialise Prisma**

```bash
npx prisma init --datasource-provider postgresql
```

This creates `prisma/schema.prisma` and adds `DATABASE_URL` to `.env` (not `.env.local`). We will replace the generated content entirely in the next step and delete the generated `.env`.

- [ ] **Step 2: Delete the generated .env (we use .env.local)**

```bash
del .env
```

- [ ] **Step 3: Replace prisma/schema.prisma with full schema**

Overwrite `prisma/schema.prisma` with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── NextAuth v5 required tables ──────────────────────────────────────────────
// Field names and types are fixed — @auth/prisma-adapter expects this exact shape.

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]
  cvs      CV[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ── Application models ────────────────────────────────────────────────────────

model CV {
  id         String   @id @default(cuid())
  userId     String
  title      String   @default("My CV")
  templateId String
  status     CVStatus @default(DRAFT)
  photoUrl   String?
  content    Json     @default("{}")
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  template Template @relation(fields: [templateId], references: [id])
}

enum CVStatus {
  DRAFT
  COMPLETE
}

model Template {
  id        String  @id @default(cuid())
  name      String
  isPremium Boolean @default(false)
  isDefault Boolean @default(false)

  cvs CV[]
}
```

- [ ] **Step 4: Validate schema syntax**

```bash
npx prisma validate
```

Expected: `The schema at prisma/schema.prisma is valid`

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add prisma schema (nextauth + cv models)"
```

---

### Task 4: Create Prisma client singleton

**Files:**
- Create: `lib/db.ts`

- [ ] **Step 1: Create lib/db.ts**

```ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. (The import will resolve after `prisma generate` in Task 5 — if you see a "Cannot find module '@prisma/client'" error, proceed to Task 5 first then re-run this.)

- [ ] **Step 3: Commit**

```bash
git add lib/db.ts
git commit -m "feat: add prisma client singleton"
```

---

### Task 5: Generate client and push schema to Neon

**Files:** none (generated output goes to `node_modules/.prisma/client`)

- [ ] **Step 1: Generate Prisma client**

```bash
npx prisma generate
```

Expected: `Generated Prisma Client ... to ./node_modules/@prisma/client`

- [ ] **Step 2: Push schema to Neon**

```bash
npx prisma db push
```

Expected output ends with:
```
Your database is now in sync with your Prisma schema.
```

If you see a connection error, check that `.env.local` has the correct pooled URL with `?sslmode=require`.

- [ ] **Step 3: Verify tables in Neon dashboard**

Open your Neon project → **Tables**. You should see:
`User`, `Account`, `Session`, `VerificationToken`, `CV`, `Template`

- [ ] **Step 4: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add package-lock.json
git commit -m "chore: run prisma generate and db push"
```

---

## Done

At this point:
- Neon DB has all tables matching the schema
- `import { db } from "@/lib/db"` is available throughout the app
- Schema is ready for NextAuth v5 Prisma adapter to be wired up later
- `prisma db push` can be re-run any time the schema changes during development
