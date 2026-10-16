// Post-build step: renders <App /> to HTML (dist-ssr/entry-server.js, built by `vite build --ssr`)
// and injects it into dist/index.html so crawlers get real content without executing JavaScript.
// The client then replaces it via createRoot() on load.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')
const htmlPath = path.join(root, 'dist', 'index.html')
const PLACEHOLDER = '<!--app-html-->'

const { render } = await import(pathToFileURL(ssrEntry).href)
const template = await readFile(htmlPath, 'utf8')

if (!template.includes(PLACEHOLDER)) {
  throw new Error(`Placeholder ${PLACEHOLDER} not found in dist/index.html`)
}

await writeFile(
  htmlPath,
  template.replace(PLACEHOLDER, () => render()),
)
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Prerendered app into dist/index.html')
