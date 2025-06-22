/**
 * Product model and Zod schema for product validation.
 */
import { z } from "zod";

export const ProductSchema = z.object({
	id: z.number(),
	title: z.string(),
	price: z.number(),
	currency: z.enum(["USD", "VND"]),
	category: z.string(),
	image: z.string().url(),
	thumbnail: z.string().url(),
});

export const ProductsResponseSchema = z.object({
	success: z.boolean(),
	data: z.array(ProductSchema),
	error: z.string().optional(),
});

export type TProduct = z.infer<typeof ProductSchema>;
export type TProductsResponse = z.infer<typeof ProductsResponseSchema>;
