import { Category, CategoryDetail } from "@/models/catalog/category";
import { mapCategoryDto } from "./category.mapper";
import { CosmicBaseRepository } from "../base-repository";
import { CategoryDto } from "./category-dto";
import { ListParams } from "../types";
import { productListingRepository } from "../product/product-listing.repo";

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

  async getCategories(params?: ListParams) {
    return this.list(params)
  }

  async getDetailBySlug(slug: string, params?: ListParams): Promise<CategoryDetail | null> {
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

    const {data: products} = await productListingRepository.getProductListingsByCategoryId(category.id);

    return {
      ...category,
      subCategories: subCategories.data ?? [],
      products: products ?? []
    }
  }
}

export const categoryRepository = new CategoryRepository();

export async function getCategories(params?: ListParams) {
  return categoryRepository.getCategories(params);
}

export async function getCategoryBySlug(slug: string) {
  return categoryRepository.getBySlug(slug);
}

export async function getDetailBySlug(parentId: string, params?: ListParams) {
  return categoryRepository.getDetailBySlug(parentId, params);
}
