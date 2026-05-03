import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Legal Notice — Horizon Care Services',
  description: 'Legal information for Horizon Care Services Ltd, including company registration and regulatory details.',
}

export default function LegalNoticePage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20">

        {/* Page header */}
        <div className="max-w-3xl mx-auto px-6 lg:px-10 mb-14">
          <p className="section-kicker text-ink-muted-dark mb-4">Legal</p>
          <h1
            className="font-display text-ink-dark leading-[1.0] tracking-[-0.025em] mb-5"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontVariationSettings: '"opsz" 48, "wght" 580',
            }}
          >
            Legal Notice
          </h1>
          <p className="text-ink-muted-dark text-[14px]">
            Last updated: 1 May 2025
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="h-px bg-rule-light mb-12" />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="prose-legal">

            <Section title="Company information">
              <p>
                This website is operated by Horizon Care Services Ltd, a company registered in England and Wales.
              </p>
              <dl className="mt-4 space-y-2">
                <Row label="Registered name" value="Horizon Care Services Ltd" />
                <Row label="Company number" value="14615041" />
                <Row label="Registered address" value="475B Cheetham Hill Road, Cheetham Hill, Manchester, M8 9LR" />
                <Row label="Telephone" value="020 3757 2767" href="tel:02037572767" />
                <Row label="Email" value="contact@horizoncareservices.org" href="mailto:contact@horizoncareservices.org" />
              </dl>
            </Section>

            <Section title="Regulatory status">
              <p>
                Horizon Care Services Ltd is registered with and regulated by the Care Quality Commission (CQC) in England. Our services are provided in accordance with the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014.
              </p>
              <p>
                We are also registered with the Information Commissioner&rsquo;s Office (ICO) as a data controller.
              </p>
            </Section>

            <Section title="Website disclaimer">
              <p>
                The information on this website is provided for general guidance only. While we take reasonable care to keep it accurate and up to date, we make no warranties about its completeness, accuracy, or fitness for any particular purpose.
              </p>
              <p>
                Nothing on this website constitutes clinical, legal, or financial advice. If you need guidance about a specific care situation, please contact us directly or speak to a qualified professional.
              </p>
              <p>
                We reserve the right to amend or remove content from this website at any time without notice.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                All content on this website, including text, design, graphics, and code, is the property of Horizon Care Services Ltd or its licensors and is protected by copyright.
              </p>
              <p>
                You may view, download, and print pages from this site for personal, non-commercial use. Any other use, including reproduction or redistribution for commercial purposes, requires our prior written permission.
              </p>
            </Section>

            <Section title="Third-party links">
              <p>
                Where this website links to external sites, we are not responsible for their content, accuracy, or availability. Links do not imply endorsement of those sites or their operators.
              </p>
            </Section>

            <Section title="Governing law">
              <p>
                These terms and the use of this website are governed by the laws of England and Wales. Any disputes arising from use of this website are subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                If you have a question about the information on this page, contact us at{' '}
                <a href="mailto:contact@horizoncareservices.org">contact@horizoncareservices.org</a>{' '}
                or call <a href="tel:02037572767">020 3757 2767</a>.
              </p>
            </Section>

          </div>

          <div className="mt-14 pt-8 border-t border-rule-light flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
            <Link
              href="/privacy-policy"
              className="text-[13px] text-ink-muted-dark hover:text-ink-dark transition-colors font-medium"
            >
              Privacy Policy &rarr;
            </Link>
            <Link
              href="/"
              className="text-[13px] text-ink-muted-dark hover:text-ink-dark transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="font-display text-ink-dark mb-4 leading-snug tracking-[-0.015em]"
        style={{
          fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
          fontVariationSettings: '"opsz" 20, "wght" 600',
        }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-[15px] text-ink-muted-dark leading-[1.75]">
        {children}
      </div>
    </section>
  )
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6">
      <dt className="text-[13px] text-ink-muted-dark/70 sm:w-40 flex-shrink-0 font-medium">{label}</dt>
      <dd className="text-[14px] text-ink-dark">
        {href ? (
          <a href={href} className="hover:text-ink-dark/70 transition-colors">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}
