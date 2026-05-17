# Onboarding Wizard — Design Spec

**Date:** 2026-05-17
**Project:** cv-review-website
**Scope:** `/onboarding` multi-step wizard — sign-up, CV import path selection, photo upload. CV editor is out of scope.

---

## 1. Overview

A full-screen step-by-step wizard that collects everything needed to pre-fill the CV editor. Sign-up is the first step (email + password). After that the user picks their import path, uploads a photo, and is redirected to `/editor`.

No auth gate enforced yet — the sign-up step is UI-only until the NextAuth email provider is wired up.

---

## 2. Architecture

**Single page, React state machine.** One `app/onboarding/page.tsx` (`'use client'`) holds a `useReducer`. The active step is determined by `state.step`. No URL changes between steps.

### State shape

```ts
type Step =
  | 'auth'          // Step 1: email + password sign-up
  | 'has-cv'        // Step 2: "Do you already have a CV?"
  | 'upload-cv'     // Step 3a: drag-and-drop PDF/DOCX
  | 'has-linkedin'  // Step 3b: "Do you have a LinkedIn profile?"
  | 'linkedin-url'  // Step 4b: paste LinkedIn URL
  | 'questionnaire' // Step 4c: manual profile form
  | 'photo'         // Final input step: circle-crop photo
  | 'done'          // Redirects to /editor

type OnboardingState = {
  step: Step
  cvFile:       File | null
  linkedinUrl:  string
  profile: {
    firstName:  string
    lastName:   string
    title:      string
    email:      string
    phone:      string
    location:   string
    summary:    string
    experience: { company: string; role: string; startDate: string; endDate: string; bullets: string[] }[]
    education:  { institution: string; degree: string; startDate: string; endDate: string }[]
    skills:     string[]
  }
  photoFile:     File | null
  photoCropArea: { x: number; y: number; width: number; height: number } | null
}
```

### Branch logic

```
auth
  └── has-cv
        ├── yes → upload-cv → photo
        └── no  → has-linkedin
                    ├── yes → linkedin-url → photo
                    └── no  → questionnaire → photo
photo → done → router.push('/editor')
```

---

## 3. File Structure

```
app/
  onboarding/
    page.tsx              ← 'use client', useReducer, renders active step
    layout.tsx            ← minimal: cream bg, no Nav/Footer

components/
  onboarding/
    ProgressBar.tsx       ← fixed top, fills by stepIndex / totalSteps
    StepAuth.tsx          ← email + password + confirm, "sign in" link
    StepHasCv.tsx         ← Yes/No choice cards
    StepUploadCv.tsx      ← drag-and-drop, accepts .pdf/.docx
    StepHasLinkedIn.tsx   ← Yes/No choice cards
    StepLinkedInUrl.tsx   ← URL text input + validation
    StepQuestionnaire.tsx ← full profile form
    StepPhoto.tsx         ← react-easy-crop + zoom slider
    ChoiceCard.tsx        ← reusable large Yes/No card
```

Each `Step*.tsx` receives `(state: OnboardingState, dispatch: Dispatch<OnboardingAction>)` as props.

---

## 4. Progress Bar

Fixed at top of viewport. Two numbers shown: `step N of N`.

| Step | Upload path (4 steps) | LinkedIn path (5 steps) | Questionnaire path (5 steps) |
|---|---|---|---|
| auth | 1/4 | 1/5 | 1/5 |
| has-cv | 2/4 | 2/5 | 2/5 |
| upload-cv | 3/4 | — | — |
| has-linkedin | — | 3/5 | 3/5 |
| linkedin-url | — | 4/5 | — |
| questionnaire | — | — | 4/5 |
| photo | 4/4 | 5/5 | 5/5 |

Progress width: `(stepIndex / totalSteps) * 100%`, animated with CSS transition.

---

## 5. Step Designs

### StepAuth
- Headline: `Create your account`
- Subtext: `Your CV is saved to your account.`
- Fields: Email, Password, Confirm Password
- Validation: email format, password ≥ 8 chars, passwords match — errors shown inline below each field
- Primary CTA: `Continue →` (disabled until valid)
- Footer link: `Already have an account? Sign in`
- Note: UI-only until NextAuth email provider is configured. On submit, advances to `has-cv`.

