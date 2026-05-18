import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'About Us — Horizon Care Services' },
  description: 'Three years placing vetted healthcare professionals with NHS trusts, local authorities, and care organisations across England. Registered nurses, social workers, OTs, physiotherapists, HCAs, and support workers.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: 'About Us — Horizon Care Services',
    description: 'Three years of healthcare staffing across England — placing registered nurses, social workers, and allied health professionals with NHS trusts and local authorities.',
    url: `${siteUrl}/about`,
    type: 'website',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${siteUrl}/about` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${siteUrl}/about#webpage`,
    url: `${siteUrl}/about`,
    name: 'About Us — Horizon Care Services',
    description: 'Three years placing vetted healthcare professionals with NHS trusts, local authorities, and care organisations across England.',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: `${siteUrl}/about` },
      ],
    },
  },
]

export default function AboutPage() {
  return (
    <>
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <PageHeader
        kicker="About us"
        title="Staffing built on relationships, not just rotas."
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
            <div>
              <p className="section-kicker text-ink-muted-dark mb-5">Who we are</p>
              <p
                className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                style={{
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  fontVariationSettings: '"opsz" 28, "wght" 560',
                }}
              >
                Three years placing quality healthcare staff across England.
              </p>
              <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[64ch]">
                <p>
                  Horizon Care Services is a healthcare staffing agency. We place registered nurses, social workers, occupational therapists, physiotherapists, healthcare assistants, and support workers with NHS trusts, local authorities, and care organisations across England.
                </p>
                <p>
                  We have been operating for three years, building a register of professionals we trust and relationships with commissioners who know what to expect from us. We don&rsquo;t fill positions with whoever is available — every professional is assessed for the settings we place them in.
                </p>
              </div>
            </div>

            <div className="lg:pt-12">
              <p className="section-kicker text-ink-muted-dark mb-5">At a glance</p>
              <div className="space-y-5">
                {[
                  { label: 'Established', value: '3 years of operating experience' },
                  { label: 'Company number', value: '14615041' },
                  { label: 'Coverage', value: 'Bedfordshire, Bucks, Cambridgeshire, Hertfordshire, Manchester, London' },
                  { label: 'Response time', value: 'Within 2 working days' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">{label}</p>
                    <p className="text-ink-dark text-[14px]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-rule-light pt-16 lg:pt-20 mb-20 lg:mb-28">
            <p className="section-kicker text-ink-muted-dark mb-8">Our approach</p>
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
              <div>
                <h3
                  className="font-display text-ink-dark mb-4 leading-snug tracking-[-0.015em]"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Careful selection
                </h3>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                  We assess each professional against the settings we place them in. Skills, registration, and relevant experience all factor in. The person who walks through the door is someone we&rsquo;d put our name to.
                </p>
              </div>
              <div>
                <h3
                  className="font-display text-ink-dark mb-4 leading-snug tracking-[-0.015em]"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Joined-up working
                </h3>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                  We coordinate closely with ward managers, team leads, and placement coordinators. When something changes, we respond and communicate clearly. We don&rsquo;t disappear once a placement is made.
                </p>
              </div>
              <div>
                <h3
                  className="font-display text-ink-dark mb-4 leading-snug tracking-[-0.015em]"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Honest about capacity
                </h3>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                  We tell clients what we can and cannot provide. We confirm availability before we commit. If we can&rsquo;t meet a requirement, we say so — rather than overpromise and underdeliver.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-rule-light pt-16 lg:pt-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-4">For NHS and Local Authority commissioners</p>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                  We understand the pressures discharge planners and staffing managers operate under. We respond to requirements promptly, confirm availability clearly, and keep you informed when anything changes.
                </p>
                <Link
                  href="/referrals"
                  className="interactive-lift inline-flex items-center gap-2 mt-6 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                >
                  Request staff <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div>
                <p className="section-kicker text-ink-muted-dark mb-4">For healthcare professionals</p>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                  We work with registered nurses, social workers, OTs, physiotherapists, HCAs, and support workers who want flexible agency work across England. Competitive rates, a named coordinator, and shifts that fit your schedule.
                </p>
                <Link
                  href="/work-for-us"
                  className="interactive-lift inline-flex items-center gap-2 mt-6 border border-rule-light text-ink-dark px-6 py-3 rounded-md text-[14px] font-semibold hover:border-ink-dark/30 transition-colors"
                >
                  Join our register <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
