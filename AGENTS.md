# AGENTS.md — Commerce Front‑End (Comprehensive Edition)

This extended version of the AGENTS.md expands upon all prior rules, introducing deeper explanations, rationales, and operational guidance for AI‑assisted and human contributors alike. It aims to ensure consistency, maintainability, performance, and collaborative clarity throughout the lifecycle of this commerce front‑end project.

---

## 1) Scope & Intent

* **Purpose:** This project implements a production‑ready commerce front‑end with product exploration, shopping cart, checkout workflow, user authentication, profile management, order tracking, content rendering (CMS integration), and analytics.
* **Framework:** Built with **Next.js (App Router)** using **TypeScript**, **Tailwind CSS**, and **Zustand** for application‑level state. The design emphasizes modularity, server rendering efficiency, and developer ergonomics.
* **UI System:** **shadcn/ui** extended with custom theming, animation primitives (via Framer Motion), and iconography (Lucide). This ensures design consistency and quick prototyping.
* **Validation Framework:** **Zod** powers runtime schema validation and type inference, eliminating discrepancies between runtime and compile‑time definitions.
* **Package Manager:** **Yarn** is mandatory. No mixed npm usage. Agents and contributors must use consistent lockfile management.
* **AI Agent Role:** The coding assistant acts as a specialized contributor adhering to the guidelines, capable of scaffolding new features, refactoring legacy code, and validating data models in strict compliance with project architecture.

---

## 2) Repository Layout & Folder Semantics

```
/src
  /app                      # Next.js App Router routes, layouts, and server components
  /components
    /ui                     # shadcn + reusable UI primitives, typography, inputs, cards, etc.
    /pages                  # Route‑specific components that should not be reused globally
    /provider               # All React Providers: Theme, Query, I18n, Store, Analytics, Auth
  /hooks                    # Custom hooks with pure, reusable logic (no side effects)
  /lib                      # Network utilities, helpers, SSR fetchers, external API clients
  /models                   # Domain folders per feature (e.g., models/user/*, models/cart/*); each exports Zod schemas + TS types/interfaces
  /store                    # Zustand stores and slices, containing state logic only
  /styles                   # Optional Tailwind extensions, mixins, typography scales
  /tests                    # Extended integration/e2e testing utilities (optional)
```

**Folder Rules:**

* No additional root folders allowed unless approved and recorded here.
* Maintain separation of server vs. client responsibilities.
* Components in `pages/` cannot import components from other page folders.
* Avoid circular dependencies between stores, hooks, and libs.
* Always colocate tests beside their module when possible.

---

## 3) Commands, Tooling & Continuous Integration

To clarify integration with CI/CD pipelines, note that these commands should align with automated processes such as pre-push Git hooks, GitHub Actions, or other deployment scripts. Each stage (build, lint, type check, test, and deploy) should map directly to these commands to ensure consistent results locally and in continuous integration environments.

**Available Commands (from package.json):**

| Command                | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `yarn dev`             | Run Next.js in development mode with Turbopack for faster builds. |
| `yarn build`           | Create an optimized production build.                             |
| `yarn start`           | Start the Next.js production server.                              |
| `yarn lint`            | Run Biome to lint the entire codebase.                            |
| `yarn storybook`       | Launch Storybook locally on port 6006 for component preview.      |
| `yarn build-storybook` | Build a static Storybook for deployment.                          |

---

## 4) TypeScript Rules, Typing Philosophy & Naming

### Naming Rules

* **React Components:** Use kebab-case for file names (e.g., `product-card.tsx`, `user-profile.tsx`) but PascalCase for component declarations inside the file (e.g., `export function ProductCard()`).
* **Hooks:** Follow `useXyz.ts` convention (e.g., `use-auth.ts`).
* **Stores:** Each Zustand slice uses `domain.slice.ts` naming.
* **Schemas and Models:** File names are in kebab-case (e.g., `user.schema.ts`, `cart.types.ts`).
* **Tests:** Match the target file name (e.g., `product-card.test.tsx`).

---

### Naming Rules

* **React Components:** File and folder names use **kebab-case** (e.g., `product-card.tsx`, `checkout-form.tsx`). The component function name itself remains **PascalCase** (`ProductCard`, `CheckoutForm`).
* **Hooks:** Named with `use` prefix and follow camelCase (`useCart`, `useUserPreferences`).
* **Zustand Stores:** Folders or files named after domain (`cart`, `user`), store files as `domain.slice.ts`.
* **Model Domains:** Folders are lowercase with hyphens if needed (`user-profile`, `cart-item`).
* **Utilities/Libs:** Use kebab-case filenames for helpers (`format-currency.ts`, `fetch-wrapper.ts`).

