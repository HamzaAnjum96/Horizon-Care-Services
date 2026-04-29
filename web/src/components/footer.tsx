import Link from 'next/link'

const serviceLinks = [
  { href: '/services/supported-accommodation', label: 'Supported Accommodation' },
  { href: '/services/staffing', label: 'Staffing Solutions' },
  { href: '/services/home-care', label: 'Home Care' },
  { href: '/services/specialist', label: 'Specialist Care' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/referrals', label: 'Make a Referral' },
  { href: '/work-for-us', label: 'Work For Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/legal', label: 'Legal Notice' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
]

export function Footer() {
  return (
    <footer className="bg-deep border-t border-rule-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-14">
          <div>
            <p
              className="font-display text-ink-light text-[16px] mb-4"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 600' }}
            >
              Horizon Care Services
            </p>
            <p className="text-ink-muted-light text-[14px] mb-5 leading-relaxed max-w-[30ch]">
              Professional health and social care with a calm, personal approach.
            </p>
            <address className="not-italic text-ink-muted-light text-[14px] leading-7">
              475B Cheetham Hill Road
              <br />
              Cheetham Hill, Manchester, M89LR
              <br />
              <a
                href="tel:07572701349"
                className="interactive-lift hover:text-ink-light transition-colors"
              >
                07572 701 349
              </a>
              <br />
              <a
                href="tel:01582354119"
                className="interactive-lift hover:text-ink-light transition-colors"
              >
                01582 354 119
              </a>
              <br />
              <a
                href="mailto:admin@horizon-careservices.co.uk"
                className="interactive-lift hover:text-ink-light transition-colors"
              >
                admin@horizon-careservices.co.uk
              </a>
            </address>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-ink-muted-light mb-4">
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="interactive-lift text-ink-muted-light text-[14px] hover:text-ink-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-ink-muted-light mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="interactive-lift text-ink-muted-light text-[14px] hover:text-ink-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-rule-dark pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[12px] text-ink-muted-light">
            &copy; {new Date().getFullYear()} Horizon Care Services. All rights reserved.
          </p>
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-ink-muted-light">
            Trusted Health &amp; Social Care Provider
          </p>
        </div>
      </div>
    </footer>
  )
}
