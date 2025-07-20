# API Route Development Instructions

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
