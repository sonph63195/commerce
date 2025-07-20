# GitHub Copilot Project Instructions

## 🧱 Project Stack
- Use **Next.js (latest stable version)** with the App Router (`app/` directory).
- Use **TypeScript** for all code.
- Use **shadcn/ui** components for all UI elements.
- Use **Tailwind CSS** for styling, with dark mode support (`class` strategy).
- Use **Zod** for schema validation.
- Use **Biome** for linting and formatting.

## 🎨 UI Guidelines
- Prefer **functional React components** with hooks.
- Use **React Server Components** where appropriate.
- Use **client components** only when needed (`"use client"`).
- Only use **client components** for interactive elements (forms, buttons, modals, ...).

## 🧭 File Structure
- Organize features using **modular folders**: `app/{feature}/page.tsx`, `components/{type}/{Component}.tsx`, etc.
- Place **reusable UI** in `components/ui/`, and **feature-specific components** in `components/{feature}/`.

## ⚙️ Coding Conventions
- Use `async/await` instead of `.then()`.
- Use `const` and `let` appropriately (avoid `var`).
- Use `zod` for schema validation.
- Use `React.FC` type if needed, otherwise rely on implicit function types.
- Use PascalCase for interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- use snake-case for components names and directories (ex: `user-profile`, `product-list`).
- User `I` as a prefix for interfaces (e.g., `IUser`).
- User `T` as a prefix for type aliases (e.g., `TUser`).
- Use `enum` for fixed sets of values.
- Use `Enum` for subfix of enums (e.g., `UserRoleEnum`).
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants
- Avoid using the index of an array as key property in an element.
- Avoid use any as a type. If have to use any use biome ignore comment.

## 🌐 API Guidelines
- Use **RESTful** API routes inside `app/api/`.
- Always validate API input using `zod`.
- Return consistent JSON structure: `{ success: boolean; data?: any; error?: string }`.

## 🧪 Testing
- Use **Jest** and **React Testing Library** for unit tests.
- Place tests in `__tests__/` or alongside components as `{Component}.test.tsx`.

## 🔐 Security & Quality
- Sanitize all user inputs before rendering.
- Use `useEffect` and `useRef` safely – avoid memory leaks.
- Prefer named exports over default exports.

## 📎 Other Notes
- Add meaningful docstrings using `/** */`.
- Prefer explicit types when the inference is unclear.
- Follow ESLint and Prettier rules strictly.

# Terminal & Package Manager Guidelines

- Always use `yarn` instead of `npm` for package management.
- When suggesting terminal commands, prefer the `yarn` equivalent:
  - `yarn add` instead of `npm install`
  - `yarn remove` instead of `npm uninstall`
  - `yarn dev` instead of `npm run dev`
  - `yarn build` instead of `npm run build`
- Do not include any `package-lock.json` references.
