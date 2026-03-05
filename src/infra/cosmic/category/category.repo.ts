import { Category, CategoryDetail } from "@/models/catalog/category";
import { mapCategoryDto } from "./category.mapper";
import { CosmicBaseRepository } from "../base-repository";
import { CategoryDto } from "./category-dto";
import { InternalListParams } from "../types";
import { productListingRepository } from "../product/product-listing.repo";
import { PaginatedResult } from "@/types/pagination";

const categoryInfo = `{
id
slug
title
thumbnail
created_at
modified_at
metadata {
  description
  parent {
    id
    slug
    title
    thumbnail
  }
}
}`;

class CategoryRepository extends CosmicBaseRepository<CategoryDto, Category> {
  constructor() {
    super('categories', mapCategoryDto, categoryInfo);
  }

  async getCategories(params?: InternalListParams) {
    return this.list(params)
  }

  async getDetailBySlug(slug: string, params?: InternalListParams): Promise<CategoryDetail | null> {
    const category = await this.getBySlug(slug);
    if (!category) return null;

    const subCategories = await this.list({
      limit: 10,
      skip: 0,
      ...params,
      find: {
        "metadata.parent": category.id
      }
    });

    const { data: products } = await productListingRepository.getProductListingsByCategoryId(category.id);

    return {
      ...category,
      subCategories: subCategories.data ?? [],
      products: products ?? []
    }
  }

  async searchCategoriesByKeyword(keyword: string, limit?: number, skip?: number): Promise<PaginatedResult<Category>> {
    const q = keyword.trim();
    if (!q) return { data: [], total: 0 }

    const data = await this.list({
      limit: limit ?? 10,
      skip: skip ?? 0,
      find: {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { slug: { $regex: q, $options: 'i' } },
          { 'metadata.description': { $regex: q, $options: 'i' } },
        ]
      }
    });

    return data;
  }
}

export const categoryRepository = new CategoryRepository();
