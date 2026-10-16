import { renderToString } from 'react-dom/server'
import App from './App.tsx'

/** Build-time entry used by scripts/prerender.mjs to put the rendered app into the shipped index.html. */
export function render(): string {
  return renderToString(<App />)
}
