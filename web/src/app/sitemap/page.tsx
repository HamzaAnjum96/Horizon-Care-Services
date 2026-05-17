import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'

const BASE = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: 'Site Map — Horizon Care Services',
  description: 'All pages on the Horizon Care Services website, plus machine-readable files for search engines and AI.',
  alternates: { canonical: `${BASE}/sitemap` },
}

const PAGE_GROUPS: {
  kicker: string
  pages: { title: string; href: string; external?: boolean; description: string }[]
}[] = [
  {
    kicker: 'Main',
    pages: [
      { title: 'Home',    href: '/',        description: 'Overview of services, who we help, and how to get in touch.' },
      { title: 'About',   href: '/about',   description: 'Who we are, our regulatory status, and the principles we work by.' },
      { title: 'Contact', href: '/contact', description: 'Phone, email, WhatsApp, and a referral enquiry form.' },
    ],
  },
  {
    kicker: 'Services',
    pages: [
      { title: 'Services overview',  href: '/services',           description: 'All care and staffing services at a glance.' },
      { title: 'Staffing solutions', href: '/services/staffing',  description: 'Registered nurses, healthcare assistants, and support workers for shifts and long-term placements.' },
      { title: 'Home care',          href: '/services/home-care', description: 'Personal care, companionship, and support delivered in the client\'s own home.' },
      { title: 'Specialist care',    href: '/services/specialist',description: 'Dementia and Alzheimer\'s care, hospice support, and end-of-life care.' },
    ],
  },
  {
    kicker: 'Referrals',
    pages: [
      { title: 'Referrals', href: '/referrals', description: 'How NHS discharge planners and social workers can refer. We respond within 2 working days.' },
    ],
  },
  {
    kicker: 'Writing',
    pages: [
      { title: 'Blog', href: '/blog', description: 'Articles, notes, and field experience from the team — plain-English guidance for families and referrers.' },
    ],
  },
  {
    kicker: 'Work for us',
    pages: [
      { title: 'Work for us', href: '/work-for-us', description: 'Career opportunities for nurses, healthcare assistants, support workers, and allied health professionals.' },
    ],
  },
  {
    kicker: 'Brand',
    pages: [
      { title: 'Brand assets', href: '/branding', description: 'Downloadable logo assets in all approved colour variants for use in partner materials.' },
    ],
  },
  {
    kicker: 'Legal',
    pages: [
      { title: 'Privacy policy', href: '/privacy-policy', description: 'How we collect, use, and protect personal data.' },
      { title: 'Legal notice',   href: '/legal',          description: 'Company registration, regulatory status, and website terms.' },
    ],
  },
]

const AI_FILES = [
  {
    title: 'llms.txt',
    href: '/llms.txt',
    description: 'Concise, structured summary of the organisation and its services. Written for AI language models that index websites to answer user queries.',
  },
  {
    title: 'llms-full.txt',
    href: '/llms-full.txt',
    description: 'Full content version for AI indexing — more detail on services, referral processes, staffing, and contact information.',
  },
  {
    title: 'sitemap.xml',
    href: '/sitemap.xml',
    description: 'Standard XML sitemap listing all public URLs with last-modified dates. Read by Google, Bing, and other search engines.',
  },
  {
    title: 'robots.txt',
    href: '/robots.txt',
    description: 'Crawler access rules. All major search and AI crawlers are explicitly permitted, including GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.',
  },
]

export default function SitemapPage() {
  return (
    <>
      <div className="pb-20">
        <PageHeader
          kicker="Site map"
          title="Everything on this site."
          intro="All pages, plus the machine-readable files used by search engines and AI."
          showGrid={false}
        />

        <div className="bg-cream">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

            {/* ── Page sections ── */}
            <div className="space-y-0">
              {PAGE_GROUPS.map(({ kicker, pages }) => (
                <div
                  key={kicker}
                  className="border-t border-rule-light py-10"
                >
                  <p className="section-kicker text-ink-muted-dark mb-6">{kicker}</p>
                  <ul className="space-y-5">
                    {pages.map(({ title, href, description }) => (
                      <li key={href} className="grid sm:grid-cols-[1fr_auto] gap-1 sm:gap-8 sm:items-baseline">
                        <div>
                          <Link
                            href={href}
                            className="font-display text-ink-dark hover:text-amber transition-colors"
                            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', fontVariationSettings: '"opsz" 18, "wght" 560' }}
                          >
                            {title}
                          </Link>
                          <p className="text-ink-muted-dark text-[13px] leading-relaxed mt-1 max-w-[52ch]">
                            {description}
                          </p>
                        </div>
                        <span className="font-mono text-[11px] text-ink-muted-dark/60 tracking-wide sm:text-right flex-shrink-0">
                          {href === '/' ? BASE + '/' : BASE + href}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── AI & machine-readable ── */}
            <div className="border-t border-rule-light pt-10 mt-0">
              <p className="section-kicker text-ink-muted-dark mb-2">Machine-readable</p>
              <p className="text-ink-muted-dark text-[14px] leading-relaxed mb-8 max-w-[52ch]">
                Files for search engines, AI crawlers, and developer tooling. Publicly accessible at the paths below.
              </p>
              <ul className="space-y-6">
                {AI_FILES.map(({ title, href, description }) => (
                  <li key={href} className="grid sm:grid-cols-[1fr_auto] gap-1 sm:gap-8 sm:items-baseline">
                    <div>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[14px] font-medium text-ink-dark hover:text-amber transition-colors"
                      >
                        {href}
                      </a>
                      <p className="text-ink-muted-dark text-[13px] leading-relaxed mt-1 max-w-[52ch]">
                        {description}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-ink-muted-dark/60 tracking-wide sm:text-right flex-shrink-0 hidden sm:block">
                      {title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
