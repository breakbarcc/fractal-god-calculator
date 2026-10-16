import type { Activity, AttunementTier, ScaleOption, WeeklyCacheOption } from '../types'

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

// Mist Attunement levels; the (translated) title of each is the message `attunement.title.<level>`.
export const ATTUNEMENT_LEVELS = [1, 2, 3, 4] as const

// Title IDs from /v2/titles, in the same order as ATTUNEMENT_LEVELS (index i = level i+1).
// Fixed and locale-independent — unlike title names, which the GW2 API localizes
// based on the request's Accept-Language.
export const ATTUNEMENT_TITLE_IDS = [299, 297, 296, 298]

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
  const offset =
    (((ROTATION_REFERENCE_SET - 1 + daysSinceReference) % ROTATION_LENGTH) + ROTATION_LENGTH) % ROTATION_LENGTH
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
    id: 'cmSolitaryThrone',
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
    id: 'cmKinfall',
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
]

// Fractal scale brackets and the Fractal Relic reward per completion in each (value = relic reward).
export const SCALE_OPTIONS: ScaleOption[] = [
  { value: 5, from: 1, to: 5 },
  { value: 6, from: 6, to: 10 },
  { value: 7, from: 11, to: 15 },
  { value: 8, from: 16, to: 20 },
  { value: 9, from: 21, to: 25 },
  { value: 10, from: 26, to: 30 },
  { value: 11, from: 31, to: 35 },
  { value: 12, from: 36, to: 40 },
  { value: 13, from: 41, to: 45 },
  { value: 14, from: 46, to: 50 },
  { value: 15, from: 51, to: 60 },
  { value: 16, from: 61, to: 70 },
  { value: 17, from: 71, to: 80 },
  { value: 18, from: 81, to: 90 },
  { value: 19, from: 91, to: 100 },
]

export const DEFAULT_EXTRA_SCALE = 15

export const DAYS_PER_WEEK_VALUES = [0, 1, 2, 3, 4, 5, 6, 7]

export const DEFAULT_DAYS_PER_WEEK = 7

// value = Research Pages per week; tier/caches describe the Fractal Fighter's Cache access.
export const WEEKLY_CACHE_OPTIONS: WeeklyCacheOption[] = [
  { value: 0 },
  { value: 12, tier: 3, caches: 6 },
  { value: 16, tier: 4, caches: 8 },
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
