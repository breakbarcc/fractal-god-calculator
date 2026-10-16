import { useI18n } from '../i18n/context'
import { calculateActivityRelic } from '../lib/activityRelic'
import type { Activity } from '../types'

function YieldStat({ icon, alt, value }: Readonly<{ icon: string; alt: string; value: number }>) {
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-panel-2 px-2 py-1.5">
      <img src={icon} alt={alt} title={alt} className="h-4 w-4 flex-none" />
      <span className="font-mono text-xs text-text">{value}</span>
    </div>
  )
}

export function ActivityToggle({
  activity,
  attunementRank,
  onToggle,
}: Readonly<{
  activity: Activity
  attunementRank: number
  onToggle: () => void
}>) {
  const { t } = useI18n()
  return (
    <div
      className={`mb-2.5 rounded-xl border p-3 px-3.5 ${activity.on ? 'border-line-strong bg-arcane/6' : 'border-line bg-white/1.5'}`}
    >
      <div className="flex cursor-pointer items-center gap-2.5 select-none" onClick={onToggle}>
        <div
          className={`relative h-5 w-[34px] flex-none rounded-full transition-colors ${activity.on ? 'bg-arcane/55' : 'bg-white/12'}`}
        >
          <div
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full transition-transform ${activity.on ? 'translate-x-3.5 bg-white' : 'bg-text-faint'}`}
          />
        </div>
        <div className="flex-1 text-[13.5px] font-medium">{t(`activity.${activity.id}`)}</div>
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-2">
        <YieldStat
          icon="/icons/fractal-relic.png"
          alt={t('item.relic')}
          value={calculateActivityRelic(activity, attunementRank)}
        />
        <YieldStat icon="/icons/pristine-fractal-relic.png" alt={t('item.pristine')} value={activity.pristine} />
        <YieldStat icon="/icons/fractal-research-page.png" alt={t('item.page')} value={activity.pages} />
        <YieldStat
          icon="/icons/integrated-fractal-matrix.png"
          alt={t('item.matrix')}
          value={activity.integrated_fractal}
        />
      </div>
      {(activity.potionDefensive > 0 || activity.potionMobility > 0 || activity.potionOffensive > 0) && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          <YieldStat
            icon="/icons/mist-potion-defensive.png"
            alt={t('potion.defensive')}
            value={activity.potionDefensive}
          />
          <YieldStat
            icon="/icons/mist-potion-mobility.png"
            alt={t('potion.mobility')}
            value={activity.potionMobility}
          />
          <YieldStat
            icon="/icons/mist-potion-offensive.png"
            alt={t('potion.offensive')}
            value={activity.potionOffensive}
          />
        </div>
      )}
    </div>
  )
}
