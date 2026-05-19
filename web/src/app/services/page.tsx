import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'Healthcare Staffing Services | Horizon Care Services' },
  description: 'Registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers placed across England. Short-notice and planned staffing cover.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Healthcare Staffing Services | Horizon Care Services',
    description: 'Vetted health and social care professionals placed with local authorities, NHS trusts, care homes and healthcare organisations across England.',
    url: `${siteUrl}/services`,
    type: 'website',
  },
}

const roles = [
  {
    title: 'Registered Nurses',
    detail: 'RGN, RMN and RNLD professionals for wards, care homes, mental health settings, residential services and specialist environments.',
  },
  {
    title: 'Social Workers',
    detail: 'Qualified social workers for adult services, children\'s services, local authority teams and wider social care settings.',
  },
  {
    title: 'Occupational Therapists',
    detail: 'Occupational therapists for assessments, rehabilitation, discharge planning and community-based work.',
  },
  {
    title: 'Physiotherapists',
    detail: 'Physiotherapists for hospital, community, rehabilitation and care-based environments.',
  },
  {
    title: 'Healthcare Assistants',
    detail: 'Experienced HCAs for hospital, residential, care home and community settings.',
  },
  {
    title: 'Support Workers',
    detail: 'Support workers for residential care, supported living, learning disability, mental health and community services.',
  },
]

const settings = [
  'NHS hospital wards and departments',
  'Local authority social care teams',
  'Mental health services',
  'Learning disability services',
  'Care homes and residential settings',
  'Supported living providers',
  'Community and domiciliary care organisations',
  'Private hospitals and clinics',
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
        title="Staffing support designed around your service realities."
        intro="We supply vetted health and social care professionals to NHS trusts, local authorities, care homes, and care organisations across England. Our process is built for real operations: define the requirement properly, match to setting and risk, confirm clearly, and stay accountable after placement."
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
            Clinical and non-clinical roles for urgent cover, planned rotas, and longer-term continuity.
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
              <p className="section-kicker text-ink-muted-dark mb-5">Compliance and vetting</p>
              <p
                className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                style={{
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  fontVariationSettings: '"opsz" 28, "wght" 560',
                }}
              >
                A practical process for safe, workable placements.
              </p>
              <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                <p>
                  Every professional on our register is checked before placement. We review requirements against role scope, setting demands, and practical shift conditions so clients are not left with avoidable mismatches.
                </p>
                <p>
                  Depending on role type, checks may include identity, right to work, DBS status, references, training evidence, and where relevant professional registration checks. We also confirm practical details that affect shift success: arrival expectations, reporting lines, and handover context.
                </p>
                <p>
                  If a brief is unclear, we challenge it early. That upfront clarity reduces rebooking loops, improves continuity, and gives managers fewer surprises during handover.
                </p>
              </div>
            </div>

            <div className="lg:pt-10">
              <p className="section-kicker text-ink-muted-dark mb-5">Response times</p>
              <div className="space-y-5">
                {[
                  { label: 'Urgent cover', value: 'Rapid triage and realistic availability updates.' },
                  { label: 'Planned requirements', value: 'Structured briefing and staged fulfilment support.' },
                  { label: 'Communication', value: 'Clear confirmations, constraints, and handover expectations.' },
                  { label: 'Coverage model', value: 'Single shift through to ongoing placement programmes.' },
                  { label: 'Escalation support', value: 'Fast re-plan options when requirements change.' },
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
      <section className="bg-cream py-20 lg:py-28 border-t border-rule-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-kicker text-ink-muted-dark mb-5">When organisations call us</p>
          <h2
            className="font-display text-ink-dark leading-tight tracking-[-0.025em] mb-10 max-w-[28ch]"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
              fontVariationSettings: '"opsz" 28, "wght" 560',
            }}
          >
            Staffing pressures we can help you manage.
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
                Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Manchester, and London.
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
