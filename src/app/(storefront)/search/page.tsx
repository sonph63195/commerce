import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import type { Metadata } from "next";
import { productListingRepository } from "@/infra/cosmic/product/product-listing.repo";
import {
  BoxSelectIcon,
  Layers3Icon,
  SearchIcon,
  TagIcon,
} from "lucide-react";
import { SearchAutocompleteInput } from "@/components/search/search-autocomplete-input";
import { SearchCategoryList } from "@/components/search/search-category-list";
import { SearchProductList } from "@/components/search/search-product-list";

export async function generateMetadata({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }): Promise<Metadata> {
  const q = searchParams?.q;
  const query = typeof q === "string" ? q.trim() : "";

  if (query) {
    return {
      title: `Search results for "${query}" - Commerce`,
      description: `Find categories and products matching "${query}" on Commerce.`,
    };
  }

  return {
    title: `Search - Commerce`,
    description: `Search categories and products on Commerce.`,
  };
}

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  if (!query) {
    return (
      <main className="bg-background">
        <section className="border-b bg-gradient-to-b from-muted/60 via-background to-background">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Search
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Tìm sản phẩm và danh mục trong một luồng rõ ràng hơn.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Gõ từ khóa để nhận gợi ý tức thì, sau đó mở trang kết quả đầy đủ khi cần so sánh nhiều lựa chọn hơn.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-10">
          <Empty className="border border-dashed bg-muted/20">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchIcon />
              </EmptyMedia>
              <EmptyTitle>Start typing to search</EmptyTitle>
              <EmptyDescription>
                Enter a keyword to explore categories and products.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </section>
      </main>
    );
  }

  const [categoriesResult, productsResult] = await Promise.all([
    categoryRepository.searchCategoriesByKeyword(query, 12),
    productListingRepository.searchProductsByKeyword(query, 12),
  ]);

  const categories = categoriesResult.data;
  const products = productsResult.data;

  const totalResults = (categoriesResult.total ?? 0) + (productsResult.total ?? 0);
  const nothingFound = categories.length === 0 && products.length === 0;

  return (
    <main className="bg-background">
      <section className="border-b bg-gradient-to-b from-muted/60 via-background to-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Search Results
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Kết quả cho &quot;{query}&quot;
              </h1>
            </div>

            <div className="rounded-2xl border bg-background/90 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-muted p-2.5">
                  <Layers3Icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{totalResults}</p>
                  <p className="text-sm text-muted-foreground">Kết quả phù hợp</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10">
        {nothingFound ? (
          <Empty className="border border-dashed bg-muted/20">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchIcon />
              </EmptyMedia>
              <EmptyTitle>No matches found</EmptyTitle>
              <EmptyDescription>
                We couldn&apos;t find any categories or products matching &quot;{query}&quot;. Try a different keyword.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
              <div className="space-y-1 border-b pb-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <BoxSelectIcon className="size-5 text-muted-foreground" />
                  Products
                </div>
                <p className="text-sm text-muted-foreground">
                  {productsResult.total ?? products.length} matching items
                </p>
              </div>

              {products.length === 0 ? (
                <Empty className="border border-dashed bg-muted/20">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <BoxSelectIcon />
                    </EmptyMedia>
                    <EmptyTitle>No products</EmptyTitle>
                    <EmptyDescription>
                      Try another keyword.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <SearchProductList
                  products={products}
                  className="[&_[data-slot=item]]:rounded-2xl [&_[data-slot=item]]:border-border/70 [&_[data-slot=item]]:bg-muted/20"
                />
              )}
            </section>

            <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
              <div className="space-y-1 border-b pb-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <TagIcon className="size-5 text-muted-foreground" />
                  Categories
                </div>
                <p className="text-sm text-muted-foreground">
                  {categoriesResult.total ?? categories.length} related groups
                </p>
              </div>

              {categories.length === 0 ? (
                <Empty className="border border-dashed bg-muted/20">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <TagIcon />
                    </EmptyMedia>
                    <EmptyTitle>No categories</EmptyTitle>
                    <EmptyDescription>
                      Nothing matched this keyword.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <SearchCategoryList
                  categories={categories}
                  className="[&_[data-slot=item]]:rounded-2xl [&_[data-slot=item]]:border-border/70 [&_[data-slot=item]]:bg-muted/20"
                />
              )}
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
