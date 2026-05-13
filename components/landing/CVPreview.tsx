'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const TEMPLATES = [
  { name: 'Classic', accent: '#2d6a2d', lineAccent: 'rgba(45,106,45,0.28)', offset: 16 },
  { name: 'Modern',  accent: '#4a7a4a', lineAccent: 'rgba(74,122,74,0.28)',  offset: 0  },
  { name: 'Minimal', accent: '#3a6a3a', lineAccent: 'rgba(58,106,58,0.28)',  offset: 24 },
]

const LINE_WIDTHS = [75, 95, 85, 0, 60, 100, 90, 80, 0, 50, 95, 70]

export default function CVPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.cv-template-card')
    if (!cards) return
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="templates" className="py-24 bg-cv-dark">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="font-mono uppercase tracking-widest text-cv-green-light mb-4"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          &gt; templates_
        </div>
        <h2 className="text-3xl font-black mb-16 font-serif text-cv-text-light">
          Professional templates, beautifully typeset.
        </h2>

        <div className="flex gap-8 overflow-x-auto pb-4 md:overflow-visible md:justify-center items-start">
          {TEMPLATES.map((t, i) => (
            <div
              key={t.name}
              className="cv-template-card flex-shrink-0 w-44 bg-white rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 opacity-0"
              style={{ marginTop: `${t.offset}px`, transform: i === 1 ? 'scale(1.05)' : undefined }}
            >
              <div className="h-1.5 rounded-t-lg" style={{ background: t.accent }} />
              <div className="p-4">
                <div className="w-8 h-8 rounded-full mb-3" style={{ background: `linear-gradient(135deg, ${t.accent}, #6aaa6a)` }} />
                {LINE_WIDTHS.map((w, j) =>
                  w === 0 ? (
                    <div key={j} className="mt-3" />
                  ) : (
                    <div
                      key={j}
                      className="h-1 rounded-sm mb-1.5"
                      style={{ width: `${w}%`, background: j % 5 === 0 ? t.lineAccent : '#e8e8e8' }}
                    />
                  )
                )}
              </div>
              <div className="px-4 pb-4">
                <div className="font-mono text-xs font-bold" style={{ color: t.accent }}>{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
