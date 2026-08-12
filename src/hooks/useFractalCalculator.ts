import { useMemo, useState } from 'react'
import { DEFAULT_ACTIVITIES, DEFAULT_EXTRA_SCALE } from '../data/constants'
import { calculate } from '../lib/calculate'
import { useLocalStorage } from './useLocalStorage'
import type { Gw2FetchResult } from '../lib/gw2Api'
import type { Activity } from '../types'

export function useFractalCalculator() {
  const [attLevel, setAttLevel] = useState(0)
  const [prereqDone, setPrereqDone] = useState(true)

  const [curRelic, setCurRelic] = useState(0)
  const [curPristine, setCurPristine] = useState(0)
  const [curIFM, setCurIFM] = useState(0)
  const [curPages, setCurPages] = useState(0)
  const [curJournals, setCurJournals] = useState(0)

  const [apiKey, setApiKey] = useLocalStorage('gw2-fractal-god-api-key', '')

  const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES)
  const [extraRuns, setExtraRuns] = useState(0)
  const [extraScale, setExtraScale] = useState(DEFAULT_EXTRA_SCALE)
  const [weeklyCache, setWeeklyCache] = useState(0)
  const [autoConvert, setAutoConvert] = useState(true)

  function toggleActivity(id: string) {
    setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, on: !a.on } : a)))
  }

  function applyFetchResult(fetched: Gw2FetchResult) {
    if (fetched.curRelic != null) setCurRelic(fetched.curRelic)
    if (fetched.curPristine != null) setCurPristine(fetched.curPristine)
    if (fetched.curPages != null) setCurPages(fetched.curPages)
    if (fetched.curJournals != null) setCurJournals(fetched.curJournals)
    if (fetched.curIFM != null) setCurIFM(fetched.curIFM)
    if (fetched.prereqDone != null) setPrereqDone(fetched.prereqDone)
    if (fetched.attLevel != null) setAttLevel(fetched.attLevel)
  }

  const results = useMemo(
    () =>
      calculate({
        currentLevel: attLevel,
        prereqDone,
        curRelic,
        curPristine,
        curIFM,
        curPages,
        curJournals,
        activities,
        extraRuns,
        extraScale,
        weeklyCache,
        autoConvert,
      }),
    [
      attLevel,
      prereqDone,
      curRelic,
      curPristine,
      curIFM,
      curPages,
      curJournals,
      activities,
      extraRuns,
      extraScale,
      weeklyCache,
      autoConvert,
    ],
  )

  return {
    attLevel,
    setAttLevel,
    prereqDone,
    setPrereqDone,
    curRelic,
    setCurRelic,
    curPristine,
    setCurPristine,
    curIFM,
    setCurIFM,
    curPages,
    setCurPages,
    curJournals,
    setCurJournals,
    apiKey,
    setApiKey,
    activities,
    toggleActivity,
    extraRuns,
    setExtraRuns,
    extraScale,
    setExtraScale,
    weeklyCache,
    setWeeklyCache,
    autoConvert,
    setAutoConvert,
    applyFetchResult,
    results,
  }
}

export type FractalCalculator = ReturnType<typeof useFractalCalculator>
