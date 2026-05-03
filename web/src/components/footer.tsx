import Link from 'next/link'
import { HCSLogoMark } from '@/components/hcs-logo'

export function Footer() {
  return (
    <footer className="footer-texture bg-deep border-t border-rule-dark">
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
          <address className="not-italic text-ink-muted-light text-[14px] leading-[1.75] text-right sm:text-right">
            <p>475B Cheetham Hill Road,</p>
            <p>Cheetham Hill</p>
            <p className="mb-3">Manchester, M8 9LR</p>
            <p>
              <a href="tel:02037572767" className="hover:text-ink-light transition-colors">
                020 3757 2767
              </a>
            </p>
            <p>
              <a href="mailto:contact@horizoncareservices.org" className="hover:text-ink-light transition-colors">
                contact@horizoncareservices.org
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
