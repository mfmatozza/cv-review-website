'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import AppPreview from './AppPreview'

const WORDS = ['beautifully', 'precisely', 'perfectly', 'effortlessly', 'professionally']

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const h1Ref      = useRef<HTMLHeadingElement>(null)
  const rotWordRef = useRef<HTMLSpanElement>(null)
  const ctasRef    = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(gridRef.current,   { opacity: 0 },        { opacity: 1, duration: 0.6 })
    tl.fromTo(h1Ref.current,     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    tl.fromTo(ctasRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    tl.fromTo(previewRef.current,{ opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.3')

    // Rotating word — fade up out, swap text, fade down in
    let idx = 0
    const rotateWord = () => {
      gsap.to(rotWordRef.current, {
        y: -14, opacity: 0, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          idx = (idx + 1) % WORDS.length
          if (rotWordRef.current) rotWordRef.current.textContent = WORDS[idx]
          gsap.fromTo(rotWordRef.current,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out',
              onComplete: () => setTimeout(rotateWord, 2200) }
          )
        },
      })
    }
    tl.call(() => setTimeout(rotateWord, 2400))

    // Subtle float on preview
    gsap.to(previewRef.current, { y: -8, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 })

    // Parallax tilt on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(previewRef.current, {
          rotateX: self.progress * 6,
          rotateY: -self.progress * 4,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center bg-cv-cream"
      style={{ paddingTop: '56px' }}
    >
      <div ref={gridRef} className="absolute inset-0 pointer-events-none grid-overlay opacity-0" />

      <div className="relative max-w-7xl mx-auto px-8 py-12 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left — text */}
        <div>
          <h1
            ref={h1Ref}
            className="font-black leading-[1.05] mb-10 font-serif text-cv-forest opacity-0"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
          >
            Your career{' '}
            <span
              ref={rotWordRef}
              className="text-cv-green inline-block"
              style={{
                textDecoration: 'underline',
                textDecorationThickness: '3px',
                textUnderlineOffset: '8px',
              }}
            >
              {WORDS[0]}
            </span>
            <br />
            typeset.
          </h1>

          <div ref={ctasRef} className="flex gap-4 flex-wrap opacity-0">
            <Link
              href="/onboarding"
              className="font-mono font-bold text-sm px-7 py-3.5 rounded-md bg-cv-green text-cv-cream hover:bg-cv-green-mid transition-colors"
            >
              Build my CV →
            </Link>
            <a
              href="#templates"
              className="font-mono text-sm px-7 py-3.5 rounded-md border text-cv-green hover:bg-cv-green/5 transition-colors"
              style={{ borderColor: 'rgba(45,106,45,0.3)' }}
            >
              See templates
            </a>
          </div>
        </div>

        {/* Right — app preview */}
        <div
          ref={previewRef}
          className="hidden md:block opacity-0"
          style={{ perspective: '900px' }}
        >
          <AppPreview />
        </div>
      </div>
    </section>
  )
}
