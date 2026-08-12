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
  return (
    <div className="mb-8 rounded-[18px] border border-line bg-panel px-6 pt-7 pb-5 shadow-[0_20px_60px_-30px_rgba(155,127,224,.35)]">
      <div className="mb-4.5 text-center font-cinzel text-sm tracking-[0.08em] text-text-dim uppercase">
        Weg zum Fractal God
      </div>
      <AttunementLadder currentLevel={currentLevel} overallPct={overallPct} />
      <div className="mt-1.5 text-center font-mono text-[11px] text-text-dim">
        {Math.round(overallPct)}% gesammelt{!done && ` (Stufe ${Math.min(currentLevel + 1, 4)} von 4)`}
      </div>
    </div>
  )
}
