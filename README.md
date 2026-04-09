# Commerce Project

A high-performance e-commerce platform built with Next.js, Cosmic CMS, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router, Turbopack)
- **UI**: [React 19.2](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **CMS**: [Cosmic CMS](https://www.cosmicjs.com/)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand), [TanStack Query 5](https://tanstack.com/query/latest)
- **Auth**: [NextAuth.js 4](https://next-auth.js.org/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Linting & Formatting**: [Biome 2](https://biomejs.dev/)

## 📁 Project Structure

```text
src/
├── app/            # Routes, layouts, and API handlers
├── components/     # UI components (ui/, pages/, provider/)
├── hooks/          # Custom React hooks
├── infra/          # Infrastructure logic (Cosmic SDK, mappers)
├── lib/            # Utilities, fetchers, and clients
├── models/         # Zod schemas and TypeScript types
├── store/          # Zustand slices
├── styles/         # Global styles and Tailwind configuration
└── tests/          # Test suites
```

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Run the development server**:
   ```bash
   yarn dev
   ```

3. **Build for production**:
   ```bash
   yarn build
   ```

4. **Lint with Biome**:
   ```bash
   yarn lint
   ```

## 📖 Guidelines

For detailed development guidelines, coding standards, and repository practices, please refer to [AGENTS.md](./AGENTS.md).