---

### Barrel Exports

* **Purpose:** Keep imports short and organized while preserving tree-shaking efficiency.
* **Allowed:** Local barrels within `src/components/ui` and `src/hooks`. Each should re-export named modules explicitly, never `export *`.

  ```ts
  // src/components/ui/index.ts
  export { Button } from "./Button";
  export { Card } from "./Card";
  ```
* **Type-only barrels** permitted in `src/models`:

  ```ts
  // src/models/index.ts
  export type { TProduct, IProduct } from "./product";
  export type { TCartItem, ICart } from "./cart";
  ```
* **Disallowed:** Root-level barrels (e.g., `src/index.ts`) and barrels in `src/components/pages` or `src/store`.
* **Rules:** No side effects, no runtime logic inside barrels. Enforce via lint rule `import/no-cycle` to prevent circular imports.

---

* The project enforces `strict: true` in tsconfig.
* **No `any`** types except as explicitly justified. Prefer generics or `unknown`.
* Use **Type aliases (`type`)** for unions, intersections, and mapped types.
* Use **Interfaces (`interface`)** when extensibility is needed or when describing object contracts.
* Naming:

  * Interfaces → prefix with `I` (e.g., `IUser`, `IProduct`)
  * Types → prefix with `T` (e.g., `TUserId`, `TProductPayload`)
  * Zod schemas → PascalCase, match corresponding model (e.g., `ProductSchema`).
* All exported functions must specify explicit return types.
* Avoid default exports for utilities and hooks; use named exports.

**Good Example:**

```ts
export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type TUserRole = 'guest' | 'member' | 'admin';
export const UserRoleSchema = z.enum(['guest','member','admin']);
```

---

## 5) Models — Zod + TypeScript Pattern

Every domain model file under `/src/models` must define:

1. A **Zod schema** for runtime data validation.
2. A **Type alias** inferred from schema.
3. An **Interface** for extending the shape externally if required.
4. Optional **factory** or parser for consistent data handling.

**Example:**

```ts
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
  category: z.string().optional(),
  currency: z.enum(['USD','EUR','VND']).default('USD'),
  createdAt: z.date().or(z.string()),
});

export type TProduct = z.infer<typeof ProductSchema>;
export interface IProduct extends TProduct {}
export function parseProduct(data: unknown): TProduct { return ProductSchema.parse(data); }
```

**Rules:** Validate every external payload. Never rely on raw API responses.

**Folder Example:** Each domain has its own folder with its schema, types, and factories. For instance:

```
/src/models/user/
  user.schema.ts    # defines Zod schema and parsing logic
  user.types.ts     # exports interfaces and type aliases
  index.ts          # type-only barrel exporting TUser, IUser
```

This structure helps modularize domains and improves scalability for large teams.

---

## 6) Next.js App Router Standards

* Default to **Server Components**. Mark client code explicitly with `'use client'`.
* Server actions and route handlers must validate inputs and outputs.
* Use Next.js caching directives: `revalidate`, `no-store`, or `force-cache` properly.
* Data flow: **fetcher (lib)** → **server component (app)** → **client subcomponent (ui/pages)**.
* Implement graceful fallbacks: `loading.tsx`, `error.tsx`, `not-found.tsx`.
* Include metadata functions for SEO and OpenGraph in route segments.
* Apply dynamic import for large or infrequently used widgets.

---

## 7) UI Architecture & Styling

* shadcn components must remain source‑controlled, versioned, and extendable via wrappers.
* TailwindCSS governs all styling; CSS Modules discouraged.
* Global themes defined in `tailwind.config.ts` with brand color tokens: `primary`, `secondary`, `accent`, `muted`.
* Define spacing, radius, and typography scales as reusable tokens.
* Never inline arbitrary pixel values; use Tailwind spacing variables.
* Use motion variants via Framer Motion for animations, transitions, and hover effects.
* Maintain accessibility through ARIA attributes in all UI elements.

**Component Template:**

