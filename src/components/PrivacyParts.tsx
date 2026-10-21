import type { ReactNode } from 'react'

export function Ext({ href, children }: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-b border-dotted border-arcane-bright text-arcane-bright"
    >
      {children}
    </a>
  )
}

export function Code({ children }: Readonly<{ children: ReactNode }>) {
  return <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[12px] text-text">{children}</code>
}

const LOCAL_STORAGE_KEYS = [
  'gw2-fractal-god-api-key',
  'gw2-fractal-god-activity-toggles',
  'gw2-fractal-god-extra-runs',
  'gw2-fractal-god-extra-scale',
  'gw2-fractal-god-weekly-cache',
  'gw2-fractal-god-days-per-week',
  'gw2-fractal-god-auto-convert',
]

export function KeyList() {
  return (
    <ul className="my-2 flex list-disc flex-col gap-1 pl-5">
      {LOCAL_STORAGE_KEYS.map((key) => (
        <li key={key}>
          <Code>{key}</Code>
        </li>
      ))}
    </ul>
  )
}
