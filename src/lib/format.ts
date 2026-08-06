export function fmt(n: number): string {
  return Math.round(n).toLocaleString('de-DE')
}

export function formatTargetDate(daysFromNow: number): string {
  const target = new Date()
  target.setDate(target.getDate() + Math.ceil(daysFromNow))
  return target.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
}
