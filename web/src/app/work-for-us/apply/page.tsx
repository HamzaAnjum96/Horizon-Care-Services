import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { ApplyClient } from './apply-client'

export const metadata: Metadata = {
  title: 'Apply — Horizon Care Services',
  description:
    'Apply for a role at Horizon Care Services. Complete the application and download a branded PDF to send to our careers team.',
  robots: { index: false, follow: false },
}

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        kicker="Application"
        title="Apply for a role."
        intro="Complete the application below. When you’re done, we’ll generate a branded PDF for you to download and send to our careers team. Your data is processed in your browser, nothing is submitted automatically."
        refSegments={['HCS', 'Careers', 'Application']}
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Suspense fallback={<ApplyFallback />}>
            <ApplyClient />
          </Suspense>
        </div>
      </section>
    </>
  )
}

function ApplyFallback() {
  return (
    <div className="py-20 text-center">
      <p className="section-kicker text-ink-muted-dark mb-3">Loading</p>
      <p
        className="font-display text-ink-dark"
        style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          fontVariationSettings: '"opsz" 22, "wght" 560',
        }}
      >
        Preparing your application…
      </p>
    </div>
  )
}
