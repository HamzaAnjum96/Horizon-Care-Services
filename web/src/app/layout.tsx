import type { Metadata } from 'next'
import { Source_Serif_4, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { CookieBanner } from '@/components/cookie-banner'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-source-serif',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-bricolage',
  display: 'swap',
})

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Horizon Care Services',
    template: '%s — Horizon Care Services',
  },
  description:
    'Registered health and social care provider offering staffing solutions, home care, and specialist support across England. Company No. 14615041. Regulated by the CQC.',
  keywords: [
    'care services',
    'home care',
    'healthcare staffing',
    'specialist care',
    'dementia care',
    'hospice care',
    'nursing agency',
    'healthcare assistants',
    'CQC registered',
    'Manchester',
    'Bedfordshire',
    'England',
  ],
  authors: [{ name: 'Horizon Care Services Ltd' }],
  creator: 'Horizon Care Services Ltd',
  publisher: 'Horizon Care Services Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Horizon Care Services',
    title: 'Horizon Care Services',
    description:
      'Registered health and social care provider offering staffing solutions, home care, and specialist support across England.',
    images: [{ url: '/brand/hcs-banner-hero-primary-2x.png', width: 1200, height: 630, alt: 'Horizon Care Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horizon Care Services',
    description:
      'Registered health and social care provider offering staffing solutions, home care, and specialist support across England.',
    images: ['/brand/hcs-banner-hero-primary-2x.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#organization`,
  name: 'Horizon Care Services Ltd',
  alternateName: 'HCS',
  url: siteUrl,
  logo: `${siteUrl}/hcs-logo.svg`,
  description:
    'Registered health and social care provider offering staffing solutions, home care, and specialist support across England.',
  telephone: '+442037572767',
  email: 'contact@horizoncareservices.org',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '475B Cheetham Hill Road',
    addressLocality: 'Manchester',
    postalCode: 'M8 9LR',
    addressCountry: 'GB',
  },
  areaServed: [
    'Bedfordshire',
    'Buckinghamshire',
    'Cambridgeshire',
    'Hertfordshire',
    'Manchester',
    'London',
  ],
  knowsAbout: [
    'Home Care',
    'Healthcare Staffing',
    'Dementia Care',
    'Hospice Care',
    'End-of-Life Care',
    'Specialist Care',
  ],
  hasCredential: 'Care Quality Commission (CQC) Registered',
  identifier: { '@type': 'PropertyValue', name: 'Company Number', value: '14615041' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  sameAs: [`${siteUrl}/about/`],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${bricolage.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="grain-overlay" aria-hidden="true" />
        <div
          role="status"
          className="fixed bottom-0 left-0 right-0 z-30 bg-ink-dark/95 backdrop-blur-sm border-t border-rule-dark py-1.5 px-4 text-center pointer-events-none"
        >
          <p className="text-[10px] font-medium text-ink-muted-light tracking-[0.1em] uppercase">
            Development preview: content is not final and may contain placeholders
          </p>
        </div>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
