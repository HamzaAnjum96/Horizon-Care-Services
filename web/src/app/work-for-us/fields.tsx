'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const labelCls =
  'block text-[11px] font-semibold tracking-[0.1em] text-ink-muted-dark uppercase mb-1.5'

const inputCls =
  'block w-full bg-cream border border-rule-light rounded-md px-3.5 py-2.5 text-[14px] text-ink-dark placeholder:text-ink-muted-dark/50 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition-colors'

const errorCls = 'mt-1.5 text-[12px] text-amber font-medium leading-snug'

export function Field({
  label,
  required,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string
  required?: boolean
  htmlFor?: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
        {required && <span className="text-amber ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1 text-[12px] text-ink-muted-dark/80">{hint}</p>
      )}
      {error && (
        <p role="alert" className={errorCls}>
          {error}
        </p>
      )}
    </div>
  )
}

export function TextInput({
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  invalid,
  readOnly,
  maxLength,
  className,
}: {
  id?: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal'
  invalid?: boolean
  readOnly?: boolean
  maxLength?: number
  className?: string
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      readOnly={readOnly}
      maxLength={maxLength}
      aria-invalid={invalid || undefined}
      className={cn(
        inputCls,
        invalid && 'border-amber focus:border-amber focus:ring-amber/30',
        readOnly && 'bg-cream-dim cursor-default',
        className,
      )}
    />
  )
}

export function TextArea({
  id,
  value,
  onChange,
  rows = 4,
  placeholder,
  invalid,
  maxLength,
}: {
  id?: string
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
  invalid?: boolean
  maxLength?: number
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      maxLength={maxLength}
      aria-invalid={invalid || undefined}
      className={cn(
        inputCls,
        'resize-y leading-relaxed',
        invalid && 'border-amber focus:border-amber focus:ring-amber/30',
      )}
    />
  )
}

export function Select({
  id,
  value,
  onChange,
  options,
  invalid,
}: {
  id?: string
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string }>
  invalid?: boolean
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid || undefined}
      className={cn(
        inputCls,
        'appearance-none bg-[length:14px] bg-no-repeat bg-[right_1rem_center] pr-10',
        invalid && 'border-amber focus:border-amber focus:ring-amber/30',
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23584E4E' stroke-width='1.5' d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E\")",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  invalid,
}: {
  name: string
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string }>
  invalid?: boolean
}) {
  return (
    <div role="radiogroup" aria-invalid={invalid || undefined} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value
        return (
          <label
            key={o.value}
            className={cn(
              'cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-md border text-[13px] font-medium transition-colors select-none',
              active
                ? 'bg-deep text-ink-light border-deep'
                : 'bg-cream text-ink-dark border-rule-light hover:border-ink-muted-dark/40',
              invalid && !active && 'border-amber/60',
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              className={cn(
                'inline-block w-3 h-3 rounded-full border',
                active ? 'border-ink-light bg-amber' : 'border-rule-light bg-transparent',
              )}
              aria-hidden="true"
            />
            {o.label}
          </label>
        )
      })}
    </div>
  )
}

export function CheckboxGroup({
  values,
  onChange,
  options,
}: {
  values: string[]
  onChange: (next: string[]) => void
  options: readonly string[]
}) {
  const toggle = (v: string) => {
    if (values.includes(v)) onChange(values.filter((x) => x !== v))
    else onChange([...values, v])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = values.includes(o)
        return (
          <button
            key={o}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() => toggle(o)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-[12.5px] font-medium transition-colors',
              active
                ? 'bg-deep text-ink-light border-deep'
                : 'bg-cream text-ink-dark border-rule-light hover:border-ink-muted-dark/40',
            )}
          >
            <span
              className={cn(
                'inline-block w-3 h-3 rounded-sm border',
                active ? 'border-ink-light bg-amber' : 'border-rule-light bg-transparent',
              )}
              aria-hidden="true"
            />
            {o}
          </button>
        )
      })}
    </div>
  )
}

export function Checkbox({
  id,
  checked,
  onChange,
  label,
  invalid,
}: {
  id?: string
  checked: boolean
  onChange: (v: boolean) => void
  label: ReactNode
  invalid?: boolean
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group select-none">
      <span className="relative flex-shrink-0 mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={invalid || undefined}
          className="sr-only peer"
        />
        <span
          className={cn(
            'block w-[18px] h-[18px] rounded border bg-cream transition-colors',
            checked ? 'bg-deep border-deep' : 'border-rule-light group-hover:border-ink-muted-dark/40',
            invalid && !checked && 'border-amber',
          )}
        />
        {checked && (
          <svg
            viewBox="0 0 16 16"
            className="absolute inset-0 m-auto w-3 h-3 text-amber pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8.5l3 3 7-7" />
          </svg>
        )}
      </span>
      <span className="text-[13.5px] text-ink-dark leading-snug">{label}</span>
    </label>
  )
}

