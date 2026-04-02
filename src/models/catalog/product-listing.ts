import { ProductBase } from "./product-base";

export interface ProductListing extends ProductBase {
  shortDescription?: string;
  category?: {
    id: string;
    slug: string;
    title: string;
  };
  attributes?: Record<string, string>;
}
