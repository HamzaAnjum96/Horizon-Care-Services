import type { Metadata } from 'next'
import { HeroSection } from '@/components/hero/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { AboutSection } from '@/components/sections/about-section'
import { HowItWorks } from '@/components/sections/how-it-works'
import { AreaSection } from '@/components/sections/area-section'
import { DualCTA } from '@/components/sections/dual-cta'
import { FaqSection } from '@/components/sections/faq-section'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of healthcare professionals does Horizon Care Services place?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Registered nurses (RGN, RMN, RNLD), social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers. We cover clinical and non-clinical roles across hospital, community, residential, and domiciliary settings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can Horizon Care Services provide cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For urgent requests, we aim to respond within 2 working hours and can often provide same-day cover. For planned requirements, we confirm availability within 2 working days. We operate 24 hours a day, 7 days a week.',
      },
    },
    {
      '@type': 'Question',
      name: 'What vetting and compliance checks do Horizon Care Services staff hold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every professional on our register has been DBS checked, reference verified, and assessed for the environments they are placed in. We confirm NMC registration for nurses, SWE for social workers, and HCPC for allied health professionals before any placement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which settings does Horizon Care Services work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NHS hospital wards and departments, mental health units, learning disability services, care homes, community and domiciliary settings, and private hospitals. If you are outside our listed areas, contact us — we work across England.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas does Horizon Care Services cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Greater Manchester, and London. We regularly extend beyond these areas — contact us if you are elsewhere in England.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Horizon Care Services work with NHS trusts and local authorities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with NHS trusts, local authorities, private care organisations, and commissioning teams across England. We are transparent about capacity, rates, and compliance from the first conversation. Call 020 3757 2767 or email contact@horizoncareservices.org.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <HowItWorks />
      <AreaSection />
      <FaqSection />
      <DualCTA />
    </>
  )
}
