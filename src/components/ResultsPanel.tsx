import { PRISTINE_TO_RELIC, IFM_CRAFT_RELIC } from '../data/constants'
import { fmt, formatTargetDate } from '../lib/format'
import { selectClass } from '../styles'
import { ResourceCard } from './ResourceCard'
import type { FractalCalculator } from '../hooks/useFractalCalculator'

const BOTTLENECK_LABELS: Record<string, string> = {
  relic: 'Fractal Relic',
  pristine: 'Pristine Fractal Relic',
  pages: 'Fractal Research Pages',
}

function pct(remaining: number, total: number): number {
  return total > 0 ? Math.min(100, (1 - remaining / total) * 100) : 100
}

export function ResultsPanel({ calc }: Readonly<{ calc: FractalCalculator }>) {
  const r = calc.results

  return (
    <div className="rounded-[20px] border border-line-strong bg-[linear-gradient(160deg,var(--color-panel-2),var(--color-panel))] p-[28px] px-[26px] shadow-[0_30px_80px_-40px_rgba(91,155,213,.4)]">
      <h2 className="mb-5 text-center font-cinzel text-[15px] tracking-[0.08em] text-text-dim uppercase">Ergebnis</h2>

      <div className="mb-1.5 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-line bg-pristine/5 px-4 py-3">
        <label htmlFor="autoConvert" className="text-[12.5px] text-text-dim">
          Pristine-Überschuss automatisch in Fractal Relic tauschen
        </label>
        <select
          id="autoConvert"
          value={calc.autoConvert ? '1' : '0'}
          onChange={(e) => calc.setAutoConvert(e.target.value === '1')}
          className={`w-auto min-w-[260px] px-2.5 py-1.5 text-xs ${selectClass}`}
        >
          <option value="1">Ja — 1 Pristine = 15 Relic (via BUY-2046 PFR)</option>
          <option value="0">Nein — beide getrennt sammeln</option>
        </select>
      </div>
      <div className="mt-2.5 mb-1.5 min-h-4 text-center font-mono text-xs text-pristine">
        {!r.done &&
          calc.autoConvert &&
          r.convertedPristine > 0.5 &&
          (() => {
            const saved = Math.ceil(r.daysRelicOnly) - Math.ceil(r.daysRelic)
            return (
              <>
                ↻ {fmt(r.convertedPristine)} überschüssige Pristine Relic werden in{' '}
                {fmt(r.convertedPristine * PRISTINE_TO_RELIC)} Fractal Relic getauscht
                {saved > 0 ? ` — spart ${fmt(saved)} Tag${saved === 1 ? '' : 'e'}` : ''}.
              </>
            )
          })()}
      </div>

      <div className="mb-7 text-center">
        {r.done ? (
          <>
            <div className="font-mono text-[clamp(40px,7vw,64px)] leading-none font-bold">🎉</div>
            <div className="mt-1.5 text-[13px] text-text-dim">Tage bis zum Titel</div>
            <div className="mt-2.5 font-mono text-[13.5px] text-text">Du bist bereits Fractal God!</div>
          </>
        ) : (
          <>
            <div className="bg-[linear-gradient(135deg,var(--color-arcane-bright),var(--color-relic))] bg-clip-text font-mono text-[clamp(40px,7vw,64px)] leading-none font-bold text-transparent">
              {Number.isFinite(r.daysNeeded) ? fmt(Math.ceil(r.daysNeeded)) : '∞'}
            </div>
            <div className="mt-1.5 text-[13px] text-text-dim">Tage bis zum Titel</div>
            <div className="mt-2.5 font-mono text-[13.5px] text-text">
              {Number.isFinite(r.calendarDaysNeeded)
                ? `Voraussichtlich fertig am ${formatTargetDate(r.calendarDaysNeeded)}`
                : 'Mit der aktuellen Routine wird mind. eine Ressource nie erreicht.'}
            </div>
            {Number.isFinite(r.daysNeeded) && r.daysNeeded > 0 && r.bottleneck && (
              <div className="mt-1.5 text-[12.5px] text-warn">Flaschenhals: {BOTTLENECK_LABELS[r.bottleneck]}</div>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3.5 min-[820px]:grid-cols-4">
        <ResourceCard
          name="Fractal Relic"
          dotClass="bg-relic"
          value={fmt(r.remRelic)}
          sub={`${fmt(r.relicPerDay)} / Tag`}
          fillClass="bg-relic"
          fillPct={pct(r.remRelic, r.totalRelicBase + r.totalIFMBase * IFM_CRAFT_RELIC)}
        />
        <ResourceCard
          name="Pristine Relic"
          dotClass="bg-pristine"
          value={fmt(r.remPristine)}
          sub={`${fmt(r.pristinePerDay)} / Tag`}
          fillClass="bg-pristine"
          fillPct={pct(r.remPristine, r.totalPristineBase)}
        />
        <ResourceCard
          name="Research Pages"
          dotClass="bg-pages"
          value={fmt(r.remPages)}
          sub={`${fmt(r.pagesPerDay)} / Tag`}
          fillClass="bg-pages"
          fillPct={pct(r.remPages, r.totalPagesBase)}
        />
        <ResourceCard
          name="Integrated Matrix"
          dotClass="bg-ifm"
          value={fmt(r.remIFM)}
          sub={`${fmt(r.ifmPerDay)} / Tag`}
          fillClass="bg-ifm"
          fillPct={pct(r.remIFM, r.totalIFMBase)}
        />
      </div>
    </div>
  )
}
