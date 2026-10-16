import { Fragment } from 'react'
import type { ReactNode } from 'react'

/** Renders a translated string, swapping its {name} placeholders for React nodes (links, bold text …). */
export function Trans({ text, slots }: Readonly<{ text: string; slots: Record<string, ReactNode> }>) {
  // split() with a capture group puts the placeholder names at the odd indexes.
  return (
    <>
      {text
        .split(/\{(\w+)\}/)
        .map((part, i) => (i % 2 === 1 ? <Fragment key={i}>{slots[part] ?? `{${part}}`}</Fragment> : part))}
    </>
  )
}
