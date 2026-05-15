import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { AboutSection } from '@/components/sections/about-section'
import { HowItWorks } from '@/components/sections/how-it-works'
import { AreaSection } from '@/components/sections/area-section'
import { DualCTA } from '@/components/sections/dual-cta'
import { FaqSection } from '@/components/sections/faq-section'

const siteUrl = 'https://www.horizoncareservices.org'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Horizon Care Services provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Horizon Care Services provides three core services: home care (personal care, companionship, medication management, meal preparation, housekeeping, and respite support); healthcare staffing (registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers); and specialist care for people living with dementia and those with life-limiting conditions including hospice and end-of-life care.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas does Horizon Care Services cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Horizon Care Services operates across Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Greater Manchester, and London. Contact us if you are outside these areas — we can often extend coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Horizon Care Services CQC registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Horizon Care Services Ltd is registered with and regulated by the Care Quality Commission (CQC) in England. Our services are provided in accordance with the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014. Company number 14615041.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I arrange home care from Horizon Care Services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can arrange home care by calling 020 3757 2767 (Monday to Friday, 9am–5pm), messaging via WhatsApp at the same number, or emailing contact@horizoncareservices.org. We respond within 2 working days to discuss requirements and confirm next steps.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can Horizon Care Services provide healthcare staff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For urgent requirements, we can often respond the same day. For planned placements, we confirm availability within 2 working days. Staffing is available 24/7 for NHS trusts, local authorities, care homes, and other care organisations across England.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Horizon Care Services work with NHS trusts and local authorities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with NHS trusts, local authorities, private care homes, and commissioning teams across England. We are transparent about capacity, rates, and compliance from the first conversation. Call 020 3757 2767 or email contact@horizoncareservices.org to discuss a commissioning requirement.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of healthcare professionals does Horizon Care Services place?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We place registered nurses (RGN, RMN, RNLD), social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers in ward, community, residential, and domiciliary settings across England.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <HowItWorks />
        <AreaSection />
        <FaqSection />
        <DualCTA />
      </main>
      <Footer />
    </>
  )
}
