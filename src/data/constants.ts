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

// Each owned Mist Attunement rank (1-4) makes every T1/T2 fractal completion also drop one more
// "Handful of Fractal Relics" (3 Relic) and every T3/T4 completion one more "Pouch of Fractal
// Relics" (5 Relic) — see calculateActivityRelic() in lib/activityRelic.ts for the per-rank math.
// https://wiki.guildwars2.com/wiki/Handful_of_Fractal_Relics
// https://wiki.guildwars2.com/wiki/Pouch_of_Fractal_Relics
export const HANDFUL_RELIC = 3
export const POUCH_RELIC = 5

// Completing a Recommended fractal's Research Chest also grants a Large Mist Potion — Defensive
// for the Initiate's (T1), Mobility for the Adept's (T2), Offensive for the Expert's (T3) chest.
// The Mist Potion Brewer buys each back for a bundle of Handful of Fractal Relics:
// https://wiki.guildwars2.com/wiki/Mist_Potion_Brewer
export const MIST_POTION_RELIC = {
  defensive: 5 * HANDFUL_RELIC, // 15
  mobility: 5 * HANDFUL_RELIC, // 15
  offensive: 6 * HANDFUL_RELIC, // 18
}

export const ATTUNEMENT_TITLES = ['Fractal Savant', 'Fractal Prodigy', 'Fractal Champion', 'Fractal God']

// Title IDs from /v2/titles, in the same order as ATTUNEMENT_TITLES (index i = level i+1).
// Fixed and locale-independent — unlike title names, which the GW2 API localizes
// based on the request's Accept-Language.
export const ATTUNEMENT_TITLE_IDS = [299, 297, 296, 298]

export const ATTUNEMENT_LEVEL_OPTIONS: SelectOption[] = [
  { value: 0, label: 'Stufe 0 — noch nichts gekauft' },
  { value: 1, label: 'Stufe 1 — Fractal Savant' },
  { value: 2, label: 'Stufe 2 — Fractal Prodigy' },
  { value: 3, label: 'Stufe 3 — Fractal Champion' },
  { value: 4, label: 'Stufe 4 — Fractal God (fertig!)' },
]

export const RECOMMENDED_FRACTAL_ROTATION: Record<number, number[]> = {
  1: [2, 37, 53],
  2: [6, 28, 61],
  3: [10, 32, 65],
  4: [14, 34, 74],
  5: [19, 50, 70],
  6: [15, 48, 60],
  7: [24, 35, 66],
  8: [21, 36, 75],
  9: [7, 40, 67],
  10: [8, 31, 54],
  11: [11, 39, 59],
  12: [18, 27, 64],
  13: [4, 30, 58],
  14: [16, 42, 62],
  15: [5, 47, 68],
}

const ROTATION_LENGTH = 15
// Anchor point: on this date, this set is/was the active one. Advances by one set per day.
const ROTATION_REFERENCE_DATE = new Date(2026, 7, 14) // 2026-08-14
const ROTATION_REFERENCE_SET = 2

function getTodaysRecommendedSet(): number {
  const msPerDay = 24 * 60 * 60 * 1000
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const daysSinceReference = Math.round((today.getTime() - ROTATION_REFERENCE_DATE.getTime()) / msPerDay)
  const offset = (((ROTATION_REFERENCE_SET - 1 + daysSinceReference) % ROTATION_LENGTH) + ROTATION_LENGTH) % ROTATION_LENGTH
  return offset + 1
}

// Relic reward for completing a fractal at the given scale, per the SCALE_OPTIONS brackets below
// (5-wide from scale 1-50, 10-wide from scale 51-100).
function relicForScale(scale: number): number {
  if (scale <= 50) return 5 + Math.floor((scale - 1) / 5)
  return 15 + Math.floor((scale - 51) / 10)
}

const todaysRecommendedScales = RECOMMENDED_FRACTAL_ROTATION[getTodaysRecommendedSet()]
const RECOMMENDED_SCALE_RELIC_BONUS = todaysRecommendedScales.reduce((sum, scale) => sum + relicForScale(scale), 0)

