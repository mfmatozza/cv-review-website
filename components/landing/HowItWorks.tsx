'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const STEPS = [
  {
    num: 1,
    title: 'Sign in & import your details',
    desc: 'Log in with Google or GitHub. Pull your profile straight from LinkedIn, answer a short questionnaire, or start from scratch.',
    tags: ['// LinkedIn import', '// Next Auth sign-in', '// Photo upload'],
  },
  {
    num: 2,
    title: 'Edit live in your browser',
    desc: 'Update any field, swap templates, reorder sections. Your CV re-renders in real time — what you see is what you get.',
    tags: ['// Live LaTeX editor', '// Template gallery', '// Section reordering'],
  },
  {
    num: 3,
    title: 'Download your PDF',
    desc: 'One click. Compiled by a real LaTeX engine. Perfect typography, consistent rendering on every device, every time.',
    tags: ['// LaTeX compilation', '// Pixel-perfect PDF', '// Instant download'],
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll('.step-item')
    if (!items) return
    gsap.fromTo(
      items,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="features" className="py-24 bg-cv-cream">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="font-mono uppercase tracking-widest text-cv-green mb-4"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          &gt; how_it_works
        </div>
        <h2 className="text-3xl font-black mb-16 font-serif text-cv-forest">
          Three steps to a perfect CV.
        </h2>

        <div className="flex flex-col gap-12">
          {STEPS.map((step) => (
            <div key={step.num} className="step-item grid grid-cols-[28px_1fr] gap-5 items-start">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-mono font-black text-xs flex-shrink-0 bg-cv-green text-cv-cream">
                {step.num}
              </div>
              <div>
                <h3 className="font-black text-xl mb-2 font-serif text-cv-forest">{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4 text-cv-muted">{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-1 rounded border text-cv-green"
                      style={{ background: 'rgba(45,106,45,0.07)', borderColor: 'rgba(45,106,45,0.18)', fontSize: '11px' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
