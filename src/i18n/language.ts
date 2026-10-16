export type Language = 'en' | 'de'

export const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'de']
export const FALLBACK_LANGUAGE: Language = 'en'

/** Shared across all breakbar pages: localStorage entry holding the user's chosen language. */
export const LANGUAGE_STORAGE_KEY = 'breakbar-language'

/** BCP 47 locale used for number and date formatting. */
export const INTL_LOCALES: Record<Language, string> = { en: 'en-US', de: 'de-DE' }

/** Maps e.g. "de", "de-DE", "DE_at" or a JSON-quoted "\"de\"" to a supported language. */
export function parseLanguage(value: unknown): Language | undefined {
  if (typeof value !== 'string') return undefined
  const base = value
    .trim()
    .replaceAll(/^["']|["']$/g, '')
    .split(/[-_]/)[0]
    .toLowerCase()
  return SUPPORTED_LANGUAGES.find((lang) => lang === base)
}

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
 * Stored "breakbar-language" first, then the browser's language list, then English.
 * Without a window (build-time prerendering) it returns the fallback — never the build machine's locale.
 */
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE
  return readStoredLanguage() ?? readBrowserLanguage() ?? FALLBACK_LANGUAGE
}
