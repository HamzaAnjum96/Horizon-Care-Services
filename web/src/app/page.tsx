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
  description: 'Horizon Care Services supplies vetted health and social care professionals to local authorities, NHS trusts, care homes and care organisations across England. Request short-notice or planned staffing cover.',
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
        text: 'We place registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants and support workers across health and social care settings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who does Horizon Care Services work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with local authorities, NHS trusts, care homes, residential services, supported living providers, private hospitals, clinics and healthcare organisations.',
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
        text: 'Checks depend on the role and setting, but may include DBS checks, right-to-work confirmation, references, identity checks, training evidence and professional registration checks with NMC, Social Work England or HCPC where relevant.',
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
