import type { MessageKey } from './en'

export const de: Record<MessageKey, string> = {
  'meta.title': 'Fractal God Rechner für Guild Wars 2 – Tage bis zum Titel',
  'meta.description':
    'Kostenloser Guild Wars 2 Rechner: Berechne, wie viele Tage du mit deiner Routine bis zum Titel „Fractal God“ (Mist Attunement 4) brauchst – inkl. GW2-API-Import.',
  'meta.ogTitle': 'Fractal God Rechner für Guild Wars 2',
  'meta.ogDescription':
    'Wie viele Tage bis zum Titel „Fractal God“? Rechner für Fractal Relics, Pristine Relics, Research Pages und Mist Attunement 1–4.',

  'header.title': 'Fractal God Rechner',
  'header.intro':
    'Berechnet, wie viele Tage du bei deiner aktuellen Routine noch bis zum Titel „Fractal God“ brauchst — basierend auf den echten Kosten von Mist Attunement 1–4.',

  'inventory.title': 'Startbestand',
  'inventory.intro': 'Trag ein, was du gerade im Portemonnaie / Inventar hast — oder lade es unten direkt per GW2-API.',
  'inventory.levelLabel': 'Bereits gekaufte Mist-Attunement-Stufe',
  'inventory.levelNone': 'Stufe 0 — noch nichts gekauft',
  'inventory.level': 'Stufe {level} — {title}',
  'inventory.levelDone': 'Stufe {level} — {title} (fertig!)',
  'inventory.prereqLabel': 'Grundvoraussetzungen erfüllt?',
  'inventory.prereqYes': 'Ja — Empowerment 2 / Retribution 2 / Impedance 2 vorhanden',
  'inventory.prereqNo': 'Nein — noch nicht (kostet zusätzlich {relic} Relic + {ifm} Matrix)',
  'inventory.loosePages': 'Lose Fractal Research Pages',
  'inventory.journals': 'Fractal Journals (= {pages} Pages)',

  'api.keyLabel': 'GW2-API-Schlüssel',
  'api.keyHint': '(nur „account, wallet, inventories, progression, unlocks“ nötig)',
  'api.load': '⇩ Bestand aus GW2-API laden',
  'api.loading': '⇩ Lädt …',
  'api.needKey': 'Bitte zuerst einen API-Schlüssel eintragen.',
  'api.connecting': 'Verbinde mit api.guildwars2.com …',
  'api.relicLoaded': '✓ Fractal Relic geladen',
  'api.pristineLoaded': '✓ Pristine Fractal Relic geladen',
  'api.warn': '⚠ {source}: {message}',
  'api.source.wallet': 'Wallet',
  'api.source.materials': 'Materiallager',
  'api.source.bank': 'Bank',
  'api.source.sharedInventory': 'Geteilte Inventarplätze',
  'api.source.progression': 'Progression',
  'api.source.titles': 'Titel',
  'api.itemsSummed': '✓ Research Pages / Journals / Matrix aus Bank + Materiallager + geteilten Plätzen summiert',
  'api.bagsNote': '  (Taschen auf einzelnen Charakteren werden nicht mitgezählt)',
  'api.prereqDetected': '✓ Grundvoraussetzungen erkannt: {state}',
  'api.prereqMet': 'erfüllt',
  'api.prereqNotMet': 'noch nicht vollständig',
  'api.levelDetected': '✓ Mist-Attunement-Stufe erkannt: {level} von 4',
  'api.done': 'Fertig.',

  'routine.title': 'Tägliche Routine',
  'routine.intro':
    'Wähl aus, was du täglich läufst. Die Werte pro Aktivität stammen aus den offiziellen Belohnungs-Angaben des GW2-Wikis.',
  'routine.daysLabel': 'An wie vielen Tagen pro Woche läufst du Fraktale?',
  'routine.days.one': '{count} Tag/Woche',
  'routine.days.other': '{count} Tage/Woche',
  'routine.days.daily': '{count} Tage/Woche (täglich)',
  'routine.extraRuns': 'Zusätzliche freie Fraktal-Läufe / Tag',
  'routine.scaleOption': 'Skala {from}–{to} ({relic} Relic)',
  'routine.cacheLabel': "Fractal Fighter's Cache (wöchentlich)",
  'routine.cacheNone': 'Keine',
  'routine.cacheTier': 'Tier-{tier}-Zugang — {caches}× Cache/Woche ({pages} Pages)',

  'activity.tierDailies': 'Tägliche Fraktale (T1 - T4)',
  'activity.recommended': 'Empfohlene Fraktale (T1 - T3)',
  'activity.cmKinfall': 'CM: Kinfall',
  'activity.cmNightmare': 'CM: Nightmare',
  'activity.cmShattered': 'CM: Shattered Observatory',
  'activity.cmSunqua': 'CM: Sunqua Peak',
  'activity.cmSilentSurf': 'CM: Silent Surf',
  'activity.cmLonelyTower': 'CM: Lonely Tower',
  'activity.cmSolitaryThrone': 'CM: Solitary Throne',

  'ladder.title': 'Weg zum Fractal God',
  'ladder.progress': '{pct}% gesammelt',
  'ladder.progressStep': '{pct}% gesammelt (Stufe {step} von 4)',

  'results.title': 'Ergebnis',
  'results.autoConvertLabel': 'Pristine-Überschuss automatisch in Fractal Relic tauschen',
  'results.autoConvertYes': 'Ja — 1 Pristine = {rate} Relic (via BUY-2046 PFR)',
  'results.autoConvertNo': 'Nein — beide getrennt sammeln',
  'results.convert': '↻ {pristine} überschüssige Pristine Relic werden in {relic} Fractal Relic getauscht.',
  'results.convertSaves.one':
    '↻ {pristine} überschüssige Pristine Relic werden in {relic} Fractal Relic getauscht — spart {days} Tag.',
  'results.convertSaves.other':
    '↻ {pristine} überschüssige Pristine Relic werden in {relic} Fractal Relic getauscht — spart {days} Tage.',
  'results.potions':
    '🧪 {amount} Fractal Relic/Tag aus Mist-Potions der Empfohlenen Fraktale (getauscht beim Mist Potion Brewer) bereits eingerechnet.',
  'results.daysLabel': 'Tage bis zum Titel',
  'results.alreadyGod': 'Du bist bereits Fractal God!',
  'results.finishDate': 'Voraussichtlich fertig am {date}',
  'results.never': 'Mit der aktuellen Routine wird mind. eine Ressource nie erreicht.',
  'results.bottleneck': 'Flaschenhals: {name}',
  'results.perDay': '{amount} / Tag',

  'footer.notCountedLabel': 'Nicht mitgerechnet',
  'footer.notCounted':
    '{label} (nicht zeitkritisch): je 1× Agony-Infusion +13/+14/+15/+16, 6× +11 Agony-Infusion für die Voraussetzungen, sowie Stabilizing Matrix & Gold fürs Craften der Integrated Fractal Matrix.',
  'footer.conversion':
    'Die Umwandlung Pristine → Relic läuft über den Händler {vendor}: 1 Pristine Fractal Relic kauft einen „Bag of Fractal Relics“, der 15 Fractal Relic enthält. Eine Umwandlung in die andere Richtung (Relic → Pristine) gibt es im Spiel nicht, daher wird sie hier nicht angeboten.',
  'footer.sources':
    'Zahlen basieren auf den Kosten von {attunement} und den Drop-Quellen von {pristine}, {pages} und {relic} (GW2-Wiki). Aktivitäts-Werte sind editierbar.',
}
