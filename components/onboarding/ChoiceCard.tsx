type Props = {
  label: string
  description: string
  onClick: () => void
}

export default function ChoiceCard({ label, description, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex-1 text-left p-6 rounded-xl border-2 bg-white hover:bg-cv-green/5 transition-all duration-200 group"
      style={{ borderColor: 'rgba(45,106,45,0.2)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#2d6a2d')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(45,106,45,0.2)')}
    >
      <div className="font-serif font-black text-cv-forest text-xl mb-2 group-hover:text-cv-green transition-colors">
        {label}
      </div>
      <div className="font-mono text-sm text-cv-subtle">
        {description}
      </div>
    </button>
  )
}
