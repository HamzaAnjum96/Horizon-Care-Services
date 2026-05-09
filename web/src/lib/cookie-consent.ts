'use client'

import { useEffect, useState } from 'react'

export type ConsentState = {
  essential: true
  functional: boolean
  timestamp: number
  version: 1
}

const STORAGE_KEY = 'hcs-consent-v1'
const VERSION: 1 = 1

const CONSENT_CHANGE = 'hcs:consent-change'
const OPEN_PREFERENCES = 'hcs:open-cookie-preferences'

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function writeConsent(input: { functional: boolean }): ConsentState {
  const state: ConsentState = {
    essential: true,
    functional: input.functional,
    timestamp: Date.now(),
    version: VERSION,
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable; consent applies for this tab only
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGE, { detail: state }))
  return state
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(OPEN_PREFERENCES))
}

// Hook returns:
//   undefined — not yet hydrated on the client
//   null      — no decision recorded
//   ConsentState — decision recorded
export function useConsent(): ConsentState | null | undefined {
  const [state, setState] = useState<ConsentState | null | undefined>(undefined)
  useEffect(() => {
    setState(readConsent())
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<ConsentState>
      setState(ce.detail ?? null)
    }
    window.addEventListener(CONSENT_CHANGE, onChange)
    return () => window.removeEventListener(CONSENT_CHANGE, onChange)
  }, [])
  return state
}

export const CONSENT_EVENTS = { CONSENT_CHANGE, OPEN_PREFERENCES }
