import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { FieldList } from '@/components/dossier/field-list'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'Work For Us — Horizon Care Services' },
  description: 'Join Horizon Care Services as a registered nurse, social worker, occupational therapist, healthcare assistant, or support worker. Flexible hours, competitive rates across England.',
  alternates: { canonical: `${siteUrl}/work-for-us` },
  openGraph: {
    title: 'Work For Us — Horizon Care Services',
    description: 'Healthcare and social care jobs with flexible hours, competitive rates, and a genuine commitment to high-quality care across England.',
    url: `${siteUrl}/work-for-us`,
    type: 'website',
  },
}

const roles = [
  {
    code: 'HCS-SPW-062',
    title: 'Support Worker',
    location: 'North West (Various)',
    note: 'Trained support workers for residential, community, and domiciliary settings.',
  },
  {
    code: 'HCS-CV-000',
    title: 'Speculative CV',
    location: 'North West (Various)',
    note: "Don't see your role listed? Send your CV and we'll be in touch if a suitable position arises.",
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Work For Us', item: `${siteUrl}/work-for-us` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Support Worker',
    description: 'Trained support workers for residential, community, and domiciliary settings across England. Flexible shifts around your availability, paid competitively and on time.',
    identifier: { '@type': 'PropertyValue', name: 'HCS', value: 'HCS-SPW-062' },
    datePosted: '2026-05-13',
    validThrough: '2027-05-13',
    employmentType: ['CONTRACTOR', 'FULL_TIME', 'PART_TIME'],
    hiringOrganization: { '@id': `${siteUrl}/#organization` },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'GB', addressRegion: 'North West England' } },
    applicantLocationRequirements: { '@type': 'Country', name: 'United Kingdom' },
    url: `${siteUrl}/work-for-us`,
  },
]

function applyHref(code: string, title: string) {
  const params = new URLSearchParams({ code, title })
  return `/work-for-us/apply?${params.toString()}`
}

const speculativeMailto = `mailto:careers@horizoncareservices.org?subject=${encodeURIComponent('Application — HCS-CV-000 · Speculative CV')}&body=${encodeURIComponent('Dear Horizon Care Services,\n\nPlease find attached my CV for your consideration.\n\nI am interested in flexible agency work and would welcome the opportunity to discuss my experience, availability and preferred locations.\n\nKind regards,\n[Your name]')}`

