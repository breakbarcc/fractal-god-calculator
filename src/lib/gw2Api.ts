import { ATTUNEMENT_TITLE_IDS, CURRENCY_IDS, GW2_API, ITEM_IDS } from '../data/constants'

export type LogLevel = 'ok' | 'warn' | undefined

export interface Gw2FetchResult {
  curRelic?: number
  curPristine?: number
  curPages?: number
  curJournals?: number
  curIFM?: number
  prereqDone?: boolean
  attLevel?: number
}

interface InventorySlot {
  id: number
  count: number
}

interface WalletEntry {
  id: number
  value: number
}

interface ProgressionEntry {
  id: string
  value: number
}

function sumItemInSlots(slots: unknown, itemId: number): number {
  if (!Array.isArray(slots)) return 0
  let total = 0
  for (const slot of slots as (InventorySlot | null)[]) {
    if (slot?.id === itemId && typeof slot.count === 'number') {
      total += slot.count
    }
  }
  return total
}

async function apiGet<T>(path: string, key?: string): Promise<T> {
  const sep = path.includes('?') ? '&' : '?'
  const url = key ? `${GW2_API}${path}${sep}access_token=${encodeURIComponent(key)}` : `${GW2_API}${path}`
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`${path} → HTTP ${res.status} ${body.slice(0, 120)}`)
  }
  return (await res.json()) as Promise<T>
}

/**
 * Pure port of the original `fetchAccountData()` — resolves wallet, item stock,
 * prerequisites and current attunement level from the GW2 API. Reports progress
 * via `onLog` instead of writing to the DOM directly, so callers can render
 * their own status feed.
 */
export async function fetchGw2AccountData(
  apiKey: string,
  onLog: (message: string, level?: LogLevel) => void,
): Promise<Gw2FetchResult> {
  const result: Gw2FetchResult = {}
  onLog('Verbinde mit api.guildwars2.com …')

  try {
    const wallet = await apiGet<WalletEntry[]>('/account/wallet', apiKey)
    const findVal = (id: number) => wallet.find((w) => w.id === id)?.value ?? 0
    result.curRelic = findVal(CURRENCY_IDS.relic)
    onLog('✓ Fractal Relic geladen', 'ok')
    result.curPristine = findVal(CURRENCY_IDS.pristine)
    onLog('✓ Pristine Fractal Relic geladen', 'ok')
  } catch (e) {
    onLog('⚠ Wallet: ' + (e as Error).message, 'warn')
  }

  let researchPages = 0
  let journals = 0
  let matrices = 0
  const sources: unknown[] = []
  try {
    sources.push(await apiGet('/account/materials', apiKey))
  } catch (e) {
    onLog('⚠ Materiallager: ' + (e as Error).message, 'warn')
  }
  try {
    sources.push(await apiGet('/account/bank', apiKey))
  } catch (e) {
    onLog('⚠ Bank: ' + (e as Error).message, 'warn')
  }
  try {
    sources.push(await apiGet('/account/inventory', apiKey))
  } catch (e) {
    onLog('⚠ Geteilte Inventarplätze: ' + (e as Error).message, 'warn')
  }
  if (sources.length) {
    for (const src of sources) {
      researchPages += sumItemInSlots(src, ITEM_IDS.researchPage)
      journals += sumItemInSlots(src, ITEM_IDS.fractalJournal)
      matrices += sumItemInSlots(src, ITEM_IDS.integratedMatrix)
    }
    result.curPages = researchPages
    result.curJournals = journals
    result.curIFM = matrices
    onLog('✓ Research Pages / Journals / Matrix aus Bank + Materiallager + geteilten Plätzen summiert', 'ok')
    onLog('  (Taschen auf einzelnen Charakteren werden nicht mitgezählt)')
  }

  try {
    const prog = await apiGet<ProgressionEntry[]>('/account/progression', apiKey)
    const get = (id: string) => prog.find((p) => p.id === id)?.value ?? 0
    const allTwo =
      get('fractal_empowerment') >= 2 && get('fractal_karmic_retribution') >= 2 && get('fractal_agony_impedance') >= 2
    result.prereqDone = allTwo
    onLog('✓ Grundvoraussetzungen erkannt: ' + (allTwo ? 'erfüllt' : 'noch nicht vollständig'), 'ok')
  } catch (e) {
    onLog('⚠ Progression: ' + (e as Error).message, 'warn')
  }

  try {
    const owned = await apiGet<number[]>('/account/titles', apiKey)
    let level = 0
    ATTUNEMENT_TITLE_IDS.forEach((id, i) => {
      if (owned.includes(id)) level = i + 1
    })
    result.attLevel = level
    onLog('✓ Mist-Attunement-Stufe erkannt: ' + level + ' von 4', 'ok')
  } catch (e) {
    onLog('⚠ Titel: ' + (e as Error).message, 'warn')
  }

  onLog('Fertig.')
  return result
}
