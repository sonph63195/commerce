import { ProductListing } from "@/models/catalog/product-listing";
import { CosmicBaseRepository } from "../base-repository";
import { ProductDto } from "./product-dto";
import { mapProductDtoToProductListing } from "./product.mapper";
import { InternalListParams } from "../types";

const props = `{
id
slug
title
thumbnail
created_at
modified_at
metadata {
  short_description
  price
  original_price
  category {
    id
    slug
    title
  }
}
}`;

class ProductListingRepository extends CosmicBaseRepository<ProductDto, ProductListing> {
  constructor() {
    super('products', mapProductDtoToProductListing, props);
  }

  async getProductListingsByCategoryId(categoryId: string, params?: InternalListParams) {
    const { skip = 0, limit = 100, ...restPara } = params || {};
    return this.list({
      ...restPara,
      skip,
      limit,
      find: {
        "metadata.category": categoryId
      }
    });
  }

  async searchProductsByKeyword(keyword: string, limit?: number, skip?: number) {
    const q = keyword.trim();
    if (!q) return { data: [], total: 0 }

    const data = await this.list({
      limit: limit ?? 10,
      skip: skip ?? 0,
      find: {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { slug: { $regex: q, $options: 'i' } },
          { 'metadata.short_description': { $regex: q, $options: 'i' } },
        ]
      }
    });

    return data;
  }
}

export const productListingRepository = new ProductListingRepository();

