import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { fmt, formatTargetDate } from '../lib/format'
import { I18nContext } from './context'
import type { I18n } from './context'
import { detectLanguage, detectPreferredLanguage, persistLanguage, readCookieLanguage } from './detect'
import { INTL_LOCALES, LANGUAGE_PATHS, OG_LOCALES, SUPPORTED_LANGUAGES } from './language'
import type { Language } from './language'
import { createTranslate } from './translate'
import type { Translate } from './translate'

function setContent(selector: string, value: string) {
  document.head.querySelector(selector)?.setAttribute('content', value)
}

function setUrlPath(selector: string, attribute: 'href' | 'content', path: string) {
  const el = document.head.querySelector(selector)
  const current = el?.getAttribute(attribute)
  if (!el || !current) return
  const url = new URL(current, window.location.href)
  url.pathname = path
  el.setAttribute(attribute, url.href)
}

/** Keeps <html lang>, the SEO tags and the address bar in line with the language shown. */
function syncDocument(lang: Language, t: Translate) {
  const path = LANGUAGE_PATHS[lang]
  document.documentElement.lang = lang
  document.title = t('meta.title')
  setContent('meta[name="description"]', t('meta.description'))
  setContent('meta[property="og:site_name"]', t('meta.siteName'))
  setContent('meta[property="og:title"]', t('meta.ogTitle'))
  setContent('meta[property="og:description"]', t('meta.ogDescription'))
  setContent('meta[property="og:image:alt"]', t('meta.imageAlt'))
  setContent('meta[property="og:locale"]', OG_LOCALES[lang])
  const others = SUPPORTED_LANGUAGES.filter((l) => l !== lang)
  document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el, i) => {
    if (others[i]) el.setAttribute('content', OG_LOCALES[others[i]])
  })
  setContent('meta[name="twitter:title"]', t('meta.ogTitle'))
  setContent('meta[name="twitter:description"]', t('meta.ogDescription'))
  setUrlPath('link[rel="canonical"]', 'href', path)
  setUrlPath('meta[property="og:url"]', 'content', path)

  // Each language has its own URL: /de/ for German, / for English.
  const { pathname, search, hash } = window.location
  if (pathname !== path) window.history.replaceState(window.history.state, '', path + search + hash)
}

/**
 * `initialLanguage` is used for prerendering, where there is no window to detect anything from;
 * in the browser the language comes from the URL path, then "breakbar-language", then the browser.
 */
export function I18nProvider({
  children,
  initialLanguage,
}: Readonly<{ children: ReactNode; initialLanguage?: Language }>) {
  const [lang, setLangState] = useState(() => initialLanguage ?? detectLanguage())

  // Follow a language change made in another tab or on another breakbar subdomain. Cookies fire no change
  // event, so check when this tab regains focus — and only react if the cookie really changed.
  useEffect(() => {
    let lastSeen = readCookieLanguage()
    function syncFromCookie() {
      const current = readCookieLanguage()
      if (current === lastSeen) return
      lastSeen = current
      if (current) setLangState(detectPreferredLanguage())
    }
    function onVisibilityChange() {
      if (document.visibilityState === 'visible') syncFromCookie()
    }
    window.addEventListener('focus', syncFromCookie)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('focus', syncFromCookie)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  const value = useMemo<I18n>(() => {
    const locale = INTL_LOCALES[lang]
    return {
      lang,
      setLang: (next) => {
        setLangState(next)
        persistLanguage(next)
      },
      t: createTranslate(lang),
      fmt: (n) => fmt(n, locale),
      formatDate: (days) => formatTargetDate(days, locale),
    }
  }, [lang])

  const { t } = value
  useEffect(() => syncDocument(lang, t), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
