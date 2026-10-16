import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { FALLBACK_LANGUAGE } from './src/i18n/language'
import { createTranslate } from './src/i18n/translate'
import { renderHead, renderRobots, renderSitemap, resolveSiteUrl } from './src/seo/head'

/**
 * Dev: fills the SEO placeholders of index.html with the fallback language.
 * Build: emits robots.txt + sitemap.xml and leaves the placeholders to scripts/prerender.mjs,
 * which writes one finished page per language.
 */
function seoPlugin(siteUrl: string): Plugin {
  let isSsrBuild = false
  return {
    name: 'seo',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },
    transformIndexHtml(html, ctx) {
      if (!ctx.server) return html
      return html
        .replaceAll('%LANG%', FALLBACK_LANGUAGE)
        .replace('<!--seo-head-->', () => renderHead(FALLBACK_LANGUAGE, siteUrl))
        .replace('%NOSCRIPT%', () => createTranslate(FALLBACK_LANGUAGE)('meta.noscript'))
    },
    generateBundle() {
      if (isSsrBuild) return
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots(siteUrl) })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: renderSitemap(siteUrl, new Date().toISOString().slice(0, 10)),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin(resolveSiteUrl(process.env))],
})
