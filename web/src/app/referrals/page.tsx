import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Work With Us — Horizon Care Services',
  description: 'Commission staffing, home care, or specialist support from Horizon Care Services. We work with NHS trusts, local authorities, councils, and care organisations across England.',
}

export default function WorkWithUsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Organisations"
          title="Let's work together."
          intro="We provide staffing, home care, and specialist support to NHS trusts, local authorities, care homes, and councils. Tell us what you need and we will respond promptly."
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="grid lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
              <div>
                <p className="section-kicker text-ink-muted-dark mb-5">Getting started</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-8"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                    fontVariationSettings: '"opsz" 28, "wght" 560',
                  }}
                >
                  Call or email. We make it straightforward.
                </p>
                <div className="space-y-4 text-ink-muted-dark text-[15px] leading-relaxed max-w-[62ch]">
                  <p>
                    To discuss a requirement, call us on{' '}
                    <a href="tel:01582354119" className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity">01582 354 119</a>
                    {' '}or email{' '}
                    <a href="mailto:admin@horizoncareservices.org" className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity">admin@horizoncareservices.org</a>.
                    For urgent staffing cover, call{' '}
                    <a href="tel:07572701349" className="text-ink-dark underline underline-offset-2 hover:opacity-70 transition-opacity">07572 701 349</a>.
                    That line is staffed 24/7.
                  </p>
                  <p>
                    Once we understand your requirements, we will confirm what we can provide, outline the right service model, and agree next steps. For urgent cover we can often turn around same day.
                  </p>
                  <p>
                    We work with NHS trusts, local authorities, private care homes, and commissioning teams. We are transparent about capacity, rates, and compliance from the first conversation.
                  </p>
                </div>
              </div>

              <div className="lg:pt-12">
                <p className="section-kicker text-ink-muted-dark mb-5">Contact us</p>
                <div className="space-y-6">
                  <div className="border-t border-rule-light pt-5">
                    <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-2">Urgent cover (24/7)</p>
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
                    <p className="text-ink-dark text-[14px]">Within 2 working days. Same day for urgent cover.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20 mb-16 lg:mb-20">
              <p className="section-kicker text-ink-muted-dark mb-8">What to tell us</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                {[
                  { heading: 'Your organisation', points: ['Type of organisation', 'Location and service setting', 'Any existing frameworks or contracts'] },
                  { heading: 'The requirement', points: ['Service type needed (staffing, home care, specialist)', 'Volume and duration', 'Any specific skills or qualifications required'] },
                  { heading: 'Timing', points: ['Required start date', 'Urgency level', 'Ongoing or one-off need'] },
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
                You don&rsquo;t need all of this before getting in touch. If the need is urgent, call us and we will work through the detail together.
              </p>
            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">Our services</p>
                  <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[52ch]">
                    Staffing solutions, home care, and specialist support (dementia and hospice). If you are not sure which service fits, describe the situation and we will advise.
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
                    We operate across Bedfordshire, Buckinghamshire, Cambridgeshire, Hertfordshire, Manchester, and London. Contact us if you are outside these areas. We can often extend.
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
