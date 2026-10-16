import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { LANGUAGE_PATHS, SUPPORTED_LANGUAGES } from './i18n/language'
import type { Language } from './i18n/language'
import { createTranslate } from './i18n/translate'
import { renderHead, resolveSiteUrl } from './seo/head'

/** One prerendered page per language, each with its own URL path (e.g. "/" and "/de/"). */
export const PAGES = SUPPORTED_LANGUAGES.map((lang) => ({ lang, path: LANGUAGE_PATHS[lang] }))

/**
 * Build-time entry used by scripts/prerender.mjs: turns the built index.html template into the
 * finished page of one language — <html lang>, SEO <head> tags, <noscript> text and the rendered app.
 */
export function renderPage(template: string, lang: Language, env: Record<string, string | undefined>): string {
  const siteUrl = resolveSiteUrl(env)
  return template
    .replaceAll('%LANG%', lang)
    .replace('<!--seo-head-->', () => renderHead(lang, siteUrl))
    .replace('%NOSCRIPT%', () => createTranslate(lang)('meta.noscript'))
    .replace('<!--app-html-->', () => renderToString(<App initialLanguage={lang} />))
}
