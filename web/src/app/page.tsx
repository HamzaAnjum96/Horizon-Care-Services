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
  title: { absolute: 'Healthcare Staffing Agency for Care Organisations | Horizon Care Services' },
  description: 'Horizon Care Services supplies registered nurses, senior healthcare assistants, healthcare assistants and support workers to NHS trusts, nursing homes, residential care homes and supported living services across England. Request short-notice or planned staffing cover.',
  alternates: { canonical: siteUrl },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of staff does Horizon Care Services provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We supply registered nurses, senior healthcare assistants, healthcare assistants and support workers across nursing homes, residential care homes, supported living services and NHS settings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who does Horizon Care Services work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with NHS trusts, nursing homes, residential care homes, supported living services and specialist care settings across England.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Horizon Care Services provide urgent cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We support urgent and short-notice staffing requirements where suitable professionals are available. For urgent cover, we aim to respond within 2 working hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Horizon Care Services support longer-term contracts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We can support single shifts, block bookings, planned absence, rota gaps and longer-term placements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What checks do Horizon Care Services staff have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Checks depend on the role and setting, but may include identity verification, right-to-work checks, DBS status, references, training records and, where applicable, professional registration verification with the NMC.',
      },
    },
    {
      '@type': 'Question',
      name: 'What information should we send when requesting staff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Send the role, setting, location, shift pattern, urgency, required qualifications, and any compliance or reporting requirements. If the need is urgent, call us and we will work through the detail quickly.',
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
