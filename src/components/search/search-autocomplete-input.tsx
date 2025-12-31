"use client";
// TODO: Change the UI to an autocomplete dropdown instead of a dialog.
// The dialog logic will be handled in the SearchDialog component.
// The dropdown should be shown only when the user selects an item.
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
import React, { useEffect, useState, useId } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { BoxSelectIcon, TagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";
import { SearchCategoryList } from "./search-category-list";
import { SearchProductList } from "./search-product-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface IAutocompleteResult {
  categories: Category[];
  products: ProductListing[];
}

export function SearchAutocompleteInput({
  inline = false,
  initialQuery = "",
}: {
  inline?: boolean;
  initialQuery?: string;
}) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IAutocompleteResult>({
    categories: [],
    products: [],
  });

  const id = useId();
  const listId = `${id}-list`;

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

  const content = (
    <div className="flex flex-col gap-4">
      <SearchInput
        value={query}
        onChangeAction={setQuery}
        onSubmitAction={handleSubmit}
        onFocusAction={() => {
          if (
            query.trim() &&
            (results.categories.length > 0 || results.products.length > 0)
          ) {
            setOpen(true);
          }
        }}
        inputId={id}
        inputProps={{
          "aria-controls": listId,
          "aria-expanded": open,
          "aria-autocomplete": "list",
          "aria-haspopup": "listbox",
        }}
      />

      {loading && <div role="status" aria-live="polite">Loading...</div>}

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
        <div id={listId} role="listbox" aria-label="Search suggestions">
          <div role="group" aria-hidden="true">
            <Tabs defaultValue="products">
              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
            <TabsContent value="products">
              <div role="group" aria-label="Products">
                <SearchProductList
                  products={results.products}
                  getHref={(product) => `/products/${product.slug}`}
                />
                {results.products.length === 0 && (
                  <Empty className="from-muted/50 to-background">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <BoxSelectIcon />
                      </EmptyMedia>
                      <EmptyTitle>No products</EmptyTitle>
                      <EmptyDescription>Try another keyword.</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </div>
            </TabsContent>
            <TabsContent value="categories">
              <div role="group" aria-label="Categories">
                <SearchCategoryList
                  categories={results.categories}
                  getHref={(category) => `/categories/${category.slug}`}
                />
                {results.categories.length === 0 && (
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
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        </div>
      )}
    </div>
  );

  if (inline) {
    return <div className="w-full">{content}</div>;
  }

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

            {content}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
