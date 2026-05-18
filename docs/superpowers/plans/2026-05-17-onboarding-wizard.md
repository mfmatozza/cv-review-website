# Onboarding Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-screen multi-step onboarding wizard at `/onboarding` covering account creation, CV import path selection, and circle-crop photo upload.

**Architecture:** Single `app/onboarding/page.tsx` with `useReducer` state machine. Each wizard step is an isolated component in `components/onboarding/`. CSS transitions only (no GSAP). `react-easy-crop` handles circle photo crop. Auth step is UI-only until NextAuth email provider is wired up.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, react-easy-crop

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Modify | Add react-easy-crop |
| `app/onboarding/layout.tsx` | Create | Strips Nav/Footer from onboarding route |
| `app/onboarding/page.tsx` | Create | useReducer state machine, renders active step |
| `lib/cropImage.ts` | Create | Canvas helper — crops image to 400×400 Blob |
| `components/onboarding/types.ts` | Create | All shared types + action union |
| `components/onboarding/ProgressBar.tsx` | Create | Fixed top bar, step N of N |
| `components/onboarding/ChoiceCard.tsx` | Create | Reusable large Yes/No card |
| `components/onboarding/StepAuth.tsx` | Create | Email + password + confirm form |
| `components/onboarding/StepHasCv.tsx` | Create | "Do you have a CV?" choice |
| `components/onboarding/StepHasLinkedIn.tsx` | Create | "Do you have LinkedIn?" choice |
| `components/onboarding/StepUploadCv.tsx` | Create | Drag-and-drop PDF/DOCX upload |
| `components/onboarding/StepLinkedInUrl.tsx` | Create | LinkedIn URL input + validation |
| `components/onboarding/StepQuestionnaire.tsx` | Create | Full profile form with repeatable entries |
| `components/onboarding/StepPhoto.tsx` | Create | react-easy-crop circle mask + zoom slider |

---

### Task 1: Install react-easy-crop + shared types + layout

**Files:**
- Modify: `package.json`
- Create: `components/onboarding/types.ts`
- Create: `app/onboarding/layout.tsx`

- [ ] **Step 1: Install react-easy-crop**

```bash
cd C:\Users\mfmat\Desktop\cv-review-website
npm install react-easy-crop
```

Expected: package added, no peer dependency errors.

- [ ] **Step 2: Create `components/onboarding/types.ts`**

```ts
export type Step =
  | 'auth'
  | 'has-cv'
  | 'upload-cv'
  | 'has-linkedin'
  | 'linkedin-url'
  | 'questionnaire'
  | 'photo'
  | 'done'

export type OnboardingPath = 'upload' | 'linkedin' | 'questionnaire' | null

export type ExperienceEntry = {
  company: string
  role: string
  startDate: string
  endDate: string
  isPresent: boolean
  bullets: string[]
}

export type EducationEntry = {
  institution: string
  degree: string
  startDate: string
  endDate: string
}

export type ProfileData = {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
}

export type OnboardingState = {
  step: Step
  path: OnboardingPath
  cvFile: File | null
  linkedinUrl: string
  profile: ProfileData
  photoFile: File | null
  photoCropArea: { x: number; y: number; width: number; height: number } | null
}

export type OnboardingAction =
  | { type: 'SET_STEP'; step: Step; path?: OnboardingPath }
  | { type: 'SET_CV_FILE'; file: File }
  | { type: 'SET_LINKEDIN_URL'; url: string }
  | { type: 'SET_PROFILE'; profile: ProfileData }
  | { type: 'SET_PHOTO'; file: File; cropArea: { x: number; y: number; width: number; height: number } }
```

- [ ] **Step 3: Create `app/onboarding/layout.tsx`**

```tsx
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json components/onboarding/types.ts app/onboarding/layout.tsx
git commit -m "feat: add onboarding types and install react-easy-crop"
```

---

### Task 2: ProgressBar + ChoiceCard

**Files:**
- Create: `components/onboarding/ProgressBar.tsx`
- Create: `components/onboarding/ChoiceCard.tsx`

