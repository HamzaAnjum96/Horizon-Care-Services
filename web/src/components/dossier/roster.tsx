type Tone = 'light' | 'dark'

export interface RosterEntry {
  /** Professional code, e.g. 'RGN', 'HCPC', 'SW'. */
  code: string
  role: string
  /** One-line scope note. */
  scope?: string
}

interface RosterProps {
  entries: RosterEntry[]
  tone?: Tone
  className?: string
}

/**
 * A typographic roster of staff types, on theme: practitioners are "on the
 * register". A mono code column, the role, a one-line scope, hairline-ruled.
 * Replaces staff-type card grids.
 */
export function Roster({ entries, tone = 'light', className = '' }: RosterProps) {
  const rule = tone === 'dark' ? 'border-rule-dark' : 'border-rule-light'
  const codeColor = tone === 'dark' ? 'text-amber-dim' : 'text-amber'
  const roleColor = tone === 'dark' ? 'text-ink-light' : 'text-ink-dark'
  const scopeColor = tone === 'dark' ? 'text-ink-muted-light' : 'text-ink-muted-dark'

  return (
    <dl className={`border-t ${rule} ${className}`}>
      {entries.map((entry) => (
        <div
          key={entry.code + entry.role}
          className={`border-b ${rule} grid grid-cols-[3.5rem_1fr] gap-x-5 gap-y-1 py-4 sm:grid-cols-[4.5rem_minmax(0,16rem)_1fr] sm:items-baseline`}
        >
          <dt className={`register-mono ${codeColor} self-baseline`}>{entry.code}</dt>
          <dd
            className={`font-display ${roleColor} leading-snug tracking-[-0.01em]`}
            style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', fontVariationSettings: '"opsz" 20, "wght" 580' }}
          >
            {entry.role}
          </dd>
          {entry.scope && (
            <dd className={`col-span-2 sm:col-span-1 ${scopeColor} text-[14px] leading-relaxed`}>
              {entry.scope}
            </dd>
          )}
        </div>
      ))}
    </dl>
  )
}
