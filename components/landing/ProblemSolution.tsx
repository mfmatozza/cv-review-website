'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const PROBLEMS = [
  {
    marker: '✗',
    headline: 'Word templates look amateur.',
    body: 'Inconsistent spacing. Fonts that break on every device. Recruiters can spot a Word CV from three pixels away.',
  },
  {
    marker: '✗',
    headline: 'You re-type everything twice.',
    body: 'Your LinkedIn has it all. Your resume tool doesn\'t care. So you copy-paste, fix formatting, repeat for every job.',
  },
  {
    marker: '✗',
    headline: 'Your CV looks like everyone else\'s.',
    body: 'Same Canva template. Same section order. Same hiring manager, same pile. You\'re not standing out.',
  },
]

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll('.problem-item')
    if (!items) return
    gsap.fromTo(items,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="problem" className="py-20 bg-cv-cream">
      <div className="max-w-5xl mx-auto px-8">

        <div className="font-mono uppercase tracking-widest text-cv-green mb-4" style={{ fontSize: '10px', letterSpacing: '3px' }}>
          &gt; why_this_exists
        </div>
        <h2 className="text-4xl md:text-5xl font-black font-serif text-cv-forest mb-14" style={{ lineHeight: 1.05 }}>
          The tools that exist<br />are not good enough.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {PROBLEMS.map((p) => (
            <div key={p.headline} className="problem-item opacity-0">
              <div className="font-mono mb-3" style={{ fontSize: '18px', color: '#c0392b' }}>{p.marker}</div>
              <h3 className="font-black font-serif text-cv-forest mb-2" style={{ fontSize: '17px', lineHeight: 1.2 }}>
                {p.headline}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5a7a5a' }}>{p.body}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-10 font-serif font-black text-cv-forest"
          style={{ borderTop: '1px solid rgba(45,106,45,0.15)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.2 }}
        >
          So we built the CV tool that actually works —<br />
          <span className="text-cv-green">LaTeX precision, without touching LaTeX.</span>
        </div>

      </div>
    </section>
  )
}
