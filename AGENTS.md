# Repository Guidelines

## User interface
- Mobile-first, dark mode, responsive layout.

## Project Structure & Module Organization
- `src/` app code: `main.tsx` entry, `App.tsx` shell, `components/` (Header, UpdateBar, CurrencyRow, Keypad), `features/rates/` (api, types, format), `state/store.ts`, `hooks/useLocalStorage.ts`, `utils/` (conversion, locale), `pwa/sw.ts`, `assets/flags/`.
- `public/` static assets, PWA manifest, icons.
- `tests/` conversion math and base-switch cases (add more as features grow).

## Build, Test, and Development Commands
- `npm install` – install dependencies.
- `npm run dev` – Vite dev server with HMR.
- `npm run build` – production build.
- `npm run preview` – serve the built app locally.
- (Add) `npm test` when tests are present; use Vitest/Jest as configured.
- Port 3001

## Coding Style & Naming Conventions
- Language: TypeScript + React; prefer function components and hooks.
- Styling: Tailwind CSS utility-first; keep component-level classes readable, extract reuse to small components.
- Formatting: 2-space indent; run `npm run lint`/`npm run format` if added (recommended: ESLint + Prettier with Tailwind plugin).
- Naming: PascalCase for components, camelCase for variables/hooks (`useSomething`), SCREAMING_SNAKE_CASE for constants.

## Testing Guidelines
- Scope: conversion math, locale formatting, base switching, and offline hydration paths first.
- Framework: Vitest (preferred with Vite) or Jest; place files in `tests/` or alongside modules as `*.test.ts`.
- Run via `npm test`; keep tests deterministic—mock network (NBU/ECB) and localStorage.

## Commit & Pull Request Guidelines
- Commits: concise imperatives (“Add UAH base guard”), group related changes; include tests/fixtures when relevant.
- PRs: describe intent, list key changes, note risk areas; attach screenshots/GIFs for UI changes; reference issues/links when available; ensure `npm run build` and tests pass before requesting review.

## API & Data Notes
- Primary rates source: NBU `https://bank.gov.ua/NBU_Exchange/exchange?json`; UAH is implicit base (rate=1.0).
- Optional fallback: ECB `eurofxref-daily.xml` only if same date; normalize to UAH via EUR rate and avoid mixed-day data.

## Security & Offline Behavior
- Cache last successful rates + timestamp in `localStorage`; hydrate on load and allow manual refresh.
- Service worker should cache static assets and the last rates payload; fail gracefully when network is unavailable.

## Reference
- Project plan: [projectPlan.md](/Users/oleksandrkaiukov/Code/CurrencyConverter/projectPlan.md)
- Project structure: [projectStructure.md](/Users/oleksandrkaiukov/Code/CurrencyConverter/projectStructure.md)
