import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'

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

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 mb-20 lg:mb-28">

              <div className="border-t-2 border-amber pt-7">
                <p className="section-kicker text-ink-muted-dark mb-3">Urgent staffing</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Available 24 hours, 7 days a week
                </p>
                <a
                  href="tel:07572701349"
                  className="text-ink-dark font-display text-[1.4rem] hover:text-amber transition-colors block"
                  style={{ fontVariationSettings: '"opsz" 22, "wght" 560' }}
                >
                  07572 701 349
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2">
                  For same-day and short-notice cover requests
                </p>
              </div>

              <div className="border-t-2 border-rule-light pt-7">
                <p className="section-kicker text-ink-muted-dark mb-3">Office</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Referrals, care enquiries, general
                </p>
                <a
                  href="tel:01582354119"
                  className="text-ink-dark font-display text-[1.4rem] hover:text-amber transition-colors block"
                  style={{ fontVariationSettings: '"opsz" 22, "wght" 560' }}
                >
                  01582 354 119
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2">
                  Monday to Friday, 9am to 5pm
                </p>
              </div>

              <div className="border-t-2 border-rule-light pt-7">
                <p className="section-kicker text-ink-muted-dark mb-3">Email</p>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  All enquiries
                </p>
                <a
                  href="mailto:admin@horizoncareservices.org"
                  className="text-ink-dark text-[15px] font-medium hover:text-amber transition-colors break-all"
                >
                  admin@horizoncareservices.org
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2">
                  We respond within 2 working days
                </p>
              </div>

            </div>

            <div className="border-t border-rule-light pt-16 lg:pt-20">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

                <div>
                  <p className="section-kicker text-ink-muted-dark mb-5">Address</p>
                  <address className="not-italic text-ink-muted-dark text-[15px] leading-[1.8]">
                    <p className="font-medium text-ink-dark mb-1">Horizon Care Services Ltd</p>
                    <p>475B Cheetham Hill Road</p>
                    <p>Cheetham Hill</p>
                    <p>Manchester</p>
                    <p>M8 9LR</p>
                  </address>
                  <p className="text-ink-muted-dark text-[13px] mt-5">Company No. 14615041</p>
                </div>

                <div>
                  <p className="section-kicker text-ink-muted-dark mb-5">What to include in your message</p>
                  <div className="space-y-3">
                    {[
                      'Your name and organisation (if applicable)',
                      'The nature of your enquiry: staffing, care, referral, or other',
                      'A contact number in case we need to respond quickly',
                      'For referrals: service user initials, location, and level of urgency',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                        <span className="text-ink-muted-dark text-[14px] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
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
