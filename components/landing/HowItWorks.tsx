'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

function WordCV() {
  return (
    <div className="rounded shadow-md overflow-hidden" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '8px', background: '#f8f8f8', border: '1px solid #ddd' }}>
      {/* Fake blue Word header bar */}
      <div style={{ background: '#2e5fa3', padding: '6px 10px' }}>
        <div style={{ color: 'white', fontSize: '7px', fontFamily: 'Arial, sans-serif', opacity: 0.8 }}>
          Microsoft Word — CV_James_FINAL_v3_USE_THIS_ONE.docx
        </div>
      </div>
      <div className="p-4" style={{ background: 'white' }}>
        {/* Centered header */}
        <div className="text-center mb-2 pb-2" style={{ borderBottom: '3px double #000' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>James Harrington</div>
          <div style={{ fontSize: '8px', marginTop: '2px', color: '#333' }}>
            123 High Street, London, UK · james.harrington123@hotmail.com
          </div>
          <div style={{ fontSize: '8px', color: '#333' }}>
            Tel: +44 7700 000000 · linkedin.com/in/james-harrington-456789
          </div>
        </div>

        <WordSection>WORK EXPERIENCE</WordSection>
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '8.5px' }}>Senior Software Engineer — Acme Corp, London</div>
          <div style={{ fontStyle: 'italic', color: '#555', marginBottom: '2px', fontSize: '7.5px' }}>January 2022 – Present (3 years)</div>
          <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.7', color: '#222' }}>
            <li>Responsible for leading and managing the platform migration project from start to finish</li>
            <li>Worked closely with the team to help reduce system latency by approximately 40%</li>
            <li>Collaborated effectively with cross-functional stakeholders across the business</li>
            <li>Assisted senior management with various technical decisions and documentation</li>
          </ul>
        </div>
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '8.5px' }}>Software Engineer — StartupCo, London</div>
          <div style={{ fontStyle: 'italic', color: '#555', marginBottom: '2px', fontSize: '7.5px' }}>June 2020 – December 2021</div>
          <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.7', color: '#222' }}>
            <li>Helped to build and maintain the core API of the company's main product</li>
            <li>Assisted in scaling infrastructure to handle increased traffic loads</li>
          </ul>
        </div>

        <WordSection>EDUCATION</WordSection>
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '8.5px' }}>BSc (Hons) Computer Science — 2:1</div>
          <div style={{ fontSize: '7.5px', color: '#555' }}>University of Edinburgh, Edinburgh, Scotland · September 2016 – June 2020</div>
          <div style={{ fontSize: '7.5px', marginTop: '2px' }}>Relevant modules: Data Structures, Algorithms, Software Engineering, Databases</div>
        </div>

        <WordSection>SKILLS &amp; COMPETENCIES</WordSection>
        <div style={{ lineHeight: '1.8', color: '#222' }}>
          <span style={{ fontWeight: 'bold' }}>Programming Languages:</span> JavaScript, TypeScript, Python, Rust<br />
          <span style={{ fontWeight: 'bold' }}>Frameworks &amp; Libraries:</span> React, Node.js, Express.js<br />
          <span style={{ fontWeight: 'bold' }}>Tools &amp; Technologies:</span> Git, Docker, Amazon Web Services, Linux<br />
          <span style={{ fontWeight: 'bold' }}>Soft Skills:</span> Communication, Teamwork, Problem-solving, Leadership
        </div>

        {/* Page count indicator */}
        <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '7px', color: '#aaa', fontFamily: 'Arial, sans-serif' }}>
          Page 1 of 2
        </div>
      </div>
    </div>
  )
}

function WordSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontWeight: 'bold',
      fontSize: '9px',
      textDecoration: 'underline',
      textTransform: 'uppercase' as const,
      marginBottom: '3px',
      marginTop: '9px',
      letterSpacing: '0.3px',
    }}>
      {children}
    </div>
  )
}

