import { BREAKBAR_URL, IMPRINT_URL } from '../data/links'
import { useI18n } from '../i18n/context'
import { pagePath } from '../pages'

const linkClass = 'text-text-dim transition-colors hover:text-arcane-bright'

/** Links back to the main domain plus the legal pages; shown on every page. */
export function SiteFooter() {
  const { t, lang } = useI18n()
  return (
    <nav
      aria-label={t('siteFooter.label')}
      className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-xs"
    >
      <a href={BREAKBAR_URL} className={linkClass}>
        ← {t('siteFooter.home')}
      </a>
      <a href={IMPRINT_URL} className={linkClass}>
        {t('siteFooter.imprint')}
      </a>
      <a href={pagePath('privacy', lang)} className={linkClass}>
        {t('siteFooter.privacy')}
      </a>
    </nav>
  )
}
