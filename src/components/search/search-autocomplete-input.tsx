"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
import {
  ArrowRightIcon,
  BoxSelectIcon,
  Layers3Icon,
  SearchIcon,
  TagIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Category } from "@/models/catalog/category";
import { ProductListing } from "@/models/catalog/product-listing";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { SearchCategoryList } from "./search-category-list";
import { SearchInput } from "./search-input";
import { SearchProductList } from "./search-product-list";

interface IAutocompleteResult {
  categories: Category[];
  products: ProductListing[];
}

const AUTOCOMPLETE_LIMIT = 4;

export function SearchAutocompleteInput({
  inline = false,
  initialQuery = "",
}: {
  inline?: boolean;
  initialQuery?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasResolvedQuery, setHasResolvedQuery] = useState(false);
  const [results, setResults] = useState<IAutocompleteResult>({
    categories: [],
    products: [],
  });

  const id = useId();
  const listId = `${id}-list`;
  const trimmedQuery = query.trim();
  const hasResults =
    results.categories.length > 0 || results.products.length > 0;
  const totalResults = results.categories.length + results.products.length;
  const limitedProducts = results.products.slice(0, AUTOCOMPLETE_LIMIT);
  const limitedCategories = results.categories.slice(0, AUTOCOMPLETE_LIMIT);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!trimmedQuery) {
      setResults({ categories: [], products: [] });
      setHasResolvedQuery(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/v1/search/autocomplete?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );
        if (!res.ok) return;

        const data = (await res.json()) as IAutocompleteResult;
        setResults(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
        setHasResolvedQuery(true);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [trimmedQuery]);

  const handleSubmit = (value: string) => {
    const q = value.trim();
    if (!q) return;

    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleViewAll = () => {
    if (!trimmedQuery) return;
    handleSubmit(trimmedQuery);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-11 w-full items-center gap-3 rounded-xl border border-input bg-background px-3 text-left text-sm shadow-xs transition-[color,box-shadow] outline-none hover:border-ring/50 hover:bg-background focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          !inline && "bg-background/90 backdrop-blur"
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <span
          className={cn(
            "truncate",
            trimmedQuery ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {trimmedQuery || "Tìm sản phẩm, danh mục..."}
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="top-4 left-1/2 grid h-[min(880px,calc(100vh-2rem))] w-[min(1120px,calc(100%-1rem))] translate-x-[-50%] translate-y-0 gap-0 overflow-hidden rounded-[2rem] border-border/70 p-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">
            Search products and categories
          </DialogTitle>
          <DialogDescription className="sr-only">
            Search across products and categories in a modal layout.
          </DialogDescription>

          <div className="flex h-full flex-col bg-background">
            <section className="border-b bg-gradient-to-b from-muted/60 via-background to-background">
              <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
                  <div className="space-y-3">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
                      Search
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                      {trimmedQuery
                        ? `Kết quả tức thì cho "${trimmedQuery}"`
                        : "Tìm sản phẩm và danh mục trong một luồng rõ ràng hơn."}
                    </h2>
                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                      Gõ từ khóa để xem gợi ý nhanh, rồi mở trang kết quả đầy đủ
                      khi cần so sánh nhiều lựa chọn hơn.
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background/90 p-5 shadow-sm backdrop-blur">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-muted p-2.5">
                        <Layers3Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">
                          {trimmedQuery ? totalResults : 0}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Kết quả gợi ý
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-background/90 p-3 shadow-sm backdrop-blur">
                  <SearchInput
                    value={query}
                    onChangeAction={setQuery}
                    onSubmitAction={handleSubmit}
                    inputId={id}
                    inputProps={{
                      autoFocus: true,
                      className:
                        "h-12 rounded-xl border-0 bg-transparent px-1 text-base shadow-none focus-visible:ring-0",
                      "aria-controls": listId,
                      "aria-expanded": open && trimmedQuery.length > 0,
                      "aria-autocomplete": "list",
                      "aria-haspopup": "listbox",
                    }}
                  />
                </div>
              </div>
            </section>

            <section className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              {!trimmedQuery ? (
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
              ) : loading ? (
                <div
                  id={listId}
                  role="status"
                  aria-live="polite"
                  className="rounded-3xl border border-dashed bg-muted/20 px-6 py-10 text-sm text-muted-foreground"
                >
                  Đang tìm gợi ý...
                </div>
              ) : hasResults ? (
                <div id={listId} className="space-y-6">
                  <div className="flex items-start justify-between gap-3 rounded-2xl border bg-card p-5 shadow-sm">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        Gợi ý nhanh
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Đang hiển thị các kết quả gần nhất cho{" "}
                        <span className="font-medium text-foreground">
                          &quot;{trimmedQuery}&quot;
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleViewAll}
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                    >
                      Xem tất cả
                      <ArrowRightIcon className="size-4" />
                    </button>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-2">
                    <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
                      <div className="space-y-1 border-b pb-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                          <BoxSelectIcon className="size-5 text-muted-foreground" />
                          Products
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {results.products.length} matching items
                        </p>
                      </div>

                      {limitedProducts.length > 0 ? (
                        <SearchProductList
                          products={limitedProducts}
                          className="[&_[data-slot=item]]:rounded-2xl [&_[data-slot=item]]:border-border/70 [&_[data-slot=item]]:bg-muted/20"
                        />
                      ) : (
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
                      )}
                    </section>

                    <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
                      <div className="space-y-1 border-b pb-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                          <TagIcon className="size-5 text-muted-foreground" />
                          Categories
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {results.categories.length} related groups
                        </p>
                      </div>

                      {limitedCategories.length > 0 ? (
                        <SearchCategoryList
                          categories={limitedCategories}
                          className="[&_[data-slot=item]]:rounded-2xl [&_[data-slot=item]]:border-border/70 [&_[data-slot=item]]:bg-muted/20"
                        />
                      ) : (
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
                      )}
                    </section>
                  </div>
                </div>
              ) : hasResolvedQuery ? (
                <Empty className="border border-dashed bg-muted/20">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <SearchIcon />
                    </EmptyMedia>
                    <EmptyTitle>No matches found</EmptyTitle>
                    <EmptyDescription>
                      We couldn&apos;t find any categories or products matching
                      &quot;{trimmedQuery}&quot;.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : null}
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
