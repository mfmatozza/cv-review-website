'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-cv-cream transition-shadow duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{ borderBottom: '1px solid rgba(45,74,45,0.12)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-sm font-black text-cv-forest">
          cv<span className="text-cv-green">_</span>builder
        </span>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs text-cv-muted">
          <Link href="#features" className="hover:text-cv-green transition-colors">Features</Link>
          <Link href="#templates" className="hover:text-cv-green transition-colors">Templates</Link>
          <Link href="#pricing" className="hover:text-cv-green transition-colors">Pricing</Link>
        </div>

        <Link
          href="/onboarding"
          className="font-mono text-xs font-bold px-4 py-2 rounded bg-cv-green text-cv-cream hover:bg-cv-green-mid transition-colors"
        >
          Sign in →
        </Link>
      </div>
    </nav>
  )
}
