import { LANGUAGE_PATHS } from './i18n/language'
import type { Language } from './i18n/language'

export type PageId = 'home' | 'privacy'

/** Every page is prerendered once per language, each with its own URL. */
export const PAGE_PATHS: Record<PageId, Record<Language, string>> = {
  home: LANGUAGE_PATHS,
  privacy: { en: '/privacy/', de: '/de/datenschutz/' },
}

export const PAGE_IDS = Object.keys(PAGE_PATHS) as PageId[]

export function pagePath(page: PageId, lang: Language): string {
  return PAGE_PATHS[page][lang]
}

/** The page behind a URL path (with or without trailing slash); unknown paths fall back to the calculator. */
export function pageFromPath(pathname: string): PageId {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return PAGE_IDS.find((page) => Object.values(PAGE_PATHS[page]).includes(normalized)) ?? 'home'
}
