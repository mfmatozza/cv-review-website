# CV Builder — Landing Page Design Spec

**Date:** 2026-05-14
**Project:** cv-review-website
**Scope:** Public landing page + onboarding flow (post-auth editor is out of scope for this spec)

---

## 1. Overview

A landing page for a web app that lets users build professional LaTeX CVs without knowing LaTeX. The page must communicate the value proposition immediately, look premium and modern, and funnel visitors to sign up.

**Core user promise:** Import from LinkedIn (or answer a few questions), upload a photo, edit live in the browser, download a perfect PDF.

---

## 2. Visual Identity

| Token | Value |
|---|---|
| Background | `#f5f0e8` (washed cream) |
| Text primary | `#1a3320` (dark forest green) |
| Accent | `#2d6a2d` (terminal green) |
| Surface | `#ffffff` / `#f0ece2` |
| Dark sections | `#1a2e1a` |
| Font — headings | System serif (Georgia fallback) |
| Font — labels/CTAs/code | Monospace (system-mono fallback) |

**Grid overlay:** CSS `background-image` grid lines in `rgba(45,106,45,0.07)` at 24px intervals, animated with a slow vertical scroll keyframe. Used on hero and problem/solution sections.

**No emojis anywhere.** Use `→`, `//`, `>`, `✗` as visual markers.

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, routing, API routes for auth |
| Language | TypeScript | Type safety throughout |
| Styling | Tailwind CSS | Utility-first, consistent tokens |
| Animations | GSAP + ScrollTrigger | Industry standard for scroll choreography, typewriter, timeline-based sequences |
| Auth | Next Auth v5 | Google + GitHub providers |
| Repo | `cv-review-website` (GitHub) | New public repo |

**.gitignore** must include `.superpowers/`.

---

## 4. Page Architecture

### 4.1 Navigation

Sticky, cream background with subtle bottom border.

- **Left:** Logo `cv_builder` — monospace, `_` in accent green
- **Center:** Links — Features · Templates · Pricing
- **Right:** `Sign in →` button (filled green, monospace)

On mobile: hamburger menu, links collapse.

### 4.2 Hero

Full-viewport-height section with animated grid overlay.

**Layout:** Two-column on desktop (text left, CV card right), single column on mobile.

**Left — text block:**
- Tag line: `> latex_cv_builder` (9px, 3px letter-spacing, accent green)
- H1: `Your career, beautifully typeset.` — "beautifully" in accent green
- Typewriter sub-text (GSAP TextPlugin): cycles through `Importing LinkedIn profile...` → `Compiling your PDF...` → `Ready to download.` with blinking cursor
- Two CTAs: `Build my CV →` (filled) + `See templates` (outlined)

**Right — floating CV card:**
- White card with a 4px accent-green top bar, subtle drop shadow
- Rendered like a real mini CV: circle photo (top-left), name, title, contact line, Experience section (2 entries), Education (1 entry), Skills tags
- Card floats with a slow `translateY` keyframe (4s ease-in-out infinite)
- On scroll: card tilts slightly via GSAP parallax

**Hero entrance animation (GSAP timeline):**
1. Grid fades in (0.6s)
2. Tag staggered in from below (0.4s)
3. H1 words stagger in (0.6s, stagger 0.1s per word)
4. Typewriter starts
5. CTAs fade up (0.4s)
6. CV card slides in from right (0.5s, ease back)

### 4.3 Problem → Solution (Morphing Statement)

Dark section (`#1a2e1a`) with animated grid.

**Layout:** Centered, full-width. One large headline + subtitle that morphs via GSAP.

**Sequence (GSAP timeline, ScrollTrigger-pinned):**

| Step | Headline | Subtitle |
|---|---|---|
| 1 | `CV builders are broken.` | Word templates. Drag-and-drop. Re-typing everything. |
| 2 | `Your time is wasted on formatting.` | You should be applying, not tweaking margins. |
| 3 | `Your CV looks like everyone else's.` | Because you used the same tool as everyone else. |
| 4 | `We fixed all of it.` | LaTeX precision. LinkedIn import. One click download. |

Each state holds for ~2s, crossfades to next. Step 4 ("We fixed it") stays and the section unpins, allowing scroll to continue.

Progress dots (4 dots) track current state.

### 4.4 Features + How it Works (Merged)

Cream section.

**Header:** `> how_it_works` tag + `Three steps to a perfect CV.` H2

**Three numbered steps** — each step has:
- Green circle number (28px)
- Step title (bold, serif)
- Step description (2 sentences)
- `// feature tags` row — small pill tags with `//` prefix in accent green

