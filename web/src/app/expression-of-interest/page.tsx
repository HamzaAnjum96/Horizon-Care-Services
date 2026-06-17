import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { ExpressionForm } from './eoi-form'

// Unlisted page: reachable only by people who have the direct link.
// Kept out of the sitemap, the /sitemap page, the nav and the footer, and
// marked noindex/nofollow so search engines and AI crawlers do not list it.
export const metadata: Metadata = {
  title: { absolute: 'Expression of Interest — Horizon Care Services' },
  description:
    'Register your interest in a role at Horizon Care Services. Share your details with our recruitment team.',
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
        intro="A quick first step before onboarding. Share your details with our recruitment team using the short form below."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <ExpressionForm />
        </div>
      </section>
    </>
  )
}
