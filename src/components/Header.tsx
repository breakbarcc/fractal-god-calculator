export function Header() {
  return (
    <header className="mb-11 text-center">
      <div className="mb-3.5 font-mono text-xs tracking-[0.22em] text-arcane-bright/80 uppercase">
        Fractals of the Mists
      </div>
      <h1 className="mb-3 bg-[linear-gradient(135deg,#fff,var(--color-arcane-bright)_60%,var(--color-relic))] bg-clip-text font-cinzel text-[clamp(30px,5vw,46px)] font-bold text-transparent">
        Fractal God Rechner
      </h1>
      <p className="mx-auto max-w-[560px] text-[15px] leading-[1.6] text-text-dim">
        Berechnet, wie viele Tage du bei deiner aktuellen Routine noch bis zum Titel „Fractal God“ brauchst — basierend
        auf den echten Kosten von Mist Attunement 1–4.
      </p>
    </header>
  )
}
