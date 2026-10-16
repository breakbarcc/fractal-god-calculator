// Post-build step: turns dist/index.html (a template) into one prerendered page per language, using the
// SSR bundle (dist-ssr/entry-server.js, built by `vite build --ssr`): "/" -> dist/index.html,
// "/de/" -> dist/de/index.html. Crawlers thereby get real, language-specific content and head tags
// without executing JavaScript; the client then replaces the markup via createRoot() on load.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { PAGES, renderPage } = await import(pathToFileURL(ssrEntry).href)
const template = await readFile(path.join(distDir, 'index.html'), 'utf8')

for (const placeholder of ['<!--app-html-->', '<!--seo-head-->', '%LANG%', '%NOSCRIPT%']) {
  if (!template.includes(placeholder)) {
    throw new Error(`Placeholder ${placeholder} not found in dist/index.html`)
  }
}

for (const { lang, path: pagePath } of PAGES) {
  const outDir = path.join(distDir, pagePath)
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'index.html'), renderPage(template, lang, process.env))
  console.log(`Prerendered ${lang} -> dist${pagePath}index.html`)
}
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
