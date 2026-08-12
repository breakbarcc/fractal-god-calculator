import { IFM_CRAFT_RELIC, MIST_ATTUNEMENT, PAGES_PER_JOURNAL, PREREQ, PRISTINE_TO_RELIC } from '../data/constants'
import type { CalculatorInputs, CalculatorResults } from '../types'

const DAYS_IN_WEEK = 7

interface Needs {
  relic: number
  pristine: number
  ifm: number
  journals: number
}

interface BaseRemaining {
  remPristine: number
  remPages: number
  totalRelicBase: number
  totalPristineBase: number
  totalIFMBase: number
  totalPagesBase: number
  baseRelicNeed: number
  ifmDeficit: number
}

interface DailyRates {
  relicPerDay: number
  pristinePerDay: number
  pagesPerDay: number
  ifmPerDay: number
}

function doneResult(): CalculatorResults {
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
    ifmPerDay: 0,
    daysNeeded: 0,
    convertedPristine: 0,
    daysRelicOnly: 0,
    daysRelic: 0,
    bottleneck: null,
    overallPct: 100,
  }
}

function calculateNeeds(currentLevel: number, prereqDone: boolean): Needs {
  const needs: Needs = { relic: 0, pristine: 0, ifm: 0, journals: 0 }
  for (const tier of MIST_ATTUNEMENT) {
    if (tier.level > currentLevel) {
      needs.relic += tier.relic
      needs.pristine += tier.pristine
      needs.ifm += tier.ifm
      needs.journals += tier.journals
    }
  }
  if (!prereqDone) {
    needs.relic += PREREQ.relic
    needs.ifm += PREREQ.ifm
  }
  return needs
}

function calculateBaseRemaining(needs: Needs, inputs: CalculatorInputs): BaseRemaining {
  const totalPagesBase = needs.journals * PAGES_PER_JOURNAL
  const curPages = inputs.curPages + inputs.curJournals * PAGES_PER_JOURNAL

  const ifmDeficit = Math.max(0, needs.ifm - inputs.curIFM)
  const baseRelicNeed = Math.max(0, needs.relic - inputs.curRelic)
  const remPristine = Math.max(0, needs.pristine - inputs.curPristine)
  const remPages = Math.max(0, totalPagesBase - curPages)

  return {
    remPristine,
    remPages,
    totalRelicBase: needs.relic,
    totalPristineBase: needs.pristine,
    totalIFMBase: needs.ifm,
    totalPagesBase,
    baseRelicNeed,
    ifmDeficit,
  }
}

function calculateDailyRates(inputs: CalculatorInputs): DailyRates {
  let relicPerDay = 0
  let pristinePerDay = 0
  let pagesPerDay = 0
  let ifmPerDay = 0
  for (const activity of inputs.activities) {
    if (activity.on) {
      relicPerDay += activity.relic
      pristinePerDay += activity.pristine
      pagesPerDay += activity.pages
      ifmPerDay += activity.integrated_fractal
    }
  }
  relicPerDay += inputs.extraRuns * inputs.extraScale

  const playFraction = Math.max(0, Math.min(DAYS_IN_WEEK, inputs.daysPerWeek)) / DAYS_IN_WEEK
  relicPerDay *= playFraction
  pristinePerDay *= playFraction
  pagesPerDay *= playFraction
  ifmPerDay *= playFraction

  if (inputs.daysPerWeek > 0) {
    pagesPerDay += inputs.weeklyCache / DAYS_IN_WEEK
  }

  return { relicPerDay, pristinePerDay, pagesPerDay, ifmPerDay }
}

/** Days until `remaining` is covered by `perDay` income; 0 if already covered, Infinity if income is 0. */
function daysToReach(remaining: number, perDay: number): number {
  if (remaining <= 0) return 0
  return perDay > 0 ? remaining / perDay : Infinity
}

/**
 * Integrated Fractal Matrix can always be crafted from Relic (15 Relic each), so it never
 * independently blocks progress — unlike Pristine or Pages. This returns the Relic need for
 * the *days-until-done* timeline: if natural IFM loot income covers the deficit before base
 * Relic alone would be ready, no crafting is needed; otherwise the shortfall must be crafted,
 * adding its cost back in. The displayed static Relic/IFM totals are unaffected by this.
 */
