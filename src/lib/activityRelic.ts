import { HANDFUL_RELIC, MIST_POTION_RELIC, POUCH_RELIC } from '../data/constants'
import type { Activity } from '../types'

// Number of T1/T2 (Handful of Fractal Relics) and T3/T4 (Pouch of Fractal Relics) completions
// each activity represents. Structural fact about the activity, independent of the player's
// Mist Attunement rank — the rank instead multiplies how many items each completion drops.
const TIER_COMPLETIONS: Record<string, { handfulCount: number; pouchCount: number }> = {
  tierDailies: { handfulCount: 2, pouchCount: 2 },
  recommended: { handfulCount: 2, pouchCount: 1 },
  cmKinfall: { handfulCount: 0, pouchCount: 1 },
  cmNightmare: { handfulCount: 0, pouchCount: 1 },
  cmShattered: { handfulCount: 0, pouchCount: 1 },
  cmSunqua: { handfulCount: 0, pouchCount: 1 },
  cmSilentSurf: { handfulCount: 0, pouchCount: 1 },
  cmLonelyTower: { handfulCount: 0, pouchCount: 1 },
}

/** Relic gained by exchanging this activity's Large Mist Potions at the Mist Potion Brewer. */
export function calculatePotionRelic(activity: Activity): number {
  return (
    activity.potionDefensive * MIST_POTION_RELIC.defensive +
    activity.potionMobility * MIST_POTION_RELIC.mobility +
    activity.potionOffensive * MIST_POTION_RELIC.offensive
  )
}

/**
 * @param attunementRank Owned Mist Attunement rank (0-4) — each rank owned adds one more
 * Handful/Pouch of Fractal Relics per eligible completion.
 */
export function calculateActivityRelic(activity: Activity, attunementRank: number): number {
  const { handfulCount, pouchCount } = TIER_COMPLETIONS[activity.id] ?? { handfulCount: 0, pouchCount: 0 }
  const itemBonus = attunementRank * (handfulCount * HANDFUL_RELIC + pouchCount * POUCH_RELIC)
  return activity.relic + activity.scaleRelicBonus + itemBonus + calculatePotionRelic(activity)
}
