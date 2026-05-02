import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface PageHeaderProps {
  kicker: string
  title: string
  intro?: string
  cta?: { label: string; href: string }
}

export function PageHeader({ kicker, title, intro, cta }: PageHeaderProps) {
  return (
    <div className="bg-deep border-b border-rule-dark pt-28 pb-16 lg:pt-32 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-kicker text-ink-muted-light mb-5">{kicker}</p>
        <h1
          className="font-display text-ink-light leading-[0.96] tracking-[-0.03em] mb-0"
          style={{
            fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
            fontVariationSettings: '"opsz" 56, "wght" 600',
          }}
        >
          {title}
        </h1>
        {(intro || cta) && (
          <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            {intro && (
              <p
                className="text-ink-muted-light leading-relaxed max-w-[50ch]"
                style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}
              >
                {intro}
              </p>
            )}
            {cta && (
              <Link
                href={cta.href}
                className="interactive-lift inline-flex items-center gap-2 bg-amber text-deep px-6 py-3 rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
              >
                {cta.label} <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
