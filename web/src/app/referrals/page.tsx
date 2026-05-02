import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Make a Referral — Horizon Care Services',
  description: 'Refer a person to Horizon Care Services. We respond to all referrals within 2 working days with a thorough, person-centred assessment.',
}

export default function ReferralsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Referrals"
          title="Refer a person in need."
          intro="For NHS trusts, local authorities, social workers, discharge planners, care managers, and families. We respond within 2 working days with a person-centred assessment and a clear proposal."
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-5">How to refer</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 28, "wght" 560',
                  }}
                >
                  Call or email — we make it straightforward.
                </p>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                  <p>
                    To make a referral, call us on <a href="tel:01582354119" className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity">01582 354 119</a> or email <a href="mailto:admin@horizoncareservices.org" className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity">admin@horizoncareservices.org</a>. For urgent situations, call <a href="tel:07572701349" className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity">07572 701 349</a> — that line is staffed 24/7.
                  </p>
                  <p>
                    Once we receive a referral, we will contact you within 2 working days to discuss the person&rsquo;s needs, confirm what we can offer, and agree next steps. For urgent hospital discharge situations, we can often respond the same day.
                  </p>
                  <p>
                    We work with NHS trusts, local authorities, social workers, and GPs. Families can also refer directly — we will explain the assessment process and funding options clearly so there are no surprises.
                  </p>
                </div>
              </div>

              <div className="lg:pt-12">
                <p className="section-kicker text-ink-muted-dark mb-5">Contact details</p>
                <div className="space-y-6">
                  <div className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-2">Urgent referrals (24/7)</p>
                    <a href="tel:07572701349" className="font-display text-ink-dark text-[1.3rem] hover:text-amber transition-colors block" style={{ fontVariationSettings: '"opsz" 20, "wght" 560' }}>
                      07572 701 349
                    </a>
                  </div>
                  <div className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-2">Office (Mon–Fri, 9–5)</p>
                    <a href="tel:01582354119" className="font-display text-ink-dark text-[1.3rem] hover:text-amber transition-colors block" style={{ fontVariationSettings: '"opsz" 20, "wght" 560' }}>
                      01582 354 119
                    </a>
                  </div>
                  <div className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-2">Email</p>
                    <a href="mailto:admin@horizoncareservices.org" className="text-ink-dark text-[14px] font-medium hover:text-amber transition-colors break-all">
                      admin@horizoncareservices.org
                    </a>
                  </div>
                  <div className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-2">Response time</p>
                    <p className="text-ink-dark text-[14px]">Within 2 working days. Same day for urgent discharge.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20 mb-16 lg:mb-20">
              <p className="section-kicker text-ink-muted-dark mb-8">What to include in a referral</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                {[
                  { heading: 'Person details', points: ['Initials or name (with consent)', 'Date of birth', 'Current location'] },
                  { heading: 'Care needs', points: ['Primary diagnosis or condition', 'Level of support required', 'Any risk factors or vulnerabilities'] },
                  { heading: 'Logistics', points: ['Preferred start date', 'Funding arrangement (NHS, LA, self-funded)', 'Urgency level'] },
                ].map(({ heading, points }) => (
                  <div key={heading}>
                    <h3
                      className="font-display text-ink-dark mb-4 leading-snug"
                      style={{
                        fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                        fontVariationSettings: '"opsz" 16, "wght" 620',
                      }}
                    >
                      {heading}
                    </h3>
                    <div className="space-y-2">
                      {points.map((pt) => (
                        <div key={pt} className="flex items-start gap-3">
                          <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                          <span className="text-ink-muted-dark text-[14px]">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-ink-muted-dark text-[13px] mt-8 max-w-[60ch]">
                You don&rsquo;t need all of this to make an initial referral. If the situation is urgent, call us first and we&rsquo;ll work through the details together.
              </p>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">Our services</p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                    We provide home care, specialist care (dementia, hospice), and clinical staffing. If you&rsquo;re not sure which service is right, describe the situation and we&rsquo;ll advise.
                  </p>
                  <Link
                    href="/services"
                    className="interactive-lift inline-flex items-center gap-2 mt-5 border border-rule-light text-ink-dark px-5 py-2.5 rounded-md text-[13px] font-semibold hover:border-ink-dark/30 transition-colors"
                  >
                    View all services <ArrowUpRight size={13} />
                  </Link>
                </div>
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">Coverage</p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                    We operate across Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Manchester, and London. Contact us if you&rsquo;re outside these areas — we can often extend.
                  </p>
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
