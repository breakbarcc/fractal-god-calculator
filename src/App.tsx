import { useState } from 'react'
import { DailyRoutineCard } from './components/DailyRoutineCard'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LadderCard } from './components/LadderCard'
import { PrivacyPage } from './components/PrivacyPage'
import { ResultsPanel } from './components/ResultsPanel'
import { SiteFooter } from './components/SiteFooter'
import { StartingInventoryCard } from './components/StartingInventoryCard'
import { useFractalCalculator } from './hooks/useFractalCalculator'
import { I18nProvider } from './i18n/I18nProvider'
import { detectPage } from './i18n/detect'
import type { Language } from './i18n/language'
import type { PageId } from './pages'

function CalculatorPage() {
  const calc = useFractalCalculator()

  return (
    <>
      <Header />

      <div className="mb-6 grid grid-cols-1 gap-6 min-[820px]:grid-cols-2">
        <StartingInventoryCard calc={calc} />
        <DailyRoutineCard calc={calc} />
      </div>

      <LadderCard currentLevel={calc.attLevel} overallPct={calc.results.overallPct} done={calc.results.done} />

      <ResultsPanel calc={calc} />

      <Footer />
    </>
  )
}

/**
 * `initialLanguage` / `initialPage` are used for prerendering; in the browser both come from the URL.
 */
function App({ initialLanguage, initialPage }: Readonly<{ initialLanguage?: Language; initialPage?: PageId }>) {
  const [page] = useState<PageId>(() => initialPage ?? detectPage())

  return (
    <I18nProvider initialLanguage={initialLanguage} page={page}>
      <div className="mx-auto max-w-[1080px] px-5 pt-12 pb-20">
        {page === 'privacy' ? <PrivacyPage /> : <CalculatorPage />}
        <SiteFooter />
      </div>
    </I18nProvider>
  )
}

export default App
