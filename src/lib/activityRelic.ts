import type { Activity } from '../types'

export function calculateActivityRelic(activity: Activity): number {
  return activity.relic + activity.scaleRelicBonus
}
