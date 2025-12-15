# Repository Guidelines

## Project Overview
- Next.js App Router (Next 16, React 19) with grouping: `src/app/(storefront)`, `src/app/(admin)`, `src/app/(server)` for API routes; `src/app/layout.tsx` attaches Geist fonts, Theme/NextAuth/React Query providers.
- Data layer integrates Cosmic CMS via `src/lib/cosmic` + `src/infra/cosmic` repositories/mappers; domain models live in `src/models/catalog`.
- UI uses shadcn-derived primitives in `src/components/ui`, aggregated exports in `src/components/index.ts`; Tailwind 4 tokens and dark mode defined in `src/app/globals.css` with `next-themes`.
## Delivery Plan (scoped to Catalog + Search + Autocomplete, future-ready for Product Detail/Cart/Checkout)
- Phase 0 (Foundation) — DONE: Next.js + TS + Tailwind; aliases via `@/*`; Cosmic client in `src/lib/cosmic`; folder split `src/app`, `src/components`, `src/infra`, `src/lib`, `src/models`, `src/hooks`, `src/types`.
- Phase 1 (Catalog domain + Cosmic integration) — DONE: Category/Product DTOs, domain models, mappers, `CosmicBaseRepository`, specialized repositories for category and product listing.
- Phase 2 (Category pages) — PARTIAL: `/categories` and `/categories/[slug]` render listing/detail with subcategories + products; UI basic, can polish cards later.
- Phase 3 (Search page) — PARTIAL: `/search` exists but only echoes `q`; needs server-side fetch via repositories and result sections with empty state.
- Phase 4 (Autocomplete) — DONE: API `src/app/(server)/api/v1/search/autocomplete` + client `SearchAutocompleteInput` with debounce and navigation hooks.
- Phase 5 (Product detail) — NOT STARTED: extend product domain/repo for detail; add `/products/[slug]` using new mapper; reuse listings for related products.
- Phase 6 (Cart & Checkout) — NOT STARTED: design domain (Cart/Order/Payment), server actions/api, cart UI; keep separate from catalog/search.
- Phase 7 (Hardening) — TODO: enrich error handling/SEO/logging/testing; currently only Cosmic error logging in `src/infra/cosmic/error.ts`.

## Project Structure & Module Organization
- Source lives in `src/` using Next.js App Router + TypeScript.
- Key folders:
  - `src/app` (routes/layouts, default Server Components)
  - `src/components/ui` (shadcn primitives) • `src/components/pages` (route‑specific)
  - `src/components/provider` (Theme/Store/Auth/etc.)
  - `src/hooks` (pure hooks) • `src/lib` (fetchers, clients, helpers)
  - `src/models` (Zod schemas + types) • `src/store` (Zustand slices)
  - `src/styles` (Tailwind config/extensions) • `src/tests` (optional testing utils)
- Separation: server vs client. Mark client files with `"use client"`.
- Page components do not import other pages. Avoid circular deps.

## Build, Test, and Development Commands
- Use Yarn only.
  - `yarn dev` — Start dev server (Turbopack).
  - `yarn build` — Production build.
  - `yarn start` — Run production server.
  - `yarn lint` — Lint with Biome.
  - `yarn storybook` / `yarn build-storybook` — Component preview/build.
- Tests: prefer Vitest/Jest + RTL and MSW; add `yarn test` when configured.

## Coding Style & Naming Conventions
- TypeScript `strict` on; avoid `any`. Validate external data with Zod.
- Linting & formatting: Biome (formatter + linter). Tailwind for styles; keep utility classes semantic.
- Filenames: kebab-case.
  - Components: `product-card.tsx` (export `ProductCard`).
  - Hooks: `useCart.ts` (`useXyz` pattern).
  - Stores: `cart.slice.ts` with domain‑scoped exports.
  - Models: `user.schema.ts`, `user.types.ts` with type-only barrels.
- Prefer named exports; no root-level barrels.

## Testing Guidelines
- Aim >80% coverage on business‑critical modules.
- Co-locate tests next to modules: `thing.test.ts[x]`.
- Use Arrange‑Act‑Assert; mock APIs with MSW; e2e optional with Playwright.

## Commit & Pull Request Guidelines
- Conventional Commits: `feat(scope): …`, `fix(scope): …`, `chore(scope): …`.
- Branches: `feature/…`, `bugfix/…`, `chore/…`, `experiment/…`.
- PRs include: concise description, linked issues, screenshots (UI), and test results.

## Security & Configuration Tips
- Do not commit secrets; use `.env.local`. Validate all payloads via Zod.
- Use Next.js caching directives (`revalidate`, `no-store`) appropriately. Optimize images/fonts.
