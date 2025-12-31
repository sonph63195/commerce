import { ProductListing } from "@/models/catalog/product-listing";
import { ProductDto } from "./product-dto";
import { ProductDetail } from "@/models/catalog/product-detail";

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

export function mapProductDtoToProductDetail(dto: ProductDto): ProductDetail {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    thumbnailUrl: dto.thumbnail,
    price: dto.metadata?.price,
    originalPrice: dto.metadata?.original_price,
    createdAt: new Date(dto.created_at),
    modifiedAt: new Date(dto.modified_at),

    description: dto.metadata?.description,
    images: dto.metadata?.gallery ?? (dto.thumbnail ? [dto.thumbnail] : []),
    category: dto.metadata?.category ? {
      id: dto.metadata.category.id,
      slug: dto.metadata.category.slug,
      title: dto.metadata.category.title,
    } : undefined,
  }
}
