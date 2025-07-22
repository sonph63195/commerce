import { z } from "zod";

export const ICategorySchema = z.object({
  name: z.string(),
});

export type ICategory = z.infer<typeof ICategorySchema>;