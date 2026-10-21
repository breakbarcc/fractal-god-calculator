# Fractal God Rechner

Berechnet, wie viele Tage bei der aktuellen Farm-Routine noch bis zum GW2-Titel „Fractal God“ fehlen — basierend auf den Kosten von Mist Attunement 1–4. Optional lässt sich der aktuelle Bestand direkt über die GW2-API laden.

Rein clientseitig, kein Backend — die App läuft komplett im Browser.

## Inhalt

- [Stack](#stack)
- [Voraussetzungen](#voraussetzungen)
- [Development](#development)
- [Verfügbare Scripts](#verfügbare-scripts)
- [Build](#build)
- [Sprachen (i18n)](#sprachen-i18n)
- [Footer, Impressum und Datenschutz](#footer-impressum-und-datenschutz)
- [SEO](#seo)
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

Output geht nach `dist/`. Der Build besteht aus vier Schritten: Typecheck, Client-Bundle, SSR-Bundle (`src/entry-server.tsx`) und `scripts/prerender.mjs`, das pro Sprache eine fertige Seite schreibt: `dist/index.html` (Englisch) und `dist/de/index.html` (Deutsch), siehe [SEO](#seo).

## Sprachen (i18n)

Die Oberfläche gibt es auf Englisch und Deutsch. Die Sprache wird in dieser Reihenfolge bestimmt:

1. Sprachspezifische URL: `/de/` zeigt immer Deutsch (so öffnen Links aus Suchergebnissen in der richtigen Sprache)
2. Cookie `breakbar-language` (z. B. `en`, `de` oder `de-DE`)
3. Sprache(n) des Browsers (`navigator.languages`)
4. Fallback: Englisch

Öffnet jemand `/` und ist die erkannte Sprache Deutsch, springt die Adresszeile auf `/de/` (ohne Reload).
- Oben rechts auf der Seite steht ein Sprachwechsler (EN / DE). Er speichert die Wahl im Cookie `breakbar-language` und wechselt die URL zwischen `/` und `/de/`.
- Die Texte liegen in `src/i18n/messages/en.ts` (Quelle der Wahrheit) und `de.ts`. TypeScript meldet fehlende Schlüssel in `de.ts`.
- Neue Sprache: Datei in `src/i18n/messages/` anlegen, in `translate.ts` und `language.ts` (`SUPPORTED_LANGUAGES`, `INTL_LOCALES`) eintragen.
- Spielbegriffe (Fractal Relic, Mist Attunement …) bleiben in allen Sprachen englisch.
- Der Cookie `breakbar-language` gilt auf `*.breakbar.cc` domainweit (`Domain=breakbar.cc`, `Path=/`, ein Jahr, `SameSite=Lax`, auf HTTPS zusätzlich `Secure`) und darf von jeder Subdomain gesetzt werden. Auf `localhost` oder anderen Hosts ist er ein normaler Host-Cookie.
- Cookies lösen kein Änderungs-Event aus: Wurde die Sprache in einem anderen Tab oder auf einer anderen Subdomain geändert, übernimmt die Seite das, sobald der Tab wieder den Fokus bekommt.

## Footer, Impressum und Datenschutz

- Unter jeder Seite steht eine Link-Leiste: zurück zu `breakbar.cc`, Impressum und Datenschutz (`SiteFooter`).
- Das Impressum liegt auf der Hauptdomain. Die URLs stehen in `src/data/links.ts`.
- Die Datenschutzerklärung (`src/content/privacy.tsx`, Englisch und Deutsch) beschreibt Hosting bei Vercel, `localStorage`, das Sprach-Cookie, Google Fonts und die optionale GW2-API. Ändern sich die Speicherung oder externe Aufrufe der Seite (neue `localStorage`-Schlüssel, Analytics, Schriftarten …), muss der Text angepasst werden.
- Die Texte sind eine Vorlage und keine Rechtsberatung.

## SEO

- **Eine URL pro Seite und Sprache:** Rechner `/` (en) und `/de/` (de), Datenschutz `/privacy/` (en) und `/de/datenschutz/` (de), siehe `src/pages.ts`. Jede Seite wird beim Build fertig vorgerendert, damit Crawler Inhalt und Head-Tags ohne JavaScript sehen. Im Browser ersetzt `createRoot` den Inhalt danach.
- **Head-Tags pro Sprache:** `src/seo/head.ts` erzeugt `<title>`, Meta-Description, Canonical, `hreflang` (`en`, `de`, `x-default` → `/`), `robots`-Meta, Open Graph (inkl. `og:locale` und `og:locale:alternate`), Twitter Card und JSON-LD (`WebApplication`). `index.html` enthält dafür nur Platzhalter. Die Texte stehen in den `meta.*`-Schlüsseln der Message-Dateien.
- **`robots.txt` und `sitemap.xml`:** werden beim Build vom `seo`-Plugin in `vite.config.ts` erzeugt. Die Sitemap listet beide Seiten mit `xhtml:link`-Alternativen.
- **Hosting:** Der Server muss `/de/` als `de/index.html` ausliefern (bei statischem Hosting wie Vercel der Standard).
- **Social-Preview:** `public/og-image.png` (1200×630).
- **Domain:** Alle absoluten URLs nutzen die Umgebungsvariable `SITE_URL` (z. B. `https://example.com`, ohne Slash am Ende). Ohne Variable gilt der Fallback `https://fractal.breakbar.cc` aus `vite.config.ts`. Bei einer anderen Domain `SITE_URL` setzen.
- **Search Console:** Nach dem Deploy die Property anlegen und `/sitemap.xml` einreichen.

## Deploy to Vercel

Standard-Vite-Projekt — Vercel erkennt das Framework automatisch, kein `vercel.json` nötig:

1. Push dieses Repos nach GitHub.
2. In Vercel: „Add New Project“ → Repo importieren.
3. Framework-Preset „Vite“ wird automatisch erkannt (Build-Command `npm run build`, Output-Directory `dist`).
4. Optional: Umgebungsvariable `SITE_URL` auf die eigene Domain setzen (siehe [SEO](#seo)).
5. Deploy.

## Hinweise zur GW2-API

- Das Feld für den GW2-API-Key ist optional. Falls genutzt, wird der Key **ausschließlich** im `localStorage` des Browsers gespeichert und nur an `api.guildwars2.com` gesendet — nie an einen Server dieses Projekts (es gibt keinen; die Seite ist rein statisch).
- Benötigte API-Key-Berechtigungen: `account`, `wallet`, `inventories`, `progression`, `unlocks`.

## Todo

- [x] Pouch of Fractal Relics: 1 pro Fraktal-Titel, T3 + T4, 51–100
- [x] Handful of Fractal Relics: 1 pro Fraktal-Titel, T1 – T2
- [ ] Weitere Fraktal-Belohnungen ergänzen
