import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Horizon Care Services',
  description: 'How Horizon Care Services collects, uses, and protects personal information.',
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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

            <Section title="1. Who we are">
              <p>
                Horizon Care Services Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a registered health and social care provider in England. We are the data controller for personal information collected through this website and in connection with our services.
              </p>
              <p>
                Registered address: 475B Cheetham Hill Road, Cheetham Hill, Manchester, M8 9LR. Company number: 14615041.
              </p>
              <p>
                If you have questions about how we handle your personal data, contact us at{' '}
                <a href="mailto:contact@horizoncareservices.org">contact@horizoncareservices.org</a>.
              </p>
            </Section>

            <Section title="2. What information we collect">
              <p>We may collect the following categories of personal information:</p>
              <ul>
                <li><strong>Contact details:</strong> name, telephone number, email address, postal address.</li>
                <li><strong>Referral information:</strong> details about the person being referred, including relevant health, social care, and support needs, provided by NHS professionals, Local Authority staff, or families.</li>
                <li><strong>Employment enquiries:</strong> CVs, qualifications, and professional registration details submitted by job applicants.</li>
                <li><strong>Website usage data:</strong> browser type, pages visited, and access times, collected via server logs. We do not use tracking cookies or third-party analytics tools.</li>
                <li><strong>Communications:</strong> any information you send us by email or telephone.</li>
              </ul>
            </Section>

            <Section title="3. How we use your information">
              <p>We use personal information to:</p>
              <ul>
                <li>Assess and process referrals for our care and support services.</li>
                <li>Arrange and deliver care, staffing, or support services.</li>
                <li>Respond to enquiries from families, professionals, and commissioners.</li>
                <li>Process employment applications and manage relationships with staff.</li>
                <li>Comply with our legal and regulatory obligations, including CQC requirements.</li>
                <li>Maintain records as required by applicable law.</li>
              </ul>
            </Section>

            <Section title="4. Legal basis for processing">
              <p>We rely on the following lawful bases under UK GDPR:</p>
              <ul>
                <li><strong>Legitimate interests:</strong> responding to general enquiries and operating our website.</li>
                <li><strong>Contract performance:</strong> delivering services and managing employment relationships.</li>
                <li><strong>Legal obligation:</strong> where processing is required to comply with law or regulation.</li>
                <li><strong>Vital interests:</strong> where processing is necessary to protect the life or safety of a service user.</li>
                <li><strong>Explicit consent:</strong> where we rely on consent, we will ask for it clearly and separately.</li>
              </ul>
              <p>
                Where we process special category data (health or care information), we rely on Article 9(2)(h) UK GDPR (healthcare purposes) and Schedule 1, Part 1(2) of the Data Protection Act 2018.
              </p>
            </Section>

            <Section title="5. Who we share information with">
              <p>We do not sell personal data. We may share information with:</p>
              <ul>
                <li>NHS trusts, Local Authorities, and commissioners involved in coordinating a person&rsquo;s care.</li>
                <li>Regulated healthcare professionals and partner organisations delivering services.</li>
                <li>Our IT and hosting providers, under data processing agreements.</li>
                <li>Regulatory bodies (CQC, ICO) where required by law.</li>
              </ul>
            </Section>

            <Section title="6. How long we keep your information">
              <p>
                We retain personal data only for as long as necessary. Referral and care records are retained for a minimum of 7 years in line with NHS and social care guidance. Employment records are kept for 6 years after the end of employment. Website server logs are retained for up to 90 days.
              </p>
              <p>
                We review retention periods periodically and delete data securely once it is no longer required.
              </p>
            </Section>

            <Section title="7. Your rights">
              <p>Under UK GDPR, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request erasure of your data, where we have no overriding legal reason to retain it.</li>
                <li>Object to or restrict certain processing.</li>
                <li>Data portability, where processing is based on consent or contract.</li>
                <li>Withdraw consent at any time, without affecting the lawfulness of processing before withdrawal.</li>
              </ul>
              <p>
                To exercise any of these rights, write to us at the address above or email{' '}
                <a href="mailto:contact@horizoncareservices.org">contact@horizoncareservices.org</a>. We will respond within one calendar month.
              </p>
            </Section>

            <Section title="8. Complaints">
              <p>
                If you are unhappy with how we have handled your personal data, you have the right to lodge a complaint with the Information Commissioner&rsquo;s Office (ICO) at{' '}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>{' '}
                or by telephone on 0303 123 1113.
              </p>
            </Section>

            <Section title="9. Changes to this policy">
              <p>
                We may update this policy when our practices change or when required by law. Material changes will be noted at the top of this page with a revised date.
              </p>
            </Section>

          </div>

          <div className="mt-14 pt-8 border-t border-rule-light flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
            <Link
              href="/legal"
              className="text-[13px] text-ink-muted-dark hover:text-ink-dark transition-colors font-medium"
            >
              Legal Notice &rarr;
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
