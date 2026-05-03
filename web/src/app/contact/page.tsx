import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'
import { LocationMap } from '@/components/location-map'

export const metadata: Metadata = {
  title: 'Contact — Horizon Care Services',
  description: 'Get in touch with Horizon Care Services. Urgent staffing, referrals, care enquiries, and general contact.',
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Contact"
          title="Get in touch."
          intro="Whether you're making a referral, enquiring about care, or looking for staffing cover: we respond quickly and give you a straight answer."
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            {/* Three contact channels */}
            <div className="grid sm:grid-cols-3 gap-10 lg:gap-12 mb-20 lg:mb-28">

              <div className="border-t-2 border-amber pt-7">
                <p className="section-kicker text-ink-muted-dark mb-3">Urgent staffing</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Available 24/7
                </p>
                <a
                  href="tel:07572701349"
                  className="font-display text-ink-dark hover:text-amber transition-colors block"
                  style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 560',
                  }}
                >
                  07572 701 349
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Same-day and short-notice cover
                </p>
              </div>

              <div className="border-t-2 border-rule-light pt-7">
                <p className="section-kicker text-ink-muted-dark mb-3">Office</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Referrals and care enquiries
                </p>
                <a
                  href="tel:01582354119"
                  className="font-display text-ink-dark hover:text-amber transition-colors block"
                  style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 560',
                  }}
                >
                  01582 354 119
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Monday to Friday, 9am to 5pm
                </p>
              </div>

              <div className="border-t-2 border-rule-light pt-7">
                <p className="section-kicker text-ink-muted-dark mb-3">Email</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  All enquiries
                </p>
                <a
                  href="mailto:admin@horizoncareservices.org"
                  className="text-ink-dark text-[15px] font-medium hover:text-amber transition-colors break-all block"
                >
                  admin@horizoncareservices.org
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Response within 2 working days
                </p>
              </div>

            </div>

            {/* Address + Map */}
            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                <div>
                  <p className="section-kicker text-ink-muted-dark mb-6">Address</p>
                  <address className="not-italic mb-8">
                    <p
                      className="font-display text-ink-dark mb-3 leading-tight tracking-[-0.02em]"
                      style={{
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                        fontVariationSettings: '"opsz" 20, "wght" 600',
                      }}
                    >
                      Horizon Care Services Ltd
                    </p>
                    <p className="text-ink-muted-dark text-[15px] leading-[1.8]">
                      475B Cheetham Hill Road<br />
                      Manchester<br />
                      M8 9LR
                    </p>
                  </address>

                  <div className="space-y-3 mb-8">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">Telephone</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <a href="tel:07572701349" className="text-ink-dark text-[15px] font-medium hover:text-amber transition-colors">
                          07572 701 349
                        </a>
                        <a href="tel:01582354119" className="text-ink-dark text-[15px] font-medium hover:text-amber transition-colors">
                          01582 354 119
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.1em] text-ink-muted-dark uppercase mb-1">Email</p>
                      <a href="mailto:admin@horizoncareservices.org" className="text-ink-dark text-[15px] font-medium hover:text-amber transition-colors">
                        admin@horizoncareservices.org
                      </a>
                    </div>
                  </div>

                  <p className="text-ink-muted-dark text-[12px]">Company No. 14615041</p>

                  <div className="mt-6">
                    <Link
                      href="/referrals"
                      className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-5 py-2.5 rounded-md text-[13px] font-semibold hover:opacity-90 transition-opacity"
                    >
                      Make a referral <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Map */}
                <div className="relative rounded-lg overflow-hidden border border-rule-light aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
                  <LocationMap />
                  {/* Get directions overlay link */}
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=475B+Cheetham+Hill+Road+Manchester+M8+9LR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-deep/90 backdrop-blur-sm text-ink-light text-[11px] font-medium tracking-[0.05em] px-3 py-1.5 rounded hover:bg-deep transition-colors z-[1000]"
                  >
                    Get directions <ArrowUpRight size={11} />
                  </a>
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
