import { ATTUNEMENT_LEVELS, PAGES_PER_JOURNAL, PREREQ } from '../data/constants'
import { useI18n } from '../i18n/context'
import { cardClass, inputClass, selectClass } from '../styles'
import { ApiKeyBox } from './ApiKeyBox'
import type { FractalCalculator } from '../hooks/useFractalCalculator'

const UNIT_TAGS = {
  relic: { className: 'bg-relic/18 text-relic', text: 'unit.relic' },
  pristine: { className: 'bg-pristine/18 text-pristine', text: 'unit.pristine' },
  ifm: { className: 'bg-ifm/18 text-ifm', text: 'unit.ifm' },
  pages: { className: 'bg-pages/18 text-pages', text: 'unit.page' },
} as const

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
  const { t } = useI18n()
  return (
    <div className="mb-2.5 grid grid-cols-[1fr_100px] items-center gap-2.5">
      <label className="text-[13px] text-text-dim">
        {label}
        {unit && (
          <span
            className={`ml-1.5 rounded-[5px] px-1.5 py-px font-mono text-[10px] opacity-85 ${UNIT_TAGS[unit].className}`}
          >
            {t(UNIT_TAGS[unit].text)}
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
  const { t, fmt } = useI18n()
  return (
    <div className={cardClass}>
      <h2 className="mb-1 flex items-center gap-2 font-cinzel text-base text-text">📦 {t('inventory.title')}</h2>
      <p className="mb-4.5 text-[12.5px] leading-[1.5] text-text-faint">{t('inventory.intro')}</p>

      <label htmlFor={'mist-attunement-level'} className="text-[13px] text-text-dim">
        {t('inventory.levelLabel')}
      </label>
      <select
        id={'mist-attunement-level'}
        value={calc.attLevel}
        onChange={(e) => calc.setAttLevel(Number.parseInt(e.target.value))}
        className={`${selectClass} mb-1`}
      >
        <option value={0}>{t('inventory.levelNone')}</option>
        {ATTUNEMENT_LEVELS.map((level) => (
          <option key={level} value={level}>
            {t(level === ATTUNEMENT_LEVELS.length ? 'inventory.levelDone' : 'inventory.level', {
              level,
              title: t(`attunement.title.${level}`),
            })}
          </option>
        ))}
      </select>

      <div className="mt-3.5 mb-1">
        <label htmlFor={'requirements'} className="text-[13px] text-text-dim">
          {t('inventory.prereqLabel')}
        </label>
        <select
          id={'requirements'}
          value={calc.prereqDone ? '1' : '0'}
          onChange={(e) => calc.setPrereqDone(e.target.value === '1')}
          className={selectClass}
        >
          <option value="1">{t('inventory.prereqYes')}</option>
          <option value="0">{t('inventory.prereqNo', { relic: fmt(PREREQ.relic), ifm: fmt(PREREQ.ifm) })}</option>
        </select>
      </div>

      <div className="my-4 h-px bg-line" />

      <StockRow label={t('item.relic')} unit="relic" value={calc.curRelic} onChange={calc.setCurRelic} />
      <StockRow label={t('item.pristine')} unit="pristine" value={calc.curPristine} onChange={calc.setCurPristine} />
      <StockRow label={t('item.matrix')} unit="ifm" value={calc.curIFM} onChange={calc.setCurIFM} />
      <StockRow label={t('inventory.loosePages')} unit="pages" value={calc.curPages} onChange={calc.setCurPages} />
      <StockRow
        label={t('inventory.journals', { pages: PAGES_PER_JOURNAL })}
        value={calc.curJournals}
        onChange={calc.setCurJournals}
      />

      <ApiKeyBox apiKey={calc.apiKey} setApiKey={calc.setApiKey} onFetched={calc.applyFetchResult} />
    </div>
  )
}
