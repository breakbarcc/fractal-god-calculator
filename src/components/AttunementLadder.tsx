import { ATTUNEMENT_LEVELS } from '../data/constants'
import { useI18n } from '../i18n/context'

const CX = [120, 340, 560, 780]
const CY = 60

export function AttunementLadder({ currentLevel, overallPct }: Readonly<{ currentLevel: number; overallPct: number }>) {
  const { t } = useI18n()
  const progress = Math.max(0, Math.min(100, overallPct)) / 100
  const progressX = 120 + progress * 660

  return (
    <svg viewBox="0 0 900 140" className="block h-auto w-full">
      <defs>
        <linearGradient id="gradLine" gradientUnits="userSpaceOnUse" x1="120" y1={CY} x2="780" y2={CY}>
          <stop offset="0%" stopColor="#5b9bd5" />
          <stop offset="100%" stopColor="#c3aef7" />
        </linearGradient>
      </defs>
      <line x1="120" y1={CY} x2="780" y2={CY} stroke="rgba(255,255,255,.08)" strokeWidth="10" strokeLinecap="round" />
      <line
        x1="120"
        y1={CY}
        x2={progressX}
        y2={CY}
        stroke="url(#gradLine)"
        strokeWidth="10"
        strokeLinecap="round"
        className="transition-[x2] duration-[400ms]"
      />

      {ATTUNEMENT_LEVELS.map((lvl, i) => {
        const done = lvl <= currentLevel
        const current = lvl === currentLevel + 1
        const fill = done ? 'url(#gradLine)' : current ? '#1c1830' : '#141026'
        const stroke = done ? '#c3aef7' : current ? '#9b7fe0' : 'rgba(255,255,255,.15)'
        const r = current ? 14 : 11
        const cx = CX[i]

        return (
          <g key={lvl}>
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
              {t(`attunement.title.${lvl}`)}
            </text>
            <text x={cx} y={CY + 50} textAnchor="middle" className="fill-text-faint font-mono text-[10px]">
              {t('ladder.attunement', { level: lvl })}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
