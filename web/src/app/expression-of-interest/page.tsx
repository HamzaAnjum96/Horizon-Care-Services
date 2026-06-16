import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { ExpressionClient } from './eoi-client'

// Unlisted page: reachable only by people who have the direct link.
// It is deliberately kept out of the sitemap, the /sitemap page, the nav,
// and the footer, and is marked noindex/nofollow so search engines and AI
// crawlers do not list it.
export const metadata: Metadata = {
  title: { absolute: 'Expression of Interest — Horizon Care Services' },
  description:
    'Register your interest in a role at Horizon Care Services. Complete the short form and download a branded PDF to send to our careers team.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function ExpressionOfInterestPage() {
  return (
    <>
      <PageHeader
        kicker="Expression of interest"
        title="Register your interest."
        intro="A quick first step before onboarding. Share your details and CV, and we’ll generate a branded PDF for you to send to our careers team. Your information is processed in your browser — nothing is submitted automatically."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ExpressionClient />
        </div>
      </section>
    </>
  )
}