// scaleRelicBonus: completion reward from SCALE_OPTIONS for the scale(s) an activity is run at
// (GW2 wiki "Fractal levels" table — each fractal type has one fixed scale per tier).
// - Daily Fractals covers one run per tier T1-T4; using each tier's highest scale:
//   T1 max 25 (9) + T2 max 50 (14) + T3 max 75 (17) + T4 max 100 (19) = 59
// - Recommended fractals covers T1-T3 only (Recommended never includes Master/T4); its bonus is
//   computed above (RECOMMENDED_SCALE_RELIC_BONUS) from today's actual rotation scales
// - All 7 Challenge Mode fractals sit at Master-tier scale 91-100 (Kinfall 95, Nightmare 96,
//   Shattered Observatory 97, Sunqua Peak 98, Silent Surf 99, Lonely Tower 100, Solitary Throne 94)
//   = 19 each
// (Which activities count as T1/T2 vs T3/T4 completions for the Handful/Pouch bonus is decided
// in lib/activityRelic.ts, since the per-completion drop count depends on Mist Attunement rank.)
export const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 'tierDailies',
    label: 'Tägliche Fraktale (T1 - T4)',
    on: true,
    relic: 165,
    pristine: 12,
    pages: 0,
    integrated_fractal: 0,
    scaleRelicBonus: 59,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
  {
    id: 'recommended',
    label: 'Empfohlene Fraktale (T1 - T3)',
    on: true,
    relic: 57,
    pristine: 3,
    pages: 3,
    integrated_fractal: 0,
    scaleRelicBonus: RECOMMENDED_SCALE_RELIC_BONUS,
    potionDefensive: 1,
    potionMobility: 1,
    potionOffensive: 1,
  },
  {
    id: 'cmKinfall',
    label: 'CM: Kinfall',
    on: true,
    relic: 100,
    pristine: 2,
    pages: 1,
    integrated_fractal: 1,
    scaleRelicBonus: 19,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
  {
    id: 'cmNightmare',
    label: 'CM: Nightmare',
    on: true,
    relic: 140,
    pristine: 2,
    pages: 1,
    integrated_fractal: 1,
    scaleRelicBonus: 19,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
  {
    id: 'cmShattered',
    label: 'CM: Shattered Observatory',
    on: false,
    relic: 140,
    pristine: 2,
    pages: 1,
    integrated_fractal: 1,
    scaleRelicBonus: 19,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
  {
    id: 'cmSunqua',
    label: 'CM: Sunqua Peak',
    on: false,
    relic: 120,
    pristine: 2,
    pages: 1,
    integrated_fractal: 1,
    scaleRelicBonus: 19,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
  {
    id: 'cmSilentSurf',
    label: 'CM: Silent Surf',
    on: false,
    relic: 100,
    pristine: 2,
    pages: 1,
    integrated_fractal: 1,
    scaleRelicBonus: 19,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
  {
    id: 'cmLonelyTower',
    label: 'CM: Lonely Tower',
    on: false,
    relic: 120,
    pristine: 2,
    pages: 1,
    integrated_fractal: 1,
    scaleRelicBonus: 19,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
  {
    id: 'cmSolitaryThrone',
    label: 'CM: Solitary Throne',
    on: false,
    relic: 100,
    pristine: 2,
    pages: 1,
    integrated_fractal: 1,
    scaleRelicBonus: 19,
    potionDefensive: 0,
    potionMobility: 0,
    potionOffensive: 0,
  },
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

export const DAYS_PER_WEEK_OPTIONS: SelectOption[] = [
  { value: 0, label: '0 Tage/Woche' },
  { value: 1, label: '1 Tag/Woche' },
  { value: 2, label: '2 Tage/Woche' },
  { value: 3, label: '3 Tage/Woche' },
  { value: 4, label: '4 Tage/Woche' },
  { value: 5, label: '5 Tage/Woche' },
  { value: 6, label: '6 Tage/Woche' },
  { value: 7, label: '7 Tage/Woche (täglich)' },
]

export const DEFAULT_DAYS_PER_WEEK = 7

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

export const CURRENCY_IDS = {
  relic: 7,
  pristine: 24,
}
