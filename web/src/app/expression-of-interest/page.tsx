import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'

// ── Embedded Google Form ────────────────────────────────────────
const FORM_ID = '1FAIpQLSc-6ShCKYrT4TN52MpXidw11H7N6CfgJ5gm8eNMSxzYk8EKiw'
const FORM_EMBED_SRC = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?embedded=true`
const FORM_OPEN_SRC = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`

// Height of the embedded form. Raise it if the form gains questions and an
// internal scrollbar appears; lower it to trim trailing blank space.
const FORM_HEIGHT = 1400

// Unlisted page: reachable only by people who have the direct link.
// Kept out of the sitemap, the /sitemap page, the nav and the footer, and
// marked noindex/nofollow so search engines and AI crawlers do not list it.
export const metadata: Metadata = {
  title: { absolute: 'Expression of Interest — Horizon Care Services' },
  description:
    'Register your interest in a role at Horizon Care Services. Complete the short form to share your details with our recruitment team.',
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
        intro="A quick first step before onboarding. Share your details and CV with our recruitment team using the short form below."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <iframe
            src={FORM_EMBED_SRC}
            title="Expression of interest form"
            loading="lazy"
            className="block w-full rounded-lg border border-rule-light bg-white"
            style={{ height: FORM_HEIGHT, border: 0 }}
          >
            Loading the form…
          </iframe>
          <p className="mt-4 text-center text-[12.5px] text-ink-muted-dark">
            Trouble with the form?{' '}
            <a
              href={FORM_OPEN_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-ink-dark transition-colors"
            >
              Open it in a new tab
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
