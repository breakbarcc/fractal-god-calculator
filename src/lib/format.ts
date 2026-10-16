export function fmt(n: number, locale: string): string {
  return Math.round(n).toLocaleString(locale)
}

export function formatTargetDate(daysFromNow: number, locale: string): string {
  const target = new Date()
  target.setDate(target.getDate() + Math.ceil(daysFromNow))
  return target.toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' })
}
