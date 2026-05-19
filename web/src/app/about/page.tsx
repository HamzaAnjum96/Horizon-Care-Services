import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'About Horizon Care Services | Healthcare Staffing Agency' },
  description: 'Horizon Care Services is a healthcare staffing agency supplying vetted health and social care professionals to local authorities, NHS trusts, care homes and healthcare organisations across England.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: 'About Horizon Care Services | Healthcare Staffing Agency',
    description: 'Healthcare staffing built on relationships, not just rotas. We supply vetted professionals to local authorities, NHS trusts, care homes and healthcare organisations.',
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
        title="How we work: healthcare staffing with clear decisions and accountable follow-through."
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
                We help care services stay safe and staffed by making better placement decisions, faster.
              </p>
              <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[64ch]">
                <p>
                  Horizon Care Services is a healthcare staffing agency supplying vetted health and social care professionals across England. We support local authorities, NHS trusts, care homes, residential services, supported living providers, and healthcare organisations with short-notice cover, planned staffing, and longer-term placements.
                </p>
                <p>
                  We treat staffing as an operational risk and continuity issue, not just a rota task. A single gap can increase pressure on permanent teams, disrupt routines for people receiving care, and force managers into repeated last-minute decisions. Our role is to reduce that pressure with realistic options and dependable communication.
                </p>
                <p>
                  We are direct about what we can provide, how quickly we can mobilise support, and where constraints exist. That approach helps clients plan properly instead of chasing uncertain cover.
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
                  { label: 'Planning commitment', value: 'Clear updates and next-step ownership' },
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
                  Clarity before commitment
                </h3>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                  We take the brief properly — service type, shift demands, required experience, reporting expectations. Ambiguity at this stage causes problems later, so we ask the questions that most agencies skip.
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
                  Fit over availability
                </h3>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                  We match on setting fit, actual placement history and role scope — not just who is free. If the match isn&rsquo;t strong enough, we say so rather than send someone who will struggle in your environment.
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
                  Accountability after placement
                </h3>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                  We stay reachable after the shift is filled. If a requirement changes, grows or needs extension, you contact us and we respond with options — you don&rsquo;t restart from scratch.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-rule-light pt-16 lg:pt-20 mb-20 lg:mb-28">
            <p className="section-kicker text-ink-muted-dark mb-8">How we work with clients</p>
            <p
              className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-10 max-w-[32ch]"
              style={{
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                fontVariationSettings: '"opsz" 24, "wght" 560',
              }}
            >
              What working with us looks like in practice.
            </p>
            <ul className="grid lg:grid-cols-2 gap-x-16 gap-y-0">
              {[
                'We confirm who is attending, when, and where before the shift starts.',
                "If we can't fill a requirement, we tell you promptly — we don't leave it open.",
                "We ask about the environment, not just the job title, so the brief is accurate.",
                "If something goes wrong on shift, you contact us and we resolve it.",
                "If your need continues or grows, we plan the next step with you.",
              ].map((item) => (
                <li key={item} className="border-t border-rule-light py-5 flex items-start gap-3 text-ink-muted-dark text-[15px]">
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-rule-light pt-16 lg:pt-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-4">For councils, care homes and healthcare organisations</p>
                <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                  We support organisations managing urgent absence, recurring rota gaps, discharge pressure, and longer-term workforce needs. You get a straight answer on what is available, what is not, and what happens next.
                </p>
                <Link
                  href="/contact"
                  className="interactive-lift inline-flex items-center gap-2 mt-6 bg-brand text-ink-light px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                >
                  Request staff <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div>
                <p className="section-kicker text-ink-muted-dark mb-5">For healthcare professionals</p>
                <p className="text-ink-muted-dark text-[14px] leading-relaxed text-ink-muted-dark mb-5 max-w-[48ch]">
                  We work with registered nurses, social workers, OTs, physiotherapists, HCAs and support workers who want flexible agency work with proper briefing and dependable coordination.
                </p>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0 mb-6">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-3">What you can expect from us</p>
                    <ul className="space-y-2">
                      {[
                        'Shifts briefed properly before you attend',
                        'A named coordinator for changes and questions',
                        'Placements matched to your actual experience',
                        'Rates confirmed before you accept',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-ink-muted-dark text-[13px] leading-relaxed">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 sm:mt-0">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-3">What we expect from you</p>
                    <ul className="space-y-2">
                      {[
                        "Attendance as confirmed — contact us if something changes",
                        "Current compliance: DBS, registration, training",
                        "Professional conduct with clients and with us",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-ink-muted-dark text-[13px] leading-relaxed">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link
                  href="/work-for-us"
                  className="interactive-lift inline-flex items-center gap-2 border border-rule-light text-ink-dark px-6 py-3 rounded-md text-[14px] font-semibold hover:border-ink-dark/30 transition-colors"
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
