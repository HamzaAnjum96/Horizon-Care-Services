import type { Metadata } from 'next'
import { Source_Serif_4, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { CookieBanner } from '@/components/cookie-banner'
import { BackToTop } from '@/components/back-to-top'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ReadingProgress } from '@/components/blog/reading-progress'

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
    'Healthcare staffing agency placing registered nurses, senior healthcare assistants, healthcare assistants, and support workers across England. Company No. 14615041.',
  keywords: [
    'healthcare staffing agency',
    'nursing agency',
    'healthcare recruitment',
    'registered nurses',
    'senior healthcare assistants',
    'healthcare assistants',
    'support workers',
    'nursing homes',
    'residential care homes',
    'supported living',
    'NHS staffing',
    'Manchester',
    'Bedfordshire',
    'England',
    'care blog',
    'health and social care articles',
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
      'Healthcare staffing agency placing registered nurses, senior healthcare assistants, healthcare assistants, and support workers across England.',
    images: [{ url: '/brand/hcs-banner-hero@2x.png', width: 1920, height: 640, alt: 'Horizon Care Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horizon Care Services',
    description:
      'Healthcare staffing agency placing registered nurses, senior healthcare assistants, healthcare assistants, and support workers across England.',
    images: ['/brand/hcs-banner-hero@2x.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/hcs-icon-primary.png', type: 'image/png', sizes: '1024x1024' },
    ],
    apple: [{ url: '/brand/hcs-icon-primary.png', sizes: '1024x1024' }],
    shortcut: '/favicon.svg',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': ['EmploymentAgency', 'LocalBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: 'Horizon Care Services',
    legalName: 'Horizon Care Services Ltd',
    foundingDate: '2023',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/hcs-lockup-primary@2x.png`,
    },
    image: `${siteUrl}/brand/hcs-banner-hero@2x.png`,
    description:
      'Healthcare staffing agency placing registered nurses, senior healthcare assistants, healthcare assistants, and support workers with NHS trusts, nursing homes, residential care homes, and supported living services across England. Company No. 14615041.',
    telephone: '+442037572767',
    email: 'contact@horizoncareservices.org',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '475B Cheetham Hill Road, Cheetham Hill',
      addressLocality: 'Manchester',
      addressRegion: 'Greater Manchester',
      postalCode: 'M8 9LR',
      addressCountry: 'GB',
    },
    openingHours: 'Mo-Fr 09:00-17:00',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.507937,
      longitude: -2.241688,
    },
    knowsAbout: [
      'Healthcare Staffing',
      'Registered Nursing',
      'Senior Healthcare Assistants',
      'Healthcare Assistants',
      'Support Workers',
      'Nursing Homes',
      'Residential Care Homes',
      'Supported Living',
      'NHS Staffing',
      'Healthcare Recruitment',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+442037572767',
        contactType: 'customer service',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: '+442037572767',
        contactType: 'customer support',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Bedfordshire' },
      { '@type': 'AdministrativeArea', name: 'Greater Manchester' },
      { '@type': 'AdministrativeArea', name: 'Merseyside' },
      { '@type': 'AdministrativeArea', name: 'Lancashire' },
      { '@type': 'AdministrativeArea', name: 'Yorkshire' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Healthcare Staffing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Healthcare Staffing',
            description:
              'Registered nurses, senior healthcare assistants, healthcare assistants, and support workers supplied to NHS trusts, nursing homes, residential care homes, and supported living services at short or extended notice, available 24/7.',
            url: `${siteUrl}/services`,
          },
        },
      ],
    },
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'Companies House Number',
        value: '14615041',
      },
    ],
    sameAs: [
      'https://find-and-update.company-information.service.gov.uk/company/14615041',
      'https://www.horizon-careservices.co.uk',
      'https://horizon-careservices.co.uk',
    ],
    alternateName: 'Horizon Care Services (formerly horizon-careservices.co.uk)',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Horizon Care Services',
    publisher: { '@id': `${siteUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/sitemap?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
]

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${bricolage.variable} h-full`}
    >
      <head>
        {jsonLd.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand focus:text-ink-light focus:text-sm focus:font-semibold focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <ReadingProgress />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  )
}
