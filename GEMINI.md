# API Route Development Instructions

Follow with .github/copilot-instruction.md for general coding practices.

- All API routes are located in the `app/api/` directory.
- Use `TypeScript` and export a default `async` function using `NextRequest` and `NextResponse` from `next/server`.
- Validate request bodies using `zod`.
- Always return JSON responses in the format:
  ```ts
  {
    success: boolean;
    data?: any;
    error?: string;
  }
- all zod schema will in models and follow based on {feature}.model.ts

# Data Fetching Best Practices

Follow with .github/copilot-instruction.md for general coding practices.

- Use `fetch` or `axios` for making API requests.
- For server-side fetching in Next.js App Router, use `fetch()` inside a **React Server Component**.
- For client-side fetching, use `useSWR` or `React Query`.
- Always include loading and error states in the UI.
- Do not fetch on mount using `useEffect` unless required.
- Use caching mechanisms for frequently accessed data.

---
applyTo: "src/components/**/*.ts,src/components/**/*.tsx"
---
# 🎨 UI Component Design

Refer to `.github/copilot-instructions.md` for shared **⚙️ Coding Conventions** and **🧭 File Structure**.

---

## ✅ Technologies

- Use **React Hook Form** for managing form state.
- Use **Zod** for schema validation.
- Use **@hookform/resolvers/zod** to integrate Zod with React Hook Form.
- Use only components from the `@/components/**` directory — never import directly from `shadcn/ui`.

---

## 🧩 Component Design Principles

- Use reusable and composable components from `@/components/**`.
- Extend base components via **composition**, not cloning or inheritance.
- Use **utility-first Tailwind CSS classes** — avoid custom CSS unless necessary.
- Use `VBox` (vertical layout) and `HBox` (horizontal layout) wrappers when aligning layout via Flexbox.
- Ensure accessibility with appropriate `aria` attributes and semantic HTML.

---

## 🧾 Form-Specific Guidelines

### ✅ Schema Location & Naming

- Define all form schemas in `@/models/{feature}.model.ts` — one file per feature.
- Schema file must:
  - Export a Zod schema (e.g., `userProfileSchema`)
  - Export the inferred type via `z.infer`

#### 📌 Example: `models/user.model.ts`

```ts
import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export type UserProfileForm = z.infer<typeof userProfileSchema>;
```

## ✅ Form Implementation Standards

- Use useForm() with zodResolver() for schema validation.
- Use UI elements like Input, Label, Button, Textarea, Select — wrapped in local components (@/components/atoms/*).
- Use Form, FormField, FormLabel, FormMessage, FormInput from @/components/atoms/form.
- Always provide:
  - Accessible labels (Label)
  - Error messages (FormMessage)
  - Placeholder or default text where relevant
- Use formState.isSubmitting or useState for loading indicators.
- Avoid uncontrolled components unless explicitly needed.

## ❌ Do Not

- ❌ Do not define schemas inside component files.
- ❌ Do not use native HTML inputs (e.g., <input> directly).
- ❌ Do not import UI components directly from shadcn/ui.
- ❌ Do not use non-inferred types that diverge from your Zod schema.

# Zustand State Management Guidelines

Follow with .github/copilot-instruction.md for general coding practices.

## 🧱 Setup

- Use **Zustand** for global or shared state management.
- Always use **TypeScript** with explicit state typing.
- Use `create` from the `zustand` package to define stores.
- Use `immer` middleware when immutability is needed.
- Use `persist` middleware only for localStorage/sessionStorage use cases.

## 📦 Store Structure

- Define each store in its own file in `lib/stores/` or `store/`.
- Name files according to feature (e.g., `useAuthStore.ts`, `useThemeStore.ts`).
- Always export the hook using `export const useXStore = create<StoreType>()`.

## 🔄 Store Pattern Example

```ts
import { create } from 'zustand';

type CounterState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```
