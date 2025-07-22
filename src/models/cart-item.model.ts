import { z } from "zod";

export const ICartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type ICartItem = z.infer<typeof ICartItemSchema>;
