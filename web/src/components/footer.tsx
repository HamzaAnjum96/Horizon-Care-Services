import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { HCSLogoMark } from '@/components/hcs-logo'
import { CookiePreferencesLink } from '@/components/cookie-preferences-link'

export function Footer() {
  return (
    <footer className="footer-atmosphere bg-deep border-t border-rule-dark" aria-label="Site footer">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-14 pb-8">

        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <HCSLogoMark className="h-[24px] w-[24px] flex-shrink-0 text-ink-light" />
              <p
                className="font-display text-ink-light text-[15px]"
                style={{ fontVariationSettings: '"opsz" 14, "wght" 600' }}
              >
                Horizon Care Services
              </p>
            </div>
            <p className="text-ink-muted-light text-[14px] leading-relaxed max-w-[34ch]">
              Professional health and social care with a calm, personal approach.
            </p>
          </div>

          {/* Contact column */}
          <address className="not-italic text-ink-muted-light text-[14px] text-left">
            <div className="flex items-start gap-2.5 mb-3">
              <MapPin
                size={14}
                strokeWidth={1.5}
                className="flex-shrink-0 mt-0.5"
                style={{ color: 'var(--amber-dim)' }}
                aria-hidden="true"
              />
              <div className="leading-[1.75]">
                <p>475B Cheetham Hill Road,</p>
                <p>Cheetham Hill</p>
                <p>Manchester, M8 9LR</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone
                size={14}
                strokeWidth={1.5}
                className="flex-shrink-0"
                style={{ color: 'var(--amber-dim)' }}
                aria-hidden="true"
              />
              <a href="tel:02037572767" className="hover:text-ink-light transition-colors">
                020 3757 2767
              </a>
            </div>
            <div className="flex items-center gap-2.5 mt-1.5">
              <Mail
                size={14}
                strokeWidth={1.5}
                className="flex-shrink-0"
                style={{ color: 'var(--amber-dim)' }}
                aria-hidden="true"
              />
              <a href="mailto:contact@horizoncareservices.org" className="hover:text-ink-light transition-colors">
                contact@horizoncareservices.org
              </a>
            </div>
          </address>

        </div>

        <div className="border-t border-rule-dark mt-12 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[11px] text-ink-muted-light">
            &copy; {new Date().getFullYear()} Horizon Care Services
            <span className="mx-2 opacity-40">·</span>
            Company No. 14615041
          </p>
          <div className="grid grid-cols-2 w-full sm:w-auto sm:flex sm:items-center gap-x-5 gap-y-2.5 [&>*:nth-child(even)]:justify-self-end sm:[&>*:nth-child(even)]:justify-self-auto">
            <Link
              href="/legal"
              className="text-[11px] text-ink-muted-light hover:text-ink-light transition-colors"
            >
              Legal Notice
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[11px] text-ink-muted-light hover:text-ink-light transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/sitemap"
              className="text-[11px] text-ink-muted-light hover:text-ink-light transition-colors"
            >
              Site Map
            </Link>
            <CookiePreferencesLink className="text-[11px] text-ink-muted-light hover:text-ink-light transition-colors" />
          </div>
        </div>

      </div>
    </footer>
  )
}
