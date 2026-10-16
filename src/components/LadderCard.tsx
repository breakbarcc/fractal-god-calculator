import { useI18n } from '../i18n/context'
import { AttunementLadder } from './AttunementLadder'

export function LadderCard({
  currentLevel,
  overallPct,
  done,
}: Readonly<{
  currentLevel: number
  overallPct: number
  done: boolean
}>) {
  const { t } = useI18n()
  const pct = Math.round(overallPct)
  return (
    <div className="mb-8 rounded-[18px] border border-line bg-panel px-6 pt-7 pb-5 shadow-[0_20px_60px_-30px_rgba(155,127,224,.35)]">
      <div className="mb-4.5 text-center font-cinzel text-sm tracking-[0.08em] text-text-dim uppercase">
        {t('ladder.title')}
      </div>
      <AttunementLadder currentLevel={currentLevel} overallPct={overallPct} />
      <div className="mt-1.5 text-center font-mono text-[11px] text-text-dim">
        {done ? t('ladder.progress', { pct }) : t('ladder.progressStep', { pct, step: Math.min(currentLevel + 1, 4) })}
      </div>
    </div>
  )
}
