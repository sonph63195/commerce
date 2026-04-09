# Repository Guidelines

## Project Overview
- **Core**: Next.js 16.1 (App Router), React 19.2, TypeScript. Using Turbopack for development.
- **Routing**: Grouped routes (`(storefront)`, `(admin)`, `(server)`) for clean separation of concerns.
- **Data Layer**: Cosmic CMS integration via `@cosmicjs/sdk` (v1.6). Repositories and mappers in `src/infra/cosmic` and `src/lib/cosmic`.
- **UI & Styling**: Tailwind CSS 4, shadcn/ui components (Radix UI), and Framer Motion for animations.
- **State Management**: Zustand (v5) for client state, TanStack Query (v5) for server state.
- **Auth & Forms**: NextAuth.js (v4), React Hook Form, and Zod for schema validation.
- **Tooling**: Biome (v2) for linting/formatting, Yarn as the package manager.

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
- Break complex pages/sections into focused child components for maintainability and reuse. Prefer keeping route `page.tsx` files thin: fetch data, orchestrate layout, and delegate UI blocks to components in `src/components/pages` or a domain-appropriate component folder.
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
