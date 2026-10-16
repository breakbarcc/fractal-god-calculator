# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static single-page calculator (German UI) for Guild Wars 2: given a player's current Mist Attunement progress and daily farming routine, it computes how many days remain until the "Fractal God" title (Mist Attunement level 4). No backend — pure client-side Vite/React app, optionally calling the public GW2 API directly from the browser.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # tsc -b && vite build && SSR build + scripts/prerender.mjs -> dist/ (HTML is prerendered for SEO)
npm run lint      # oxlint
npm run preview   # preview the production build
```

There is no test suite configured in this repo.

## Architecture

The app is a single calculation pipeline with a thin UI on top:

- **`src/hooks/useFractalCalculator.ts`** — the single source of truth for all UI state (attunement level, current currency/material counts, daily activities, API key). It feeds that state into `calculate()` on every change (via `useMemo`) and returns one big object (`FractalCalculator` type) that every component receives as a `calc` prop. Look here first to see what state exists and how it flows.
- **`src/lib/calculate.ts`** — pure function `calculate(inputs) -> CalculatorResults`. All the domain math lives here: remaining Relic/Pristine/Pages/Integrated Fractal Matrix needed, per-day rates from active activities, Pristine→Relic auto-conversion timing (the trickiest part — it simulates converting excess Pristine income into Relic once Pristine needs are met), bottleneck detection, and overall % progress. This is a straight port of an original vanilla-JS calculator's `calculate()` — keep formulas behavior-identical unless a change is intentional.
- **`src/data/constants.ts`** — all game data: Mist Attunement tier costs (`MIST_ATTUNEMENT`), prerequisite costs (`PREREQ`), conversion rates (`IFM_CRAFT_RELIC`, `PRISTINE_TO_RELIC`, `PAGES_PER_JOURNAL`), default daily activities with their Relic/Pristine/Page yields, GW2 item/currency IDs used for API lookups. Changing game balance/costs means editing this file, not `calculate.ts`.
- **`src/lib/gw2Api.ts`** — optional integration that fetches the player's live inventory from `api.guildwars2.com` using a user-supplied API key (stored only in `localStorage` via `useLocalStorage`, never sent anywhere but the GW2 API). `fetchGw2AccountData()` sums Research Pages/Journals/Matrices across bank, material storage and shared inventory slots, reads wallet currencies, and derives current attunement level from owned titles. Returns a `Gw2FetchResult` that `useFractalCalculator.applyFetchResult()` merges into local state — it never overwrites state directly.
- **Components** (`src/components/*.tsx`) are presentational; each takes the `calc` object (or a slice of it) as a prop and renders/edits it. No component owns state itself except transient UI state (e.g. `ApiKeyBox`'s loading/status log, `showKey` toggle).
- **`src/lib/format.ts`** — number/date formatting helpers (German locale `de-DE`).
- **`src/styles.ts`** — shared Tailwind class strings (`inputClass`, `selectClass`, `cardClass`) reused across form components instead of repeating utility classes.

Data flow in one line: `constants.ts` (game data) + user input state → `calculate.ts` (pure math) → `CalculatorResults` → rendered by `ResultsPanel`/`LadderCard`/etc.

## SEO / prerendering

`index.html` holds the SEO tags (title, description, canonical, Open Graph, JSON-LD) with a `%SITE_URL%` placeholder; `vite.config.ts` (`seoPlugin`) fills it from `SITE_URL` / `VERCEL_PROJECT_PRODUCTION_URL` and emits `robots.txt` + `sitemap.xml`. After the client build, `src/entry-server.tsx` is built as SSR bundle and `scripts/prerender.mjs` injects `renderToString(<App />)` at `<!--app-html-->` in `dist/index.html`. The client uses `createRoot` (not hydrate), so the server markup is simply replaced. Anything rendered must stay safe without `window` (the hooks already catch it).

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — theme tokens are defined directly in `src/index.css` under `@theme`, e.g. `--color-arcane`, `--color-relic`, `--color-pristine`). Use existing theme colors/utilities rather than introducing new ad-hoc values.

## Notes when changing calculation logic

- `calculate.ts` is intentionally a pure function with no side effects — keep it that way so it stays trivially testable/reasoned about.
- Currency/material amounts are in raw units (Relic, Pristine Fractal Relic, Research Pages, Integrated Fractal Matrix); Journals get converted to Pages via `PAGES_PER_JOURNAL` before use.
- `daysNeeded` is the max across the three independent constraints (Relic track incl. auto-convert, Pristine, Pages) — the `bottleneck` field says which one currently dominates.
