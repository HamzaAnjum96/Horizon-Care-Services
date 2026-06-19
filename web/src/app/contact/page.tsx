import type { Metadata } from 'next'
import { ArrowUpRight, Phone, Mail, MessageCircle } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { LocationMap } from '@/components/location-map'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'Request Healthcare Staff | Contact Horizon Care Services' },
  description: 'Contact Horizon Care Services to request staffing cover. Phone, WhatsApp and email for urgent cover, planned staffing support and longer-term placements. Manchester office.',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Request Healthcare Staff | Contact Horizon Care Services',
    description: 'Contact us with the role, setting, location and urgency. We respond with a clear answer on availability and next steps.',
    url: `${siteUrl}/contact`,
    type: 'website',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteUrl}/contact#webpage`,
    url: `${siteUrl}/contact`,
    name: 'Contact Us — Horizon Care Services',
    description: 'Phone, WhatsApp, and email contact details for Horizon Care Services. Manchester office address.',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
    ],
  },
]

export default function ContactPage() {
  return (
    <>
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <PageHeader
          kicker="Contact"
          title="Request staffing support."
          intro="For urgent or same-day cover, call us. For planned staffing, longer-term requirements, or anything you'd rather put in writing first, email or WhatsApp. Either way, the more detail you give us upfront, the faster we can give you a realistic answer."
        />

        <section className="bg-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            {/* Phone + WhatsApp: 2-col row. Email: full-width row below. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 lg:gap-x-12 mb-20 lg:mb-28">

              {/* Phone */}
              <div className="border-t-2 border-amber pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Phone size={12} strokeWidth={1.75} className="text-amber flex-shrink-0" aria-hidden="true" />
                  <p className="section-kicker text-ink-muted-dark">Phone</p>
                </div>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-3"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Best for urgent and same-day cover
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

              {/* WhatsApp */}
              <div className="border-t-2 border-rule-light pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle
                    size={12}
                    strokeWidth={1.75}
                    className="flex-shrink-0"
                    style={{ color: 'oklch(62% 0.19 148)' }}
                    aria-hidden="true"
                  />
                  <p className="section-kicker text-ink-muted-dark">WhatsApp</p>
                </div>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-3"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Best for quick back-and-forth, 7 days
                </p>
                <a
                  href="https://wa.me/442037572767"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-ink-dark hover:text-amber transition-colors block"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                    fontVariationSettings: '"opsz" 22, "wght" 540',
                  }}
                >
                  020 3757 2767
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Quick responses, 7 days a week
                </p>
              </div>

              {/* Email — spans full width */}
              <div className="border-t-2 border-rule-light pt-6 sm:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={12} strokeWidth={1.75} className="text-ink-muted-dark flex-shrink-0" aria-hidden="true" />
                  <p className="section-kicker text-ink-muted-dark">Email</p>
                </div>
                <p
                  className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-3"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                    fontVariationSettings: '"opsz" 18, "wght" 620',
                  }}
                >
                  Best for planned requirements and longer briefs
                </p>
                <a
                  href="mailto:contact@horizoncareservices.org"
                  className="text-ink-dark text-[14px] sm:text-[15px] font-medium hover:text-amber transition-colors block leading-snug"
                >
                  contact@horizoncareservices.org
                </a>
                <p className="text-ink-muted-dark text-[13px] mt-2 leading-snug">
                  Response within 2 working days
                </p>
              </div>

              {/* What to include */}
              <div className="sm:col-span-2 border-t border-rule-light pt-8">
                <p className="section-kicker text-ink-muted-dark mb-4">What to include in your first message</p>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
                  {[
                    'The role required (Registered Nurse, Senior HCA, HCA or Support Worker)',
                    'Any registration required (RGN, RMN or RNLD, where applicable)',
                    'The type of service or setting (nursing home, residential care home, supported living, NHS trust or specialist care setting)',
                    'The location and date(s) or shift pattern required',
                    'The level of urgency (same day, this week or planned in advance)',
                    'Any specific requirements relating to the service, environment or reporting arrangements',
                  ].map((item) => (
                    <li key={item} className="border-t border-rule-light py-4 flex items-start gap-3 text-ink-muted-dark text-[14px]">
                      <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
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

              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 lg:gap-12">

                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">Address</p>
                  <address className="not-italic">
                    <p
                      className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-3"
                      style={{
                        fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                        fontVariationSettings: '"opsz" 18, "wght" 620',
                      }}
                    >
                      Horizon Care Services Ltd
                    </p>
                    <p className="text-ink-muted-dark text-[14px] sm:text-[15px] leading-[1.75]">
                      475B Cheetham Hill Road<br />
                      Manchester<br />
                      M8 9LR
                    </p>
                  </address>
                </div>

                <div>
                  <p className="section-kicker text-ink-muted-dark mb-4">Location</p>
                  <div className="relative isolate rounded-lg overflow-hidden border border-rule-light aspect-[4/3] max-h-[320px]">
                    <LocationMap />
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=475B+Cheetham+Hill+Road+Manchester+M8+9LR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-deep/90 backdrop-blur-sm text-ink-light text-[10px] sm:text-[11px] font-medium tracking-[0.05em] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded hover:bg-deep transition-colors z-[1000]"
                    >
                      Get directions <ArrowUpRight size={11} aria-hidden="true" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
    </>
  )
}
