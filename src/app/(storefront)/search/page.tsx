import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import type { Metadata } from "next";
import { productListingRepository } from "@/infra/cosmic/product/product-listing.repo";
import {
  BoxSelectIcon,
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
  const { q, type } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const tabType = typeof type === "string" ? type : "";


  if (!query) {
    return (
      <main className="px-6 py-8">
        <div className="flex justify-end mb-6">
          <SearchAutocompleteInput inline />
        </div>
        <Empty>
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
  const defaultTab = tabType || products.length > 0  ? "products" : "categories";

  return (
    <main className="px-6 py-8 space-y-8">
      <div className="flex justify-end">
        <SearchAutocompleteInput inline initialQuery={query} />
      </div>

      <header className="space-y-1">
        <p className="text-sm text-muted-foreground">Search results for</p>
        <h1 className="text-2xl font-semibold wrap-break-word">&quot;{query}&quot;</h1>
        <p className="text-sm text-muted-foreground">
          {totalResults} {totalResults === 1 ? "item" : "items"} found
        </p>
      </header>

      {nothingFound ? (
        <Empty className="from-muted/50 to-background">
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
        <Tabs defaultValue={defaultTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">
              Products
            </TabsTrigger>
            <TabsTrigger value="categories">
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-3">
            {categories.length === 0 ? (
              <Empty className="from-muted/50 to-background">
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
              <SearchCategoryList categories={categories} />
            )}
          </TabsContent>

          <TabsContent value="products" className="space-y-3">
            {products.length === 0 ? (
              <Empty className="from-muted/50 to-background">
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
              <SearchProductList products={products} />
            )}
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
}
