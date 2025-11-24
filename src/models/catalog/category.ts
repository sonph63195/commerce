import { ProductListing } from "./product-listing";

export interface Category {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;

  parentId?: string;
  parentSlug?: string;
  parentTitle?: string;
  parentThumbnail?: string;

  createdAt: Date;
  modifiedAt: Date;
}

export interface CategoryDetail extends Category {
  subCategories: Category[];
  products: ProductListing[];

}
