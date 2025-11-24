import { Category } from "@/models/catalog/category";
import { CategoryDto } from "./category-dto";

export function mapCategoryDto(dto: CategoryDto): Category {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    description: dto.metadata?.description,
    thumbnailUrl: dto.thumbnail,
    parentId: dto.metadata?.parent?.id,
    parentSlug: dto.metadata?.parent?.slug,
    parentTitle: dto.metadata?.parent?.title,
    parentThumbnail: dto.metadata?.parent?.thumbnail,
    createdAt: new Date(dto.created_at),
    modifiedAt: new Date(dto.modified_at),
  };
}
