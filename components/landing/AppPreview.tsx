type Token = { text: string; color: string }
type Line = Token[]

const LINES: Line[] = [
  [{ text: '\\documentclass', color: '#7dd3a8' }, { text: '{article}', color: '#fbbf24' }],
  [{ text: '\\usepackage', color: '#7dd3a8' }, { text: '{geometry}', color: '#fbbf24' }],
  [],
  [{ text: '\\begin', color: '#7dd3a8' }, { text: '{document}', color: '#fbbf24' }],
  [],
  [{ text: '  \\name', color: '#7dd3a8' }, { text: '{James Harrington}', color: '#fff8e7' }],
  [{ text: '  \\role', color: '#7dd3a8' }, { text: '{Software Engineer}', color: '#fff8e7' }],
  [],
  [{ text: '  \\section', color: '#7dd3a8' }, { text: '{Experience}', color: '#fbbf24' }],
  [],
  [{ text: '  \\entry', color: '#7dd3a8' }, { text: '{Senior Engineer}', color: '#fff8e7' }],
  [{ text: '    {Acme Corp}', color: '#fff8e7' }, { text: '  {2022--now}', color: '#5a8a5a' }],
  [{ text: '  % Led platform migration', color: '#4a7c4a' }],
  [{ text: '  % Reduced latency by 40\\%', color: '#4a7c4a' }],
  [],
  [{ text: '  \\section', color: '#7dd3a8' }, { text: '{Education}', color: '#fbbf24' }],
  [{ text: '  \\entry', color: '#7dd3a8' }, { text: '{BSc Computer Science}', color: '#fff8e7' }],
  [{ text: '    {Univ. of Edinburgh}', color: '#fff8e7' }, { text: ' {2016-20}', color: '#5a8a5a' }],
  [],
  [{ text: '\\end', color: '#7dd3a8' }, { text: '{document}', color: '#fbbf24' }],
]

function LaTeXEditor() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Line numbers */}
      <div className="pr-3 select-none" style={{ color: 'rgba(255,255,255,0.2)', minWidth: '24px' }}>
        {LINES.map((_, i) => (
          <div key={i} style={{ lineHeight: '1.7', fontSize: '9px', fontFamily: 'monospace' }}>
            {i + 1}
          </div>
        ))}
      </div>
      {/* Code */}
      <div className="flex-1 overflow-hidden">
        {LINES.map((line, i) => (
          <div key={i} style={{ lineHeight: '1.7', fontSize: '9px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
            {line.length === 0 ? ' ' : line.map((tok, j) => (
              <span key={j} style={{ color: tok.color }}>{tok.text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfilePhoto() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8956c" />
          <stop offset="100%" stopColor="#a0714f" />
        </linearGradient>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a882" />
          <stop offset="100%" stopColor="#b8895a" />
        </linearGradient>
        <clipPath id="circle">
          <circle cx="24" cy="24" r="24" />
        </clipPath>
      </defs>
      <rect width="48" height="48" fill="url(#bgGrad)" />
      {/* Hair */}
      <ellipse cx="24" cy="15" rx="9" ry="9" fill="#3d2b1f" />
      <rect x="15" y="15" width="18" height="6" fill="#3d2b1f" />
      {/* Face */}
      <ellipse cx="24" cy="19" rx="7.5" ry="8.5" fill="url(#skinGrad)" />
      {/* Shirt/collar */}
      <path d="M10 48 Q10 32 24 32 Q38 32 38 48 Z" fill="#2d5a8e" />
      <path d="M20 32 L24 38 L28 32" fill="#f5f5f5" />
    </svg>
  )
}

function MiniCV() {
  return (
    <div className="h-full font-serif overflow-hidden" style={{ fontSize: '8px' }}>
      {/* Header */}
      <div className="flex gap-2.5 items-start pb-2.5 mb-2.5" style={{ borderBottom: '1px solid #f0ece2' }}>
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
          <ProfilePhoto />
        </div>
        <div className="pt-0.5">
          <div className="font-mono font-bold tracking-wide text-cv-forest" style={{ fontSize: '9px' }}>
            JAMES HARRINGTON
          </div>
          <div className="font-mono text-cv-green mt-0.5" style={{ fontSize: '8px' }}>
            Software Engineer
          </div>
          <div className="font-mono mt-0.5" style={{ fontSize: '7px', color: '#999' }}>
            london · github.com/jharr · linkedin
          </div>
        </div>
      </div>

      {/* Experience */}
      <Section>Experience</Section>
      <Entry title="Senior Engineer" org="Acme Corp" date="2022–present" body="Led platform migration, reduced latency by 40%." />
      <Entry title="Software Engineer" org="StartupCo" date="2020–2022" body="Built core API serving 2M+ req/day." />

      {/* Education */}
      <Section>Education</Section>
      <Entry title="BSc Computer Science" org="University of Edinburgh" date="2016–2020" />

      {/* Skills */}
      <Section>Skills</Section>
      <div className="flex flex-wrap gap-1 mt-1">
        {['TypeScript', 'React', 'Rust', 'LaTeX', 'AWS'].map((s) => (
          <span
            key={s}
            className="font-mono text-cv-green rounded px-1.5 py-0.5"
            style={{ fontSize: '7px', background: 'rgba(45,106,45,0.1)' }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono font-bold uppercase tracking-widest text-cv-green mt-2 mb-1 pb-0.5"
      style={{ fontSize: '7px', borderBottom: '1px solid rgba(45,106,45,0.2)' }}
    >
      {children}
    </div>
  )
}

function Entry({ title, org, date, body }: { title: string; org: string; date: string; body?: string }) {
  return (
    <div className="mb-1.5">
      <div className="font-mono font-bold text-cv-forest" style={{ fontSize: '9px' }}>{title}</div>
      <div className="font-mono flex justify-between" style={{ fontSize: '8px', color: '#888' }}>
        <span>{org}</span><span>{date}</span>
      </div>
      {body && <div className="mt-0.5 leading-relaxed" style={{ fontSize: '8px', color: '#aaa' }}>{body}</div>}
    </div>
  )
}

export default function AppPreview() {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(0,0,0,0.12)' }}>
      {/* Window chrome */}
      <div className="h-7 flex items-center px-3 gap-1.5" style={{ background: '#e2ddd4' }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-2 font-mono" style={{ fontSize: '10px', color: '#888' }}>cv_builder — harrington.tex</span>
      </div>

      <div className="flex" style={{ height: '370px' }}>
        {/* LaTeX editor */}
        <div className="flex flex-col overflow-hidden" style={{ width: '50%', background: '#0d1a0d' }}>
          <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span
              className="font-mono px-3 py-1.5"
              style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', borderBottom: '1px solid #2d6a2d', background: 'rgba(45,106,45,0.12)' }}
            >
              harrington.tex
            </span>
          </div>
          <div className="flex-1 overflow-hidden p-3">
            <LaTeXEditor />
          </div>
        </div>

        {/* CV preview */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="px-3 py-1.5" style={{ borderBottom: '1px solid #f0ece2' }}>
            <span className="font-mono" style={{ fontSize: '10px', color: '#bbb' }}>preview</span>
          </div>
          <div className="flex-1 overflow-hidden p-3">
            <MiniCV />
          </div>
        </div>
      </div>
    </div>
  )
}
