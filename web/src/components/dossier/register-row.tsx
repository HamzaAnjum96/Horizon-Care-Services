import type { ReactNode } from 'react'

type Tone = 'light' | 'dark'

interface RegisterProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

/** Wraps a sequence of RegisterRows and closes the ledger with a final rule. */
export function Register({ children, tone = 'light', className = '' }: RegisterProps) {
  const rule = tone === 'dark' ? 'border-rule-dark' : 'border-rule-light'
  return (
    <div className={className}>
      {children}
      <div className={`border-t ${rule}`} aria-hidden="true" />
    </div>
  )
}

interface RegisterRowProps {
  /** Marginalia field code, e.g. 'VETTING', '§01', 'RGN'. */
  code: string
  title?: string
  body?: ReactNode
  /** Override the content area entirely (code stays in the margin). */
  children?: ReactNode
  tone?: Tone
  /** Pull the title large, as a lead entry. */
  lead?: boolean
}

/**
 * One ruled record in a dossier: a monospace field code in the margin, a
 * hairline top rule, then content. The workhorse that replaces card grids
 * and numbered-box grids across the site.
 */
export function RegisterRow({ code, title, body, children, tone = 'light', lead = false }: RegisterRowProps) {
  const rule = tone === 'dark' ? 'border-rule-dark' : 'border-rule-light'
  const codeColor = tone === 'dark' ? 'text-ink-muted-light' : 'text-ink-muted-dark'
  const titleColor = tone === 'dark' ? 'text-ink-light' : 'text-ink-dark'
  const bodyColor = tone === 'dark' ? 'text-ink-muted-light' : 'text-ink-muted-dark'

  return (
    <div
      className={`border-t ${rule} grid gap-x-8 gap-y-3 py-7 lg:py-8 lg:grid-cols-[7rem_1fr] lg:items-baseline`}
    >
      <span className={`register-mono ${codeColor} pt-1 lg:pt-1.5`} aria-hidden="true">
        {code}
      </span>

      {children ? (
        <div>{children}</div>
      ) : (
        <div className="grid gap-x-8 gap-y-2 lg:grid-cols-[1fr_1.5fr] lg:items-baseline">
          {title && (
            <h3
              className={`font-display ${titleColor} leading-snug tracking-[-0.015em]`}
              style={{
                fontSize: lead ? 'clamp(1.4rem, 2.6vw, 2rem)' : 'clamp(1.05rem, 1.6vw, 1.3rem)',
                fontVariationSettings: lead ? '"opsz" 32, "wght" 560' : '"opsz" 22, "wght" 620',
              }}
            >
              {title}
            </h3>
          )}
          {body && (
            <div className={`${bodyColor} text-[15px] leading-relaxed`}>{body}</div>
          )}
        </div>
      )}
    </div>
  )
}