- [ ] **Step 1: Create `components/onboarding/ProgressBar.tsx`**

```tsx
type Props = { current: number; total: number }

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-cv-cream-dark">
        <div
          className="h-full bg-cv-green transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="absolute right-4 top-2 font-mono text-xs text-cv-subtle">
        {current} / {total}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/onboarding/ChoiceCard.tsx`**

```tsx
type Props = {
  label: string
  description: string
  onClick: () => void
}

export default function ChoiceCard({ label, description, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex-1 text-left p-6 rounded-xl border-2 bg-white hover:bg-cv-green/5 transition-all duration-200 group"
      style={{ borderColor: 'rgba(45,106,45,0.2)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#2d6a2d')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(45,106,45,0.2)')}
    >
      <div className="font-serif font-black text-cv-forest text-xl mb-2 group-hover:text-cv-green transition-colors">
        {label}
      </div>
      <div className="font-mono text-sm text-cv-subtle">
        {description}
      </div>
    </button>
  )
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/onboarding/ProgressBar.tsx components/onboarding/ChoiceCard.tsx
git commit -m "feat: add ProgressBar and ChoiceCard components"
```

---

### Task 3: StepAuth

**Files:**
- Create: `components/onboarding/StepAuth.tsx`

- [ ] **Step 1: Create `components/onboarding/StepAuth.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

const INPUT = "w-full border rounded-md px-4 py-3 bg-white font-mono text-sm focus:outline-none transition-colors"

export default function StepAuth({ dispatch }: Props) {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (password.length < 8) e.password = 'Password must be at least 8 characters'
    if (password !== confirm)  e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    dispatch({ type: 'SET_STEP', step: 'has-cv' })
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8 && password === confirm

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Create your account</h1>
        <p className="font-mono text-sm text-cv-subtle">Your CV is saved to your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
            className={INPUT}
            style={{ borderColor: errors.email ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
          />
          {errors.email && <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
            className={INPUT}
            style={{ borderColor: errors.password ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
          />
          {errors.password && <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: undefined })) }}
            className={INPUT}
            style={{ borderColor: errors.confirm ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
          />
          {errors.confirm && <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </form>

      <p className="font-mono text-sm text-center text-cv-subtle">
        Already have an account?{' '}
        <a href="/login" className="text-cv-green hover:underline">Sign in</a>
      </p>
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/onboarding/StepAuth.tsx
git commit -m "feat: add StepAuth component"
```

---

### Task 4: StepHasCv + StepHasLinkedIn

**Files:**
- Create: `components/onboarding/StepHasCv.tsx`
- Create: `components/onboarding/StepHasLinkedIn.tsx`

- [ ] **Step 1: Create `components/onboarding/StepHasCv.tsx`**

```tsx
import ChoiceCard from './ChoiceCard'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepHasCv({ dispatch }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">
          Do you already have a CV?
        </h1>
        <p className="font-mono text-sm text-cv-subtle">We'll use it to pre-fill your details.</p>
      </div>
      <div className="flex gap-4">
        <ChoiceCard
          label="Yes"
          description="I have a PDF or Word CV ready to upload."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'upload-cv', path: 'upload' })}
        />
        <ChoiceCard
          label="No"
          description="I'll import from LinkedIn or fill things in manually."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'has-linkedin' })}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/onboarding/StepHasLinkedIn.tsx`**

```tsx
import ChoiceCard from './ChoiceCard'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepHasLinkedIn({ dispatch }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">
          Do you have a LinkedIn profile?
        </h1>
        <p className="font-mono text-sm text-cv-subtle">
          We'll import your experience, education and skills automatically.
        </p>
      </div>
      <div className="flex gap-4">
        <ChoiceCard
          label="Yes"
          description="Paste a URL and we'll pull in your data."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'linkedin-url', path: 'linkedin' })}
        />
        <ChoiceCard
          label="No"
          description="I'll fill in my details with a short questionnaire."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'questionnaire', path: 'questionnaire' })}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/onboarding/StepHasCv.tsx components/onboarding/StepHasLinkedIn.tsx
git commit -m "feat: add StepHasCv and StepHasLinkedIn"
```

