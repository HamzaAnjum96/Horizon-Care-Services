import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy — Horizon Care Services' },
  description: 'How Horizon Care Services collects, uses, and protects personal information.',
  alternates: { canonical: `${siteUrl}/privacy-policy` },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="pb-20">
        <PageHeader kicker="Legal" title="Privacy Policy." intro="Last updated: 19 May 2026" showGrid={false} />

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-14">
          <div className="prose-legal">

            <Section title="1. Who we are">
              <p>
                Horizon Care Services Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a healthcare staffing agency registered in England and Wales.
              </p>
              <p>
                We supply health and social care professionals to organisations including local authorities, NHS trusts, care homes, residential services, supported living providers and healthcare organisations.
              </p>
              <p>
                We are the data controller for personal information collected through this website and in connection with our staffing, business, candidate and administrative activities.
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
              <p>We may collect and process the following categories of personal information.</p>
              <ul>
                <li>
                  <strong>Client and business contact information:</strong> name, job title, organisation, work email address, telephone number, enquiry details, staffing requirements, communication history.
                </li>
                <li>
                  <strong>Candidate and worker information:</strong> name, address, telephone number, email address, CV, employment history, qualifications, training records, professional registration details, right-to-work information, DBS information where relevant, references, availability, role preferences, placement history, payroll or payment details where applicable.
                </li>
                <li>
                  <strong>Staffing requirement information:</strong> details provided by client organisations about the roles, settings, shifts, locations and experience required.
                </li>
                <li>
                  <strong>Compliance and placement information:</strong> role suitability notes, client requirements, placement dates, shift or booking information, timesheets or attendance records where applicable, feedback or incident information where relevant to a placement.
                </li>
                <li>
                  <strong>Website and technical information:</strong> browser type, device information, pages visited, access times, server log information, cookie or local-storage preferences.
                </li>
                <li>
                  <strong>Communications:</strong> information you send to us by email, telephone, WhatsApp, website form or other communication channels.
                </li>
              </ul>
            </Section>

            <Section title="3. How we collect information">
              <p>We may collect information:</p>
              <ul>
                <li>Directly from you when you contact us, apply to work with us or submit an enquiry.</li>
                <li>From client organisations requesting staffing support.</li>
                <li>From referees.</li>
                <li>From professional registration bodies where relevant.</li>
                <li>From publicly available sources where necessary for recruitment or compliance checks.</li>
                <li>From job boards or recruitment platforms where you have made your details available.</li>
                <li>From IT systems used to operate our website and business.</li>
              </ul>
            </Section>

            <Section title="4. How we use your information">
              <p>We use personal information to:</p>
              <ul>
                <li>Respond to staffing enquiries from client organisations, commissioners, managers and professionals.</li>
                <li>Assess client staffing requirements.</li>
                <li>Identify suitable candidates or workers for placements.</li>
                <li>Carry out recruitment, vetting and compliance checks.</li>
                <li>Confirm professional registration where relevant.</li>
                <li>Manage staffing bookings, shifts and placements.</li>
                <li>Communicate with clients, candidates and workers.</li>
                <li>Manage contracts, invoices, timesheets and business records.</li>
                <li>Meet legal, regulatory, tax, accounting and employment obligations.</li>
                <li>Protect our business, clients, workers and service users where necessary.</li>
                <li>Maintain website security and operate website preferences.</li>
              </ul>
            </Section>

            <Section title="5. Lawful bases for processing">
              <p>We rely on different lawful bases depending on how and why we process personal information.</p>
              <ul>
                <li>
                  <strong>Responding to business enquiries:</strong> legitimate interests. We have a legitimate interest in responding to organisations that contact us about staffing support.
                </li>
                <li>
                  <strong>Managing client relationships and staffing requirements:</strong> contract performance or legitimate interests. We process information to provide staffing services and manage business relationships.
                </li>
                <li>
                  <strong>Recruitment and candidate registration:</strong> contract performance, legitimate interests and legal obligation where applicable. We process candidate information to assess suitability, complete checks and manage work opportunities.
                </li>
                <li>
                  <strong>Compliance checks:</strong> legal obligation, contract performance and legitimate interests where applicable. This may include right-to-work checks, professional registration checks, reference checks and other role-specific requirements.
                </li>
                <li>
                  <strong>Special category data:</strong> where we process health, professional fitness, occupational health, safeguarding or similar sensitive information, we do so only where a valid UK GDPR condition applies. This may include employment, social security and social protection obligations, or explicit consent where appropriate.
                </li>
                <li>
                  <strong>Legal and business records:</strong> legal obligation and legitimate interests. We retain records where needed for tax, accounting, contract, legal or dispute-management purposes.
                </li>
                <li>
                  <strong>Website operation and security:</strong> legitimate interests. We use limited technical information to operate, secure and maintain the website.
                </li>
              </ul>
            </Section>

            <Section title="6. Who we share information with">
              <p>We do not sell personal data. We may share personal information with:</p>
              <ul>
                <li>Client organisations where this is necessary for staffing placements.</li>
                <li>Candidates, workers and referees as part of recruitment and placement processes.</li>
                <li>Professional registration bodies where checks are required.</li>
                <li>DBS or background-check providers where applicable.</li>
                <li>Payroll, accounting or payment providers where applicable.</li>
                <li>IT, hosting, email and website service providers.</li>
                <li>Insurers, legal advisers and professional advisers.</li>
                <li>Regulators, law enforcement or public authorities where required by law.</li>
              </ul>
              <p>We only share information where there is a valid reason to do so.</p>
            </Section>

            <Section title="7. How long we keep your information">
              <p>
                Client, candidate, placement and compliance records are retained only for as long as needed for business, legal, contract, tax, employment, safeguarding, insurance or compliance purposes.
              </p>
              <p>Typical retention periods may include:</p>
              <ul>
                <li>General enquiries: up to 2 years after the last contact.</li>
                <li>Client and contract records: up to 6 years after the end of the business relationship.</li>
                <li>Candidate registration records: up to 6 years after the last placement or meaningful contact.</li>
                <li>Payroll, tax and accounting records: up to 6 years, or longer where legally required.</li>
                <li>Website server logs: up to 90 days.</li>
              </ul>
              <p>
                Some records may be kept longer where required for legal claims, safeguarding, regulatory, insurance or compliance reasons.
              </p>
            </Section>

            <Section title="8. Your rights">
              <p>Under UK data protection law, you may have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Ask us to correct inaccurate or incomplete data.</li>
                <li>Ask us to erase your data where there is no overriding reason to keep it.</li>
                <li>Ask us to restrict certain processing.</li>
                <li>Object to certain processing.</li>
                <li>Request data portability where applicable.</li>
                <li>Withdraw consent where processing is based on consent.</li>
              </ul>
              <p>
                To exercise your rights, contact us at{' '}
                <a href="mailto:contact@horizoncareservices.org">contact@horizoncareservices.org</a>. We will usually respond within one calendar month.
              </p>
            </Section>

            <Section title="9. Complaints">
              <p>
                If you are unhappy with how we handle your personal data, please contact us first so we can try to resolve the issue.
              </p>
              <p>
                You also have the right to complain to the Information Commissioner&rsquo;s Office at{' '}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>{' '}
                or by telephone on 0303 123 1113.
              </p>
            </Section>

            <Section title="10. Cookies and similar technologies">
              <p>
                We do not use advertising cookies or cross-site profiling.
              </p>
              <p>
                We may use limited website technologies to operate the site, remember cookie choices and provide functional content.
              </p>
              <p>
                If you interact with the cookie banner on this site, we may save a single entry in your browser&rsquo;s local storage to remember the choice you made. This is used to operate the banner and is not shared with third parties.
              </p>
              <p>
                <strong>Third-party content.</strong> On the contact page, we may offer an interactive map. The map tiles may be served by a third-party map provider and the map library may be served by a third-party provider. These providers may receive your IP address and basic request information when the map is loaded. Where required, the map should only load after you have given consent through the cookie banner. You can change or withdraw your consent using the &ldquo;Cookie Preferences&rdquo; link in the footer.
              </p>
              <p>
                When functional content is off, we display a static placeholder and our office address remains available without loading third-party map content.
              </p>
            </Section>

            <Section title="11. Changes to this policy">
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

      </div>
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
