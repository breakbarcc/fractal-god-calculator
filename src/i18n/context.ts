import { createContext, useContext } from 'react'
import type { Language } from './language'
import type { Translate } from './translate'

export interface I18n {
  lang: Language
  t: Translate
  /** Locale-aware integer formatting (rounded). */
  fmt: (n: number) => string
  /** Locale-aware "in N days from today" date. */
  formatDate: (daysFromNow: number) => string
}

export const I18nContext = createContext<I18n | null>(null)

export function useI18n(): I18n {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
