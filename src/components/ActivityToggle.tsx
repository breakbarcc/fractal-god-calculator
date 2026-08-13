import { calculateActivityRelic } from '../lib/activityRelic'
import type { Activity } from '../types'

function YieldStat({ icon, alt, value }: Readonly<{ icon: string; alt: string; value: number }>) {
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-panel-2 px-2 py-1.5">
      <img src={icon} alt={alt} title={alt} className="h-4 w-4 flex-none" />
      <span className="font-mono text-xs text-text">{value}</span>
    </div>
  )
}

export function ActivityToggle({
  activity,
  onToggle,
}: Readonly<{
  activity: Activity
  onToggle: () => void
}>) {
  return (
    <div
      className={`mb-2.5 rounded-xl border p-3 px-3.5 ${activity.on ? 'border-line-strong bg-arcane/6' : 'border-line bg-white/1.5'}`}
    >
      <div className="flex cursor-pointer items-center gap-2.5 select-none" onClick={onToggle}>
        <div
          className={`relative h-5 w-[34px] flex-none rounded-full transition-colors ${activity.on ? 'bg-arcane/55' : 'bg-white/12'}`}
        >
          <div
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full transition-transform ${activity.on ? 'translate-x-3.5 bg-white' : 'bg-text-faint'}`}
          />
        </div>
        <div className="flex-1 text-[13.5px] font-medium">{activity.label}</div>
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-2">
        <YieldStat icon="/icons/fractal-relic.png" alt="Fractal Relic" value={calculateActivityRelic(activity)} />
        <YieldStat icon="/icons/pristine-fractal-relic.png" alt="Pristine Fractal Relic" value={activity.pristine} />
        <YieldStat icon="/icons/fractal-research-page.png" alt="Fractal Research Page" value={activity.pages} />
        <YieldStat
          icon="/icons/integrated-fractal-matrix.png"
          alt="Integrated Fractal Matrix"
          value={activity.integrated_fractal}
        />
      </div>
    </div>
  )
}
