export function Footer() {
  return (
    <footer className="mt-7 text-center">
      <p className="mx-auto mb-1.5 max-w-[680px] text-[11.5px] leading-[1.7] text-text-faint">
        <b className="text-text-dim">Nicht mitgerechnet</b> (nicht zeitkritisch): je 1× Agony-Infusion +13/+14/+15/+16,
        6× +11 Agony-Infusion für die Voraussetzungen, sowie Stabilizing Matrix &amp; Gold fürs Craften der Integrated
        Fractal Matrix.
      </p>
      <p className="mx-auto mb-1.5 max-w-[680px] text-[11.5px] leading-[1.7] text-text-faint">
        Die Umwandlung Pristine → Relic läuft über den Händler{' '}
        <a
          href="https://wiki.guildwars2.com/wiki/BUY-2046_PFR"
          target="_blank"
          rel="noreferrer"
          className="border-b border-dotted border-arcane-bright text-arcane-bright"
        >
          BUY-2046 PFR
        </a>
        : 1 Pristine Fractal Relic kauft einen „Bag of Fractal Relics“, der 15 Fractal Relic enthält. Eine Umwandlung
        in die andere Richtung (Relic → Pristine) gibt es im Spiel nicht, daher wird sie hier nicht angeboten.
      </p>
      <p className="mx-auto mb-1.5 max-w-[680px] text-[11.5px] leading-[1.7] text-text-faint">
        Zahlen basieren auf den Kosten von{' '}
        <a
          href="https://wiki.guildwars2.com/wiki/Mist_Attunement_4"
          target="_blank"
          rel="noreferrer"
          className="border-b border-dotted border-arcane-bright text-arcane-bright"
        >
          Mist Attunement 1–4
        </a>{' '}
        und den Drop-Quellen von{' '}
        <a
          href="https://wiki.guildwars2.com/wiki/Pristine_Fractal_Relic"
          target="_blank"
          rel="noreferrer"
          className="border-b border-dotted border-arcane-bright text-arcane-bright"
        >
          Pristine Fractal Relic
        </a>
        ,{' '}
        <a
          href="https://wiki.guildwars2.com/wiki/Fractal_Research_Page"
          target="_blank"
          rel="noreferrer"
          className="border-b border-dotted border-arcane-bright text-arcane-bright"
        >
          Fractal Research Page
        </a>{' '}
        und{' '}
        <a
          href="https://wiki.guildwars2.com/wiki/Fractal_Relic"
          target="_blank"
          rel="noreferrer"
          className="border-b border-dotted border-arcane-bright text-arcane-bright"
        >
          Fractal Relic
        </a>{' '}
        (GW2-Wiki). Aktivitäts-Werte sind editierbar.
      </p>
    </footer>
  )
}