```tsx
'use client';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { TProduct } from '@/models/product';

export function ProductCard({ product }: { product: TProduct }) {
  return (
    <Card className="group p-4 transition hover:shadow-md">
      <CardHeader>
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
      </CardHeader>
      <div className="relative aspect-square mb-2">
        <Image src={product.images?.[0] ?? '/placeholder.png'} alt={product.title} fill className="object-cover rounded-md" />
      </div>
      <CardContent>
        <p className="text-muted-foreground">{product.price.toLocaleString()} {product.currency}</p>
        <Button size="sm" className="mt-2 w-full">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 8) Providers & Composition

* Providers reside in `/src/components/provider`.
* Keep each provider independent; compose them in `src/app/layout.tsx`.
* Common providers: `ThemeProvider`, `StoreProvider`, `QueryProvider`, `AuthProvider`, `I18nProvider`.
* Avoid circular dependencies or global side effects.
* Providers must be typed using generics to ensure context integrity.

---

## 9) Hooks

* Hooks follow naming `useXyz.ts`.
* Must be pure and free of unrelated side effects.
* Complex stateful hooks must have internal memoization.
* Each hook should describe input/output contracts in its JSDoc header.
* Example: `useCart`, `useDebounce`, `useScrollLock`, `useProductQuery`.

---

## 10) State Management — Zustand

**Example Slice Structure:**

```
/src/store/cart/
  cart.slice.ts    # defines state, actions, and selectors for cart
  cart.types.ts    # TypeScript interfaces/types for slice state
  index.ts         # exports useCart and related helpers
```

**Naming Convention:** Each slice follows `domain.slice.ts` naming, and hooks use `useDomain()` form (e.g., `useCart`, `useUser`).

* Stores are organized per domain. Each file defines the state, actions, and optional persistence layer.
* Persist sensitive data carefully (e.g., never persist access tokens unencrypted).
* Always validate persisted objects with Zod on load.
* Use selectors for derived data, reducing re-renders.
* Avoid global imports of store functions outside React components; always use hooks.

---

## 11) Data Layer Practices (`src/lib`)

* Centralize HTTP clients, endpoints, and config.
* Wrap fetch with retry logic and timeout.
* Define dedicated error classes (e.g., `ApiError`).
* Every data layer function returns a Zod‑validated type.
* Include helper utilities for pagination, query parameters, and caching.
* Implement metrics or logging hooks for debugging API latency.

---

## 12) Testing & Quality Assurance

* Test coverage should exceed 80% on business‑critical modules.
* Use **Vitest/Jest** + **React Testing Library** for component testing.
* Use **MSW** (Mock Service Worker) to simulate backend responses.
* Use **Playwright** for optional e2e validation.
* Each test must follow Arrange‑Act‑Assert structure.
* Snapshot tests allowed only for static components.

---

## 13) Accessibility, Internationalization & Responsiveness

* Adhere to WCAG 2.1 AA compliance.
* Provide `aria` labels and keyboard focus management for all interactive UI.
* Default language is English; localization keys should exist in a translation map.
* Ensure layout responsiveness from 360px to 1440px breakpoints.
* Test with light/dark mode parity.

---

## 14) Git, CI, and Review Standards

* Use **Conventional Commits**: `feat(scope):`, `fix(scope):`, `refactor(scope):`, etc.
* Each PR must include: description, issue reference, screenshots (if UI), and test results.
* Branch naming: `feature/`, `bugfix/`, `chore/`, `experiment/`.
* Every PR triggers lint/type/test workflows.
* Code reviews check performance, clarity, and rule adherence.

---

## 15) Performance, Optimization, and Metrics

*Add note: Developers should leverage profiling tools such as **React Profiler** for component render analysis and **Next.js Analyzer** for bundle inspection to measure and optimize performance effectively in real scenarios.*

* Employ lazy loading and dynamic imports.
* Cache data when appropriate.
* Optimize image and font loading using Next.js.
* Measure Web Vitals (LCP, FID, CLS) periodically.
* Minimize bundle size; analyze with `next build --analyze`.
* Prefer incremental static regeneration for stable pages.

---

## 16) Error Handling, Empty States & Resilience

* Wrap network calls in try/catch with user‑friendly fallback messages.
* Avoid leaking raw server messages to clients.
* Use `ErrorBoundary` for global UI fallback.
* Provide skeleton loaders, not spinners, when possible.
* Use monitoring tools for error logs (e.g., Sentry).

---

## 17) Agent Prompts & Examples

* “Generate a complete `ProductCard` with motion hover effect and responsive layout.”
* “Create `useCheckout` hook managing form state and submitting orders.”
* “Refactor `/src/lib/api.ts` to validate every request with Zod schemas.”
* “Scaffold `/src/store/user.ts` Zustand store for session management.”

---

## 18) Agent Guardrails & Operational Policies

* Never modify non‑source directories unless explicitly required.
* Avoid unnecessary dependencies; document every addition.
* Ensure lint, type, and test success before finalizing generation.
* Preserve readability; auto‑format with Prettier.
* Follow all conventions above recursively in submodules.

---

## 19) Deviation, Documentation & Governance

If deviation from a rule is required:

1. State rationale and trade‑off.
2. Submit as a documented exception in the PR description.
3. Consider updating AGENTS.md if deviation becomes a pattern.
4. Maintain changelog entries for major rule updates.

---

**End of Comprehensive AGENTS.md**
