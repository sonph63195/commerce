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
- **Always use the `Typography` component from `@/components/ui/typography` for rendering any text content (headings, paragraphs, lists, blockquotes, etc.) in UI components. Do not use raw HTML tags for text.**

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
