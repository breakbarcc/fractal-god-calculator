import { SCALE_OPTIONS, WEEKLY_CACHE_OPTIONS } from '../data/constants'
import { inputClass, selectClass, cardClass } from '../styles'
import { ActivityToggle } from './ActivityToggle'
import type { FractalCalculator } from '../hooks/useFractalCalculator'

export function DailyRoutineCard({ calc }: { calc: FractalCalculator }) {
  return (
    <div className={cardClass}>
      <h2 className="mb-1 flex items-center gap-2 font-cinzel text-base text-text">⚔️ Tägliche Routine</h2>
      <p className="mb-4.5 text-[12.5px] leading-[1.5] text-text-faint">
        Wähl aus, was du täglich läufst. Die Werte pro Aktivität sind Richtwerte aus dem Wiki — passe sie gern an deine eigenen Drops
        an.
      </p>

      {calc.activities.map((activity) => (
        <ActivityToggle
          key={activity.id}
          activity={activity}
          onToggle={() => calc.toggleActivity(activity.id)}
          onFieldChange={(field, value) => calc.updateActivityField(activity.id, field, value)}
        />
      ))}

      <div className="my-4 h-px bg-line" />

      <label className="text-[13px] text-text-dim">Zusätzliche freie Fraktal-Läufe / Tag</label>
      <div className="mb-2.5 grid grid-cols-[80px_1fr] items-center gap-2">
        <input
          type="number"
          min={0}
          value={calc.extraRuns}
          onChange={(e) => calc.setExtraRuns(parseFloat(e.target.value) || 0)}
          className={inputClass}
        />
        <select value={calc.extraScale} onChange={(e) => calc.setExtraScale(parseInt(e.target.value))} className={selectClass}>
          {SCALE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <label className="text-[13px] text-text-dim">Fractal Fighter's Cache (wöchentlich)</label>
      <select value={calc.weeklyCache} onChange={(e) => calc.setWeeklyCache(parseInt(e.target.value))} className={selectClass}>
        {WEEKLY_CACHE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
