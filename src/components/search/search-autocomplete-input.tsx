"use client";

import { Category } from "@/models/catalog/category";
import { ProductListing } from "@/models/catalog/product-listing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { BoxSelectIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";
import { SearchCategoryList } from "./search-category-list";
import { SearchProductList } from "./search-product-list";

interface IAutocompleteResult {
  categories: Category[];
  products: ProductListing[];
}

export function SearchAutocompleteInput() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IAutocompleteResult>({
    categories: [],
    products: [],
  });

  useEffect(() => {
    if (!query.trim()) {
      setResults({ categories: [], products: [] });
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/v1/search/autocomplete?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );
        if (!res.ok) return;

        const data = (await res.json()) as IAutocompleteResult;
        setResults(data);
        setOpen(data.categories.length > 0 || data.products.length > 0);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }, 300); // debounce 300ms

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  const handleSubmit = (value: string) => {
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Search here</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What are you looking for?</DialogTitle>
            <DialogDescription></DialogDescription>

            <div className="flex flex-col gap-4">
              <SearchInput
                value={query}
                onChange={setQuery}
                onSubmit={handleSubmit}
                onFocus={() => {
                  if (
                    query.trim() &&
                    (results.categories.length > 0 || results.products.length > 0)
                  ) {
                    setOpen(true);
                  }
                }}
              />

              {loading && <div>Loading...</div>}

              {!loading &&
                results.categories.length === 0 &&
                results.products.length === 0 && (
                  <>
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia>
                          <BoxSelectIcon />
                        </EmptyMedia>
                        {/* <EmptyTitle>No result found</EmptyTitle> */}
                        <EmptyDescription>No suggestion</EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </>
                )}

              {open && (
                <>
                  {results.categories.length > 0 && (
                    <div className="space-y-2">
                      <h3>Categories</h3>
                      <SearchCategoryList
                        categories={results.categories}
                        getHref={(category) => `/categories/${category.slug}`}
                      />
                    </div>
                  )}

                  {results.products.length > 0 && (
                    <div className="space-y-2">
                      <h3>Products</h3>
                      <SearchProductList
                        products={results.products}
                        getHref={(product) => `/products/${product.slug}`}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
