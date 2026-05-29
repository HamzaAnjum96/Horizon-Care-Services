import type { ReactNode } from 'react'

interface RefLineProps {
  /** Reference segments, joined with a thin separator. e.g. ['HCS', 'Staffing', 'England'] */
  segments: string[]
  /** Leading label. Defaults to "Ref". */
  label?: string
  tone?: 'light' | 'dark'
  className?: string
  /** Optional trailing node (e.g. a stamp or a date). */
  trailing?: ReactNode
}

/**
 * A controlled-document reference line: monospace, tabular, hairline-separated.
 * Replaces the bare section-kicker where a dossier header is wanted.
 */
export function RefLine({ segments, label = 'Ref', tone = 'dark', className = '', trailing }: RefLineProps) {
  const muted = tone === 'dark' ? 'text-ink-muted-light' : 'text-ink-muted-dark'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`register-mono ${muted} flex items-center gap-2.5`}>
        <span className="text-amber-dim">{label}</span>
        <span aria-hidden="true" className="opacity-40">/</span>
        {segments.map((seg, i) => (
          <span key={seg} className="flex items-center gap-2.5">
            {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
            {seg}
          </span>
        ))}
      </span>
      {trailing}
    </div>
  )
}
