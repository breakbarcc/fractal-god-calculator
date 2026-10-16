import { de } from './messages/de'
import { en } from './messages/en'
import type { MessageKey } from './messages/en'
import type { Language } from './language'

export type TranslateParams = Record<string, string | number>
export type Translate = (key: MessageKey, params?: TranslateParams) => string

const MESSAGES: Record<Language, Record<MessageKey, string>> = { en, de }

/** Replaces {name} placeholders; unknown placeholders are left untouched. */
export function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template
  return template.replaceAll(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match))
}

export function createTranslate(lang: Language): Translate {
  const messages = MESSAGES[lang]
  return (key, params) => interpolate(messages[key] ?? en[key], params)
}
