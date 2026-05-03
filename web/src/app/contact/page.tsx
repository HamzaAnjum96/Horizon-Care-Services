import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'
import { LocationMap } from '@/components/location-map'

export const metadata: Metadata = {
  title: 'Contact — Horizon Care Services',
  description: 'Get in touch with Horizon Care Services. Urgent staffing cover, care enquiries, and general contact.',
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Contact"
          title="Get in touch."
          intro="Whether you're enquiring about our services, need urgent staffing cover, or want to join our team: we respond quickly and give you a straight answer."
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

            {/* Our office */}
            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <p className="section-kicker text-ink-muted-dark mb-8">Our office</p>
              <div className="grid sm:grid-cols-2 gap-8 items-start">

                <address className="not-italic">
                  <p
                    className="font-display text-ink-dark mb-3 leading-tight tracking-[-0.02em]"
                    style={{
                      fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                      fontVariationSettings: '"opsz" 18, "wght" 620',
                    }}
                  >
                    Horizon Care Services Ltd
                  </p>
                  <p className="text-ink-muted-dark text-[15px] leading-[1.8] mb-5">
                    475B Cheetham Hill Road<br />
                    Manchester<br />
                    M8 9LR
                  </p>
                  <p className="text-ink-muted-dark text-[12px] mb-5">Company No. 14615041</p>
                  <Link
                    href="/services"
                    className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-5 py-2.5 rounded-md text-[13px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Our services <ArrowUpRight size={13} />
                  </Link>
                </address>

                {/* Map */}
                <div className="relative rounded-lg overflow-hidden border border-rule-light h-[240px] sm:h-[260px]">
                  <LocationMap />
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
