'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

// ── Shared avatar ─────────────────────────────────────────────────────────────
function Avatar({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} style={{ borderRadius: '50%' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a882" />
          <stop offset="100%" stopColor="#b8895a" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill="url(#avbg)" />
      <ellipse cx="24" cy="15" rx="9" ry="9" fill="#3d2b1f" />
      <rect x="15" y="15" width="18" height="6" fill="#3d2b1f" />
      <ellipse cx="24" cy="19" rx="7.5" ry="8.5" fill="#c8956c" />
      <path d="M10 48 Q10 32 24 32 Q38 32 38 48 Z" fill="#2d5a8e" />
      <path d="M20 32 L24 38 L28 32" fill="#f5f5f5" />
    </svg>
  )
}

// ── Template 1: Classic ───────────────────────────────────────────────────────
// Traditional single-column, centered serif header, small-caps sections
function ClassicTemplate() {
  return (
    <div style={{ fontFamily: 'Georgia, serif', fontSize: '7px', padding: '14px', color: '#1a1a1a' }}>
      <div style={{ textAlign: 'center', paddingBottom: '7px', marginBottom: '7px', borderBottom: '1.5px solid #1a3320' }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a3320' }}>
          James Harrington
        </div>
        <div style={{ fontSize: '8px', color: '#2d6a2d', marginTop: '2px', fontStyle: 'italic' }}>
          Software Engineer
        </div>
        <div style={{ fontSize: '6.5px', color: '#777', marginTop: '3px', fontFamily: 'monospace' }}>
          london · james@pm.me · github.com/jharr
        </div>
      </div>

      <ClassicSection>Experience</ClassicSection>
      <ClassicEntry title="Senior Engineer" org="Acme Corp" date="2022–present"
        body="Led platform migration across 3 services. Cut p99 latency 40%. Owned on-call rotation." />
      <ClassicEntry title="Software Engineer" org="StartupCo" date="2020–2022"
        body="Built core API from scratch, scaled to 2M+ req/day." />

      <ClassicSection>Education</ClassicSection>
      <ClassicEntry title="BSc Computer Science" org="University of Edinburgh" date="2016–2020" />

      <ClassicSection>Skills</ClassicSection>
      <div style={{ color: '#444', lineHeight: 1.8, fontSize: '7px' }}>
        TypeScript &nbsp;·&nbsp; React &nbsp;·&nbsp; Rust &nbsp;·&nbsp; Go &nbsp;·&nbsp; AWS &nbsp;·&nbsp; LaTeX
      </div>
    </div>
  )
}

function ClassicSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontVariant: 'small-caps',
      fontWeight: 'bold',
      fontSize: '8px',
      letterSpacing: '1px',
      color: '#1a3320',
      borderBottom: '0.75px solid #1a3320',
      paddingBottom: '2px',
      marginBottom: '5px',
      marginTop: '9px',
    }}>
      {children}
    </div>
  )
}

function ClassicEntry({ title, org, date, body }: { title: string; org: string; date: string; body?: string }) {
  return (
    <div style={{ marginBottom: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontWeight: 'bold', fontSize: '7.5px' }}>{title}</span>
        <span style={{ fontSize: '6.5px', color: '#777', fontFamily: 'monospace' }}>{date}</span>
      </div>
      <div style={{ fontStyle: 'italic', fontSize: '6.5px', color: '#555' }}>{org}</div>
      {body && <div style={{ fontSize: '6.5px', color: '#444', marginTop: '2px', lineHeight: 1.5 }}>{body}</div>}
    </div>
  )
}

