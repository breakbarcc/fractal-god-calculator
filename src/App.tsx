import { DailyRoutineCard } from './components/DailyRoutineCard'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LadderCard } from './components/LadderCard'
import { ResultsPanel } from './components/ResultsPanel'
import { StartingInventoryCard } from './components/StartingInventoryCard'
import { useFractalCalculator } from './hooks/useFractalCalculator'
import { I18nProvider } from './i18n/I18nProvider'
import type { Language } from './i18n/language'

function AppContent() {
  const calc = useFractalCalculator()

  return (
    <div className="mx-auto max-w-[1080px] px-5 pt-12 pb-20">
      <Header />

      <div className="mb-6 grid grid-cols-1 gap-6 min-[820px]:grid-cols-2">
        <StartingInventoryCard calc={calc} />
        <DailyRoutineCard calc={calc} />
      </div>

      <LadderCard currentLevel={calc.attLevel} overallPct={calc.results.overallPct} done={calc.results.done} />

      <ResultsPanel calc={calc} />

      <Footer />
    </div>
  )
}

function App({ initialLanguage }: Readonly<{ initialLanguage?: Language }>) {
  return (
    <I18nProvider initialLanguage={initialLanguage}>
      <AppContent />
    </I18nProvider>
  )
}

export default App