export function FieldGrid({
  cols = 2,
  children,
}: {
  cols?: 2 | 3 | 4
  children: ReactNode
}) {
  const colClass =
    cols === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : cols === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2'
  return <div className={cn('grid gap-x-5 gap-y-5', colClass)}>{children}</div>
}

// ── Domain-specific field components ───────────────────────────
// Each one encodes the label, input type, autocomplete, formatting
// and validation props in one place so every usage stays consistent.

export function EmailField({
  id,
  label = 'Email',
  required,
  value,
  onChange,
  error,
  autoComplete = 'email',
}: {
  id?: string
  label?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  error?: string
  autoComplete?: string
}) {
  return (
    <Field label={label} required={required} htmlFor={id} error={error}>
      <TextInput
        id={id}
        type="email"
        inputMode="email"
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        invalid={Boolean(error)}
      />
    </Field>
  )
}

export function PhoneField({
  id,
  label = 'Phone',
  required,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: {
  id?: string
  label?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <Field label={label} required={required} htmlFor={id} error={error}>
      <TextInput
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        invalid={Boolean(error)}
      />
    </Field>
  )
}

export function NiNumberField({
  id,
  value,
  onChange,
  error,
}: {
  id?: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <Field
      label="National Insurance number"
      required
      htmlFor={id}
      error={error}
      hint="Format: AB 12 34 56 C"
    >
      <TextInput
        id={id}
        value={value}
        onChange={(v) => onChange(v.toUpperCase())}
        invalid={Boolean(error)}
        maxLength={13}
      />
    </Field>
  )
}

export type AddressValue = {
  line1: string
  line2: string
  town: string
  county: string
  postcode: string
  yearsAtAddress: string
  previousAddress: string
}

export function AddressFields({
  value,
  onChange,
  errors = {},
  idPrefix = 'addr',
}: {
  value: AddressValue
  onChange: (patch: Partial<AddressValue>) => void
  errors?: { line1?: string; town?: string; postcode?: string }
  idPrefix?: string
}) {
  return (
    <div className="space-y-6">
      <FieldGrid>
        <Field label="Address line 1" required htmlFor={`${idPrefix}-1`} error={errors.line1}>
          <TextInput
            id={`${idPrefix}-1`}
            autoComplete="address-line1"
            value={value.line1}
            onChange={(v) => onChange({ line1: v })}
            invalid={Boolean(errors.line1)}
          />
        </Field>
        <Field label="Address line 2" htmlFor={`${idPrefix}-2`}>
          <TextInput
            id={`${idPrefix}-2`}
            autoComplete="address-line2"
            value={value.line2}
            onChange={(v) => onChange({ line2: v })}
          />
        </Field>
      </FieldGrid>
      <FieldGrid cols={4}>
        <Field label="Town / city" required htmlFor={`${idPrefix}-town`} error={errors.town}>
          <TextInput
            id={`${idPrefix}-town`}
            autoComplete="address-level2"
            value={value.town}
            onChange={(v) => onChange({ town: v })}
            invalid={Boolean(errors.town)}
          />
        </Field>
        <Field label="County" htmlFor={`${idPrefix}-county`}>
          <TextInput
            id={`${idPrefix}-county`}
            autoComplete="address-level1"
            value={value.county}
            onChange={(v) => onChange({ county: v })}
          />
        </Field>
        <Field label="Postcode" required htmlFor={`${idPrefix}-postcode`} error={errors.postcode}>
          <TextInput
            id={`${idPrefix}-postcode`}
            autoComplete="postal-code"
            placeholder="LU3 3JG"
            value={value.postcode}
            onChange={(v) => onChange({ postcode: v.toUpperCase() })}
            invalid={Boolean(errors.postcode)}
          />
        </Field>
        <Field label="Years at this address" htmlFor={`${idPrefix}-years`}>
          <TextInput
            id={`${idPrefix}-years`}
            inputMode="numeric"
            value={value.yearsAtAddress}
            onChange={(v) => onChange({ yearsAtAddress: v })}
          />
        </Field>
      </FieldGrid>
      <Field
        label="Previous address"
        htmlFor={`${idPrefix}-prev`}
        hint="Required if less than 3 years at current address"
      >
        <TextArea
          id={`${idPrefix}-prev`}
          rows={3}
          value={value.previousAddress}
          onChange={(v) => onChange({ previousAddress: v })}
        />
      </Field>
    </div>
  )
}
