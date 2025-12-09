import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import { productListingRepository } from "@/infra/cosmic/product/product-listing.repo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim();

  if (!q) {
    return NextResponse.json({
      categories: [],
      products: [],
    });
  }

  const [categories, products] = await Promise.all([
    categoryRepository.searchCategoriesByKeyword(q),
    productListingRepository.searchProductsByKeyword(q)
  ]);

  return NextResponse.json({
    categories: categories.data,
    products: products.data,
  });
}