function LaTeXCV() {
  return (
    <div className="bg-white rounded shadow-xl overflow-hidden" style={{ fontFamily: 'Georgia, serif', fontSize: '8px' }}>
      <div className="h-1 bg-cv-green" />
      <div className="p-4">
        {/* Header with photo */}
        <div className="flex gap-3 items-start pb-3 mb-3" style={{ borderBottom: '1px solid #f0ece2' }}>
          <div className="flex-shrink-0 rounded-full overflow-hidden shadow-sm" style={{ width: '36px', height: '36px' }}>
            <ProfilePhoto />
          </div>
          <div className="pt-0.5">
            <div className="font-mono font-bold tracking-wide text-cv-forest" style={{ fontSize: '10px' }}>
              JAMES HARRINGTON
            </div>
            <div className="font-mono text-cv-green mt-0.5" style={{ fontSize: '8px' }}>
              Software Engineer
            </div>
            <div className="font-mono mt-0.5" style={{ fontSize: '7px', color: '#999' }}>
              london · james.h@pm.me · github.com/jharr
            </div>
          </div>
        </div>

        <LatexSection>Experience</LatexSection>
        <LatexEntry title="Senior Engineer" org="Acme Corp" date="2022–present"
          body="Led platform migration across 3 services, cutting p99 latency by 40%. Owned on-call rotation for 18 months." />
        <LatexEntry title="Software Engineer" org="StartupCo" date="2020–2022"
          body="Built core API from scratch, scaled to 2M+ req/day. Reduced infra cost 30% via caching strategy." />

        <LatexSection>Education</LatexSection>
        <LatexEntry title="BSc Computer Science" org="University of Edinburgh" date="2016–2020" />

        <LatexSection>Skills</LatexSection>
        <div className="flex flex-wrap gap-1 mt-1">
          {['TypeScript', 'React', 'Rust', 'Go', 'AWS', 'LaTeX'].map((s) => (
            <span key={s} className="font-mono text-cv-green rounded px-1.5 py-0.5"
              style={{ fontSize: '7px', background: 'rgba(45,106,45,0.1)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function LatexSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono font-bold uppercase tracking-widest text-cv-green mt-3 mb-1.5 pb-0.5"
      style={{ fontSize: '7px', borderBottom: '1px solid rgba(45,106,45,0.2)' }}>
      {children}
    </div>
  )
}

function LatexEntry({ title, org, date, body }: { title: string; org: string; date: string; body?: string }) {
  return (
    <div className="mb-2">
      <div className="font-mono font-bold text-cv-forest" style={{ fontSize: '9px' }}>{title}</div>
      <div className="font-mono flex justify-between" style={{ fontSize: '8px', color: '#888' }}>
        <span>{org}</span><span>{date}</span>
      </div>
      {body && <div className="mt-0.5 leading-relaxed" style={{ fontSize: '7.5px', color: '#666' }}>{body}</div>}
    </div>
  )
}

function ProfilePhoto() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a882" />
          <stop offset="100%" stopColor="#b8895a" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill="url(#bg2)" />
      <ellipse cx="24" cy="15" rx="9" ry="9" fill="#3d2b1f" />
      <rect x="15" y="15" width="18" height="6" fill="#3d2b1f" />
      <ellipse cx="24" cy="19" rx="7.5" ry="8.5" fill="#c8956c" />
      <path d="M10 48 Q10 32 24 32 Q38 32 38 48 Z" fill="#2d5a8e" />
      <path d="M20 32 L24 38 L28 32" fill="#f5f5f5" />
    </svg>
  )
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
    gsap.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
    gsap.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="features" className="relative py-20 overflow-hidden" style={{ background: '#1a2e1a' }}>
      <div ref={gridRef} className="absolute inset-0 pointer-events-none grid-overlay-dark opacity-0" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: '10px', letterSpacing: '3px', color: '#7aaa7a' }}>
            &gt; the_difference
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-serif" style={{ color: '#f5f0e8' }}>
            The difference is obvious.
          </h2>
        </div>

        {/* Side by side */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Word CV */}
          <div ref={leftRef} className="opacity-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs" style={{ color: '#d97171' }}>✗ typical word template</span>
            </div>
            <WordCV />
          </div>

          {/* LaTeX CV */}
          <div ref={rightRef} className="opacity-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-cv-green">→ cv_builder output</span>
            </div>
            <LaTeXCV />
          </div>
        </div>
      </div>
    </section>
  )
}
