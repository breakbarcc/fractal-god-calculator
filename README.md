# Fractal God Rechner

Berechnet, wie viele Tage bei der aktuellen Farm-Routine noch bis zum GW2-Titel „Fractal God“ fehlen — basierend auf den Kosten von Mist Attunement 1–4. Optional lässt sich der aktuelle Bestand direkt über die GW2-API laden.

Rein clientseitig, kein Backend — die App läuft komplett im Browser.

## Inhalt

- [Stack](#stack)
- [Voraussetzungen](#voraussetzungen)
- [Development](#development)
- [Verfügbare Scripts](#verfügbare-scripts)
- [Build](#build)
- [Deploy to Vercel](#deploy-to-vercel)
- [Hinweise zur GW2-API](#hinweise-zur-gw2-api)
- [Todo](#todo)

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) + [Prettier](https://prettier.io/) für Linting/Formatting

## Voraussetzungen

- Node.js 20+
- npm

## Development

```bash
npm install
npm run dev
```

## Verfügbare Scripts

| Command                | Beschreibung                                  |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Startet den Vite-Dev-Server mit Hot Reload     |
| `npm run build`         | Typecheck (`tsc -b`) + Production-Build nach `dist/` |
| `npm run preview`       | Bedient den Production-Build lokal zum Testen  |
| `npm run lint`          | Lintet den Code mit oxlint                     |
| `npm run format`        | Formatiert den Code mit Prettier               |
| `npm run format:check`  | Prüft Formatierung ohne Dateien zu ändern      |

## Build

```bash
npm run build
```

Output geht nach `dist/`.

## Deploy to Vercel

Standard-Vite-Projekt — Vercel erkennt das Framework automatisch, kein `vercel.json` nötig:

1. Push dieses Repos nach GitHub.
2. In Vercel: „Add New Project“ → Repo importieren.
3. Framework-Preset „Vite“ wird automatisch erkannt (Build-Command `npm run build`, Output-Directory `dist`).
4. Deploy.

## Hinweise zur GW2-API

- Das Feld für den GW2-API-Key ist optional. Falls genutzt, wird der Key **ausschließlich** im `localStorage` des Browsers gespeichert und nur an `api.guildwars2.com` gesendet — nie an einen Server dieses Projekts (es gibt keinen; die Seite ist rein statisch).
- Benötigte API-Key-Berechtigungen: `account`, `wallet`, `inventories`, `progression`, `unlocks`.

## Todo

- [x] Pouch of Fractal Relics: 1 pro Fraktal-Titel, T3 + T4, 51–100
- [x] Handful of Fractal Relics: 1 pro Fraktal-Titel, T1 – T2
- [ ] Weitere Fraktal-Belohnungen ergänzen
