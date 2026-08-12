import { DAYS_PER_WEEK_OPTIONS, SCALE_OPTIONS, WEEKLY_CACHE_OPTIONS } from '../data/constants'
import { cardClass, inputClass, selectClass } from '../styles'
import { ActivityToggle } from './ActivityToggle'
import type { FractalCalculator } from '../hooks/useFractalCalculator'

export function DailyRoutineCard({ calc }: Readonly<{ calc: FractalCalculator }>) {
  return (
    <div className={cardClass}>
      <h2 className="mb-1 flex items-center gap-2 font-cinzel text-base text-text">⚔️ Tägliche Routine</h2>
      <p className="mb-4.5 text-[12.5px] leading-[1.5] text-text-faint">
        Wähl aus, was du täglich läufst. Die Werte pro Aktivität stammen aus den offiziellen Belohnungs-Angaben des
        GW2-Wikis.
      </p>

      <label htmlFor={'days-per-week'} className="text-[13px] text-text-dim">
        An wie vielen Tagen pro Woche läufst du Fraktale?
      </label>
      <select
        id={'days-per-week'}
        value={calc.daysPerWeek}
        onChange={(e) => calc.setDaysPerWeek(Number.parseInt(e.target.value))}
        className={`${selectClass} mb-4.5`}
      >
        {DAYS_PER_WEEK_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {calc.activities.map((activity) => (
        <ActivityToggle key={activity.id} activity={activity} onToggle={() => calc.toggleActivity(activity.id)} />
      ))}

      <div className="my-4 h-px bg-line" />

      <label htmlFor={'additional-fractal-runs'} className="text-[13px] text-text-dim">
        Zusätzliche freie Fraktal-Läufe / Tag
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
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor={'fractal-fighter'} className="text-[13px] text-text-dim">
        Fractal Fighter's Cache (wöchentlich)
      </label>
      <select
        id={'fractal-fighter'}
        value={calc.weeklyCache}
        onChange={(e) => calc.setWeeklyCache(Number.parseInt(e.target.value))}
        className={selectClass}
      >
        {WEEKLY_CACHE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
