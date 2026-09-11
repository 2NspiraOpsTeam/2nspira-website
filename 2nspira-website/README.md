# 2Nspira Website

Next.js 16 (App Router) + React 19 + Tailwind CSS 4, deployed to Cloudflare Workers via **vinext**.

## Canonical commands (Cloudflare / vinext path)

```bash
npm run dev:vinext      # local dev on :3001
npm run build:vinext    # production build → dist/
npm run start:vinext    # run the built worker locally (wrangler dev)
npm run deploy:vinext   # deploy to Cloudflare
```

## Why `npm run build` (plain `next build`) fails — known & expected

This project targets the Cloudflare Workers runtime, and `src/app/api/contact/route.ts`
imports the vinext virtual module `cloudflare:workers` (injected at the historical
starting SHA `7b52268`). Plain `next build` cannot resolve that module and aborts
during page-data collection with:

```
Error: Failed to load external module cloudflare:workers
Cannot find module 'cloudflare:workers'
```

This is **not a regression** — the failure exists at `7b52268` as well. The canonical
build is `npm run build:vinext`, which resolves the module through vinext's
Cloudflare plugin and completes successfully (all 21 routes). The plain
`build`/`dev`/`start` scripts are legacy from `create-next-app` and are not part of
the deployment path. Do not "fix" the failure by removing the `cloudflare:workers`
import — the contact relay depends on it.

## Scripts

| Script | Purpose |
|---|---|
| `dev:vinext` | Local dev server (port 3001) |
| `build:vinext` | Production build (canonical) |
| `start:vinext` | Local worker run from `dist/server` |
| `deploy:vinext` | Cloudflare Workers deploy |
| `lint` | ESLint |
| `typecheck` | `tsc --noEmit` (add as script when desired) |

Note: run `npm run build:vinext` before `tsc` on a clean checkout — vinext
regenerates `.next/types` (the typecheck includes `.next/types/**/*.ts`). A stale
Next-generated `validator.ts` from a plain `next build` attempt will not match the
vinext layout and reports spurious `AppRoutes`/`LayoutRoutes` errors.
