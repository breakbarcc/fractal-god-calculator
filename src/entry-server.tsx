import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { SUPPORTED_LANGUAGES } from './i18n/language'
import type { Language } from './i18n/language'
import { createTranslate } from './i18n/translate'
import { PAGE_IDS, pagePath } from './pages'
import type { PageId } from './pages'
import { renderHead, resolveSiteUrl } from './seo/head'

/** One prerendered file per page and language, each with its own URL path (e.g. "/", "/de/", "/privacy/"). */
export const PAGES = PAGE_IDS.flatMap((page) =>
  SUPPORTED_LANGUAGES.map((lang) => ({ page, lang, path: pagePath(page, lang) })),
)

/**
 * Build-time entry used by scripts/prerender.mjs: turns the built index.html template into the
 * finished page of one language — <html lang>, SEO <head> tags, <noscript> text and the rendered app.
 */
export function renderPage(
  template: string,
  page: PageId,
  lang: Language,
  env: Record<string, string | undefined>,
): string {
  const siteUrl = resolveSiteUrl(env)
  return template
    .replaceAll('%LANG%', lang)
    .replace('<!--seo-head-->', () => renderHead(lang, siteUrl, page))
    .replace('%NOSCRIPT%', () => createTranslate(lang)('meta.noscript'))
    .replace('<!--app-html-->', () => renderToString(<App initialLanguage={lang} initialPage={page} />))
}
