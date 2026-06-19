import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'Healthcare Staffing Services | Horizon Care Services' },
  description: 'Registered nurses, senior healthcare assistants, healthcare assistants and support workers placed across England. Short-notice and planned staffing cover.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Healthcare Staffing Services | Horizon Care Services',
    description: 'Trained, qualified and experienced healthcare professionals placed with NHS trusts, nursing homes, residential care homes and supported living services across England.',
    url: `${siteUrl}/services`,
    type: 'website',
    images: [{ url: '/brand/hcs-og-card.png', width: 1200, height: 630, alt: 'Horizon Care Services — healthcare staffing across England' }],
  },
}

const roles = [
  {
    title: 'Registered Nurses',
    detail: 'Experienced RGN, RMN and RNLD professionals available for NHS trusts, nursing homes, supported living services, mental health settings and specialist care environments.',
  },
  {
    title: 'Senior Healthcare Assistants',
    detail: 'Experienced Senior HCAs for residential care homes, supported living services and specialist care settings. Capable of leading shifts, supervising care staff, coordinating care delivery and supporting the smooth day-to-day operation of services.',
  },
  {
    title: 'Healthcare Assistants',
    detail: 'Experienced HCAs for nursing homes, residential care homes, supported living services and specialist care settings, delivering compassionate, person-centred care and support.',
  },
  {
    title: 'Support Workers',
    detail: 'Experienced Support Workers for residential care homes, supported living services, learning disability services, mental health settings and community-based care services.',
  },
]

