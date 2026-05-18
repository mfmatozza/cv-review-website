type Props = { current: number; total: number }

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-cv-cream-dark">
        <div
          className="h-full bg-cv-green transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="absolute right-4 top-2 font-mono text-xs text-cv-subtle">
        {current} / {total}
      </div>
    </div>
  )
}
