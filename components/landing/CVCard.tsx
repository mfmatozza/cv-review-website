export default function CVCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-2xl font-serif">
      <div className="h-1 bg-cv-green" />
      <div className="p-4">

        <div className="flex gap-3 items-start pb-3 mb-3 border-b border-gray-100">
          <div
            className="w-9 h-9 rounded-full flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2d6a2d, #4a9a4a)' }}
          />
          <div>
            <div className="font-mono font-bold tracking-wide text-cv-forest" style={{ fontSize: '9px' }}>
              JAMES HARRINGTON
            </div>
            <div className="font-mono text-cv-green mt-0.5" style={{ fontSize: '8px' }}>
              Software Engineer
            </div>
            <div className="font-mono text-gray-400 mt-0.5" style={{ fontSize: '7px' }}>
              london · github · linkedin
            </div>
          </div>
        </div>

        <CVSection>Experience</CVSection>
        <CVEntry title="Senior Engineer"     org="Acme Corp"               date="2022–present" body="Led platform migration, reduced latency by 40%." />
        <CVEntry title="Software Engineer"   org="StartupCo"               date="2020–2022"    body="Built core API serving 2M+ requests/day." />

        <CVSection>Education</CVSection>
        <CVEntry title="BSc Computer Science" org="University of Edinburgh" date="2016–2020" />

        <CVSection>Skills</CVSection>
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
    </div>
  )
}

function CVSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono font-bold uppercase tracking-widest text-cv-green mt-2 mb-1 pb-0.5"
      style={{ fontSize: '7px', borderBottom: '1px solid rgba(45,106,45,0.2)' }}
    >
      {children}
    </div>
  )
}

function CVEntry({
  title, org, date, body,
}: {
  title: string; org: string; date: string; body?: string
}) {
  return (
    <div className="mb-1.5">
      <div className="font-mono font-bold text-cv-forest" style={{ fontSize: '9px' }}>{title}</div>
      <div className="font-mono flex justify-between text-cv-muted" style={{ fontSize: '8px' }}>
        <span>{org}</span><span>{date}</span>
      </div>
      {body && (
        <div className="mt-0.5 leading-relaxed text-gray-500" style={{ fontSize: '8px' }}>{body}</div>
      )}
    </div>
  )
}
