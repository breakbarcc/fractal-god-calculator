import { useI18n } from '../i18n/context'
import { SUPPORTED_LANGUAGES } from '../i18n/language'

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="absolute -top-8 right-0 flex overflow-hidden rounded-lg border border-line bg-panel font-mono text-[11px] tracking-[0.12em] uppercase"
    >
      {SUPPORTED_LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={code === lang}
          onClick={() => setLang(code)}
          className={`cursor-pointer px-2.5 py-1.5 transition-colors ${
            code === lang ? 'bg-arcane/30 text-text' : 'text-text-faint hover:text-text-dim'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
