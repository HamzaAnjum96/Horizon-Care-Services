import type { Metadata } from 'next'
import { ArrowUpRight, Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 lg:gap-x-12 mb-20 lg:mb-28">

              {/* Phone */}
              <div className="border-t-2 border-amber pt-6">
                <div className="text-amber mb-5">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <p className="section-kicker text-ink-muted-dark mb-3">Phone</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  All enquiries
                </p>
                <a
                  href="tel:02037572767"
                  className="font-display text-ink-dark hover:text-amber transition-colors block"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 540',
                  }}
                >
                  020 3757 2767
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Monday to Friday, 9am to 5pm
                </p>
              </div>

              {/* Email */}
              <div className="border-t-2 border-rule-light pt-6">
                <div className="text-ink-muted-dark mb-5">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <p className="section-kicker text-ink-muted-dark mb-3">Email</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  All enquiries
                </p>
                <a
                  href="mailto:contact@horizoncareservices.org"
                  className="text-ink-dark text-[14px] sm:text-[15px] font-medium hover:text-amber transition-colors break-all block leading-snug"
                >
                  contact@horizoncareservices.org
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Response within 2 working days
                </p>
              </div>

              {/* WhatsApp */}
              <div className="border-t-2 border-rule-light pt-6 sm:col-span-2 lg:col-span-1">
                <div className="mb-5" style={{ color: 'oklch(62% 0.19 148)' }}>
                  <MessageCircle size={18} strokeWidth={1.5} />
                </div>
                <p className="section-kicker text-ink-muted-dark mb-3">WhatsApp</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Message us directly
                </p>
                <a
                  href="https://wa.me/447572701349"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-ink-dark hover:text-amber transition-colors block"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 540',
                  }}
                >
                  +44 7572 701 349
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Quick responses, 7 days a week
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

              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 lg:gap-12 items-start">

                <address className="not-italic min-w-0">
                  <div className="flex items-start gap-2.5 mb-3">
                    <MapPin size={15} strokeWidth={1.5} className="text-amber mt-[3px] shrink-0" />
                    <p
                      className="font-display text-ink-dark leading-tight tracking-[-0.02em]"
                      style={{
                        fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                        fontVariationSettings: '"opsz" 18, "wght" 620',
                      }}
                    >
                      Horizon Care Services Ltd
                    </p>
                  </div>
                  <p className="text-ink-muted-dark text-[14px] sm:text-[15px] leading-[1.75] mb-4 pl-[26px]">
                    475B Cheetham Hill Road<br />
                    Manchester<br />
                    M8 9LR
                  </p>
                  <p className="text-ink-muted-dark text-[12px] pl-[26px]">Company No. 14615041</p>
                </address>

                {/* Map */}
                <div className="relative isolate rounded-lg overflow-hidden border border-rule-light aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] max-h-[300px] sm:max-h-[300px] lg:max-h-[340px]">
                  <LocationMap />
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