export default function WorkForUsPage() {
  return (
    <>
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <PageHeader
          kicker="Work for us"
          title="Agency work done properly."
          intro="We recruit skilled health and social care professionals for flexible agency work across England. We focus on better matching, clearer briefing, and dependable coordination so your shifts are safer, smoother, and worth saying yes to."
          refSegments={['HCS', 'Careers']}
          stamp="Now on the register"
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-5">Why Horizon</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 28, "wght" 560',
                  }}
                >
                  Better briefing. Real coordination.
                </p>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                  <p>
                    We work with NHS trusts, local authorities, and care organisations across England, and we are deliberate about where we place people. We do not treat staff as interchangeable — we match to setting, shift demands, and role scope so you can do your work well.
                  </p>
                  <p>
                    We have been operating for three years. Over that time, we have built long-term relationships by being clear upfront about the shift, the environment, and who to contact if something changes.
                  </p>
                  <p>
                    If you want flexibility without constant uncertainty, we can be a better fit: practical communication, realistic planning, and a team that responds when you need support.
                  </p>
                </div>
              </div>

              <div className="lg:pt-12">
                <p className="section-kicker text-ink-muted-dark mb-5">What we offer</p>
                <FieldList
                  entries={[
                    { label: 'Clarity', value: 'Clearer role briefs, reporting lines, and expectations before you attend.' },
                    { label: 'Flexibility', value: 'Choose shifts around your availability and preferred locations.' },
                    { label: 'Coordination', value: 'A named contact for booking updates and escalation support.' },
                    { label: 'Settings', value: 'Work across hospitals, care homes, supported living, and community services.' },
                    { label: 'Pay', value: 'Transparent rate confirmation and consistent payment cycles.' },
                  ]}
                />
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20 mb-20 lg:mb-28">
              <p className="section-kicker text-ink-muted-dark mb-5">What we expect from placements</p>
              <p
                className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-6 max-w-[28ch]"
                style={{
                  fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                  fontVariationSettings: '"opsz" 24, "wght" 560',
                }}
              >
                What good looks like.
              </p>
              <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[60ch] mb-12">
                A good placement means you arrive prepared, stay in contact if anything changes, and work to the standard the service needs. We brief you properly beforehand — setting type, reporting lines, what to expect on the day. In return, we ask for the same professionalism in the field. That&rsquo;s what makes clients ask for workers back, and what leads to more shifts.
              </p>
              <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
                <div>
                  <p className="register-mono text-amber mb-4">From us</p>
                  <ul className="space-y-3">
                    {[
                      'A proper brief before every shift — setting type, reporting line, what to expect',
                      'Honest assessment of whether a placement is a good fit for you',
                      'A named coordinator available for changes and questions',
                      'Rates confirmed before you accept, paid consistently',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-muted-dark text-[14px] leading-relaxed">
                        <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="register-mono text-amber mb-4">From you</p>
                  <ul className="space-y-3">
                    {[
                      'Attendance as confirmed — contact us immediately if something changes',
                      'Current compliance: DBS, registration, mandatory training',
                      'Professional conduct with clients and with us',
                      'Feedback if a placement wasn\'t right — it helps us match better next time',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-muted-dark text-[14px] leading-relaxed">
                        <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20 mb-20 lg:mb-28">
              <p className="section-kicker text-ink-muted-dark mb-10">Open roles</p>
              <div className="divide-y divide-rule-light">
                {roles.map((role) => (
                  <div
                    key={role.code}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-8 py-5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap mb-1">
                        <h3
                          className="font-display text-ink-dark leading-snug"
                          style={{
                            fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                            fontVariationSettings: '"opsz" 16, "wght" 620',
                          }}
                        >
                          {role.title}
                        </h3>
                        <span className="text-[10px] font-medium tracking-[0.1em] text-ink-muted-dark/70 border border-rule-light px-2 py-0.5 rounded font-mono">
                          {role.code}
                        </span>
                        <span className="text-[10px] font-medium tracking-[0.08em] text-ink-muted-dark/70 border border-rule-light px-2 py-0.5 rounded">
                          {role.location}
                        </span>
                      </div>
                      <p className="text-ink-muted-dark text-[13px] leading-snug">{role.note}</p>
                    </div>
                    <Link
                      href={applyHref(role.code, role.title)}
                      className="interactive-lift inline-flex items-center gap-2 border border-rule-light text-ink-dark px-4 py-2 rounded-md text-[12px] font-semibold tracking-[0.02em] hover:border-amber hover:text-amber transition-colors flex-shrink-0 self-start sm:self-center"
                    >
                      Apply <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-20 items-start">
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">How to apply</p>
                  <p
                    className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-6"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      fontVariationSettings: '"opsz" 24, "wght" 560',
                    }}
                  >
                    Send your CV.
                  </p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[54ch]">
                    Click Apply on any role above, or email{' '}
                    <a
                      href="mailto:careers@horizoncareservices.org"
                      className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      careers@horizoncareservices.org
                    </a>{' '}
                    directly with your CV, the role reference, your availability, and preferred locations.
                  </p>
                  <p className="text-ink-muted-dark text-[14px] leading-relaxed mt-4 max-w-[54ch]">
                    All positions are subject to DBS check, professional registration verification, and employment references. We are an equal opportunities employer.
                  </p>
                </div>
                <div className="space-y-4">
                  <a
                    href={speculativeMailto}
                    className="interactive-lift inline-flex items-center gap-2 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Email your CV <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <p className="text-ink-muted-dark text-[13px]">
                    Or call us on{' '}
                    <a href="tel:02037572767" className="underline underline-offset-2 hover:text-ink-dark transition-colors">
                      020 3757 2767
                    </a>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
    </>
  )
}
