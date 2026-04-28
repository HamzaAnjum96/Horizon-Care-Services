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
    <footer className="bg-bg-deep border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-14">
          <div>
            <p className="font-display font-semibold text-text-inv text-[17px] mb-5">
              Horizon Care Services
            </p>
            <address className="not-italic text-green-muted text-[14px] leading-7">
              9 Lilac Grove
              <br />
              Luton, LU3 3JG
              <br />
              <a
                href="tel:07572701349"
                className="hover:text-text-inv transition-colors"
              >
                07572 701 349
              </a>
              <br />
              <a
                href="tel:01582354119"
                className="hover:text-text-inv transition-colors"
              >
                01582 354 119
              </a>
              <br />
              <a
                href="mailto:admin@horizon-careservices.co.uk"
                className="hover:text-text-inv transition-colors"
              >
                admin@horizon-careservices.co.uk
              </a>
            </address>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-text-muted mb-4">
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-muted text-[14px] hover:text-text-inv transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-text-muted mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-muted text-[14px] hover:text-text-inv transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[12px] text-text-muted">
            &copy; {new Date().getFullYear()} Horizon Care Services. All rights
            reserved.
          </p>
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-text-muted">
            Health &amp; Social Care Provider
          </p>
        </div>
      </div>
    </footer>
  )
}
