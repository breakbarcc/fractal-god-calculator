import {
  FALLBACK_LANGUAGE,
  LANGUAGE_COOKIE_MAX_AGE,
  LANGUAGE_COOKIE_NAME,
  cookieDomainFor,
  languageFromPath,
  parseLanguage,
} from './language'
import type { Language } from './language'
import { pageFromPath } from '../pages'
import type { PageId } from '../pages'

function readCookie(name: string): string | undefined {
  for (const part of document.cookie.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key !== name) continue
    const raw = rest.join('=')
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }
  return undefined
}

/** The language stored in the shared "breakbar-language" cookie (possibly set by another breakbar subdomain). */
export function readCookieLanguage(): Language | undefined {
  if (typeof document === 'undefined') return undefined
  return parseLanguage(readCookie(LANGUAGE_COOKIE_NAME))
}

/**
 * Stores the choice in the "breakbar-language" cookie. On *.breakbar.cc it is valid domain-wide, so every
 * subdomain picks it up; elsewhere (localhost, previews) it stays a host-only cookie.
 */
export function persistLanguage(lang: Language): void {
  const { hostname, protocol } = window.location
  const domain = cookieDomainFor(hostname)
  const attributes = [
    `${LANGUAGE_COOKIE_NAME}=${lang}`,
    'Path=/',
    `Max-Age=${LANGUAGE_COOKIE_MAX_AGE}`,
    'SameSite=Lax',
    ...(domain ? [`Domain=${domain}`] : []),
    ...(protocol === 'https:' ? ['Secure'] : []),
  ]
  document.cookie = attributes.join('; ')
}

function readBrowserLanguage(): Language | undefined {
  for (const candidate of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    const lang = parseLanguage(candidate)
    if (lang) return lang
  }
  return undefined
}

/**
 * The visitor's preference: "breakbar-language" cookie first, then the browser's language list, then English.
 * Without a window (build-time prerendering) it returns the fallback — never the build machine's locale.
 */
export function detectPreferredLanguage(): Language {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE
  return readCookieLanguage() ?? readBrowserLanguage() ?? FALLBACK_LANGUAGE
}

/** A language-specific URL (e.g. /de/) always wins, so shared and search-result links open in their language. */
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE
  return languageFromPath(window.location.pathname) ?? detectPreferredLanguage()
}

/** The page behind the current URL; the calculator when there is no window (prerendering passes the page itself). */
export function detectPage(): PageId {
  if (typeof window === 'undefined') return 'home'
  return pageFromPath(window.location.pathname)
}