---

### Task 5: StepUploadCv

**Files:**
- Create: `components/onboarding/StepUploadCv.tsx`

- [ ] **Step 1: Create `components/onboarding/StepUploadCv.tsx`**

```tsx
'use client'
import { useState, useRef } from 'react'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepUploadCv({ state, dispatch }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.name.match(/\.(pdf|docx)$/i)) return
    dispatch({ type: 'SET_CV_FILE', file })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Upload your CV</h1>
        <p className="font-mono text-sm text-cv-subtle">
          PDF or Word document. We'll pre-fill your details.
        </p>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200"
        style={{
          borderColor: isDragging || state.cvFile ? '#2d6a2d' : 'rgba(45,106,45,0.3)',
          background: isDragging ? 'rgba(45,106,45,0.05)' : state.cvFile ? 'rgba(45,106,45,0.03)' : 'white',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
        {state.cvFile ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-cv-green text-2xl">✓</span>
            <span className="font-mono text-sm font-bold text-cv-green">{state.cvFile.name}</span>
            <span className="font-mono text-xs text-cv-subtle">
              {(state.cvFile.size / 1024).toFixed(0)} KB · click to change
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-3xl text-cv-subtle">↑</span>
            <span className="font-mono text-sm text-cv-forest">Drop your CV here or click to browse</span>
            <span className="font-mono text-xs text-cv-subtle">PDF or DOCX · max 10 MB</span>
          </div>
        )}
      </div>

      <button
        disabled={!state.cvFile}
        onClick={() => dispatch({ type: 'SET_STEP', step: 'photo' })}
        className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/onboarding/StepUploadCv.tsx
git commit -m "feat: add StepUploadCv with drag-and-drop"
```

---

### Task 6: StepLinkedInUrl

**Files:**
- Create: `components/onboarding/StepLinkedInUrl.tsx`

- [ ] **Step 1: Create `components/onboarding/StepLinkedInUrl.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

const LINKEDIN_RE = /linkedin\.com\/in\//i

export default function StepLinkedInUrl({ state, dispatch }: Props) {
  const [url, setUrl]         = useState(state.linkedinUrl)
  const [touched, setTouched] = useState(false)

  const isValid   = LINKEDIN_RE.test(url)
  const showError = touched && url.length > 0 && !isValid

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">
          Paste your LinkedIn URL
        </h1>
        <p className="font-mono text-sm text-cv-subtle">
          We'll import your experience, education and skills.
        </p>
      </div>

      <div>
        <input
          type="url"
          placeholder="https://linkedin.com/in/yourname"
          value={url}
          onChange={e => { setUrl(e.target.value); setTouched(false) }}
          onBlur={() => setTouched(true)}
          className="w-full border rounded-md px-4 py-3 bg-white font-mono text-sm focus:outline-none transition-colors"
          style={{ borderColor: showError ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
        />
        {showError && (
          <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>
            Must be a linkedin.com/in/ URL
          </p>
        )}
      </div>

      <button
        disabled={!isValid}
        onClick={() => {
          dispatch({ type: 'SET_LINKEDIN_URL', url })
          dispatch({ type: 'SET_STEP', step: 'photo' })
        }}
        className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/onboarding/StepLinkedInUrl.tsx
git commit -m "feat: add StepLinkedInUrl"
```

---

### Task 7: StepQuestionnaire

**Files:**
- Create: `components/onboarding/StepQuestionnaire.tsx`

- [ ] **Step 1: Create `components/onboarding/StepQuestionnaire.tsx`**

