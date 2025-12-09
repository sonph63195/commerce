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
import { Input } from "../ui/input";
import { Fragment, useEffect, useState } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { BoxSelectIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
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
              <form onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="searchInput">
                  Search
                </label>
                <Input
                  id="searchInput"
                  type="search"
                  placeholder="Tìm sản phẩm, danh mục..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => {
                    if (
                      query.trim() &&
                      (results.categories.length > 0 ||
                        results.products.length > 0)
                    ) {
                      setOpen(true);
                    }
                  }}
                />
              </form>

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
                    <ItemGroup>
                      <h3>Categories</h3>
                      {results.categories.map((category) => (
                        <Fragment key={category.id}>
                          <Item asChild>
                            <Link href="#">
                              <ItemMedia variant="image">
                                <img
                                  src={`${category.thumbnailUrl}`}
                                  alt={category.title}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle className="line-clamp-1">
                                  {category.title}
                                </ItemTitle>
                                <ItemDescription className="line-clamp-2">
                                  {category.description}
                                </ItemDescription>
                              </ItemContent>

                              <ItemActions>
                                <ChevronRightIcon className="size-4" />
                              </ItemActions>
                            </Link>
                          </Item>
                        </Fragment>
                      ))}
                    </ItemGroup>
                  )}

                  {results.products.length > 0 && (
                    <ItemGroup>
                      <h3>Products</h3>
                      {results.products.map((product) => (
                        <Fragment key={product.id}>
                          <Item asChild>
                            <Link href="#">
                              <ItemMedia variant="image">
                                <img
                                  src={`${product.thumbnailUrl}`}
                                  alt={product.title}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle className="line-clamp-1">
                                  {product.title}
                                </ItemTitle>
                                <ItemDescription className="line-clamp-2">
                                  {product.shortDescription}
                                </ItemDescription>
                              </ItemContent>

                              <ItemActions>
                                <ChevronRightIcon className="size-4" />
                              </ItemActions>
                            </Link>
                          </Item>
                        </Fragment>
                      ))}
                    </ItemGroup>
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
