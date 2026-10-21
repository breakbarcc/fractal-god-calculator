import { PRIVACY_CONTENT } from '../content/privacy'
import { useI18n } from '../i18n/context'
import { pagePath } from '../pages'
import { LanguageSwitcher } from './LanguageSwitcher'

export function PrivacyPage() {
  const { lang, t } = useI18n()
  const content = PRIVACY_CONTENT[lang]

  return (
    <article className="mx-auto max-w-[760px]">
      <header className="relative mb-9">
        <LanguageSwitcher />
        <a
          href={pagePath('home', lang)}
          className="mb-6 inline-block font-mono text-xs text-text-dim transition-colors hover:text-arcane-bright"
        >
          ← {t('privacy.back')}
        </a>
        <h1 className="mb-2 bg-[linear-gradient(135deg,#fff,var(--color-arcane-bright)_60%,var(--color-relic))] bg-clip-text font-cinzel text-[clamp(28px,5vw,40px)] font-bold text-transparent">
          {content.title}
        </h1>
        <p className="font-mono text-xs text-text-faint">{content.updated}</p>
        <p className="mt-4 text-[15px] leading-[1.6] text-text-dim">{content.intro}</p>
      </header>

      {content.sections.map((section) => (
        <section key={section.heading} className="mb-7">
          <h2 className="mb-2.5 font-cinzel text-base text-text">{section.heading}</h2>
          <div className="flex flex-col gap-2.5 text-[13.5px] leading-[1.7] text-text-dim">{section.body}</div>
        </section>
      ))}
    </article>
  )
}