```tsx
'use client'
import { useState } from 'react'
import type { OnboardingState, OnboardingAction, ExperienceEntry, EducationEntry, ProfileData } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

const INPUT = "w-full border rounded-md px-3 py-2.5 bg-white font-mono text-sm focus:outline-none transition-colors"
const STYLE = { borderColor: 'rgba(45,106,45,0.2)' }
const EMPTY_EXP: ExperienceEntry = { company: '', role: '', startDate: '', endDate: '', isPresent: false, bullets: [''] }
const EMPTY_EDU: EducationEntry  = { institution: '', degree: '', startDate: '', endDate: '' }

export default function StepQuestionnaire({ state, dispatch }: Props) {
  const [profile, setProfile] = useState<ProfileData>(state.profile)
  const [skillInput, setSkillInput] = useState('')

  const set = <K extends keyof ProfileData>(key: K, val: ProfileData[K]) =>
    setProfile(p => ({ ...p, [key]: val }))

  const updateExp = (i: number, patch: Partial<ExperienceEntry>) =>
    setProfile(p => ({ ...p, experience: p.experience.map((e, idx) => idx === i ? { ...e, ...patch } : e) }))

  const updateExpBullet = (ei: number, bi: number, val: string) =>
    setProfile(p => ({
      ...p,
      experience: p.experience.map((e, i) =>
        i === ei ? { ...e, bullets: e.bullets.map((b, j) => j === bi ? val : b) } : e
      ),
    }))

  const updateEdu = (i: number, patch: Partial<EducationEntry>) =>
    setProfile(p => ({ ...p, education: p.education.map((e, idx) => idx === i ? { ...e, ...patch } : e) }))

  const addSkill = (raw: string) => {
    const skill = raw.trim().replace(/,$/, '')
    if (!skill || profile.skills.includes(skill)) return
    setProfile(p => ({ ...p, skills: [...p.skills, skill] }))
    setSkillInput('')
  }

  const canContinue = profile.firstName && profile.lastName && profile.title && profile.experience[0]?.company

  return (
    <div className="flex flex-col gap-8 pb-8">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Tell us about yourself</h1>
        <p className="font-mono text-sm text-cv-subtle">Fill in as much as you like — you can edit everything later.</p>
      </div>

      {/* Personal */}
      <Section>Personal</Section>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="First name *" value={profile.firstName} onChange={e => set('firstName', e.target.value)} className={INPUT} style={STYLE} />
          <input placeholder="Last name *"  value={profile.lastName}  onChange={e => set('lastName',  e.target.value)} className={INPUT} style={STYLE} />
        </div>
        <input placeholder="Job title *" value={profile.title} onChange={e => set('title', e.target.value)} className={INPUT} style={STYLE} />
        <div className="grid grid-cols-2 gap-3">
          <input type="email" placeholder="Email"  value={profile.email} onChange={e => set('email', e.target.value)} className={INPUT} style={STYLE} />
          <input             placeholder="Phone"  value={profile.phone} onChange={e => set('phone', e.target.value)} className={INPUT} style={STYLE} />
        </div>
        <input placeholder="Location (e.g. London, UK)" value={profile.location} onChange={e => set('location', e.target.value)} className={INPUT} style={STYLE} />
        <textarea placeholder="Summary (optional)" value={profile.summary} onChange={e => set('summary', e.target.value)} rows={3} className={INPUT + ' resize-none'} style={STYLE} />
      </div>

      {/* Experience */}
      <Section>Experience</Section>
      {profile.experience.map((exp, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg" style={{ background: 'rgba(45,106,45,0.04)', border: '1px solid rgba(45,106,45,0.1)' }}>
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-cv-subtle">Role {i + 1}</span>
            {i > 0 && (
              <button onClick={() => setProfile(p => ({ ...p, experience: p.experience.filter((_, idx) => idx !== i) }))}
                className="font-mono text-xs text-red-500 hover:underline">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Company *" value={exp.company} onChange={e => updateExp(i, { company: e.target.value })} className={INPUT} style={STYLE} />
            <input placeholder="Role"      value={exp.role}    onChange={e => updateExp(i, { role:    e.target.value })} className={INPUT} style={STYLE} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Start (e.g. Jan 2022)" value={exp.startDate} onChange={e => updateExp(i, { startDate: e.target.value })} className={INPUT} style={STYLE} />
            {!exp.isPresent && (
              <input placeholder="End date" value={exp.endDate} onChange={e => updateExp(i, { endDate: e.target.value })} className={INPUT} style={STYLE} />
            )}
          </div>
          <label className="flex items-center gap-2 font-mono text-sm text-cv-subtle cursor-pointer">
            <input type="checkbox" checked={exp.isPresent} onChange={e => updateExp(i, { isPresent: e.target.checked, endDate: '' })} className="accent-green-700" />
            Currently working here
          </label>
          <div className="flex flex-col gap-2">
            {exp.bullets.map((b, j) => (
              <div key={j} className="flex gap-2 items-center">
                <span className="font-mono text-cv-subtle">·</span>
                <input placeholder="What did you achieve? Be specific." value={b} onChange={e => updateExpBullet(i, j, e.target.value)} className={INPUT + ' flex-1'} style={STYLE} />
                {j > 0 && (
                  <button onClick={() => setProfile(p => ({ ...p, experience: p.experience.map((e, ei) => ei !== i ? e : { ...e, bullets: e.bullets.filter((_, bi) => bi !== j) }) }))}
                    className="font-mono text-cv-subtle hover:text-red-500 text-sm">×</button>
                )}
              </div>
            ))}
            <button onClick={() => updateExp(i, { bullets: [...exp.bullets, ''] })} className="font-mono text-xs text-cv-green hover:underline self-start">
              + Add bullet
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => setProfile(p => ({ ...p, experience: [...p.experience, { ...EMPTY_EXP }] }))}
        className="font-mono text-sm text-cv-green hover:underline self-start">
        + Add another role
      </button>

      {/* Education */}
      <Section>Education</Section>
      {profile.education.map((edu, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg" style={{ background: 'rgba(45,106,45,0.04)', border: '1px solid rgba(45,106,45,0.1)' }}>
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-cv-subtle">Degree {i + 1}</span>
            {i > 0 && (
              <button onClick={() => setProfile(p => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }))}
                className="font-mono text-xs text-red-500 hover:underline">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Institution" value={edu.institution} onChange={e => updateEdu(i, { institution: e.target.value })} className={INPUT} style={STYLE} />
            <input placeholder="Degree"      value={edu.degree}      onChange={e => updateEdu(i, { degree:      e.target.value })} className={INPUT} style={STYLE} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Start year" value={edu.startDate} onChange={e => updateEdu(i, { startDate: e.target.value })} className={INPUT} style={STYLE} />
            <input placeholder="End year"   value={edu.endDate}   onChange={e => updateEdu(i, { endDate:   e.target.value })} className={INPUT} style={STYLE} />
          </div>
        </div>
      ))}
      <button onClick={() => setProfile(p => ({ ...p, education: [...p.education, { ...EMPTY_EDU }] }))}
        className="font-mono text-sm text-cv-green hover:underline self-start">
        + Add another degree
      </button>

      {/* Skills */}
      <Section>Skills</Section>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(skillInput) } }}
            className={INPUT + ' flex-1'}
            style={STYLE}
          />
          <button onClick={() => addSkill(skillInput)} className="font-mono text-sm px-4 py-2 border rounded-md text-cv-green hover:bg-cv-green/5 transition-colors" style={{ borderColor: 'rgba(45,106,45,0.2)' }}>
            Add
          </button>
        </div>
        {profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <span key={skill} className="font-mono text-sm px-3 py-1 rounded-full flex items-center gap-2" style={{ background: 'rgba(45,106,45,0.1)', color: '#2d6a2d' }}>
                {skill}
                <button onClick={() => setProfile(p => ({ ...p, skills: p.skills.filter(s => s !== skill) }))} className="hover:text-red-500 font-bold">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        disabled={!canContinue}
        onClick={() => { dispatch({ type: 'SET_PROFILE', profile }); dispatch({ type: 'SET_STEP', step: 'photo' }) }}
        className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono font-bold text-cv-green uppercase tracking-wider pb-1.5" style={{ fontSize: '11px', letterSpacing: '2px', borderBottom: '1px solid rgba(45,106,45,0.15)' }}>
      {children}
    </h2>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/onboarding/StepQuestionnaire.tsx
git commit -m "feat: add StepQuestionnaire with repeatable entries and tag input"
```

