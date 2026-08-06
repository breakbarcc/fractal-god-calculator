export interface AttunementTier {
  level: number
  title: string
  relic: number
  pristine: number
  ifm: number
  journals: number
}

export interface Activity {
  id: string
  label: string
  on: boolean
  relic: number
  pristine: number
  pages: number
}

export interface SelectOption {
  value: number
  label: string
}

export interface CalculatorResults {
  done: boolean
  remRelic: number
  remPristine: number
  remPages: number
  remIFM: number
  totalRelicBase: number
  totalPristineBase: number
  totalPagesBase: number
  totalIFMBase: number
  relicPerDay: number
  pristinePerDay: number
  pagesPerDay: number
  daysNeeded: number
  convertedPristine: number
  daysRelicOnly: number
  daysRelic: number
  bottleneck: 'relic' | 'pristine' | 'pages' | null
  overallPct: number
}

export interface CalculatorInputs {
  currentLevel: number
  prereqDone: boolean
  curRelic: number
  curPristine: number
  curIFM: number
  curPages: number
  curJournals: number
  activities: Activity[]
  extraRuns: number
  extraScale: number
  weeklyCache: number
  autoConvert: boolean
}
