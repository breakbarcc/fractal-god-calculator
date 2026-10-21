import { FALLBACK_LANGUAGE, OG_LOCALES, SUPPORTED_LANGUAGES } from '../i18n/language'
import type { Language } from '../i18n/language'
import { createTranslate } from '../i18n/translate'
import type { Translate } from '../i18n/translate'
import { PAGE_IDS, pagePath } from '../pages'
import type { PageId } from '../pages'

// Canonical origin used for <link rel="canonical">, hreflang, Open Graph URLs, robots.txt and sitemap.xml.
// Defaults to the production domain; set SITE_URL to override it (e.g. for another domain).
const DEFAULT_SITE_URL = 'https://fractal.breakbar.cc'

export function resolveSiteUrl(env: Record<string, string | undefined>): string {
  return (env.SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '')
}

export function pageUrl(siteUrl: string, lang: Language, page: PageId = 'home'): string {
  return siteUrl + pagePath(page, lang)
}

/** Title and descriptions of a page in the language of `t`. */
export function pageMeta(t: Translate, page: PageId) {
  if (page === 'privacy') {
    return {
      title: t('meta.privacy.title'),
      description: t('meta.privacy.description'),
      ogTitle: t('meta.privacy.title'),
      ogDescription: t('meta.privacy.description'),
    }
  }
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    ogTitle: t('meta.ogTitle'),
    ogDescription: t('meta.ogDescription'),
  }
}

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

/** <head> tags of one page in one language: title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD. */
export function renderHead(lang: Language, siteUrl: string, page: PageId = 'home'): string {
  const t = createTranslate(lang)
  const meta = pageMeta(t, page)
  const url = pageUrl(siteUrl, lang, page)
  const image = `${siteUrl}/og-image.png`
  const others = SUPPORTED_LANGUAGES.filter((l) => l !== lang)

  const jsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t('meta.siteName'),
      alternateName: others.map((l) => createTranslate(l)('meta.siteName')),
      url,
      description: t('meta.appDescription'),
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      inLanguage: lang,
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      image,
    },
    null,
    2,
  ).replaceAll('<', '\\u003c')

  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...SUPPORTED_LANGUAGES.map((l) => `<link rel="alternate" hreflang="${l}" href="${pageUrl(siteUrl, l, page)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(siteUrl, FALLBACK_LANGUAGE, page)}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    '<meta name="theme-color" content="#0e0c1b" />',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(t('meta.siteName'))}" />`,
    `<meta property="og:locale" content="${OG_LOCALES[lang]}" />`,
    ...others.map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALES[l]}" />`),
    `<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.ogDescription)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(t('meta.imageAlt'))}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(meta.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.ogDescription)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...(page === 'home' ? [`<script type="application/ld+json">\n${jsonLd}\n</script>`] : []),
  ]
  return tags.join('\n    ')
}

export function renderSitemap(siteUrl: string, lastmod: string): string {
  const urls = PAGE_IDS.flatMap((page) => {
    const alternates = [
      ...SUPPORTED_LANGUAGES.map((l) => ({ hreflang: l, href: pageUrl(siteUrl, l, page) })),
      { hreflang: 'x-default', href: pageUrl(siteUrl, FALLBACK_LANGUAGE, page) },
    ]
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
      .join('\n')
    return SUPPORTED_LANGUAGES.map(
      (l) =>
        `  <url>\n    <loc>${pageUrl(siteUrl, l, page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`,
    )
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

export function renderRobots(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}
