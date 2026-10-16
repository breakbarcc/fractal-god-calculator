import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Canonical origin used for <link rel="canonical">, Open Graph URLs, robots.txt and sitemap.xml.
// Defaults to the production domain; set SITE_URL to override it (e.g. for another domain).
const DEFAULT_SITE_URL = 'https://fractal.breakbar.cc'

function resolveSiteUrl(): string {
  return (process.env.SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '')
}

/** Fills %SITE_URL% in index.html and emits robots.txt + sitemap.xml with the same origin. */
function seoPlugin(siteUrl: string): Plugin {
  let isSsrBuild = false
  return {
    name: 'seo',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    generateBundle() {
      if (isSsrBuild) return
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin(resolveSiteUrl())],
})