function calculateRelicNeedForDays(base: BaseRemaining, relicPerDay: number, ifmPerDay: number): number {
  if (base.ifmDeficit <= 0) return base.baseRelicNeed

  const daysIfmOnly = daysToReach(base.ifmDeficit, ifmPerDay)
  const daysRelicBaseOnly = daysToReach(base.baseRelicNeed, relicPerDay)
  if (daysIfmOnly <= daysRelicBaseOnly) return base.baseRelicNeed

  return base.baseRelicNeed + base.ifmDeficit * IFM_CRAFT_RELIC
}

/**
 * Relic timeline when Pristine surplus (income after `remPristine` is covered) is
 * auto-converted into Relic via BUY-2046 PFR, plus how much Pristine that consumes.
 */
function calculateRelicDaysWithConversion(
  relicNeed: number,
  remPristine: number,
  relicPerDay: number,
  pristinePerDay: number,
  daysRelicOnly: number,
  daysPristine: number,
): { daysRelic: number; convertedPristine: number } {
  if (relicNeed <= 0 || !Number.isFinite(daysPristine)) {
    return { daysRelic: daysRelicOnly, convertedPristine: 0 }
  }

  const relicAtPristineTarget = relicPerDay * daysPristine
  const relicRemainingAfter = relicNeed - relicAtPristineTarget
  if (relicRemainingAfter <= 0) {
    return { daysRelic: daysRelicOnly, convertedPristine: 0 }
  }

  const combinedRate = relicPerDay + PRISTINE_TO_RELIC * pristinePerDay
  const daysRelic = combinedRate > 0 ? daysPristine + relicRemainingAfter / combinedRate : Infinity
  const convertedPristine = Number.isFinite(daysRelic) ? Math.max(0, pristinePerDay * daysRelic - remPristine) : 0

  return { daysRelic, convertedPristine }
}

function determineBottleneck(
  daysRelic: number,
  daysPristine: number,
  daysPages: number,
): CalculatorResults['bottleneck'] {
  let bottleneck: CalculatorResults['bottleneck'] = 'relic'
  let max = daysRelic
  if (daysPristine > max) {
    max = daysPristine
    bottleneck = 'pristine'
  }
  if (daysPages > max) {
    bottleneck = 'pages'
  }
  return bottleneck
}

/**
 * Pure port of the original calculator's `calculate()` — same formulas for
 * remaining resources, daily rates, Pristine→Relic auto-conversion timing,
 * bottleneck detection and overall progress.
 */
export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const { currentLevel, prereqDone } = inputs

  if (currentLevel >= 4) {
    return doneResult()
  }

  const needs = calculateNeeds(currentLevel, prereqDone)
  const base = calculateBaseRemaining(needs, inputs)
  const { relicPerDay, pristinePerDay, pagesPerDay, ifmPerDay } = calculateDailyRates(inputs)

  const remIFM = base.ifmDeficit
  const remRelic = base.baseRelicNeed + remIFM * IFM_CRAFT_RELIC
  const relicNeedForDays = calculateRelicNeedForDays(base, relicPerDay, ifmPerDay)

  const daysRelicOnly = daysToReach(relicNeedForDays, relicPerDay)
  const daysPristine = daysToReach(base.remPristine, pristinePerDay)
  const daysPages = daysToReach(base.remPages, pagesPerDay)

  const { daysRelic, convertedPristine } = inputs.autoConvert
    ? calculateRelicDaysWithConversion(
        relicNeedForDays,
        base.remPristine,
        relicPerDay,
        pristinePerDay,
        daysRelicOnly,
        daysPristine,
      )
    : { daysRelic: daysRelicOnly, convertedPristine: 0 }

  const daysNeeded = Math.max(daysRelic, daysPristine, daysPages)
  const bottleneck = determineBottleneck(daysRelic, daysPristine, daysPages)

  const totalRelicEquiv = base.totalRelicBase + base.totalIFMBase * IFM_CRAFT_RELIC
  const overallPct = totalRelicEquiv > 0 ? Math.max(0, Math.min(100, (1 - remRelic / totalRelicEquiv) * 100)) : 100

  return {
    done: false,
    remRelic,
    remPristine: base.remPristine,
    remPages: base.remPages,
    remIFM,
    totalRelicBase: base.totalRelicBase,
    totalPristineBase: base.totalPristineBase,
    totalPagesBase: base.totalPagesBase,
    totalIFMBase: base.totalIFMBase,
    relicPerDay,
    pristinePerDay,
    pagesPerDay,
    ifmPerDay,
    daysNeeded,
    convertedPristine,
    daysRelicOnly,
    daysRelic,
    bottleneck,
    overallPct,
  }
}
