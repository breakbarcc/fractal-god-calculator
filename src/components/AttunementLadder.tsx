import { ATTUNEMENT_TITLES } from '../data/constants'

const CX = [120, 340, 560, 780]
const CY = 60

export function AttunementLadder({ currentLevel }: { currentLevel: number }) {
  const progressX = 120 + (Math.min(currentLevel, 4) / 4) * 660

  return (
    <svg viewBox="0 0 900 140" className="block h-auto w-full">
      <defs>
        <linearGradient id="gradLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5b9bd5" />
          <stop offset="100%" stopColor="#c3aef7" />
        </linearGradient>
      </defs>
      <line x1="120" y1={CY} x2="780" y2={CY} stroke="rgba(255,255,255,.08)" strokeWidth="3" />
      <line x1="120" y1={CY} x2={progressX} y2={CY} stroke="url(#gradLine)" strokeWidth="3" />

      {ATTUNEMENT_TITLES.map((title, i) => {
        const lvl = i + 1
        const done = lvl <= currentLevel
        const current = lvl === currentLevel + 1
        const fill = done ? 'url(#gradLine)' : current ? '#1c1830' : '#141026'
        const stroke = done ? '#c3aef7' : current ? '#9b7fe0' : 'rgba(255,255,255,.15)'
        const r = current ? 14 : 11
        const cx = CX[i]

        return (
          <g key={title}>
            <circle
              cx={cx}
              cy={CY}
              r={r}
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              style={current ? { filter: 'drop-shadow(0 0 8px #9b7fe0)' } : undefined}
            />
            {done && (
              <path
                d={`M${cx - 4} ${CY} l3 4 l6 -8`}
                stroke="#0a0916"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <text x={cx} y={CY + 34} textAnchor="middle" className="fill-text font-cinzel text-[13px]">
              {title}
            </text>
            <text x={cx} y={CY + 50} textAnchor="middle" className="fill-text-faint font-mono text-[10px]">
              MIST ATTUNEMENT {lvl}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
