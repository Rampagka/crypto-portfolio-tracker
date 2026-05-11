# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm run preview    # preview production build
npm run generate   # static generation
```

Linting and formatting run automatically via `lint-staged` on pre-commit (husky). To run manually:

```bash
npx eslint --fix "**/*.{vue,ts,tsx}"
npx prettier --write "**/*.{vue,ts,tsx,css}"
```

## Architecture

Nuxt 4 app (source in `app/`) with feature-based modular architecture.

### Module structure

All features live under `app/modules/<module-name>/`. Each module is self-contained and must follow this folder structure (enforced by `eslint-plugin-project-structure` via `app/core/configs/module-structure.ts`):

```
app/modules/<kebab-case>/
  index.ts                  # public API barrel — only export what other modules need
  components/
    <kebab-case>.vue
    index.ts
  composables/
    use<PascalCase>.ts
    index.ts
  modals/
    <kebab-case>.vue | <folder>/<kebab-case>.vue
    index.ts
  models/
    *.ts | interfaces/ | enums/ | types/
    index.ts
  services/
    *.ts
  helpers/
    *.ts
  consts/
    *.ts
  store/
    *.store.ts              # Pinia stores
```

### Import rules (enforced by ESLint via `app/core/configs/imports.ts`)

Relative imports (`./ ../`) are **forbidden everywhere**. Always use the `@/` alias.

| Context | Rule |
|---|---|
| Inside a module | Use full internal path `@/modules/<mod>/components/foo.vue` |
| Inside a module | Do **not** import own module's barrel `@/modules/<mod>` or `@/modules/<mod>/index.ts` |
| Importing another module | Only via public API: `@/modules/<other-mod>` (no deep paths) |
| `app/app.vue`, `app/pages/**` | Only public API of any module: `@/modules/<mod>` |

### Auto-imports (nuxt.config.ts)

- Components in `~/common/ui` and `~/modules/*/components` are auto-imported globally (no prefix).
- Composables from `common/composables`, `modules/*/components`, and `modules/*/store` are auto-imported.

### Shared code

- `app/common/styles/` — global CSS and CSS variables
- `app/common/ui/` — shared UI components (auto-imported)
- `app/common/composables/` — shared composables (auto-imported)
- `app/core/configs/` — ESLint config fragments (imports rules, module structure)
- `app/layouts/` — Nuxt layouts

### Key libraries

- **Pinia** (`@pinia/nuxt`) — state management, stores in `store/*.store.ts`
- **TailwindCSS** (`tailwindcss`, `tailwindcss/vite`) — styling
- **@nuxt/image** — image optimization (webp, quality 80)

### Code style

Prettier: no semicolons, single quotes, 100-char print width, 4-space indent. Import order is sorted automatically by `@trivago/prettier-plugin-sort-imports` in this order: `@/core` → `@/pages` → `@/common` → module internals (components → composables → modals → models → consts → helpers → services) → third-party.

### Commit Messages

Format: `type(scope): short description` (Conventional Commits). Always in English (Latin characters).

Types: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `perf`.

Scope — module or area (`favorites`, `category`, `ui`). Description — concise and clear, what was done and why.

Do not add any `*.md` files except `README.md`

Do not add `Co-Authored-By` or other automatic signatures to commits.
