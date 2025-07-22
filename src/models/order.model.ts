import { z } from "zod";
import { ICartItemSchema } from "./cart-item.model";

export const IOrderSchema = z.object({
  orderId: z.string(),
  userId: z.string(),
  cart: z.array(ICartItemSchema),
  paymentMethod: z.string(),
  shippingAddress: z.string(),
  total: z.number(),
});

export type IOrder = z.infer<typeof IOrderSchema>;