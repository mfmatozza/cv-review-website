'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { gsap, ScrollTrigger, TextPlugin } from '@/lib/gsap'
import CVCard from './CVCard'

const PHRASES = [
  'Importing LinkedIn profile...',
  'Compiling your PDF...',
  'Ready to download.',
]

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const tagRef     = useRef<HTMLDivElement>(null)
  const wordsRef   = useRef<HTMLSpanElement[]>([])
  const typeRef    = useRef<HTMLSpanElement>(null)
  const ctasRef    = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(gridRef.current,  { opacity: 0 },        { opacity: 1, duration: 0.6 })
    tl.fromTo(tagRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    tl.fromTo(wordsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.1')
    tl.fromTo(ctasRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    tl.fromTo(cardRef.current,  { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.3')

    // Typewriter loop
    let i = 0
    const typeNext = () => {
      const phrase = PHRASES[i % PHRASES.length]
      gsap.to(typeRef.current, {
        duration: phrase.length * 0.05,
        text: { value: phrase, delimiter: '' },
        ease: 'none',
        onComplete: () => {
          setTimeout(() => {
            gsap.to(typeRef.current, {
              duration: 0.3,
              opacity: 0,
              onComplete: () => {
                if (typeRef.current) {
                  typeRef.current.textContent = ''
                  gsap.set(typeRef.current, { opacity: 1 })
                }
                i++
                typeNext()
              },
            })
          }, 2200)
        },
      })
    }
    tl.call(typeNext)

    // Card float
    gsap.to(cardRef.current, { y: -10, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 })

    // Card parallax on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(cardRef.current, {
          rotateX: self.progress * 8,
          rotateY: -self.progress * 5,
        })
      },
    })
  }, { scope: sectionRef })

  const words = ['Your', 'career,', 'beautifully', 'typeset.']

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center bg-cv-cream"
      style={{ paddingTop: '56px' }}
    >
      <div ref={gridRef} className="absolute inset-0 pointer-events-none grid-overlay opacity-0" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full grid md:grid-cols-2 gap-16 items-center">

        <div>
          <div
            ref={tagRef}
            className="font-mono text-cv-green uppercase tracking-widest mb-4 opacity-0"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            &gt; latex_cv_builder
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 font-serif text-cv-forest">
            {words.map((word, idx) => (
              <span
                key={word}
                ref={(el) => { if (el) wordsRef.current[idx] = el }}
                className="inline-block mr-3 opacity-0"
              >
                {word === 'beautifully'
                  ? <em className="not-italic text-cv-green">{word}</em>
                  : word}
              </span>
            ))}
          </h1>

          <div className="font-mono text-sm mb-8 flex items-center text-cv-subtle">
            <span ref={typeRef} />
            <span className="inline-block w-0.5 h-4 ml-0.5 bg-cv-green animate-blink" />
          </div>

          <div ref={ctasRef} className="flex gap-3 flex-wrap opacity-0">
            <Link
              href="/onboarding"
              className="font-mono font-bold text-sm px-5 py-3 rounded-md bg-cv-green text-cv-cream hover:bg-cv-green-mid transition-colors"
            >
              Build my CV →
            </Link>
            <a
              href="#templates"
              className="font-mono text-sm px-5 py-3 rounded-md border text-cv-green hover:bg-cv-green/5 transition-colors"
              style={{ borderColor: 'rgba(45,106,45,0.3)' }}
            >
              See templates
            </a>
          </div>
        </div>

        <div
          ref={cardRef}
          className="hidden md:block opacity-0"
          style={{ perspective: '800px' }}
        >
          <CVCard />
        </div>
      </div>
    </section>
  )
}
