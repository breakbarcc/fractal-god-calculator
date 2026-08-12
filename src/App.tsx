import { DailyRoutineCard } from './components/DailyRoutineCard'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LadderCard } from './components/LadderCard'
import { ResultsPanel } from './components/ResultsPanel'
import { StartingInventoryCard } from './components/StartingInventoryCard'
import { useFractalCalculator } from './hooks/useFractalCalculator'

function App() {
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

export default App
