import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'About — Horizon Care Services',
  description: 'Three years of experience delivering health and social care across England. Registered, regulated, and built around the people we support.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="About us"
          title="Care built around the person, not the process."
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
                  Three years providing care that makes a measurable difference.
                </p>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[64ch]">
                  <p>
                    Horizon Care Services is a registered health and social care provider operating across England. We have been delivering care for three years, building a track record with NHS trusts, local authorities, families, and care organisations who need reliable professionals and consistent standards.
                  </p>
                  <p>
                    We provide home care, specialist support for people living with dementia and life-limiting conditions, and clinical staffing to care organisations that need skilled professionals at short or extended notice.
                  </p>
                  <p>
                    We are registered with the Care Quality Commission (CQC) and operate in full compliance with the Health and Social Care Act 2008.
                  </p>
                </div>
              </div>

              <div className="lg:pt-12">
                <p className="section-kicker text-ink-muted-dark mb-5">At a glance</p>
                <div className="space-y-5">
                  {[
                    { label: 'Established', value: '3 years of operating experience' },
                    { label: 'Regulated by', value: 'Care Quality Commission (CQC)' },
                    { label: 'Company number', value: '14615041' },
                    { label: 'Coverage', value: 'Bedfordshire, Bucks, Cambridgeshire, Hertfordshire, Manchester, London' },
                    { label: 'Referral response', value: 'Within 2 working days' },
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
                    Strength-based practice
                  </h3>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                    We start by understanding what a person can do, what matters to them, and where they want to get to. Care is planned around that, not around a standard template. Every assessment is individual. Every care plan reflects it.
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
                    Joined-up support
                  </h3>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                    We work alongside NHS teams, social workers, GPs, and families. When care is fragmented, people fall through gaps. We take responsibility for our part and communicate clearly with everyone else involved.
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
                    Honest communication
                  </h3>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed">
                    We tell referrers what we can and cannot do. We keep families informed. We report changes in condition promptly and accurately. Trust in care services is hard-won and quickly lost. We don&rsquo;t take it for granted.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">For NHS and Local Authority referrers</p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                    We understand the pressures discharge planners and social workers operate under. We respond to referrals promptly, provide clear written assessments, and keep you informed at every stage.
                  </p>
                  <Link
                    href="/referrals"
                    className="interactive-lift inline-flex items-center gap-2 mt-6 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Make a referral <ArrowUpRight size={14} />
                  </Link>
                </div>
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">For families</p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                    Choosing care for someone you love is one of the most significant decisions there is. We will talk you through our services honestly, explain what to expect, and make sure any arrangement works for the person being cared for, not just on paper.
                  </p>
                  <Link
                    href="/contact"
                    className="interactive-lift inline-flex items-center gap-2 mt-6 border border-rule-light text-ink-dark px-6 py-3 rounded-md text-[14px] font-semibold hover:border-ink-dark/30 transition-colors"
                  >
                    Get in touch <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
