import { ATTUNEMENT_LEVEL_OPTIONS } from '../data/constants'
import { cardClass, inputClass, selectClass } from '../styles'
import { ApiKeyBox } from './ApiKeyBox'
import type { FractalCalculator } from '../hooks/useFractalCalculator'

const UNIT_TAGS: Record<string, { className: string; text: string }> = {
  relic: { className: 'bg-relic/18 text-relic', text: 'Relic' },
  pristine: { className: 'bg-pristine/18 text-pristine', text: 'Pristine' },
  ifm: { className: 'bg-ifm/18 text-ifm', text: 'IFM' },
  pages: { className: 'bg-pages/18 text-pages', text: 'Page' },
}

function StockRow({
  label,
  unit,
  value,
  onChange,
}: Readonly<{
  label: string
  unit?: keyof typeof UNIT_TAGS
  value: number
  onChange: (value: number) => void
}>) {
  return (
    <div className="mb-2.5 grid grid-cols-[1fr_100px] items-center gap-2.5">
      <label className="text-[13px] text-text-dim">
        {label}
        {unit && (
          <span
            className={`ml-1.5 rounded-[5px] px-1.5 py-px font-mono text-[10px] opacity-85 ${UNIT_TAGS[unit].className}`}
          >
            {UNIT_TAGS[unit].text}
          </span>
        )}
      </label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
        className={inputClass}
      />
    </div>
  )
}

export function StartingInventoryCard({ calc }: Readonly<{ calc: FractalCalculator }>) {
  return (
    <div className={cardClass}>
      <h2 className="mb-1 flex items-center gap-2 font-cinzel text-base text-text">📦 Startbestand</h2>
      <p className="mb-4.5 text-[12.5px] leading-[1.5] text-text-faint">
        Trag ein, was du gerade im Portemonnaie / Inventar hast — oder lade es unten direkt per GW2-API.
      </p>

      <label htmlFor={'mist-attunement-level'} className="text-[13px] text-text-dim">
        Bereits gekaufte Mist-Attunement-Stufe
      </label>
      <select
        id={'mist-attunement-level'}
        value={calc.attLevel}
        onChange={(e) => calc.setAttLevel(Number.parseInt(e.target.value))}
        className={`${selectClass} mb-1`}
      >
        {ATTUNEMENT_LEVEL_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <div className="mt-3.5 mb-1">
        <label htmlFor={'requirements'} className="text-[13px] text-text-dim">
          Grundvoraussetzungen erfüllt?
        </label>
        <select
          id={'requirements'}
          value={calc.prereqDone ? '1' : '0'}
          onChange={(e) => calc.setPrereqDone(e.target.value === '1')}
          className={selectClass}
        >
          <option value="1">Ja — Empowerment 2 / Retribution 2 / Impedance 2 vorhanden</option>
          <option value="0">Nein — noch nicht (kostet zusätzlich 5.750 Relic + 35 Matrix)</option>
        </select>
      </div>

      <div className="my-4 h-px bg-line" />

      <StockRow label="Fractal Relic" unit="relic" value={calc.curRelic} onChange={calc.setCurRelic} />
      <StockRow
        label="Pristine Fractal Relic"
        unit="pristine"
        value={calc.curPristine}
        onChange={calc.setCurPristine}
      />
      <StockRow label="Integrated Fractal Matrix" unit="ifm" value={calc.curIFM} onChange={calc.setCurIFM} />
      <StockRow label="Lose Fractal Research Pages" unit="pages" value={calc.curPages} onChange={calc.setCurPages} />
      <StockRow label="Fractal Journals (= 28 Pages)" value={calc.curJournals} onChange={calc.setCurJournals} />

      <ApiKeyBox apiKey={calc.apiKey} setApiKey={calc.setApiKey} onFetched={calc.applyFetchResult} />
    </div>
  )
}
