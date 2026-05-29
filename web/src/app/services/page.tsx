import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Roster, type RosterEntry } from '@/components/dossier/roster'
import { Register, RegisterRow } from '@/components/dossier/register-row'
import { FieldList } from '@/components/dossier/field-list'

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

const roles: RosterEntry[] = [
  {
    code: 'RGN·RMN·RNLD',
    role: 'Registered Nurses',
    scope: 'Wards, care homes, mental health settings, residential services and specialist environments.',
  },
  {
    code: 'SW',
    role: 'Social Workers',
    scope: "Adult services, children's services, local authority teams and wider social care settings.",
  },
  {
    code: 'OT',
    role: 'Occupational Therapists',
    scope: 'Assessments, rehabilitation, discharge planning and community-based work.',
  },
  {
    code: 'PT',
    role: 'Physiotherapists',
    scope: 'Hospital, community, rehabilitation and care-based environments.',
  },
  {
    code: 'HCA',
    role: 'Healthcare Assistants',
    scope: 'Hospital, residential, care home and community settings.',
  },
  {
    code: 'SUP',
    role: 'Support Workers',
    scope: 'Residential care, supported living, learning disability, mental health and community services.',
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
        title="Staffing matched to your service."
        intro="We supply vetted health and social care professionals to NHS trusts, local authorities, care homes, and care organisations across England. Our process is built for real operations: define the requirement properly, match to setting and risk, confirm clearly, and stay accountable after placement."
        refSegments={['HCS', 'Services']}
        stamp="On call · 24/7"
      />

      {/* Staff types */}
      <section className="bg-cream texture-ledger py-20 lg:py-28">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-baseline justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <p className="section-kicker text-ink-muted-dark mb-4">On the register</p>
              <h2
                className="font-display text-ink-dark leading-tight tracking-[-0.025em] max-w-[22ch]"
                style={{
                  fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
                  fontVariationSettings: '"opsz" 32, "wght" 560',
                }}
              >
                Urgent cover to long-term placements.
              </h2>
            </div>
            <span className="register-mono text-ink-muted-dark hidden lg:block flex-shrink-0">{roles.length} role types</span>
          </div>

          <Roster entries={roles} />
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
                Checked before they're placed.
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
              <FieldList
                entries={[
                  { label: 'Urgent', value: 'Rapid triage and realistic availability updates.' },
                  { label: 'Planned', value: 'Structured briefing and staged fulfilment support.' },
                  { label: 'Comms', value: 'Clear confirmations, constraints, and handover expectations.' },
                  { label: 'Coverage', value: 'Single shift through to ongoing placement programmes.' },
                  { label: 'Escalation', value: 'Fast re-plan options when requirements change.' },
                ]}
              />
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
                  Before proposing anyone, we look at the type of service they&rsquo;ll be working in, the specific demands of the shift — acuity level, working independently or within a team, supervision requirements — and their actual placement history in comparable environments.
                </p>
                <p>
                  We also confirm that their compliance is current and applicable to the role. If the match isn&rsquo;t strong enough, we say so and discuss realistic alternatives rather than sending someone who&rsquo;s technically available but wrong for the setting.
                </p>
              </div>
            </div>
            <div className="lg:pt-12">
              <p className="section-kicker text-ink-muted-dark mb-5">What we check before confirming</p>
              <FieldList
                entries={[
                  { label: 'Setting fit', value: 'Prior experience in the same environment type: ward, care home, supported living, community.' },
                  { label: 'Role scope', value: "That the shift demands match the worker's actual experience, not just their job title." },
                  { label: 'Compliance', value: 'DBS, right-to-work, registration and any role-specific training, current and applicable.' },
                  { label: 'Practical', value: 'Reporting lines, handover expectations and anything specific about the service.' },
                ]}
              />
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
            ].map((situation, i) => (
              <li key={situation} className="border-t border-rule-light py-5 grid grid-cols-[2.5rem_1fr] gap-x-3 items-baseline text-ink-dark text-[15px]">
                <span className="register-mono text-amber" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
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
          <Register>
            <RegisterRow code="01 · Intake" body="We take the brief: role, setting, urgency and any specific requirements." />
            <RegisterRow code="02 · Review" body="We check suitability against our current register for that environment." />
            <RegisterRow code="03 · Decision" body="We give you a clear yes or no, with timing if yes, or alternatives if no." />
            <RegisterRow code="04 · Placement" body="We confirm shift details directly with the worker: reporting point, timings, who to contact." />
            <RegisterRow code="05 · Aftercare" body="We stay reachable through the placement for changes or issues." />
          </Register>
        </div>
      </section>

      {/* Settings */}
      <section className="bg-cream-dim py-20 lg:py-28 border-t border-rule-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="section-kicker text-ink-muted-dark mb-4">Settings we support</p>
              <ul className="mt-6 border-t border-rule-light">
                {settings.map((s) => (
                  <li key={s} className="border-b border-rule-light py-3 text-ink-dark text-[15px]">
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
