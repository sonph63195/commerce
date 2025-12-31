import { ProductDetail } from "@/models/catalog/product-detail";
import { CosmicBaseRepository } from "../base-repository";
import { ProductDto } from "./product-dto";
import { mapProductDtoToProductDetail } from "./product.mapper";

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
  description
  gallery
  category {
    id
    slug
    title
  }
}
}`;

class ProductDetailRepository extends CosmicBaseRepository<ProductDto, ProductDetail> {
  constructor() {
    super('products', mapProductDtoToProductDetail, props);
  }
}

export const productDetailRepository = new ProductDetailRepository();