---

### Task 8: cropImage utility + StepPhoto

**Files:**
- Create: `lib/cropImage.ts`
- Create: `components/onboarding/StepPhoto.tsx`

- [ ] **Step 1: Create `lib/cropImage.ts`**

```ts
import type { Area } from 'react-easy-crop'

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = url
  })
}

export async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image  = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width  = 400
  canvas.height = 400
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, 400, 400)
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas is empty'))
    }, 'image/jpeg', 0.9)
  })
}
```

- [ ] **Step 2: Create `components/onboarding/StepPhoto.tsx`**

```tsx
'use client'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { getCroppedImg } from '@/lib/cropImage'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepPhoto({ dispatch }: Props) {
  const [imageSrc, setImageSrc]               = useState<string | null>(null)
  const [crop, setCrop]                        = useState({ x: 0, y: 0 })
  const [zoom, setZoom]                        = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [processing, setProcessing]           = useState(false)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleDone = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    setProcessing(true)
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels)
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })
      dispatch({ type: 'SET_PHOTO', file, cropArea: croppedAreaPixels })
    } finally {
      setProcessing(false)
    }
    dispatch({ type: 'SET_STEP', step: 'done' })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Add a profile photo</h1>
        <p className="font-mono text-sm text-cv-subtle">Shows top-left on your CV. Square or portrait works best.</p>
      </div>

      {!imageSrc ? (
        <label
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 hover:bg-cv-green/5"
          style={{ borderColor: 'rgba(45,106,45,0.3)', background: 'white' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#2d6a2d')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(45,106,45,0.3)')}
        >
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          <div className="font-mono text-3xl text-cv-subtle mb-2">+</div>
          <div className="font-mono text-sm text-cv-forest">Choose a photo</div>
          <div className="font-mono text-xs text-cv-subtle mt-1">JPG, PNG or WEBP</div>
        </label>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="relative rounded-xl overflow-hidden" style={{ height: '300px' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cv-subtle w-10">Zoom</span>
            <input
              type="range" min={1} max={3} step={0.01}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              className="flex-1 accent-green-700"
            />
          </div>
          <button
            onClick={() => setImageSrc(null)}
            className="font-mono text-xs text-cv-subtle hover:text-cv-green self-start"
          >
            ← Choose a different photo
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          disabled={!imageSrc || !croppedAreaPixels || processing}
          onClick={handleDone}
          className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Done, build my CV →'}
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_STEP', step: 'done' })}
          className="font-mono text-sm text-cv-subtle hover:text-cv-green transition-colors text-center"
        >
          Skip for now →
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see a "Cannot find module 'react-easy-crop'" type error, run `npm install` first.

- [ ] **Step 4: Commit**

```bash
git add lib/cropImage.ts components/onboarding/StepPhoto.tsx
git commit -m "feat: add cropImage utility and StepPhoto with react-easy-crop"
```

---

### Task 9: Wire page.tsx — complete state machine

**Files:**
- Create: `app/onboarding/page.tsx`

- [ ] **Step 1: Create `app/onboarding/page.tsx`**

```tsx
'use client'
import { useReducer, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { OnboardingState, OnboardingAction } from '@/components/onboarding/types'
import ProgressBar        from '@/components/onboarding/ProgressBar'
import StepAuth           from '@/components/onboarding/StepAuth'
import StepHasCv          from '@/components/onboarding/StepHasCv'
import StepUploadCv       from '@/components/onboarding/StepUploadCv'
import StepHasLinkedIn    from '@/components/onboarding/StepHasLinkedIn'
import StepLinkedInUrl    from '@/components/onboarding/StepLinkedInUrl'
import StepQuestionnaire  from '@/components/onboarding/StepQuestionnaire'
import StepPhoto          from '@/components/onboarding/StepPhoto'

const INITIAL: OnboardingState = {
  step: 'auth',
  path: null,
  cvFile: null,
  linkedinUrl: '',
  profile: {
    firstName: '', lastName: '', title: '', email: '', phone: '',
    location: '', summary: '',
    experience: [{ company: '', role: '', startDate: '', endDate: '', isPresent: false, bullets: [''] }],
    education:  [{ institution: '', degree: '', startDate: '', endDate: '' }],
    skills: [],
  },
  photoFile: null,
  photoCropArea: null,
}

function reducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step, ...(action.path ? { path: action.path } : {}) }
    case 'SET_CV_FILE':
      return { ...state, cvFile: action.file }
    case 'SET_LINKEDIN_URL':
      return { ...state, linkedinUrl: action.url }
    case 'SET_PROFILE':
      return { ...state, profile: action.profile }
    case 'SET_PHOTO':
      return { ...state, photoFile: action.file, photoCropArea: action.cropArea }
    default:
      return state
  }
}

