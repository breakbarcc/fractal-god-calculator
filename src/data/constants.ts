import type { Activity, AttunementTier, SelectOption } from '../types'

export const PAGES_PER_JOURNAL = 28
export const IFM_CRAFT_RELIC = 15
export const PRISTINE_TO_RELIC = 15 // 1 Pristine Fractal Relic = 15 Fractal Relic via BUY-2046 PFR

export const MIST_ATTUNEMENT: AttunementTier[] = [
  { level: 1, title: 'Fractal Savant', relic: 25000, pristine: 0, ifm: 75, journals: 8 },
  { level: 2, title: 'Fractal Prodigy', relic: 35000, pristine: 1200, ifm: 150, journals: 0 },
  { level: 3, title: 'Fractal Champion', relic: 45000, pristine: 0, ifm: 225, journals: 16 },
  { level: 4, title: 'Fractal God', relic: 55000, pristine: 2000, ifm: 300, journals: 0 },
]

export const PREREQ = { relic: 5750, ifm: 35 }

export const ATTUNEMENT_TITLES = ['Fractal Savant', 'Fractal Prodigy', 'Fractal Champion', 'Fractal God']

export const ATTUNEMENT_LEVEL_OPTIONS: SelectOption[] = [
  { value: 0, label: 'Stufe 0 — noch nichts gekauft' },
  { value: 1, label: 'Stufe 1 — Fractal Savant' },
  { value: 2, label: 'Stufe 2 — Fractal Prodigy' },
  { value: 3, label: 'Stufe 3 — Fractal Champion' },
  { value: 4, label: 'Stufe 4 — Fractal God (fertig!)' },
]

export const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'tierDailies', label: 'Tages-Fraktale, alle 4 Tiers (12 Läufe)', on: true, relic: 165, pristine: 12, pages: 0 },
  { id: 'recommended', label: 'Empfohlene Fraktale (3x)', on: true, relic: 57, pristine: 3, pages: 3 },
  { id: 'cmKinfall', label: 'CM: Kinfall', on: false, relic: 119, pristine: 2, pages: 1 },
  { id: 'cmNightmare', label: 'CM: Nightmare', on: false, relic: 79, pristine: 2, pages: 1 },
  { id: 'cmShattered', label: 'CM: Shattered Observatory', on: false, relic: 79, pristine: 2, pages: 1 },
  { id: 'cmSunqua', label: 'CM: Sunqua Peak', on: false, relic: 139, pristine: 2, pages: 1 },
  { id: 'cmSilentSurf', label: 'CM: Silent Surf', on: false, relic: 119, pristine: 2, pages: 1 },
  { id: 'cmLonelyTower', label: 'CM: Lonely Tower', on: false, relic: 139, pristine: 2, pages: 1 },
]

export const SCALE_OPTIONS: SelectOption[] = [
  { value: 5, label: 'Skala 1–5 (5 Relic)' },
  { value: 6, label: 'Skala 6–10 (6 Relic)' },
  { value: 7, label: 'Skala 11–15 (7 Relic)' },
  { value: 8, label: 'Skala 16–20 (8 Relic)' },
  { value: 9, label: 'Skala 21–25 (9 Relic)' },
  { value: 10, label: 'Skala 26–30 (10 Relic)' },
  { value: 11, label: 'Skala 31–35 (11 Relic)' },
  { value: 12, label: 'Skala 36–40 (12 Relic)' },
  { value: 13, label: 'Skala 41–45 (13 Relic)' },
  { value: 14, label: 'Skala 46–50 (14 Relic)' },
  { value: 15, label: 'Skala 51–60 (15 Relic)' },
  { value: 16, label: 'Skala 61–70 (16 Relic)' },
  { value: 17, label: 'Skala 71–80 (17 Relic)' },
  { value: 18, label: 'Skala 81–90 (18 Relic)' },
  { value: 19, label: 'Skala 91–100 (19 Relic)' },
]

export const DEFAULT_EXTRA_SCALE = 15

export const WEEKLY_CACHE_OPTIONS: SelectOption[] = [
  { value: 0, label: 'Keine' },
  { value: 12, label: 'Tier-3-Zugang — 6× Cache/Woche (12 Pages)' },
  { value: 16, label: 'Tier-4-Zugang — 8× Cache/Woche (16 Pages)' },
]

// ---------- GW2 API ----------
export const GW2_API = 'https://api.guildwars2.com/v2'

export const ITEM_IDS = {
  researchPage: 73834,
  fractalJournal: 75439,
  integratedMatrix: 79230,
}

export const CURRENCY_NAMES = {
  relic: 'Fractal Relic',
  pristine: 'Pristine Fractal Relic',
}
