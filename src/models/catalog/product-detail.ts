import { ProductBase } from "./product-base";

export interface ProductDetail extends ProductBase {
  description?: string; // HTML or markdown
  images?: string[]; // gallery image URLs
  category?: {
    id: string;
    slug: string;
    title: string;
  };
  // extend later with variants, sku, stock, attributes
}
