import { PRISTINE_TO_RELIC, IFM_CRAFT_RELIC } from '../data/constants'
import { useI18n } from '../i18n/context'
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
  const { t, fmt, formatDate } = useI18n()
  const r = calc.results

  return (
    <div className="rounded-[20px] border border-line-strong bg-[linear-gradient(160deg,var(--color-panel-2),var(--color-panel))] p-[28px] px-[26px] shadow-[0_30px_80px_-40px_rgba(91,155,213,.4)]">
      <h2 className="mb-5 text-center font-cinzel text-[15px] tracking-[0.08em] text-text-dim uppercase">
        {t('results.title')}
      </h2>

      <div className="mb-1.5 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-line bg-pristine/5 px-4 py-3">
        <label htmlFor="autoConvert" className="text-[12.5px] text-text-dim">
          {t('results.autoConvertLabel')}
        </label>
        <select
          id="autoConvert"
          value={calc.autoConvert ? '1' : '0'}
          onChange={(e) => calc.setAutoConvert(e.target.value === '1')}
          className={`w-auto min-w-[260px] px-2.5 py-1.5 text-xs ${selectClass}`}
        >
          <option value="1">{t('results.autoConvertYes', { rate: PRISTINE_TO_RELIC })}</option>
          <option value="0">{t('results.autoConvertNo')}</option>
        </select>
      </div>
      <div className="mt-2.5 mb-1.5 min-h-4 text-center font-mono text-xs text-pristine">
        {!r.done &&
          calc.autoConvert &&
          r.convertedPristine > 0.5 &&
          (() => {
            const saved = Math.ceil(r.daysRelicOnly) - Math.ceil(r.daysRelic)
            const params = {
              pristine: fmt(r.convertedPristine),
              relic: fmt(r.convertedPristine * PRISTINE_TO_RELIC),
              days: fmt(saved),
            }
            if (saved <= 0) return t('results.convert', params)
            return t(saved === 1 ? 'results.convertSaves.one' : 'results.convertSaves.other', params)
          })()}
      </div>
      {!r.done && r.potionRelicPerDay > 0.05 && (
        <div className="mb-1.5 text-center font-mono text-xs text-pristine">
          {t('results.potions', { amount: fmt(r.potionRelicPerDay) })}
        </div>
      )}

      <div className="mb-7 text-center">
        {r.done ? (
          <>
            <div className="font-mono text-[clamp(40px,7vw,64px)] leading-none font-bold">🎉</div>
            <div className="mt-1.5 text-[13px] text-text-dim">{t('results.daysLabel')}</div>
            <div className="mt-2.5 font-mono text-[13.5px] text-text">{t('results.alreadyGod')}</div>
          </>
        ) : (
          <>
            <div className="bg-[linear-gradient(135deg,var(--color-arcane-bright),var(--color-relic))] bg-clip-text font-mono text-[clamp(40px,7vw,64px)] leading-none font-bold text-transparent">
              {Number.isFinite(r.daysNeeded) ? fmt(Math.ceil(r.daysNeeded)) : '∞'}
            </div>
            <div className="mt-1.5 text-[13px] text-text-dim">{t('results.daysLabel')}</div>
            <div className="mt-2.5 font-mono text-[13.5px] text-text">
              {Number.isFinite(r.calendarDaysNeeded)
                ? t('results.finishDate', { date: formatDate(r.calendarDaysNeeded) })
                : t('results.never')}
            </div>
            {Number.isFinite(r.daysNeeded) && r.daysNeeded > 0 && r.bottleneck && (
              <div className="mt-1.5 text-[12.5px] text-warn">
                {t('results.bottleneck', { name: BOTTLENECK_LABELS[r.bottleneck] })}
              </div>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3.5 min-[820px]:grid-cols-4">
        <ResourceCard
          name="Fractal Relic"
          dotClass="bg-relic"
          value={fmt(r.remRelic)}
          sub={t('results.perDay', { amount: fmt(r.relicPerDay) })}
          fillClass="bg-relic"
          fillPct={pct(r.remRelic, r.totalRelicBase + r.totalIFMBase * IFM_CRAFT_RELIC)}
        />
        <ResourceCard
          name="Pristine Relic"
          dotClass="bg-pristine"
          value={fmt(r.remPristine)}
          sub={t('results.perDay', { amount: fmt(r.pristinePerDay) })}
          fillClass="bg-pristine"
          fillPct={pct(r.remPristine, r.totalPristineBase)}
        />
        <ResourceCard
          name="Research Pages"
          dotClass="bg-pages"
          value={fmt(r.remPages)}
          sub={t('results.perDay', { amount: fmt(r.pagesPerDay) })}
          fillClass="bg-pages"
          fillPct={pct(r.remPages, r.totalPagesBase)}
        />
        <ResourceCard
          name="Integrated Matrix"
          dotClass="bg-ifm"
          value={fmt(r.remIFM)}
          sub={t('results.perDay', { amount: fmt(r.ifmPerDay) })}
          fillClass="bg-ifm"
          fillPct={pct(r.remIFM, r.totalIFMBase)}
        />
      </div>
    </div>
  )
}