| Step | Title | Feature tags |
|---|---|---|
| 1 | Sign in & import your details | `// LinkedIn import` · `// Next Auth sign-in` · `// Photo upload` |
| 2 | Edit live in your browser | `// Live LaTeX editor` · `// Template gallery` · `// Section reordering` |
| 3 | Download your PDF | `// LaTeX compilation` · `// Pixel-perfect PDF` · `// Instant download` |

**Scroll animation:** Each step slides in from the left with stagger as the section enters viewport (GSAP ScrollTrigger, `from: { x: -40, opacity: 0 }`).

### 4.5 CV Preview

Dark section (`#1a2e1a`).

**Header:** `> templates_` tag

**Layout:** Horizontal scroll gallery of 3 CV template previews. Each is a white card showing a wireframe-level CV layout (photo circle, section headers, text lines). Cards are staggered at different vertical offsets for depth.

On desktop: all 3 visible, middle card slightly larger (scale 1.05).
On mobile: horizontal scroll snap.

**Animation:** Cards fan in from below on scroll (GSAP stagger).

### 4.6 Pricing

Cream section.

**Header:** `> pricing_` tag + `Simple, honest pricing.` H2

**Two-column card grid:**

| | Free | Pro |
|---|---|---|
| Price | $0 / forever | $9 / month |
| Templates | 1 | All |
| CVs | Unlimited | Unlimited |
| LinkedIn import | Yes | Yes |
| Photo upload | Yes | Yes |
| Custom sections | No | Yes |
| Priority support | No | Yes |
| CTA | `Get started` (outlined) | `Go Pro →` (filled, inverted on dark green card) |

Pro card uses dark green background (`#2d6a2d`) with cream text.

### 4.7 FAQ

Off-cream section (`#f0ece2`).

**Header:** `> faq_` tag

Three accordion items:

1. **Do I need to know LaTeX?** — No. We handle all the LaTeX. You fill in your details.
2. **Can I edit my CV after downloading?** — Yes — your CV is always saved. Come back any time to update and re-export.
3. **How does LinkedIn import work?** — Paste your LinkedIn profile URL and we extract your experience, education, and skills automatically.

Accordion open/close uses GSAP height animation (not CSS transitions) for smoothness.

### 4.8 CTA Footer

Dark section (`#1a2e1a`).

- H2: `> ready_to_build` with blinking cursor (CSS animation)
- Sub-text: `Your next opportunity is one PDF away.`
- Single CTA: `Build my CV — it's free →` (large, filled green button)
- Footer links row: Privacy · Terms · GitHub

---

## 5. Onboarding Flow (Post Sign-In)

This is the in-app flow after a user clicks "Build my CV" and authenticates. Landing page links directly here.

```
Sign in (Next Auth)
  └── Google / GitHub OAuth

Onboarding step 1: "Do you already have a CV?"
  ├── Yes → Upload existing CV (PDF/DOCX) → parsed and pre-filled
  └── No
        ├── "Do you have a LinkedIn profile?"
        │     ├── Yes → Paste LinkedIn URL → auto-import fields
        │     └── No → Short questionnaire (name, role, experience entries, education, skills)
        └── (both paths) → Photo upload step
              └── Circle crop UI → photo placed top-left in template
                    └── → CV Editor

CV Editor
  ├── Live LaTeX preview pane (re-renders on field change)
  ├── Template switcher sidebar
  ├── Field editor (name, contact, experience, education, skills, custom sections)
  └── Download PDF button → LaTeX compile → serve PDF
```

**Onboarding UI style:** Same cream/green palette. Full-screen step-by-step wizard, progress indicator at top (step N of N). Each step is a single focused question — no overwhelm.

---

## 6. Responsive Behaviour

| Breakpoint | Changes |
|---|---|
| `< 768px` | Hero: single column (text above, CV card below, card smaller). Nav: hamburger. Pricing: stacked cards. CV gallery: horizontal scroll snap. |
| `768–1024px` | Hero: two-column compressed. Steps: full width. |
| `> 1024px` | Full layout as described above. |

---

## 7. Performance Constraints

- GSAP loaded only on client (`'use client'` components), not in SSR bundle
- CV preview cards are pure HTML/CSS — no images, no external assets at hero load
- LCP target: < 2.5s on 4G. Hero text is server-rendered; animations are additive
- No third-party fonts at initial load — system font stack only

---

## 8. Out of Scope

- LaTeX compilation engine (separate backend service)
- LinkedIn scraping implementation (separate API integration)
- CV editor internals beyond the onboarding wizard
- Payment integration for Pro tier
- Email notifications
