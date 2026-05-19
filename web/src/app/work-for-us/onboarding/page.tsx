import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { OnboardingClient } from './onboarding-client'

export const metadata: Metadata = {
  title: 'New worker onboarding — Horizon Care Services',
  description:
    'Complete your onboarding details so we can set you up on payroll and start assigning shifts.',
  robots: { index: false, follow: false },
}

export default function OnboardingPage() {
  return (
    <>
      <PageHeader
        kicker="New worker"
        title="Onboarding form."
        intro="Welcome to the team. Complete the sections below so we can set you up on payroll, arrange your contract, and start assigning you shifts."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Suspense fallback={<OnboardingFallback />}>
            <OnboardingClient />
          </Suspense>
        </div>
      </section>
    </>
  )
}

function OnboardingFallback() {
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
        Preparing your onboarding form…
      </p>
    </div>
  )
}
