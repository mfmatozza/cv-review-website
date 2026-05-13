import Link from 'next/link'

export default function CTAFooter() {
  return (
    <footer id="cta" className="py-24 bg-cv-dark">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-mono font-black text-3xl md:text-4xl mb-4 text-cv-text-light">
          &gt; ready_to_build
          <span className="inline-block w-0.5 h-8 ml-1 align-bottom bg-cv-text-light animate-blink" />
        </h2>
        <p className="font-mono text-sm mb-10 text-cv-muted">
          Your next opportunity is one PDF away.
        </p>
        <Link
          href="/onboarding"
          className="inline-block font-mono font-bold text-base px-8 py-4 rounded-md bg-cv-green text-cv-cream hover:bg-cv-green-mid transition-colors"
        >
          Build my CV — it&apos;s free →
        </Link>
        <div
          className="flex justify-center gap-8 mt-16 font-mono text-xs"
          style={{ color: 'rgba(200,230,200,0.25)' }}
        >
          <Link href="/privacy" className="hover:text-cv-green-light transition-colors">Privacy</Link>
          <Link href="/terms"   className="hover:text-cv-green-light transition-colors">Terms</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer"
             className="hover:text-cv-green-light transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
