import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { BackToTop } from '@/components/back-to-top'
import { HeroSection } from '@/components/hero/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { AboutSection } from '@/components/sections/about-section'
import { HowItWorks } from '@/components/sections/how-it-works'
import { AreaSection } from '@/components/sections/area-section'
import { DualCTA } from '@/components/sections/dual-cta'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <HowItWorks />
        <AreaSection />
        <DualCTA />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