### StepHasCv / StepHasLinkedIn (via ChoiceCard)
- Headline: `Do you already have a CV?` / `Do you have a LinkedIn profile?`
- Two large clickable cards side by side:
  - Left: `Yes` with a short description
  - Right: `No` with a short description
- Auto-advances immediately on click (no separate CTA needed)

### ChoiceCard
```tsx
<ChoiceCard
  icon="→" | "✗"
  label="Yes" | "No"
  description="..."
  onClick={...}
/>
```
Hover: slight green border + bg tint. Active: filled green.

### StepUploadCv
- Headline: `Upload your CV`
- Subtext: `PDF or Word document. We'll pre-fill your details.`
- Drop zone: dashed border, cream bg, icon + `Drop your CV here or click to browse`
- On file drop/select: shows filename + file size, green tick
- Accepts: `.pdf`, `.docx`
- CTA: `Continue →` (enabled once file selected)
- Note: file stored in state only; no parsing in this scope.

### StepLinkedInUrl
- Headline: `Paste your LinkedIn URL`
- Subtext: `We'll import your experience, education and skills.`
- Input: full-width text field, placeholder `https://linkedin.com/in/yourname`
- Validation: must start with `linkedin.com/in/` — inline error if not
- CTA: `Continue →` (enabled once valid URL)
- Note: URL stored in state only; no scraping in this scope.

### StepQuestionnaire
Sectioned form, scrolls internally within the card:

**Personal**
- First name, Last name (row)
- Job title
- Email, Phone (row)
- Location
- Summary (textarea, 3 rows)

**Experience** (repeatable)
- Company, Role (row)
- Start date, End date (row, End date has "Present" checkbox)
- Bullet points (add/remove lines, min 1)
- `+ Add another role` button

**Education** (repeatable)
- Institution, Degree (row)
- Start date, End date (row)
- `+ Add another degree` button

**Skills**
- Tag input: type a skill + Enter or comma to add, click × to remove
- Displays as pill tags

CTA: `Continue →` (requires first name, last name, title, at least 1 experience entry)

### StepPhoto
- Headline: `Add a profile photo`
- Subtext: `Shows top-left on your CV. Square or portrait works best.`
- If no file selected: centered upload button `Choose a photo`
- Once file selected: `react-easy-crop` renders with `cropShape="round"`, `aspect={1}`
- Zoom slider below crop window (`<input type="range" min={1} max={3} step={0.01}>`)
- On "Done, build my CV →":
  1. `getCroppedImg()` draws crop to 400×400 canvas
  2. Canvas → Blob stored as `photoFile` in state
  3. `step` advances to `done`
- Skip link: `Skip for now →` (smaller, below CTA) — advances without setting photoFile

---

## 6. Layout & Styling

- **Wrapper:** `min-h-screen bg-cv-cream flex flex-col`
- **Card:** `max-w-lg w-full mx-auto px-6 py-12 flex flex-col gap-6` — centered vertically for short steps, top-aligned for questionnaire
- **Headlines:** `font-serif font-black text-cv-forest text-3xl`
- **Subtext:** `font-mono text-sm text-cv-subtle`
- **Primary CTA:** same filled green button as landing page — `font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md`
- **Inputs:** `border border-cv-green/20 rounded-md px-4 py-3 bg-white focus:outline-none focus:border-cv-green font-mono text-sm`
- **No GSAP** on onboarding — CSS transitions only (simpler, faster to implement, more accessible)

---

## 7. Package

```bash
npm install react-easy-crop
```

Helper function `lib/cropImage.ts` — takes `imageSrc: string`, `pixelCrop: Area`, returns `Promise<Blob>`.

---

## 8. Out of Scope

- Actual auth (NextAuth email provider wiring)
- CV file parsing (PDF/DOCX → profile fields)
- LinkedIn scraping
- CV editor (`/editor` page)
- Saving wizard state to the database
