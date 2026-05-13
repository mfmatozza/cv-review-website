'use client'
import { useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const FAQS = [
  {
    q: 'Do I need to know LaTeX?',
    a: 'No. We handle all the LaTeX. You fill in your details and we compile the document for you.',
  },
  {
    q: 'Can I edit my CV after downloading?',
    a: 'Yes — your CV is always saved. Come back any time to update fields and re-export a fresh PDF.',
  },
  {
    q: 'How does LinkedIn import work?',
    a: 'Paste your LinkedIn profile URL and we extract your experience, education, and skills automatically.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-cv-cream-dark">
      <div className="max-w-2xl mx-auto px-6">
        <div
          className="font-mono uppercase tracking-widest text-cv-green mb-4"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          &gt; faq_
        </div>
        <h2 className="text-3xl font-black mb-10 font-serif text-cv-forest">Questions.</h2>

        <div style={{ borderTop: '1px solid rgba(45,74,45,0.1)' }}>
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const el = bodyRef.current
    if (!el) return
    if (!open) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out', overflow: 'hidden' }
      )
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
    setOpen(!open)
  }

  return (
    <div
      className="cursor-pointer py-4"
      style={{ borderBottom: '1px solid rgba(45,74,45,0.1)' }}
      onClick={toggle}
    >
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm text-cv-forest">
          <span className="font-mono text-cv-green mr-2">&gt;</span>{q}
        </div>
        <span
          className="font-mono text-cv-green text-sm transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'none', display: 'inline-block' }}
        >
          +
        </span>
      </div>
      <div ref={bodyRef} style={{ overflow: 'hidden', height: 0, opacity: 0 }}>
        <p className="text-sm mt-3 leading-relaxed pl-4 text-cv-subtle">{a}</p>
      </div>
    </div>
  )
}
