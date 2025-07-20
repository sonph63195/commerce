# Data Fetching Best Practices

Follow with .github/copilot-instruction.md for general coding practices.

- Use `fetch` or `axios` for making API requests.
- For server-side fetching in Next.js App Router, use `fetch()` inside a **React Server Component**.
- For client-side fetching, use `useSWR` or `React Query`.
- Always include loading and error states in the UI.
- Do not fetch on mount using `useEffect` unless required.
- Use caching mechanisms for frequently accessed data.
