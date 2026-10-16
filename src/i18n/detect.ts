import { FALLBACK_LANGUAGE, LANGUAGE_STORAGE_KEY, languageFromPath, parseLanguage } from './language'
import type { Language } from './language'

function readStoredLanguage(): Language | undefined {
  try {
    return parseLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY))
  } catch {
    return undefined
  }
}

function readBrowserLanguage(): Language | undefined {
  for (const candidate of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    const lang = parseLanguage(candidate)
    if (lang) return lang
  }
  return undefined
}

/**
 * The visitor's preference: stored "breakbar-language" first, then the browser's language list, then English.
 * Without a window (build-time prerendering) it returns the fallback — never the build machine's locale.
 */
export function detectPreferredLanguage(): Language {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE
  return readStoredLanguage() ?? readBrowserLanguage() ?? FALLBACK_LANGUAGE
}

/** A language-specific URL (e.g. /de/) always wins, so shared and search-result links open in their language. */
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE
  return languageFromPath(window.location.pathname) ?? detectPreferredLanguage()
}