function getProgress(state: OnboardingState): { current: number; total: number } {
  const { step, path } = state
  const isUpload = path === 'upload'
  if (step === 'auth')         return { current: 1, total: isUpload ? 4 : 5 }
  if (step === 'has-cv')       return { current: 2, total: isUpload ? 4 : 5 }
  if (step === 'upload-cv')    return { current: 3, total: 4 }
  if (step === 'has-linkedin') return { current: 3, total: 5 }
  if (step === 'linkedin-url') return { current: 4, total: 5 }
  if (step === 'questionnaire')return { current: 4, total: 5 }
  if (step === 'photo')        return { current: isUpload ? 4 : 5, total: isUpload ? 4 : 5 }
  return { current: 1, total: 4 }
}

export default function OnboardingPage() {
  const [state, dispatch] = useReducer(reducer, INITIAL)
  const router = useRouter()

  useEffect(() => {
    if (state.step === 'done') router.push('/editor')
  }, [state.step, router])

  const { current, total } = getProgress(state)

  const step = () => {
    switch (state.step) {
      case 'auth':          return <StepAuth          state={state} dispatch={dispatch} />
      case 'has-cv':        return <StepHasCv         state={state} dispatch={dispatch} />
      case 'upload-cv':     return <StepUploadCv      state={state} dispatch={dispatch} />
      case 'has-linkedin':  return <StepHasLinkedIn   state={state} dispatch={dispatch} />
      case 'linkedin-url':  return <StepLinkedInUrl   state={state} dispatch={dispatch} />
      case 'questionnaire': return <StepQuestionnaire state={state} dispatch={dispatch} />
      case 'photo':         return <StepPhoto         state={state} dispatch={dispatch} />
      default: return null
    }
  }

  if (state.step === 'done') return null

  return (
    <>
      <ProgressBar current={current} total={total} />
      <div className="min-h-screen bg-cv-cream flex items-start justify-center pt-16 pb-16 px-4">
        <div className="w-full max-w-lg">
          {step()}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Open browser and walk all three paths**

Navigate to `http://localhost:3000/onboarding` and verify:

**Path A (Upload):**
1. Sign-up form → invalid email shows error → valid credentials → "Continue →" advances
2. "Do you already have a CV?" → click Yes → upload screen appears
3. Drag a PDF → filename + size shown → "Continue →" → photo step
4. Photo step → choose image → crop circle appears → zoom slider works → "Done, build my CV →" → redirects to /editor (404 is expected)

**Path B (LinkedIn):**
1. Sign-up → has-cv No → has-linkedin Yes → paste `https://linkedin.com/in/test` → Continue → photo → skip → /editor

**Path C (Questionnaire):**
1. Sign-up → has-cv No → has-linkedin No → questionnaire → fill first name, last name, title, company → Continue → photo → skip → /editor

Check that the progress bar advances correctly on each step and shows the right N/total.

- [ ] **Step 4: Final TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/onboarding/page.tsx
git commit -m "feat: complete onboarding wizard — all paths wired"
```

---

## Done

At this point `/onboarding` is fully functional with all three import paths, inline validation, drag-and-drop file upload, circle-crop photo, and a progress bar. The sign-up step is UI-only until NextAuth email provider is configured.
