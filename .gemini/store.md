# Zustand State Management Guidelines

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
