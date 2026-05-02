import Link from 'next/link'
import { HCSLogoMark } from '@/components/hcs-logo'

export function Footer() {
  return (
    <footer className="footer-texture bg-deep border-t border-rule-dark">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-14 pb-8">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <HCSLogoMark className="h-[24px] w-[24px] flex-shrink-0 text-ink-muted-light" />
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
          <address className="not-italic text-ink-muted-light text-[14px] leading-[1.75]">
            <p>475B Cheetham Hill Road, Cheetham Hill</p>
            <p className="mb-3">Manchester, M8 9LR</p>
            <p>
              <a href="tel:07572701349" className="hover:text-ink-light transition-colors">
                07572 701 349
              </a>
              <span className="mx-2 opacity-40">·</span>
              <a href="tel:01582354119" className="hover:text-ink-light transition-colors">
                01582 354 119
              </a>
            </p>
            <p>
              <a href="mailto:admin@horizoncareservices.org" className="hover:text-ink-light transition-colors">
                admin@horizoncareservices.org
              </a>
            </p>
          </address>

        </div>

        <div className="border-t border-rule-dark mt-12 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[11px] text-ink-muted-light">
            &copy; {new Date().getFullYear()} Horizon Care Services
            <span className="mx-2 opacity-40">·</span>
            Company No. 14615041
          </p>
          <div className="flex items-center gap-5">
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
          </div>
        </div>

      </div>
    </footer>
  )
}
