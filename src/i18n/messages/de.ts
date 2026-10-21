import type { MessageKey } from './en'

export const de: Record<MessageKey, string> = {
  'meta.title': 'Fractal God Rechner für Guild Wars 2 – Tage bis zum Titel',
  'meta.description':
    'Kostenloser Guild Wars 2 Rechner: Berechne, wie viele Tage du mit deiner Routine bis zum Titel „Fractal God“ (Nebel-Einstimmung 4) brauchst – inkl. GW2-API-Import.',
  'meta.siteName': 'Fractal God Rechner',
  'meta.imageAlt': 'Fractal God Rechner – Logo mit Raute und Titel',
  'meta.appDescription':
    'Berechnet, wie viele Tage du in Guild Wars 2 bei deiner aktuellen Routine bis zum Titel „Fractal God“ (Nebel-Einstimmung 4) brauchst.',
  'meta.noscript': 'Der Fractal God Rechner benötigt JavaScript, um deine Tage bis zum Titel zu berechnen.',
  'meta.ogTitle': 'Fractal God Rechner für Guild Wars 2',
  'meta.ogDescription':
    'Wie viele Tage bis zum Titel „Fractal God“? Rechner für Fraktal-Relikte, Makellose Fraktal-Relikte, Forschungsseiten und Nebel-Einstimmung 1–4.',

  'item.relic': 'Fraktal-Relikt',
  'item.pristine': 'Makelloses Fraktal-Relikt',
  'item.page': 'Fraktal-Forschungsseite',
  'item.pages': 'Fraktal-Forschungsseiten',
  'item.matrix': 'Integrierte Fraktal-Matrix',
  'unit.relic': 'Relikt',
  'unit.pristine': 'Makellos',
  'unit.ifm': 'IFM',
  'unit.page': 'Seite',

  'meta.privacy.title': 'Datenschutzerklärung – Fractal God Rechner',
  'meta.privacy.description':
    'So geht der Fractal God Rechner mit deinen Daten um: Hosting bei Vercel, lokaler Speicher und ein Sprach-Cookie. Keine Analyse, keine Werbung.',

  'siteFooter.label': 'Seitenlinks',
  'siteFooter.home': 'Zurück zu breakbar.cc',
  'siteFooter.imprint': 'Impressum',
  'siteFooter.privacy': 'Datenschutz',
  'privacy.back': 'Zurück zum Rechner',

  'language.label': 'Sprache',

  'header.eyebrow': 'Fraktale der Nebel',
  'header.title': 'Fractal God Rechner',
  'header.intro':
    'Berechnet, wie viele Tage du bei deiner aktuellen Routine noch bis zum Titel „Fractal God“ brauchst — basierend auf den echten Kosten von Nebel-Einstimmung 1–4.',

  'inventory.title': 'Startbestand',
  'inventory.intro': 'Trag ein, was du gerade im Portemonnaie / Inventar hast — oder lade es unten direkt per GW2-API.',
  'inventory.levelLabel': 'Bereits gekaufte Stufe der Nebel-Einstimmung',
  'inventory.levelNone': 'Stufe 0 — noch nichts gekauft',
  'inventory.level': 'Stufe {level} — {title}',
  'inventory.levelDone': 'Stufe {level} — {title} (fertig!)',
  'inventory.prereqLabel': 'Grundvoraussetzungen erfüllt?',
  'inventory.prereqYes': 'Ja — Empowerment 2 / Retribution 2 / Impedance 2 vorhanden',
  'inventory.prereqNo': 'Nein — noch nicht (kostet zusätzlich {relic} Relikte + {ifm} Matrizen)',
  'inventory.loosePages': 'Lose Fraktal-Forschungsseiten',
  'inventory.journals': 'Fraktal-Handbücher (= {pages} Seiten)',

  'api.keyLabel': 'GW2-API-Schlüssel',
  'api.keyHint': '(nur „account, wallet, inventories, progression, unlocks“ nötig)',
  'api.load': '⇩ Bestand aus GW2-API laden',
  'api.loading': '⇩ Lädt …',
  'api.needKey': 'Bitte zuerst einen API-Schlüssel eintragen.',
  'api.connecting': 'Verbinde mit api.guildwars2.com …',
  'api.relicLoaded': '✓ Fraktal-Relikte geladen',
  'api.pristineLoaded': '✓ Makellose Fraktal-Relikte geladen',
  'api.warn': '⚠ {source}: {message}',
  'api.source.wallet': 'Wallet',
  'api.source.materials': 'Materiallager',
  'api.source.bank': 'Bank',
  'api.source.sharedInventory': 'Geteilte Inventarplätze',
  'api.source.progression': 'Progression',
  'api.source.titles': 'Titel',
  'api.itemsSummed': '✓ Forschungsseiten / Handbücher / Matrizen aus Bank + Materiallager + geteilten Plätzen summiert',
  'api.bagsNote': '  (Taschen auf einzelnen Charakteren werden nicht mitgezählt)',
  'api.prereqDetected': '✓ Grundvoraussetzungen erkannt: {state}',
  'api.prereqMet': 'erfüllt',
  'api.prereqNotMet': 'noch nicht vollständig',
  'api.levelDetected': '✓ Stufe der Nebel-Einstimmung erkannt: {level} von 4',
  'api.done': 'Fertig.',

  'routine.title': 'Tägliche Routine',
  'routine.intro':
    'Wähl aus, was du täglich läufst. Die Werte pro Aktivität stammen aus den offiziellen Belohnungs-Angaben des GW2-Wikis.',
  'routine.daysLabel': 'An wie vielen Tagen pro Woche läufst du Fraktale?',
  'routine.days.one': '{count} Tag/Woche',
  'routine.days.other': '{count} Tage/Woche',
  'routine.days.daily': '{count} Tage/Woche (täglich)',
  'routine.extraRuns': 'Zusätzliche freie Fraktal-Läufe / Tag',
  'routine.scaleOption': 'Skala {from}–{to} ({relic} Relikte)',
  'routine.cacheLabel': 'Fraktal-Kämpfer-Lager (wöchentlich)',
  'routine.cacheNone': 'Keine',
  'routine.cacheTier': 'Tier-{tier}-Zugang — {caches}× Lager/Woche ({pages} Seiten)',

  'activity.tierDailies': 'Tägliche Fraktale (T1 - T4)',
  'activity.recommended': 'Empfohlene Fraktale (T1 - T3)',
  'activity.cmKinfall': 'CM: Sippenfall',
  'activity.cmNightmare': 'CM: Albtraum',
  'activity.cmShattered': 'CM: Zerschmettertes Observatorium',
  'activity.cmSunqua': 'CM: Sunqua-Gipfel',
  'activity.cmSilentSurf': 'CM: Stumme Brandung',
  'activity.cmLonelyTower': 'CM: Einsamer Turm',
  'activity.cmSolitaryThrone': 'CM: Einsamer Thron',

  'attunement.title.1': 'Fraktal-Denker',
  'attunement.title.2': 'Fraktal-Wunderkind',
  'attunement.title.3': 'Fraktal-Champion',
  'attunement.title.4': 'Fraktal-Gott',

  'potion.defensive': 'Großer Nebel-Defensivtrank',
  'potion.mobility': 'Großer Nebel-Mobilitätstrank',
  'potion.offensive': 'Großer Nebel-Offensivtrank',

  'ladder.title': 'Weg zum Fractal God',
  'ladder.attunement': 'NEBEL-EINSTIMMUNG {level}',
  'ladder.progress': '{pct}% gesammelt',
  'ladder.progressStep': '{pct}% gesammelt (Stufe {step} von 4)',

  'results.title': 'Ergebnis',
  'results.autoConvertLabel': 'Überschuss an Makellosen Fraktal-Relikten automatisch in Fraktal-Relikte tauschen',
  'results.autoConvertYes': 'Ja — 1 Makelloses Fraktal-Relikt = {rate} Relikte (via BUY-2046 PFR)',
  'results.autoConvertNo': 'Nein — beide getrennt sammeln',
  'results.convert':
    '↻ {pristine} überschüssige Makellose Fraktal-Relikte werden in {relic} Fraktal-Relikte getauscht.',
  'results.convertSaves.one':
    '↻ {pristine} überschüssige Makellose Fraktal-Relikte werden in {relic} Fraktal-Relikte getauscht — spart {days} Tag.',
  'results.convertSaves.other':
    '↻ {pristine} überschüssige Makellose Fraktal-Relikte werden in {relic} Fraktal-Relikte getauscht — spart {days} Tage.',
  'results.potions':
    '🧪 {amount} Fraktal-Relikte/Tag aus den Nebeltränken der Empfohlenen Fraktale (gegen Fraktal-Relikte getauscht) bereits eingerechnet.',
  'results.daysLabel': 'Tage bis zum Titel',
  'results.alreadyGod': 'Du bist bereits Fractal God!',
  'results.finishDate': 'Voraussichtlich fertig am {date}',
  'results.never': 'Mit der aktuellen Routine wird mind. eine Ressource nie erreicht.',
  'results.bottleneck': 'Flaschenhals: {name}',
  'results.card.relic': 'Fraktal-Relikt',
  'results.card.pristine': 'Makelloses Relikt',
  'results.card.pages': 'Forschungsseiten',
  'results.card.matrix': 'Integrierte Matrix',
  'results.perDay': '{amount} / Tag',

  'footer.notCountedLabel': 'Nicht mitgerechnet',
  'footer.notCounted':
    '{label} (nicht zeitkritisch): je 1× Qual-Infusion +13/+14/+15/+16, 6× Qual-Infusion +11 für die Voraussetzungen, sowie Stabilisierende Matrix & Gold fürs Craften der Integrierten Fraktal-Matrix.',
  'footer.conversion':
    'Die Umwandlung Makelloses Fraktal-Relikt → Fraktal-Relikt läuft über den Händler {vendor}: 1 Makelloses Fraktal-Relikt kauft einen „Beutel mit Fraktal-Relikten“, der 15 Fraktal-Relikte enthält. Eine Umwandlung in die andere Richtung gibt es im Spiel nicht, daher wird sie hier nicht angeboten.',
  'footer.attunementLink': 'Nebel-Einstimmung 1–4',
  'footer.sources':
    'Zahlen basieren auf den Kosten von {attunement} und den Drop-Quellen von {pristine}, {pages} und {relic} (GW2-Wiki). Aktivitäts-Werte sind editierbar.',
}