// ── Template 2: Modern ────────────────────────────────────────────────────────
// Two-column: dark sidebar (photo + contact + skills) + white main content
function ModernTemplate() {
  return (
    <div style={{ display: 'flex', height: '100%', fontSize: '7px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '36%', background: '#1a3320', padding: '12px 8px', color: 'white', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar size={34} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '8px', fontWeight: '600', lineHeight: 1.2 }}>James<br />Harrington</div>
        </div>

        <div>
          <div style={{ fontSize: '5.5px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.5, marginBottom: '3px' }}>Contact</div>
          <div style={{ fontSize: '6px', opacity: 0.85, lineHeight: 1.7 }}>
            London, UK<br />
            james@pm.me<br />
            github/jharr
          </div>
        </div>

        <div>
          <div style={{ fontSize: '5.5px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.5, marginBottom: '4px' }}>Skills</div>
          {['TypeScript', 'React', 'Rust', 'Go', 'AWS'].map((s) => (
            <div key={s} style={{
              fontSize: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px',
              padding: '2px 5px', marginBottom: '2px', color: 'rgba(255,255,255,0.9)',
            }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '12px 10px', background: 'white' }}>
        <div style={{ marginBottom: '10px', paddingBottom: '7px', borderBottom: '1px solid #e8e8e8' }}>
          <div style={{ fontSize: '7px', color: '#2d6a2d', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Software Engineer
          </div>
        </div>

        <ModernSection>Experience</ModernSection>
        <ModernEntry title="Senior Engineer" org="Acme Corp" date="2022–now"
          body="Led migration, cut p99 latency 40%." />
        <ModernEntry title="Software Engineer" org="StartupCo" date="2020–22"
          body="Built API to 2M+ req/day." />

        <ModernSection>Education</ModernSection>
        <ModernEntry title="BSc Computer Science" org="Edinburgh" date="2016–20" />
      </div>
    </div>
  )
}

function ModernSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '6.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px',
      color: '#2d6a2d', marginBottom: '4px', marginTop: '8px',
      borderLeft: '2px solid #2d6a2d', paddingLeft: '5px',
    }}>
      {children}
    </div>
  )
}

function ModernEntry({ title, org, date, body }: { title: string; org: string; date: string; body?: string }) {
  return (
    <div style={{ marginBottom: '5px' }}>
      <div style={{ fontWeight: '600', fontSize: '7.5px', color: '#1a1a1a' }}>{title}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '6.5px', color: '#888' }}>
        <span>{org}</span><span style={{ fontFamily: 'monospace' }}>{date}</span>
      </div>
      {body && <div style={{ fontSize: '6.5px', color: '#555', marginTop: '2px', lineHeight: 1.5 }}>{body}</div>}
    </div>
  )
}

// ── Template 3: Minimal ───────────────────────────────────────────────────────
// Ultra-clean, generous whitespace, thin accent line, no photo
function MinimalTemplate() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '7px', padding: '14px', color: '#1a1a1a' }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '15px', fontWeight: '300', color: '#1a3320', letterSpacing: '0.5px', lineHeight: 1.1 }}>
          James<br /><span style={{ fontWeight: '700' }}>Harrington</span>
        </div>
        <div style={{ width: '20px', height: '2px', background: '#2d6a2d', margin: '5px 0' }} />
        <div style={{ fontSize: '7px', color: '#888', fontFamily: 'monospace' }}>
          Software Engineer &nbsp;·&nbsp; London
        </div>
        <div style={{ fontSize: '6.5px', color: '#aaa', fontFamily: 'monospace', marginTop: '2px' }}>
          james@pm.me &nbsp;·&nbsp; github.com/jharr
        </div>
      </div>

      <MinimalSection>Experience</MinimalSection>
      <MinimalEntry title="Senior Engineer" org="Acme Corp" date="2022–present"
        body="Migration lead. −40% p99 latency. On-call owner." />
      <MinimalEntry title="Software Engineer" org="StartupCo" date="2020–2022"
        body="Core API. 2M+ req/day. −30% infra cost." />

      <MinimalSection>Education</MinimalSection>
      <MinimalEntry title="BSc Computer Science" org="University of Edinburgh" date="2016–2020" />

      <MinimalSection>Stack</MinimalSection>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
        {['TypeScript', 'React', 'Rust', 'Go', 'AWS', 'LaTeX'].map((s) => (
          <span key={s} style={{
            fontSize: '6px', border: '0.75px solid rgba(45,106,45,0.3)',
            borderRadius: '2px', padding: '1.5px 4px', color: '#2d6a2d',
          }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function MinimalSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '6.5px', fontWeight: '700', textTransform: 'uppercase',
      letterSpacing: '1.5px', color: '#999', marginBottom: '5px', marginTop: '10px',
    }}>
      {children}
    </div>
  )
}

function MinimalEntry({ title, org, date, body }: { title: string; org: string; date: string; body?: string }) {
  return (
    <div style={{ marginBottom: '5px', paddingLeft: '6px', borderLeft: '1.5px solid #e8e8e8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontWeight: '600', fontSize: '7.5px' }}>{title}</span>
        <span style={{ fontSize: '6.5px', color: '#bbb', fontFamily: 'monospace' }}>{date}</span>
      </div>
      <div style={{ fontSize: '6.5px', color: '#aaa' }}>{org}</div>
      {body && <div style={{ fontSize: '6.5px', color: '#666', marginTop: '2px', lineHeight: 1.5 }}>{body}</div>}
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
const TEMPLATES = [
  { name: 'Classic',  component: ClassicTemplate,  offset: 20,  scale: 1 },
  { name: 'Modern',   component: ModernTemplate,   offset: 0,   scale: 1.05 },
  { name: 'Minimal',  component: MinimalTemplate,  offset: 30,  scale: 1 },
]

export default function CVPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.cv-template-card')
    if (!cards) return
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="templates" className="relative py-20 overflow-hidden" style={{ background: '#1a2e1a' }}>
      <div className="absolute inset-0 pointer-events-none grid-overlay-dark" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="font-mono uppercase tracking-widest text-cv-green-light mb-4" style={{ fontSize: '10px', letterSpacing: '3px' }}>
          &gt; templates_
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-16 font-serif" style={{ color: '#f5f0e8' }}>
          Three templates. One standard.
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 md:overflow-visible md:justify-center items-start">
          {TEMPLATES.map((t) => {
            const Component = t.component
            return (
              <div
                key={t.name}
                className="cv-template-card flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 opacity-0"
                style={{
                  width: '196px',
                  marginTop: `${t.offset}px`,
                  transform: t.scale > 1 ? `scale(${t.scale})` : undefined,
                }}
              >
                <Component />
                <div
                  className="px-4 py-2.5 font-mono text-xs font-bold border-t"
                  style={{ color: '#2d6a2d', borderColor: '#f0ece2', background: '#fafaf8' }}
                >
                  {t.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
