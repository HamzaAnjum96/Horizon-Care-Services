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

            {/* Two contact channels */}
            <div className="grid sm:grid-cols-2 gap-10 lg:gap-12 mb-20 lg:mb-28">

              <div className="border-t-2 border-amber pt-7">
                <p className="section-kicker text-ink-muted-dark mb-3">Phone</p>
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
                  href="tel:02037572767"
                  className="font-display text-ink-dark hover:text-amber transition-colors block"
                  style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 560',
                  }}
                >
                  020 3757 2767
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
                  href="mailto:contact@horizoncareservices.org"
                  className="text-ink-dark text-[15px] font-medium hover:text-amber transition-colors break-all block"
                >
                  contact@horizoncareservices.org
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Response within 2 working days
                </p>
              </div>

            </div>

            {/* Our offices */}
            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <p className="section-kicker text-ink-muted-dark mb-5">Our offices</p>
              <h2
                className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-10"
                style={{
                  fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                  fontVariationSettings: '"opsz" 24, "wght" 560',
                }}
              >
                Visit us in Manchester.
              </h2>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 sm:gap-8 lg:gap-12 items-start">

                <address className="not-italic min-w-0">
                  <p
                    className="font-display text-ink-dark mb-3 leading-tight tracking-[-0.02em]"
                    style={{
                      fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
                      fontVariationSettings: '"opsz" 18, "wght" 620',
                    }}
                  >
                    Horizon Care Services Ltd
                  </p>
                  <p className="text-ink-muted-dark text-[14px] sm:text-[15px] leading-[1.7] mb-4">
                    475B Cheetham Hill Road<br />
                    Manchester<br />
                    M8 9LR
                  </p>
                  <p className="text-ink-muted-dark text-[12px] mb-5">Company No. 14615041</p>
                  <Link
                    href="/services"
                    className="interactive-lift inline-flex items-center gap-2 bg-amber text-ink-light px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-[12.5px] sm:text-[13px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Our services <ArrowUpRight size={13} />
                  </Link>
                </address>

                {/* Map — compact thumbnail beside the address */}
                <div className="relative rounded-lg overflow-hidden border border-rule-light aspect-square sm:aspect-[4/3] lg:aspect-[5/4] max-h-[260px] sm:max-h-[300px] lg:max-h-[340px]">
                  <LocationMap />
                  {/* Get directions overlay link */}
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=475B+Cheetham+Hill+Road+Manchester+M8+9LR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-deep/90 backdrop-blur-sm text-ink-light text-[10px] sm:text-[11px] font-medium tracking-[0.05em] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded hover:bg-deep transition-colors z-[1000]"
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
