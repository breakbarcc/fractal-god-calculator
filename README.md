# Fractal God Rechner

Berechnet, wie viele Tage bei der aktuellen Farm-Routine noch bis zum GW2-Titel „Fractal God“ fehlen — basierend auf den Kosten von Mist Attunement 1–4. Optional lässt sich der aktuelle Bestand direkt über die GW2-API laden.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Vercel

This is a standard Vite project — Vercel auto-detects the framework, no `vercel.json` needed:

1. Push this repo to GitHub.
2. In Vercel, "Add New Project" → import the repo.
3. Framework preset "Vite" is detected automatically (build command `npm run build`, output directory `dist`).
4. Deploy.

## Notes

- The GW2 API key field is optional. If used, it is stored **only** in the browser's `localStorage` and sent only to `api.guildwars2.com` — never to any server of this project (there is none; this is a fully static site).
- Required API key permissions: `account`, `wallet`, `inventories`, `progression`, `unlocks`.
