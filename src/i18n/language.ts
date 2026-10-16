export type Language = 'en' | 'de'

export const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'de']
export const FALLBACK_LANGUAGE: Language = 'en'

/** Shared across all breakbar pages: localStorage entry holding the user's chosen language. */
export const LANGUAGE_STORAGE_KEY = 'breakbar-language'

/** BCP 47 locale used for number and date formatting. */
export const INTL_LOCALES: Record<Language, string> = { en: 'en-US', de: 'de-DE' }

/** Open Graph locale per language. */
export const OG_LOCALES: Record<Language, string> = { en: 'en_US', de: 'de_DE' }

/** Every language has its own prerendered page (for SEO); the fallback language lives at the root. */
export const LANGUAGE_PATHS: Record<Language, string> = { en: '/', de: '/de/' }

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

/** The language whose page lives under this URL path ("/de", "/de/…"), if any. The root page has none. */
export function languageFromPath(pathname: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => {
    const dir = LANGUAGE_PATHS[lang].replace(/\/$/, '')
    return dir !== '' && (pathname === dir || pathname.startsWith(`${dir}/`))
  })
}
