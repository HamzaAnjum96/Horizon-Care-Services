import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { OnboardingClient } from './onboarding-client'

export const metadata = {
  title: 'New worker onboarding — Horizon Care Services',
  description: 'Complete your onboarding details so we can set you up on payroll and start assigning shifts.',
}

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-cream py-16">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-12">
          <Link
            href="/work-for-us"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted-dark hover:text-ink-dark transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Work for us
          </Link>

          <p className="section-kicker text-ink-muted-dark mb-3">New worker</p>
          <h1
            className="font-display text-ink-dark leading-tight tracking-[-0.02em] mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontVariationSettings: '"opsz" 36, "wght" 600',
            }}
          >
            Onboarding form
          </h1>
          <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[58ch]">
            Welcome to the team. Please complete the sections below so we can set you up on payroll, arrange your contract, and start assigning you shifts.
          </p>
          <p className="text-ink-muted-dark text-[13px] leading-relaxed max-w-[58ch] mt-3">
            Fields marked <span className="text-amber font-semibold">*</span> are required. Your data is stored securely and used only for employment and payroll purposes — see our{' '}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
        </div>

        <Suspense>
          <OnboardingClient />
        </Suspense>
      </div>
    </main>
  )
}
