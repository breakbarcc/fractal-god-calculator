import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { fmt, formatTargetDate } from '../lib/format'
import { I18nContext } from './context'
import type { I18n } from './context'
import { detectLanguage, INTL_LOCALES, LANGUAGE_STORAGE_KEY } from './language'
import { createTranslate } from './translate'

const OG_LOCALES = { en: 'en_US', de: 'de_DE' } as const

function setMeta(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value)
}

export function I18nProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [lang, setLang] = useState(detectLanguage)

  // Follow language changes made in another tab (or by another breakbar page) in the same browser.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === LANGUAGE_STORAGE_KEY || e.key === null) setLang(detectLanguage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo<I18n>(() => {
    const locale = INTL_LOCALES[lang]
    return {
      lang,
      t: createTranslate(lang),
      fmt: (n) => fmt(n, locale),
      formatDate: (days) => formatTargetDate(days, locale),
    }
  }, [lang])

  // index.html ships the English defaults; keep <html lang> and the SEO tags in sync with the UI language.
  const { t } = value
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t('meta.title')
    setMeta('meta[name="description"]', 'content', t('meta.description'))
    setMeta('meta[property="og:title"]', 'content', t('meta.ogTitle'))
    setMeta('meta[property="og:description"]', 'content', t('meta.ogDescription'))
    setMeta('meta[property="og:locale"]', 'content', OG_LOCALES[lang])
    setMeta('meta[name="twitter:title"]', 'content', t('meta.ogTitle'))
    setMeta('meta[name="twitter:description"]', 'content', t('meta.ogDescription'))
  }, [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
