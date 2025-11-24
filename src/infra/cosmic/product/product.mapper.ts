import { ProductListing } from "@/models/catalog/product-listing";
import { ProductDto } from "./product-dto";

export function mapProductDtoToProductListing(dto: ProductDto): ProductListing {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    thumbnailUrl: dto.thumbnail,
    price: dto.metadata?.price,
    originalPrice: dto.metadata?.original_price,
    shortDescription: dto.metadata?.short_description,
    createdAt: new Date(dto.created_at),
    modifiedAt: new Date(dto.modified_at),
  }
}
