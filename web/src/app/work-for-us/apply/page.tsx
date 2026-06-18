import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { ExpressionForm } from '@/components/expression-form'

// This route now renders the shared application form (same form as
// /expression-of-interest, different framing). The previous multi-section
// PDF application lives alongside in this folder (apply-client.tsx, pdf.ts,
// etc.) and is kept for later use but no longer routed.
export const metadata: Metadata = {
  title: { absolute: 'Apply — Horizon Care Services' },
  description:
    'Apply for a role at Horizon Care Services. Complete the short application form and our recruitment team will be in touch.',
  robots: { index: false, follow: false },
}

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        kicker="Application"
        title="Apply for a role."
        intro="Complete the short application form below. Our recruitment team reviews every application and will be in touch — your details go straight to us."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ExpressionForm />
        </div>
      </section>
    </>
  )
}
