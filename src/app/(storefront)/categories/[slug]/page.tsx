import { notFound } from "next/navigation";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import { CategoryDetailHero } from "@/components/pages/categories/category-detail-hero";
import { CategoryProductsSection } from "@/components/pages/categories/category-products-section";
import { CategorySubcategoriesSection } from "@/components/pages/categories/category-subcategories-section";

export default async function CategoryDetailPage(props: PageProps<"/categories/[slug]">) {
  const { slug } = await props.params;
  const category = await categoryRepository.getDetailBySlug(slug);

  if (!category) {
    return notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <CategoryDetailHero category={category} />
      <CategorySubcategoriesSection subCategories={category.subCategories} />
      <CategoryProductsSection products={category.products} />
    </main>
  );
}
