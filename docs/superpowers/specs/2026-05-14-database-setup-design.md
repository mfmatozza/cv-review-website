# Database Setup — Design Spec

**Date:** 2026-05-14
**Project:** cv-review-website
**Scope:** Prisma + Neon PostgreSQL connection, schema design, client singleton

---

## 1. Overview

Wire up a Neon PostgreSQL database to the Next.js app using Prisma ORM. Establish the full schema covering NextAuth v5 adapter tables and CV application models. Auth provider configuration (OAuth keys, NextAuth routes) is out of scope — this spec covers the database layer only.

---

## 2. Packages

| Package | Type | Purpose |
|---|---|---|
| `prisma` | devDependency | CLI + schema compiler |
| `@prisma/client` | dependency | Generated query client |
| `@auth/prisma-adapter` | dependency | NextAuth v5 Prisma adapter (dictates User/Account/Session/VerificationToken shapes) |

---

## 3. Environment

`.env.local`:
```
DATABASE_URL="<neon-pooled-connection-string>?sslmode=require"
```

Use the **pooled** connection string from the Neon dashboard (not the direct string). The `?sslmode=require` parameter is required by Neon.

---

## 4. Prisma Configuration

`prisma/schema.prisma` datasource:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

## 5. Schema

### 5.1 NextAuth Tables

Required by `@auth/prisma-adapter`. Shapes are fixed — do not rename fields.

```prisma
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
```

### 5.2 Application Models

```prisma
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

**CV.content shape (not enforced by Prisma — application-level contract):**
```ts
{
  firstName?: string
  lastName?: string
  title?: string
  email?: string
  phone?: string
  location?: string
  summary?: string
  experience?: { company: string; role: string; startDate: string; endDate?: string; bullets: string[] }[]
  education?: { institution: string; degree: string; startDate: string; endDate?: string }[]
  skills?: string[]
}
```

---

## 6. Prisma Client Singleton

`lib/db.ts` — prevents multiple PrismaClient instances during Next.js hot reload:

```ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
```

Import as `import { db } from "@/lib/db"` throughout the app.

---

## 7. Database Initialisation

```bash
npx prisma generate    # generate client types
npx prisma db push     # push schema to Neon (no migration files — suitable for early dev)
```

Use `prisma db push` (not `migrate dev`) until the schema stabilises. Switch to `prisma migrate dev` before production to get a migration history.

---

## 8. Out of Scope

- NextAuth provider configuration (Google/GitHub OAuth keys, `auth.ts`, route handlers)
- Template seeding (seed script is a follow-up task)
- Photo upload storage (S3/R2 — separate integration)
- LaTeX compilation backend
