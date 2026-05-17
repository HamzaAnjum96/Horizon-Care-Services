import type { Metadata } from 'next'
import { Source_Serif_4, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { CookieBanner } from '@/components/cookie-banner'
import { BackToTop } from '@/components/back-to-top'

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
    images: [{ url: '/brand/hcs-banner-hero@2x.png', width: 1920, height: 640, alt: 'Horizon Care Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horizon Care Services',
    description:
      'Registered health and social care provider offering staffing solutions, home care, and specialist support across England.',
    images: ['/brand/hcs-banner-hero@2x.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'MedicalOrganization'],
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
      'Registered health and social care provider offering staffing solutions, home care, and specialist support across England. Regulated by the Care Quality Commission (CQC). Company No. 14615041.',
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
      'Home Care',
      'Healthcare Staffing',
      'Dementia Care',
      'Hospice Care',
      'Palliative Care',
      'Personal Care',
      'Registered Nursing',
      'Social Work',
      'Occupational Therapy',
      'Healthcare Assistants',
      'Support Workers',
      'CQC Regulated Care',
      'Health and Social Care Act 2008',
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
      { '@type': 'AdministrativeArea', name: 'Buckinghamshire' },
      { '@type': 'AdministrativeArea', name: 'Cambridgeshire' },
      { '@type': 'AdministrativeArea', name: 'Hertfordshire' },
      { '@type': 'City', name: 'Manchester' },
      { '@type': 'City', name: 'London' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Care Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Care',
            description:
              'Personal care, medication management, companionship, and respite support delivered in the client\'s own home.',
            url: `${siteUrl}/services/home-care`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Staffing Solutions',
            description:
              'Registered nurses, healthcare assistants, support workers, and allied health professionals supplied at short or extended notice, available 24/7.',
            url: `${siteUrl}/services/staffing`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Specialist Care',
            description:
              'Specialist support for people living with dementia and Alzheimer\'s, and those with life-limiting conditions including hospice and end-of-life care.',
            url: `${siteUrl}/services/specialist`,
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
      {
        '@type': 'PropertyValue',
        name: 'CQC Registration',
        propertyID: 'https://www.cqc.org.uk',
        value: 'CQC registered provider — England',
      },
    ],
    sameAs: [
      'https://find-and-update.company-information.service.gov.uk/company/14615041',
      'https://www.cqc.org.uk',
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
        {children}
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  )
}
