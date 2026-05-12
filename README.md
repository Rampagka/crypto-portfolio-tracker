# Astra — Crypto Portfolio Tracker

Read-only portfolio tracker for TON wallets. Add any mainnet address — no sign-up, no keys, no tracking. The app fetches balances and token holdings server-side and caches them so the frontend stays thin.

Built as a pet project to explore Nuxt 4 full-stack architecture with a feature-based module system.

**Stack:** Nuxt 4 · Vue 3 · TypeScript · TailwindCSS 4 · Pinia · tonapi.io

---

## Features

- Add multiple TON wallets by address (read-only — no private keys ever involved)
- Total portfolio balance in USD aggregated across all wallets
- 24h price change — absolute USD delta and percentage, colored green/red
- Per-wallet card: USD balance, native TON amount, top jetton holdings
- Auto-refresh every 45 seconds with a sync status indicator
- Wallet rename and remove via context menu
- One-tap address copy (friendly format)
- Loading skeletons during sync — no layout shifts
- State persisted in `localStorage` — wallets survive page refresh
- Server-side response cache (40 s) + in-process TON rates cache (30 s) to avoid redundant API calls
- Chain-aware neon theme — cyan for TON, purple for ETH (ETH coming in a future update)

---

## Quick start

```bash
git clone https://github.com/Rampagka/crypto-portfolio-tracker
cd crypto-portfolio-tracker
npm install
npm run dev
```

Open http://localhost:3000.

Without environment variables the app starts but all API calls will fail. See the section below.

### Environment variables

Create a `.env` file in the project root:

```
NUXT_BASE_TONAPI=https://tonapi.io/v2
NUXT_API_KEY=your_tonapi_key_here
```

Get a free API key at [tonconsole.com](https://tonconsole.com). The free tier is enough for personal use.

> Testnet addresses are rejected — only mainnet is supported.

---

## Architecture

### Module system

Each feature is a self-contained module under `app/modules/{name}/` with strict boundaries enforced by `eslint-plugin-project-structure`:

```
app/modules/{name}/
├── index.ts          # Public API — the only entry point for external consumers
├── components/       # Vue components (kebab-case filenames)
├── composables/      # useFoo.ts — reusable reactive logic
├── services/         # Pure functions — API calls, data fetching
├── store/            # Pinia stores (*.store.ts)
├── models/           # types/, interfaces/, enums/
├── helpers/          # Utility/transformation functions
└── modals/           # Modal components
```

Cross-module imports are only allowed through the public `index.ts`. Deep path imports (`@/modules/wallet-list/helpers/foo`) from outside the module fail at lint time. This makes refactoring bounded and predictable.

### Full-stack split

- **`app/`** — Nuxt frontend. Talks to the backend only through `/api/*` routes.
- **`server/api/`** — Nuxt server routes. Fetch from tonapi, map the response, return cached JSON.
- **`server/utils/`** — `TonClient` (tonapi wrapper with shared rates cache), address validators, portfolio mapper.

The frontend never calls tonapi directly — all external requests go through the server layer, which is where caching, validation, and the API key live.

### Smart / dumb component split

- `app/common/ui/` — dumb primitives (button, input, tab). Props + emit only.
- `app/common/components/` — shared domain components (header, footer, sync status).
- `app/modules/**/components/` — feature components, data via props.
- `app/pages/` — smart route components. Orchestrate modules and stores.

Business logic lives in composables. Components stay thin.

### Data flow

```
User adds address
  → useAddWallet composable validates + calls fetchPortfolio()
    → POST /api/portfolio/:address?chain=ton
      → TonClient fetches wallet, jettons, rates from tonapi
        → mapPortfolio() shapes the response
          → cached 40s per address+chain key
    → store.addWalletToPortfolio(data)

usePortfolioPolling (mounted on portfolio page)
  → refreshAllWallets() every 45s
    → fetchPortfolio() for each wallet in parallel (Promise.allSettled)
      → store.updateWallet(data)
```

---

## Project structure

```
app/
├── common/
│   ├── components/       # Shared domain components (header, footer, sync status)
│   ├── composables/      # usePolling, useModal, useChainTheme
│   ├── models/           # Shared types and interfaces
│   ├── styles/           # global.css, CSS variables, chain themes
│   ├── ui/               # Dumb UI primitives (button, input, tab)
│   ├── utils/            # Format helpers, address truncation
│   └── wrappers/         # Card and modal layout wrappers
├── modules/
│   ├── portfolio/        # Dashboard card, add-wallet flow, polling, store
│   └── wallet-list/      # Wallet item card, skeleton, edit/remove modals
│   └── wallet-dashboard/ # Aggregated total balance card
├── pages/
│   └── portfolio/[id].vue  # Route: /portfolio/ton (chain-aware)
├── layouts/
│   └── default.vue
└── app.vue

server/
├── api/portfolio/[address].get.ts   # Cached route handler
└── utils/
    ├── ton/ton-client.ts            # tonapi wrapper + rates cache
    ├── ton/ton-address.ts           # Address validation
    └── portfolio-mapper.ts          # Response shaping
```

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Nuxt dev server with HMR at localhost:3000 |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run generate` | Static site generation |

Linting and formatting run automatically on pre-commit via `lint-staged` + `husky`. To run manually:

```bash
npx eslint --fix "**/*.{vue,ts,tsx}"
npx prettier --write "**/*.{vue,ts,tsx,css}"
```

---

## Tech stack rationale

- **Nuxt 4** — full-stack in one repo: the server layer handles API keys and caching, the frontend gets a clean data contract. No need for a separate backend service.
- **Vue 3 + Composition API + TypeScript** — my primary stack; Composition API maps well to feature-based modules.
- **Pinia + pinia-plugin-persistedstate** — lightweight stores with `localStorage` persistence out of the box; selected fields only (`portfolio`, `lastSyncedAt`).
- **TailwindCSS 4 (`@tailwindcss/vite`)** — zero config file, all tokens defined as CSS variables in `@theme inline`; chain themes are just `data-theme` attribute swaps.
- **tonapi.io** — single REST API for balance, jettons, and token prices. Cleaner than assembling this from multiple TON Center endpoints.
- **`eslint-plugin-project-structure`** — enforces module folder layout and import boundaries at lint time, not by convention. Scales better than docs alone.
- **`@trivago/prettier-plugin-sort-imports`** — deterministic import order: `@/core` → `@/pages` → `@/common` → module internals → third-party.

---

## License

MIT
