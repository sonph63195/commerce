# 🎨 UI Component Design

Refer to the root `GEMINI.md` for shared **⚙️ Coding Conventions** and **🧭 File Structure**.

---

## ✅ Technologies

- Use **React Hook Form** for managing form state.
- Use **Zod** for schema validation.
- Use **@hookform/resolvers/zod** to integrate Zod with React Hook Form.
- Use only components from the `@/components` index file — never import directly from `shadcn/ui` or individual component files.

---

## 🧩 Component Design Principles

- Use reusable and composable components from `@/components/**`.
- Extend base components via **composition**, not cloning or inheritance.
- Use **utility-first Tailwind CSS classes** — avoid custom CSS unless necessary.
- Ensure accessibility with appropriate `aria` attributes and semantic HTML.
- Always use a dedicated typography component for displaying text.

---

## 🧾 Form-Specific Guidelines

### ✅ Model Location & Naming

- Define all models using **Zod** in `@/models/{feature}.model.ts` — one file per feature.
- Each model file must:
  - Export a Zod schema (e.g., `userSchema`)
  - Export the inferred type via `z.infer`

#### 📌 Example: `models/user.model.ts`

```ts
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
```

## ✅ Form Implementation Standards

- Use useForm() with zodResolver() for schema validation.
- Use Form, FormField, FormLabel, FormControl, FormMessage, FormSubmit, FormInput, FormTextarea, FormCheckbox, FormSelect, FormRadioGroup, FormSwitch from @/components/ui/form.
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
