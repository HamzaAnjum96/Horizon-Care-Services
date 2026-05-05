import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/layout/page-header'
import { BrandingGrid } from './branding-grid'

export const metadata: Metadata = {
  title: 'Brand Assets — Horizon Care Services',
  description: 'Downloadable logo assets for Horizon Care Services in all approved colour variants.',
}

export default function BrandingPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader
          kicker="Brand Assets"
          title="Logo & Branding"
          intro="Download the Horizon Care Services logo in all approved formats and colour variants. Each file exports as a high-resolution PNG."
        />
        <BrandingGrid />
      </main>
      <Footer />
    </>
  )
}
