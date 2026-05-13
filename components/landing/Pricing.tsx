import Link from 'next/link'

const FREE_FEATURES = [
  'Unlimited CVs',
  '1 LaTeX template',
  'LinkedIn import',
  'Photo upload',
  'PDF export',
]

const PRO_FEATURES = [
  'Everything in Free',
  'All LaTeX templates',
  'Custom sections',
  'Priority support',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-cv-cream">
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="font-mono uppercase tracking-widest text-cv-green mb-4"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          &gt; pricing_
        </div>
        <h2 className="text-3xl font-black mb-12 font-serif text-cv-forest">
          Simple, honest pricing.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <PricingCard
            tier="Free"
            price="$0"
            per="forever"
            features={FREE_FEATURES}
            cta="Get started"
            href="/onboarding"
            isPro={false}
          />
          <PricingCard
            tier="Pro"
            price="$9"
            per="per month"
            features={PRO_FEATURES}
            cta="Go Pro →"
            href="/onboarding?plan=pro"
            isPro
          />
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  tier, price, per, features, cta, href, isPro,
}: {
  tier: string; price: string; per: string
  features: string[]; cta: string; href: string; isPro: boolean
}) {
  return (
    <div
      className="rounded-xl p-6 border"
      style={{
        background:  isPro ? '#2d6a2d' : '#ffffff',
        borderColor: isPro ? '#2d6a2d' : 'rgba(45,74,45,0.15)',
      }}
    >
      <div
        className="font-mono text-xs uppercase tracking-widest mb-2"
        style={{ color: isPro ? 'rgba(200,230,200,0.7)' : '#7a9a7a' }}
      >
        {tier}
      </div>
      <div
        className="font-mono font-black text-4xl mb-0.5"
        style={{ color: isPro ? '#c8e6c8' : '#1a3320' }}
      >
        {price}
      </div>
      <div
        className="font-mono text-xs mb-6"
        style={{ color: isPro ? 'rgba(200,230,200,0.5)' : '#8a9a8a' }}
      >
        {per}
      </div>

      <ul className="mb-6 space-y-2">
        {features.map((f) => (
          <li
            key={f}
            className="text-sm flex items-center gap-2"
            style={{ color: isPro ? 'rgba(200,230,200,0.85)' : '#5a7a5a' }}
          >
            <span style={{ color: isPro ? '#c8e6c8' : '#2d6a2d' }}>→</span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="block text-center font-mono font-bold text-sm py-2.5 rounded-md transition-opacity hover:opacity-90"
        style={{
          background: isPro ? '#f5f0e8' : 'transparent',
          color:      '#2d6a2d',
          border:     isPro ? 'none' : '1px solid rgba(45,106,45,0.25)',
        }}
      >
        {cta}
      </Link>
    </div>
  )
}
