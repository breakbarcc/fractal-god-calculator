// English is the source of truth (and the fallback language): `de.ts` must provide every key below.
// Placeholders use {name}; see translate.ts. Game item/title names (Fractal Relic, Mist Attunement …)
// intentionally stay in English in every language, as they do in the game's English client.
export const en = {
  'meta.title': 'Fractal God Calculator for Guild Wars 2 – Days Until the Title',
  'meta.description':
    'Free Guild Wars 2 calculator: find out how many days you need with your routine until the “Fractal God” title (Mist Attunement 4) – incl. GW2 API import.',
  'meta.siteName': 'Fractal God Calculator',
  'meta.imageAlt': 'Fractal God Calculator – diamond logo and title',
  'meta.appDescription':
    'Calculates how many days you need in Guild Wars 2 with your current routine until the “Fractal God” title (Mist Attunement 4).',
  'meta.noscript': 'The Fractal God Calculator needs JavaScript to calculate your days until the title.',
  'meta.ogTitle': 'Fractal God Calculator for Guild Wars 2',
  'meta.ogDescription':
    'How many days until the “Fractal God” title? Calculator for Fractal Relics, Pristine Relics, Research Pages and Mist Attunement 1–4.',

  'item.relic': 'Fractal Relic',
  'item.pristine': 'Pristine Fractal Relic',
  'item.page': 'Fractal Research Page',
  'item.pages': 'Fractal Research Pages',
  'item.matrix': 'Integrated Fractal Matrix',
  'unit.relic': 'Relic',
  'unit.pristine': 'Pristine',
  'unit.ifm': 'IFM',
  'unit.page': 'Page',

  'language.label': 'Language',

  'header.eyebrow': 'Fractals of the Mists',
  'header.title': 'Fractal God Calculator',
  'header.intro':
    'Calculates how many days you still need for the “Fractal God” title with your current routine — based on the real costs of Mist Attunement 1–4.',

  'inventory.title': 'Starting inventory',
  'inventory.intro':
    'Enter what you currently have in your wallet / inventory — or load it directly from the GW2 API below.',
  'inventory.levelLabel': 'Mist Attunement level already purchased',
  'inventory.levelNone': 'Level 0 — nothing purchased yet',
  'inventory.level': 'Level {level} — {title}',
  'inventory.levelDone': 'Level {level} — {title} (done!)',
  'inventory.prereqLabel': 'Base requirements met?',
  'inventory.prereqYes': 'Yes — Empowerment 2 / Retribution 2 / Impedance 2 unlocked',
  'inventory.prereqNo': 'No — not yet (costs an additional {relic} Relic + {ifm} Matrix)',
  'inventory.loosePages': 'Loose Fractal Research Pages',
  'inventory.journals': 'Fractal Journals (= {pages} Pages)',

  'api.keyLabel': 'GW2 API key',
  'api.keyHint': '(only “account, wallet, inventories, progression, unlocks” required)',
  'api.load': '⇩ Load inventory from GW2 API',
  'api.loading': '⇩ Loading …',
  'api.needKey': 'Please enter an API key first.',
  'api.connecting': 'Connecting to api.guildwars2.com …',
  'api.relicLoaded': '✓ Fractal Relic loaded',
  'api.pristineLoaded': '✓ Pristine Fractal Relic loaded',
  'api.warn': '⚠ {source}: {message}',
  'api.source.wallet': 'Wallet',
  'api.source.materials': 'Material storage',
  'api.source.bank': 'Bank',
  'api.source.sharedInventory': 'Shared inventory slots',
  'api.source.progression': 'Progression',
  'api.source.titles': 'Titles',
  'api.itemsSummed': '✓ Research Pages / Journals / Matrix summed from bank + material storage + shared slots',
  'api.bagsNote': '  (bags of individual characters are not counted)',
  'api.prereqDetected': '✓ Base requirements detected: {state}',
  'api.prereqMet': 'met',
  'api.prereqNotMet': 'not yet complete',
  'api.levelDetected': '✓ Mist Attunement level detected: {level} of 4',
  'api.done': 'Done.',

  'routine.title': 'Daily routine',
  'routine.intro':
    'Select what you run every day. The per-activity values come from the official reward information in the GW2 wiki.',
  'routine.daysLabel': 'On how many days per week do you run fractals?',
  'routine.days.one': '{count} day/week',
  'routine.days.other': '{count} days/week',
  'routine.days.daily': '{count} days/week (daily)',
  'routine.extraRuns': 'Additional free fractal runs / day',
  'routine.scaleOption': 'Scale {from}–{to} ({relic} Relic)',
  'routine.cacheLabel': "Fractal Fighter's Cache (weekly)",
  'routine.cacheNone': 'None',
  'routine.cacheTier': 'Tier {tier} access — {caches}× cache/week ({pages} Pages)',

  'activity.tierDailies': 'Daily fractals (T1 - T4)',
  'activity.recommended': 'Recommended fractals (T1 - T3)',
  'activity.cmKinfall': 'CM: Kinfall',
  'activity.cmNightmare': 'CM: Nightmare',
  'activity.cmShattered': 'CM: Shattered Observatory',
  'activity.cmSunqua': 'CM: Sunqua Peak',
  'activity.cmSilentSurf': 'CM: Silent Surf',
  'activity.cmLonelyTower': 'CM: Lonely Tower',
  'activity.cmSolitaryThrone': 'CM: Solitary Throne',

  'attunement.title.1': 'Fractal Savant',
  'attunement.title.2': 'Fractal Prodigy',
  'attunement.title.3': 'Fractal Champion',
  'attunement.title.4': 'Fractal God',

  'potion.defensive': 'Large Mist Defensive Potion',
  'potion.mobility': 'Large Mist Mobility Potion',
  'potion.offensive': 'Large Mist Offensive Potion',

  'ladder.title': 'Path to Fractal God',
  'ladder.attunement': 'MIST ATTUNEMENT {level}',
  'ladder.progress': '{pct}% collected',
  'ladder.progressStep': '{pct}% collected (level {step} of 4)',

  'results.title': 'Result',
  'results.autoConvertLabel': 'Automatically exchange surplus Pristine Relic for Fractal Relic',
  'results.autoConvertYes': 'Yes — 1 Pristine = {rate} Relic (via BUY-2046 PFR)',
  'results.autoConvertNo': 'No — collect both separately',
  'results.convert': '↻ {pristine} surplus Pristine Relic are exchanged for {relic} Fractal Relic.',
  'results.convertSaves.one':
    '↻ {pristine} surplus Pristine Relic are exchanged for {relic} Fractal Relic — saves {days} day.',
  'results.convertSaves.other':
    '↻ {pristine} surplus Pristine Relic are exchanged for {relic} Fractal Relic — saves {days} days.',
  'results.potions':
    '🧪 {amount} Fractal Relic/day from the Mist Potions of the Recommended fractals (exchanged at the Mist Potion Brewer) already included.',
  'results.daysLabel': 'Days until the title',
  'results.alreadyGod': 'You are already Fractal God!',
  'results.finishDate': 'Expected to be done on {date}',
  'results.never': 'With your current routine at least one resource will never be reached.',
  'results.bottleneck': 'Bottleneck: {name}',
  'results.card.relic': 'Fractal Relic',
  'results.card.pristine': 'Pristine Relic',
  'results.card.pages': 'Research Pages',
  'results.card.matrix': 'Integrated Matrix',
  'results.perDay': '{amount} / day',

  'footer.notCountedLabel': 'Not included',
  'footer.notCounted':
    '{label} (not time-critical): 1× each of Agony Infusion +13/+14/+15/+16, 6× +11 Agony Infusion for the prerequisites, as well as Stabilizing Matrix & gold for crafting the Integrated Fractal Matrix.',
  'footer.conversion':
    'The Pristine → Relic exchange runs through the vendor {vendor}: 1 Pristine Fractal Relic buys a “Bag of Fractal Relics” containing 15 Fractal Relic. There is no exchange in the other direction (Relic → Pristine) in the game, so it is not offered here.',
  'footer.attunementLink': 'Mist Attunement 1–4',
  'footer.sources':
    'Numbers are based on the costs of {attunement} and the drop sources of {pristine}, {pages} and {relic} (GW2 wiki). Activity values are editable.',
} as const

export type MessageKey = keyof typeof en
