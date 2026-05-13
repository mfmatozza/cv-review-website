'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const STATES = [
  {
    headline: 'CV builders are broken.',
    sub: 'Word templates. Drag-and-drop. Re-typing everything.',
  },
  {
    headline: 'Your time is wasted\non formatting.',
    sub: 'You should be applying, not tweaking margins.',
  },
  {
    headline: "Your CV looks like\neveryone else's.",
    sub: 'Because you used the same tool as everyone else.',
  },
  {
    headline: 'We fixed all of it.',
    sub: 'LaTeX precision. LinkedIn import. One click download.',
  },
]

export default function ProblemSolution() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const dotsRef     = useRef<(HTMLDivElement | null)[]>([])

  const setDot = (active: number) => {
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return
      dot.style.background = i === active ? '#2d6a2d' : 'rgba(45,106,45,0.2)'
    })
  }

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      once: true,
      onEnter: () => advanceTo(1),
    })

    function advanceTo(idx: number) {
      if (idx >= STATES.length) return
      const state = STATES[idx]

      gsap.to([headlineRef.current, subRef.current], {
        opacity: 0,
        y: -16,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          if (headlineRef.current) headlineRef.current.textContent = state.headline
          if (subRef.current) subRef.current.textContent = state.sub
          setDot(idx)
          gsap.fromTo(
            [headlineRef.current, subRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
          )
          if (idx < STATES.length - 1) {
            setTimeout(() => advanceTo(idx + 1), 2200)
          }
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="flex items-center justify-center min-h-screen relative overflow-hidden bg-cv-dark"
    >
      <div className="absolute inset-0 pointer-events-none grid-overlay-dark" />

      <div className="relative text-center max-w-2xl mx-auto px-6">
        <div
          className="font-mono uppercase tracking-widest text-cv-green-light mb-8"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          &gt; the_problem → the_fix
        </div>

        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl font-black leading-tight mb-6 font-serif text-cv-text-light whitespace-pre-line"
        >
          {STATES[0].headline}
        </h2>

        <p ref={subRef} className="font-mono text-sm mb-10 text-cv-muted">
          {STATES[0].sub}
        </p>

        <div className="flex gap-2 justify-center">
          {STATES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotsRef.current[i] = el }}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ background: i === 0 ? '#2d6a2d' : 'rgba(45,106,45,0.2)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
