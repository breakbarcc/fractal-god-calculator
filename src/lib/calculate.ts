import { IFM_CRAFT_RELIC, MIST_ATTUNEMENT, PAGES_PER_JOURNAL, PREREQ, PRISTINE_TO_RELIC } from '../data/constants'
import type { CalculatorInputs, CalculatorResults } from '../types'

/**
 * Pure port of the original calculator's `calculate()` — same formulas for
 * remaining resources, daily rates, Pristine→Relic auto-conversion timing,
 * bottleneck detection and overall progress.
 */
export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const { currentLevel, prereqDone } = inputs

  if (currentLevel >= 4) {
    return {
      done: true,
      remRelic: 0,
      remPristine: 0,
      remPages: 0,
      remIFM: 0,
      totalRelicBase: 0,
      totalPristineBase: 0,
      totalPagesBase: 0,
      totalIFMBase: 0,
      relicPerDay: 0,
      pristinePerDay: 0,
      pagesPerDay: 0,
      daysNeeded: 0,
      convertedPristine: 0,
      daysRelicOnly: 0,
      daysRelic: 0,
      bottleneck: null,
      overallPct: 100,
    }
  }

  let needRelic = 0
  let needPristine = 0
  let needIFM = 0
  let needJournals = 0
  for (const tier of MIST_ATTUNEMENT) {
    if (tier.level > currentLevel) {
      needRelic += tier.relic
      needPristine += tier.pristine
      needIFM += tier.ifm
      needJournals += tier.journals
    }
  }
  if (!prereqDone) {
    needRelic += PREREQ.relic
    needIFM += PREREQ.ifm
  }

  const totalRelicBase = needRelic
  const totalPristineBase = needPristine
  const totalIFMBase = needIFM
  const totalPagesBase = needJournals * PAGES_PER_JOURNAL

  const curPages = inputs.curPages + inputs.curJournals * PAGES_PER_JOURNAL

  const remIFM = Math.max(0, needIFM - inputs.curIFM)
  let remRelic = needRelic + remIFM * IFM_CRAFT_RELIC
  remRelic = Math.max(0, remRelic - inputs.curRelic)
  const remPristine = Math.max(0, needPristine - inputs.curPristine)
  const remPages = Math.max(0, totalPagesBase - curPages)

  let relicPerDay = 0
  let pristinePerDay = 0
  let pagesPerDay = 0
  for (const activity of inputs.activities) {
    if (activity.on) {
      relicPerDay += activity.relic
      pristinePerDay += activity.pristine
      pagesPerDay += activity.pages
    }
  }
  relicPerDay += inputs.extraRuns * inputs.extraScale
  pagesPerDay += inputs.weeklyCache / 7

  const daysRelicOnly = remRelic > 0 ? (relicPerDay > 0 ? remRelic / relicPerDay : Infinity) : 0
  const daysPristine = remPristine > 0 ? (pristinePerDay > 0 ? remPristine / pristinePerDay : Infinity) : 0
  const daysPages = remPages > 0 ? (pagesPerDay > 0 ? remPages / pagesPerDay : Infinity) : 0

  let daysRelic = daysRelicOnly
  let convertedPristine = 0

  if (inputs.autoConvert && remRelic > 0) {
    if (!isFinite(daysPristine)) {
      daysRelic = daysRelicOnly
    } else {
      const relicAtTp = relicPerDay * daysPristine
      const relicRemainingAtTp = remRelic - relicAtTp
      if (relicRemainingAtTp <= 0) {
        daysRelic = daysRelicOnly
      } else {
        const combinedRate = relicPerDay + PRISTINE_TO_RELIC * pristinePerDay
        daysRelic = combinedRate > 0 ? daysPristine + relicRemainingAtTp / combinedRate : Infinity
        if (isFinite(daysRelic)) {
          convertedPristine = Math.max(0, pristinePerDay * daysRelic - remPristine)
        }
      }
    }
  }

  const daysNeeded = Math.max(daysRelic, daysPristine, daysPages)

  let bottleneck: CalculatorResults['bottleneck'] = 'relic'
  let max = daysRelic
  if (daysPristine > max) {
    max = daysPristine
    bottleneck = 'pristine'
  }
  if (daysPages > max) {
    max = daysPages
    bottleneck = 'pages'
  }

  const totalRelicEquiv = totalRelicBase + totalIFMBase * IFM_CRAFT_RELIC
  const overallPct = totalRelicEquiv > 0 ? Math.max(0, Math.min(100, (1 - remRelic / totalRelicEquiv) * 100)) : 100

  return {
    done: false,
    remRelic,
    remPristine,
    remPages,
    remIFM,
    totalRelicBase,
    totalPristineBase,
    totalPagesBase,
    totalIFMBase,
    relicPerDay,
    pristinePerDay,
    pagesPerDay,
    daysNeeded,
    convertedPristine,
    daysRelicOnly,
    daysRelic,
    bottleneck,
    overallPct,
  }
}
