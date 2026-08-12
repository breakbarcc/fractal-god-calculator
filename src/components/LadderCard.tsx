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
      <AttunementLadder currentLevel={currentLevel} />
      <div className="mt-4.5">
        <div className="mb-1.5 flex justify-between font-mono text-[11px] text-text-dim">
          <span>
            {Math.round(overallPct)}% gesammelt{!done && ` (Stufe ${Math.min(currentLevel + 1, 4)} von 4)`}
          </span>
          <span />
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-relic),var(--color-arcane)_60%,var(--color-pristine))] transition-[width] duration-[400ms]"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
