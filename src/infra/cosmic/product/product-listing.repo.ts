import { ProductListing } from "@/models/catalog/product-listing";
import { CosmicBaseRepository } from "../base-repository";
import { ProductDto } from "./product-dto";
import { mapProductDtoToProductListing } from "./product.mapper";
import { ListParams } from "../types";

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

  async getProductListingsByCategoryId(categoryId: string, params?: ListParams) {
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
}

export const productListingRepository = new ProductListingRepository();

