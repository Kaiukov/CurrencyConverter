# CurrencyPlus Project Structure (React + TS + Vite)

```
.
├─ public/
│  ├─ favicon.ico
│  ├─ manifest.webmanifest   # PWA manifest
│  └─ icons/                 # PWA icons (192/512 etc.)
├─ src/
│  ├─ main.tsx               # Vite entry, mounts <App />
│  ├─ App.tsx                # App shell; providers, layout slots
│  ├─ index.css              # Tailwind base/imports
│  ├─ assets/
│  │  └─ flags/              # SVG flags for UAH, GBP, USD, EUR, RON, SEK
│  ├─ components/
│  │  ├─ Header.tsx          # title, menu, edit CTA
│  │  ├─ UpdateBar.tsx       # timestamp + refresh action
│  │  ├─ CurrencyRow.tsx     # row UI, base toggle, copy/share
│  │  └─ Keypad.tsx          # calculator keypad driving active amount
│  ├─ features/
│  │  └─ rates/
│  │     ├─ api.ts           # TanStack Query fetches NBU; optional ECB fallback
│  │     ├─ types.ts         # Rate types, ISO codes, precision map
│  │     └─ format.ts        # number formatting (thin-space thousands, comma decimal)
│  ├─ state/
│  │  └─ store.ts            # baseCode, amount, visible currency order (useState)
│  ├─ hooks/
│  │  └─ useLocalStorage.ts  # persist rates, timestamp, order for offline
│  ├─ pwa/
│  │  └─ sw.ts               # service worker cache for static + last rates payload
│  └─ utils/
│     ├─ conversion.ts       # cross-rate math: target = amount * rateT / rateB
│     └─ locale.ts           # locale override (comma vs dot)
├─ tests/
│  └─ conversion.test.ts     # math + precision + base switching
├─ tailwind.config.cjs
├─ postcss.config.cjs
├─ tsconfig.json
├─ vite.config.ts
└─ package.json
```

Minimal usage
- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`; Preview: `npm run preview`

Notes
- UAH is implicit base (rate=1.0); normalize API entries with `rate = Amount / Units`.
- Ensure rates cache + timestamp in localStorage; hydrate before first render.
- Service worker should cache last successful rates for offline conversions.
