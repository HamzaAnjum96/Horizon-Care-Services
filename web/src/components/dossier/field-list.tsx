import type { ReactNode } from 'react'

type Tone = 'light' | 'dark'

export interface FieldEntry {
  label: string
  value: ReactNode
}

interface FieldListProps {
  entries: FieldEntry[]
  tone?: Tone
  className?: string
}

/**
 * A dossier definition list: monospace field label, value alongside, hairline
 * ruled. Replaces the repeated "uppercase label + value" sidebar blocks.
 */
export function FieldList({ entries, tone = 'light', className = '' }: FieldListProps) {
  const rule = tone === 'dark' ? 'border-rule-dark' : 'border-rule-light'
  const labelColor = tone === 'dark' ? 'text-ink-muted-light' : 'text-ink-muted-dark'
  const valueColor = tone === 'dark' ? 'text-ink-light' : 'text-ink-dark'

  return (
    <dl className={`border-t ${rule} ${className}`}>
      {entries.map((entry, i) => (
        <div
          key={i}
          className={`border-b ${rule} grid gap-x-5 gap-y-1.5 py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline`}
        >
          <dt className={`register-mono ${labelColor}`}>{entry.label}</dt>
          <dd className={`${valueColor} text-[14px] leading-relaxed`}>{entry.value}</dd>
        </div>
      ))}
    </dl>
  )
}
