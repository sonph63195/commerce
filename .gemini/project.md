# Project-Wide Development Guidelines

This document provides general coding practices and guidelines that apply to the entire project. For more specific instructions, refer to the `GEMINI.md` files located in the relevant subdirectories.

## ⚙️ Coding Conventions

- **Language**: Use `TypeScript` for all new code.
- **Formatting**: Adhere to the project's `biome.json` configuration.
- **Linting**: Follow the linting rules defined in `biome.json`.
- **File Naming**: Use kebab-case for all new files (e.g., `user-profile.tsx`).

## 🧭 File Structure

- **API Routes**: `src/app/(server)/api`
- **Components**: `src/components`
- **State Management**: `src/store`
- **Data Models**: `src/models`

## #️⃣ Data Fetching

- Use `axios` for making API requests.
- For server-side fetching in Next.js App Router, use `fetch()` inside a **React Server Component**.
- For client-side fetching, use `useSWR` or `React Query`.
- Always include loading and error states in the UI.
- Do not fetch on mount using `useEffect` unless required.
- Use caching mechanisms for frequently accessed data.
