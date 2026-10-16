import { useI18n } from '../i18n/context'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useI18n()
  return (
    <header className="relative mb-11 text-center">
      <LanguageSwitcher />
      <div className="mb-3.5 font-mono text-xs tracking-[0.22em] text-arcane-bright/80 uppercase">
        Fractals of the Mists
      </div>
      <h1 className="mb-3 bg-[linear-gradient(135deg,#fff,var(--color-arcane-bright)_60%,var(--color-relic))] bg-clip-text font-cinzel text-[clamp(30px,5vw,46px)] font-bold text-transparent">
        {t('header.title')}
      </h1>
      <p className="mx-auto max-w-[560px] text-[15px] leading-[1.6] text-text-dim">{t('header.intro')}</p>
    </header>
  )
}
