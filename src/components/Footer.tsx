import type { ReactNode } from 'react'
import { useI18n } from '../i18n/context'
import { Trans } from '../i18n/Trans'

function WikiLink({ page, children }: Readonly<{ page: string; children: ReactNode }>) {
  return (
    <a
      href={`https://wiki.guildwars2.com/wiki/${page}`}
      target="_blank"
      rel="noreferrer"
      className="border-b border-dotted border-arcane-bright text-arcane-bright"
    >
      {children}
    </a>
  )
}

const paragraphClass = 'mx-auto mb-1.5 max-w-[680px] text-[11.5px] leading-[1.7] text-text-faint'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-7 text-center">
      <p className={paragraphClass}>
        <Trans
          text={t('footer.notCounted')}
          slots={{ label: <b className="text-text-dim">{t('footer.notCountedLabel')}</b> }}
        />
      </p>
      <p className={paragraphClass}>
        <Trans
          text={t('footer.conversion')}
          slots={{ vendor: <WikiLink page="BUY-2046_PFR">BUY-2046 PFR</WikiLink> }}
        />
      </p>
      <p className={paragraphClass}>
        <Trans
          text={t('footer.sources')}
          slots={{
            attunement: <WikiLink page="Mist_Attunement_4">{t('footer.attunementLink')}</WikiLink>,
            pristine: <WikiLink page="Pristine_Fractal_Relic">{t('item.pristine')}</WikiLink>,
            pages: <WikiLink page="Fractal_Research_Page">{t('item.page')}</WikiLink>,
            relic: <WikiLink page="Fractal_Relic">{t('item.relic')}</WikiLink>,
          }}
        />
      </p>
    </footer>
  )
}
