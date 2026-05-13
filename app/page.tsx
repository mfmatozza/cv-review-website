import Nav            from '@/components/landing/Nav'
import Hero           from '@/components/landing/Hero'
import ProblemSolution from '@/components/landing/ProblemSolution'
import HowItWorks     from '@/components/landing/HowItWorks'
import CVPreview      from '@/components/landing/CVPreview'
import Pricing        from '@/components/landing/Pricing'
import FAQ            from '@/components/landing/FAQ'
import CTAFooter      from '@/components/landing/CTAFooter'

export default function LandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <CVPreview />
      <Pricing />
      <FAQ />
      <CTAFooter />
    </main>
  )
}
