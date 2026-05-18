import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'Healthcare Staffing — Horizon Care Services' },
  description: 'Registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers placed across England. Available 24/7 at short notice or on longer-term contracts.',
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Healthcare Staffing — Horizon Care Services',
    description: 'Vetted healthcare professionals placed with NHS trusts, local authorities, and care organisations across England. Available 24/7.',
    url: `${siteUrl}/services`,
    type: 'website',
  },
}

const roles = [
  {
    title: 'Registered Nurses',
    detail: 'RGN, RMN, RNLD. Ward cover, community nursing, and specialist settings.',
  },
  {
    title: 'Social Workers',
    detail: 'Qualified social workers with experience across adult and children\'s services.',
  },
  {
    title: 'Occupational Therapists',
    detail: 'Assessment, rehabilitation, and discharge planning support.',
  },
  {
    title: 'Physiotherapists',
    detail: 'Community and hospital-based physiotherapy provision.',
  },
  {
    title: 'Healthcare Assistants',
    detail: 'Experienced HCAs across ward, residential, and home environments.',
  },
  {
    title: 'Support Workers',
    detail: 'Trained support workers for residential, community, and domiciliary settings.',
  },
]

const settings = [
  'NHS hospital wards and departments',
  'Mental health units',
  'Learning disability services',
  'Care homes and residential settings',
  'Community and domiciliary care',
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
        title="Healthcare professionals placed across England."
        intro="We supply registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers to NHS trusts, local authorities, and care organisations. Available at short notice or on longer-term contracts — 24 hours a day."
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
            Clinical and non-clinical roles, all vetted.
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
                The person who walks through the door is someone we'd put our name to.
              </p>
              <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                <p>
                  Every professional on our register has been DBS checked, reference verified, and assessed for the settings they are placed in. We confirm NMC registration for nurses, SWE for social workers, and HCPC for allied health professionals before any placement goes ahead.
                </p>
                <p>
                  We don&rsquo;t operate a revolving door of unvetted temps. When we commit to a placement, the professional we send is someone we know, assessed against the environment they are going into.
                </p>
              </div>
            </div>

            <div className="lg:pt-10">
              <p className="section-kicker text-ink-muted-dark mb-5">Response times</p>
              <div className="space-y-5">
                {[
                  { label: 'Urgent cover', value: 'Same-day and next-day placements available.' },
                  { label: 'Planned requirements', value: 'Availability confirmed within 2 working days.' },
                  { label: 'Urgent response', value: 'Within 2 working hours for urgent requests.' },
                  { label: 'Availability', value: '24 hours a day, 7 days a week.' },
                  { label: 'Contract length', value: 'Single shift through to long-term placement.' },
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

      {/* Settings */}
      <section className="bg-cream py-20 lg:py-28 border-t border-rule-light">
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
                Contact us if you need cover outside these areas. We work across England and regularly extend into new locations.
              </p>
              <Link
                href="/referrals"
                className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
              >
                Submit a staffing request <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
