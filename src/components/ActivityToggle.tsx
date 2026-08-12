import type { Activity } from '../types'

function YieldField({ label, value, onChange }: Readonly<{
  label: string;
  value: number;
  onChange: (value: number) => void
}>) {
  return (
    <div className="flex flex-col gap-[3px]">
      <span className="font-mono text-[9.5px] tracking-[0.05em] text-text-faint uppercase">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
        className="w-full rounded-md border border-line bg-panel-2 px-2 py-1.5 text-right font-mono text-xs text-text focus:border-arcane focus:outline-none"
      />
    </div>
  )
}

export function ActivityToggle({
  activity,
  onToggle,
  onFieldChange,
}: Readonly<{
  activity: Activity
  onToggle: () => void
  onFieldChange: (field: 'relic' | 'pristine' | 'pages', value: number) => void
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
      <div
        className={`grid grid-cols-3 gap-2 overflow-hidden transition-all duration-[250ms] ${
          activity.on ? 'mt-2.5 max-h-20 opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        <YieldField label="Relic/Tag" value={activity.relic} onChange={(v) => onFieldChange('relic', v)} />
        <YieldField label="Pristine/Tag" value={activity.pristine} onChange={(v) => onFieldChange('pristine', v)} />
        <YieldField label="Pages/Tag" value={activity.pages} onChange={(v) => onFieldChange('pages', v)} />
      </div>
    </div>
  )
}
