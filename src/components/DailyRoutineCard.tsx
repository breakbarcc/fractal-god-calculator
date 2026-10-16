import { DAYS_PER_WEEK_VALUES, SCALE_OPTIONS, WEEKLY_CACHE_OPTIONS } from '../data/constants'
import { useI18n } from '../i18n/context'
import { cardClass, inputClass, selectClass } from '../styles'
import { ActivityToggle } from './ActivityToggle'
import type { FractalCalculator } from '../hooks/useFractalCalculator'

export function DailyRoutineCard({ calc }: Readonly<{ calc: FractalCalculator }>) {
  const { t } = useI18n()

  function daysLabel(count: number): string {
    if (count === 7) return t('routine.days.daily', { count })
    return t(count === 1 ? 'routine.days.one' : 'routine.days.other', { count })
  }

  return (
    <div className={cardClass}>
      <h2 className="mb-1 flex items-center gap-2 font-cinzel text-base text-text">⚔️ {t('routine.title')}</h2>
      <p className="mb-4.5 text-[12.5px] leading-[1.5] text-text-faint">{t('routine.intro')}</p>

      <label htmlFor={'days-per-week'} className="text-[13px] text-text-dim">
        {t('routine.daysLabel')}
      </label>
      <select
        id={'days-per-week'}
        value={calc.daysPerWeek}
        onChange={(e) => calc.setDaysPerWeek(Number.parseInt(e.target.value))}
        className={`${selectClass} mb-4.5`}
      >
        {DAYS_PER_WEEK_VALUES.map((days) => (
          <option key={days} value={days}>
            {daysLabel(days)}
          </option>
        ))}
      </select>

      {calc.activities.map((activity) => (
        <ActivityToggle
          key={activity.id}
          activity={activity}
          attunementRank={calc.attLevel}
          onToggle={() => calc.toggleActivity(activity.id)}
        />
      ))}

      <div className="my-4 h-px bg-line" />

      <label htmlFor={'additional-fractal-runs'} className="text-[13px] text-text-dim">
        {t('routine.extraRuns')}
      </label>
      <div className="mb-2.5 grid grid-cols-[80px_1fr] items-center gap-2">
        <input
          id={'additional-fractal-runs'}
          type="number"
          min={0}
          value={calc.extraRuns}
          onChange={(e) => calc.setExtraRuns(Number.parseFloat(e.target.value) || 0)}
          className={inputClass}
        />
        <select
          value={calc.extraScale}
          onChange={(e) => calc.setExtraScale(Number.parseInt(e.target.value))}
          className={selectClass}
        >
          {SCALE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {t('routine.scaleOption', { from: o.from, to: o.to, relic: o.value })}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor={'fractal-fighter'} className="text-[13px] text-text-dim">
        {t('routine.cacheLabel')}
      </label>
      <select
        id={'fractal-fighter'}
        value={calc.weeklyCache}
        onChange={(e) => calc.setWeeklyCache(Number.parseInt(e.target.value))}
        className={selectClass}
      >
        {WEEKLY_CACHE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.tier
              ? t('routine.cacheTier', { tier: o.tier, caches: o.caches ?? 0, pages: o.value })
              : t('routine.cacheNone')}
          </option>
        ))}
      </select>
    </div>
  )
}
