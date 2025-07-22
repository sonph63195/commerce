import { z } from "zod";

export const IProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  category: z.string(),
  images: z.array(z.string()).optional(),
  stock: z.number().optional(),
});

export type IProduct = z.infer<typeof IProductSchema>;
