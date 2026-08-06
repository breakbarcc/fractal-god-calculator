export function ResourceCard({
  name,
  dotClass,
  value,
  sub,
  fillClass,
  fillPct,
}: {
  name: string
  dotClass: string
  value: string
  sub: string
  fillClass: string
  fillPct: number
}) {
  return (
    <div className="rounded-xl border border-line bg-white/3 p-3.5">
      <div className="mb-2 flex items-center text-[11.5px] text-text-dim">
        <span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${dotClass}`} />
        {name}
      </div>
      <div className="font-mono text-lg font-bold text-text">{value}</div>
      <div className="mt-1 font-mono text-[10.5px] text-text-faint">{sub}</div>
      <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-white/6">
        <div className={`h-full rounded-full ${fillClass}`} style={{ width: `${fillPct}%` }} />
      </div>
    </div>
  )
}