const settings = [
  'NHS trusts',
  'Nursing homes',
  'Residential care homes',
  'Supported living services',
  'Mental health settings',
  'Learning disability services',
  'Specialist care settings',
  'Community-based care services',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        kicker="What we provide"
        title="Staffing matched to your service."
        intro="We supply trained, qualified and experienced healthcare professionals to NHS trusts, nursing homes, residential care homes and supported living services across England. Our process is built for real operations: define the requirement properly, match to setting and risk, confirm clearly, and stay accountable after placement."
      />

      {/* Staff types */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-kicker text-ink-muted-dark mb-4">Staff we place</p>
          <h2
            className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-12 lg:mb-16 max-w-[22ch]"
            style={{
              fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
              fontVariationSettings: '"opsz" 32, "wght" 560',
            }}
          >
            Urgent cover to long-term placements.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
            {roles.map((role, i) => (
              <div key={role.title} className={`border-t border-rule-light py-7 ${i >= 3 ? '' : ''}`}>
                <h3
                  className="font-display text-ink-dark mb-2 leading-snug tracking-[-0.015em]"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  {role.title}
                </h3>
                <p className="text-ink-muted-dark text-[14px] leading-relaxed">{role.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we vet */}
      <section className="bg-cream-dim border-t border-rule-light py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24">
            <div>
              <p className="section-kicker text-ink-muted-dark mb-5">Compliance and screening</p>
              <p
                className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                style={{
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  fontVariationSettings: '"opsz" 28, "wght" 560',
                }}
              >
                Checked before placement.
              </p>
              <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                <p>
                  Every professional on our register is thoroughly checked before placement. We assess each requirement against the role, service setting and practical shift requirements to help ensure the right fit and reduce avoidable staffing mismatches.
                </p>
                <p>
                  Depending on the role, checks may include identity verification, right-to-work checks, DBS status, references, training records and, where applicable, professional registration verification. We also confirm practical details that support a successful placement, including reporting arrangements, arrival expectations and handover requirements.
                </p>
                <p>
                  If a staffing brief is unclear, we address this at the outset. Taking the time to establish clear requirements helps improve continuity of care, reduces unnecessary rebooking and gives managers greater confidence in the staff provided.
                </p>
              </div>
            </div>

            <div className="lg:pt-10">
              <p className="section-kicker text-ink-muted-dark mb-5">Response times</p>
              <div className="space-y-5">
                {[
                  { label: 'Urgent cover', value: 'Rapid assessment and realistic availability updates.' },
                  { label: 'Planned requirements', value: 'Structured workforce planning and staged fulfilment support.' },
                  { label: 'Communication', value: 'Clear confirmations, transparent updates and defined handover expectations.' },
                  { label: 'Coverage model', value: 'Flexible staffing solutions ranging from single shifts to ongoing placement programmes.' },
                  { label: 'Escalation support', value: 'Responsive contingency planning and alternative staffing options when requirements change.' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">{label}</p>
                    <p className="text-ink-dark text-[14px] leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we decide fit */}
      <section className="bg-cream py-20 lg:py-28 border-t border-rule-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24">
            <div>
              <p className="section-kicker text-ink-muted-dark mb-5">How we decide who to put forward</p>
              <p
                className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                style={{
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  fontVariationSettings: '"opsz" 28, "wght" 560',
                }}
              >
                Availability alone isn&rsquo;t a match.
              </p>
              <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                <p>
                  Before proposing a worker, we assess the type of service they will be supporting, the specific demands of the shift and their experience in comparable care environments. This includes factors such as the level of care required, whether they will be working independently or as part of a team, and any supervision or leadership responsibilities.
                </p>
                <p>
                  We also confirm that all compliance requirements are current and appropriate for the role. If we do not believe a worker is a suitable match, we will say so and discuss realistic alternatives rather than supplying someone who is simply available but not right for the setting.
                </p>
              </div>
            </div>
            <div className="lg:pt-12">
              <p className="section-kicker text-ink-muted-dark mb-5">What we check before confirming</p>
              <div className="space-y-5">
                {[
                  { label: 'Setting fit', value: 'Previous experience in similar environments, including nursing homes, residential care homes, supported living services, NHS settings and specialist care services.' },
                  { label: 'Role suitability', value: 'We ensure the responsibilities of the shift align with the worker\'s skills, qualifications and practical experience, not just their job title.' },
                  { label: 'Compliance', value: 'DBS status, right-to-work verification, professional registration (where applicable) and any role-specific training requirements.' },
                  { label: 'Practical details', value: 'Reporting arrangements, handover requirements, key contacts and any service-specific information needed to support a successful placement.' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">{label}</p>
                    <p className="text-ink-dark text-[14px] leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common situations */}
      <section className="bg-cream-dim py-20 lg:py-28 border-t border-rule-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-kicker text-ink-muted-dark mb-5">When organisations call us</p>
          <h2
            className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-10 max-w-[28ch]"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
              fontVariationSettings: '"opsz" 28, "wght" 560',
            }}
          >
            Common staffing pressures.
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
            {[
              'Urgent sickness cover',
              'Planned absence',
              'Recurring rota gaps',
              'Short-term workforce pressure',
              'Longer-term placements',
              'Specialist role requirements',
              'Weekend and bank holiday cover',
              'Hard-to-fill rota positions',
              'Temporary service expansion',
            ].map((situation) => (
              <li key={situation} className="border-t border-rule-light py-5 flex items-start gap-3 text-ink-muted-dark text-[15px]">
                <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                {situation}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What happens after you contact us */}
      <section className="bg-cream py-20 lg:py-28 border-t border-rule-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-kicker text-ink-muted-dark mb-5">What happens next</p>
          <h2
            className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-12 max-w-[28ch]"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
              fontVariationSettings: '"opsz" 28, "wght" 560',
            }}
          >
            What to expect.
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-0 list-none">
            {[
              { n: '01', text: 'We take the brief — role, setting, urgency and any specific requirements.' },
              { n: '02', text: 'We check suitability against our current register for that environment.' },
              { n: '03', text: 'We give you a clear yes or no, with timing if yes, or alternatives if no.' },
              { n: '04', text: 'We confirm shift details directly with the worker — reporting point, timings, who to contact.' },
              { n: '05', text: 'We stay reachable through the placement for changes or issues.' },
            ].map(({ n, text }) => (
              <li key={n} className="border-t border-rule-light pt-6 pb-8">
                <p
                  className="font-display text-amber mb-3 leading-none"
                  style={{
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    fontVariationSettings: '"opsz" 28, "wght" 520',
                  }}
                >
                  {n}
                </p>
                <p className="text-ink-muted-dark text-[14px] leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Settings */}
      <section className="bg-cream-dim py-20 lg:py-28 border-t border-rule-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="section-kicker text-ink-muted-dark mb-4">Settings we support</p>
              <ul className="space-y-3 mt-6">
                {settings.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-ink-muted-dark text-[15px]">
                    <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-kicker text-ink-muted-dark mb-4">Where we work</p>
              <p
                className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-6"
                style={{
                  fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                  fontVariationSettings: '"opsz" 28, "wght" 560',
                }}
              >
                Bedfordshire, Greater Manchester, Merseyside, Lancashire, and Yorkshire.
              </p>
              <p className="text-ink-muted-dark text-[15px] leading-relaxed mb-8">
                If your organisation is outside these areas, contact us with the role, setting and urgency. We will confirm whether we can support the requirement safely.
              </p>
              <Link
                href="/contact"
                className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
              >
                Request staffing support <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
