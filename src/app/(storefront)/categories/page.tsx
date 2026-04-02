import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Separator,
  buttonVariants,
} from "@/components";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import { productListingRepository } from "@/infra/cosmic/product/product-listing.repo";
import { cn } from "@/lib/utils";
import type { ProductListing } from "@/models/catalog/product-listing";
import {
  ArrowRightIcon,
  RefreshCcwIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  SwatchBookIcon,
  TagIcon,
} from "lucide-react";

const PAGE_SIZE = 8;
const PRODUCT_FETCH_LIMIT = 120;
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];
const COLOR_OPTIONS = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "beige", label: "Beige" },
  { value: "brown", label: "Brown" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "gold", label: "Gold" },
];
const PRICE_OPTIONS = [
  { value: "under-500k", label: "Under ₫500.000", min: 0, max: 500_000 },
  { value: "500k-1m", label: "₫500.000 - ₫1.000.000", min: 500_000, max: 1_000_000 },
  { value: "1m-2m", label: "₫1.000.000 - ₫2.000.000", min: 1_000_000, max: 2_000_000 },
  { value: "over-2m", label: "Over ₫2.000.000", min: 2_000_000, max: Number.POSITIVE_INFINITY },
];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function formatPrice(price?: number) {
  if (typeof price !== "number") return "Contact us";

  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

function normalizeParam(value?: string | string[]) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function normalizeListParam(value?: string | string[]) {
  const raw = Array.isArray(value) ? value.join(",") : value ?? "";

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getProductSearchText(product: ProductListing) {
  return [
    product.title,
    product.shortDescription,
    product.category?.title,
    ...Object.values(product.attributes ?? {}),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function inferSizes(product: ProductListing) {
  const sizeValue = [
    product.attributes?.size,
    product.attributes?.sizes,
    product.attributes?.dimension,
  ]
    .filter(Boolean)
    .join(" ")
    .toUpperCase();
  const text = `${sizeValue} ${product.title} ${product.shortDescription ?? ""}`.toUpperCase();

  return SIZE_OPTIONS.filter((size) => new RegExp(`\\b${size}\\b`).test(text));
}

function inferColors(product: ProductListing) {
  const text = getProductSearchText(product);

  return COLOR_OPTIONS.filter((color) => text.includes(color.value)).map((color) => color.value);
}

function matchesPriceRange(product: ProductListing, range: string) {
  const price = product.price;
  const config = PRICE_OPTIONS.find((item) => item.value === range);

  if (!config || typeof price !== "number") return false;

  return price >= config.min && price < config.max;
}

function sortProducts(products: ProductListing[], sort: string) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
      break;
    case "price-desc":
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "newest":
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    default:
      sorted.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
      break;
  }

  return sorted;
}

function buildHref(
  params: Record<string, string | string[] | undefined>,
  updates: Record<string, string | null | undefined>,
) {
  const nextParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) nextParams.append(key, item);
      });
      return;
    }

    if (value) nextParams.set(key, value);
  });

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) {
      nextParams.delete(key);
      return;
    }

    nextParams.set(key, value);
  });

  const query = nextParams.toString();
  return query ? `/categories?${query}` : "/categories";
}

function toggleFilterValue(values: string[], value: string) {
  if (values.includes(value)) {
    return values.filter((item) => item !== value);
  }

  return [...values, value];
}

function createPageSequence(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end", totalPages] as const;
}

export default async function CategoryPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const selectedSizes = normalizeListParam(searchParams.size);
  const selectedColors = normalizeListParam(searchParams.color);
  const selectedPrice = normalizeParam(searchParams.price);
  const sort = normalizeParam(searchParams.sort) || "featured";
  const currentPageParam = Number.parseInt(normalizeParam(searchParams.page) || "1", 10);

  const [{ data: categories, total: categoryTotal }, { data: products }] = await Promise.all([
    categoryRepository.getCategories({ limit: 6, skip: 0 }),
    productListingRepository.list({ limit: PRODUCT_FETCH_LIMIT, skip: 0 }),
  ]);

  if (products.length === 0) {
    return (
      <Empty className="from-muted/50 to-background h-full rounded-3xl border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TagIcon />
          </EmptyMedia>
          <EmptyTitle>There are no products to browse yet</EmptyTitle>
          <EmptyDescription>
            The catalog is currently empty. Refresh once your Cosmic content is available.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            <RefreshCcwIcon />
            Refresh
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  const filteredProducts = sortProducts(
    products.filter((product) => {
      const productSizes = inferSizes(product);
      const productColors = inferColors(product);

      const matchesSize = selectedSizes.length === 0 || selectedSizes.some((size) => productSizes.includes(size));
      const matchesColor = selectedColors.length === 0 || selectedColors.some((color) => productColors.includes(color));
      const matchesPrice = !selectedPrice || matchesPriceRange(product, selectedPrice);

      return matchesSize && matchesColor && matchesPrice;
    }),
    sort,
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Number.isNaN(currentPageParam)
    ? 1
    : Math.min(Math.max(currentPageParam, 1), totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  const pageSequence = createPageSequence(currentPage, totalPages);
  const availableSizes = SIZE_OPTIONS.filter((size) => products.some((product) => inferSizes(product).includes(size)));
  const availableColors = COLOR_OPTIONS.filter((color) =>
    products.some((product) => inferColors(product).includes(color.value)),
  );
  const activeFilterCount = selectedSizes.length + selectedColors.length + (selectedPrice ? 1 : 0);

  return (
    <main className="flex flex-col gap-8">
      <section className="grid gap-4 rounded-3xl border bg-card p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-4">
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em]">
            Minimal Luxury Catalog
          </Badge>
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Product discovery built around clarity, calm spacing, and deliberate browsing.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Browse curated collections, refine by essential attributes, and sort the grid without losing the quiet,
              premium rhythm of the storefront.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="rounded-2xl border-border/70 bg-muted/30 shadow-none">
            <CardHeader className="gap-1">
              <CardDescription>Products</CardDescription>
              <CardTitle className="text-3xl">{products.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border-border/70 bg-muted/30 shadow-none">
            <CardHeader className="gap-1">
              <CardDescription>Collections</CardDescription>
              <CardTitle className="text-3xl">{categoryTotal}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border-border/70 bg-muted/30 shadow-none">
            <CardHeader className="gap-1">
              <CardDescription>Active filters</CardDescription>
              <CardTitle className="text-3xl">{activeFilterCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-muted-foreground" />
            <h3 className="text-lg font-semibold">Featured categories</h3>
          </div>
          <Link href="/search" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Browse all
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group grid min-h-36 grid-cols-[108px_1fr] overflow-hidden rounded-3xl border bg-card transition-transform hover:-translate-y-0.5 hover:border-foreground/20"
            >
              <div className="bg-muted">
                {category.thumbnailUrl ? (
                  <img
                    src={category.thumbnailUrl}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                    <SwatchBookIcon />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between gap-3 p-5">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Collection
                  </p>
                  <h4 className="text-lg font-semibold">{category.title}</h4>
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {category.description || "A carefully selected category with a clear visual identity."}
                  </p>
                </div>
                <span className="text-sm font-medium">Open category</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-24">
          <Card className="rounded-3xl border-border/80 shadow-none">
            <CardHeader className="gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontalIcon className="text-muted-foreground" />
                  <CardTitle className="text-xl">Filter products</CardTitle>
                </div>
                {activeFilterCount > 0 ? (
                  <Badge variant="secondary" className="rounded-full">{activeFilterCount}</Badge>
                ) : null}
              </div>
              <CardDescription>
                Narrow the catalog by size, color, and price while keeping the browsing flow lightweight.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Size</h4>
                  {selectedSizes.length > 0 ? (
                    <Link
                      href={buildHref(searchParams, { size: null, page: null })}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-auto px-0 text-xs")}
                    >
                      Clear
                    </Link>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const nextValues = toggleFilterValue(selectedSizes, size);
                    const href = buildHref(searchParams, {
                      size: nextValues.length > 0 ? nextValues.join(",") : null,
                      page: null,
                    });

                    return (
                      <Link
                        key={size}
                        href={href}
                        className={cn(
                          buttonVariants({
                            variant: selectedSizes.includes(size) ? "default" : "outline",
                            size: "sm",
                          }),
                          "rounded-full px-4",
                        )}
                      >
                        {size}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Color</h4>
                  {selectedColors.length > 0 ? (
                    <Link
                      href={buildHref(searchParams, { color: null, page: null })}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-auto px-0 text-xs")}
                    >
                      Clear
                    </Link>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const nextValues = toggleFilterValue(selectedColors, color.value);
                    const href = buildHref(searchParams, {
                      color: nextValues.length > 0 ? nextValues.join(",") : null,
                      page: null,
                    });

                    return (
                      <Link
                        key={color.value}
                        href={href}
                        className={cn(
                          buttonVariants({
                            variant: selectedColors.includes(color.value) ? "default" : "outline",
                            size: "sm",
                          }),
                          "rounded-full px-4",
                        )}
                      >
                        {color.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Price</h4>
                  {selectedPrice ? (
                    <Link
                      href={buildHref(searchParams, { price: null, page: null })}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-auto px-0 text-xs")}
                    >
                      Clear
                    </Link>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  {PRICE_OPTIONS.map((option) => {
                    const isActive = selectedPrice === option.value;

                    return (
                      <Link
                        key={option.value}
                        href={buildHref(searchParams, {
                          price: isActive ? null : option.value,
                          page: null,
                        })}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors",
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:bg-muted",
                        )}
                      >
                        <span>{option.label}</span>
                        <span className="text-xs uppercase tracking-[0.2em] opacity-70">
                          {isActive ? "On" : "Off"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {activeFilterCount > 0 ? (
                <>
                  <Separator />
                  <Link
                    href="/categories"
                    className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-full")}
                  >
                    Reset all filters
                  </Link>
                </>
              ) : null}
            </CardContent>
          </Card>
        </aside>

        <div className="flex flex-col gap-6">
          <Card className="rounded-3xl border-border/80 shadow-none">
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{visibleProducts.length}</span> of{" "}
                    <span className="font-medium text-foreground">{filteredProducts.length}</span> matching products
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">Product grid</h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Sort by</span>
                  {SORT_OPTIONS.map((option) => (
                    <Link
                      key={option.value}
                      href={buildHref(searchParams, { sort: option.value, page: null })}
                      className={cn(
                        buttonVariants({
                          variant: sort === option.value ? "default" : "outline",
                          size: "sm",
                        }),
                        "rounded-full",
                      )}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSizes.map((size) => (
                    <Link
                      key={size}
                      href={buildHref(searchParams, {
                        size: toggleFilterValue(selectedSizes, size).join(",") || null,
                        page: null,
                      })}
                    >
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        Size {size}
                      </Badge>
                    </Link>
                  ))}
                  {selectedColors.map((color) => (
                    <Link
                      key={color}
                      href={buildHref(searchParams, {
                        color: toggleFilterValue(selectedColors, color).join(",") || null,
                        page: null,
                      })}
                    >
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        Color {COLOR_OPTIONS.find((item) => item.value === color)?.label ?? color}
                      </Badge>
                    </Link>
                  ))}
                  {selectedPrice ? (
                    <Link href={buildHref(searchParams, { price: null, page: null })}>
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {PRICE_OPTIONS.find((item) => item.value === selectedPrice)?.label ?? selectedPrice}
                      </Badge>
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </CardContent>
          </Card>

          {visibleProducts.length === 0 ? (
            <Empty className="rounded-3xl border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SlidersHorizontalIcon />
                </EmptyMedia>
                <EmptyTitle>No products match the current filters</EmptyTitle>
                <EmptyDescription>
                  Remove one or more filters to widen the catalog and restore visible products.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link href="/categories" className={cn(buttonVariants({ variant: "outline" }))}>
                  Reset filters
                </Link>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {visibleProducts.map((product) => {
                const productColors = inferColors(product);
                const discount = typeof product.price === "number" && typeof product.originalPrice === "number"
                  ? Math.max(0, Math.round((1 - product.price / product.originalPrice) * 100))
                  : 0;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group overflow-hidden rounded-[1.75rem] border bg-card transition-transform duration-200 hover:-translate-y-1 hover:border-foreground/20"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      {product.thumbnailUrl ? (
                        <img
                          src={product.thumbnailUrl}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <TagIcon />
                        </div>
                      )}
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {product.category ? (
                          <Badge variant="secondary" className="rounded-full bg-background/85 backdrop-blur">
                            {product.category.title}
                          </Badge>
                        ) : null}
                        {discount > 0 ? (
                          <Badge className="rounded-full">{discount}% off</Badge>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 p-5">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-semibold leading-tight">{product.title}</h4>
                        <p className="line-clamp-2 min-h-11 text-sm leading-6 text-muted-foreground">
                          {product.shortDescription || "Minimal detailing with a premium silhouette and balanced proportions."}
                        </p>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
                          {typeof product.originalPrice === "number" && product.originalPrice > (product.price ?? 0) ? (
                            <p className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          ) : null}
                        </div>

                        {productColors.length > 0 ? (
                          <div className="flex flex-wrap justify-end gap-1">
                            {productColors.slice(0, 2).map((color) => (
                              <Badge key={color} variant="outline" className="rounded-full">
                                {COLOR_OPTIONS.find((item) => item.value === color)?.label ?? color}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {totalPages > 1 ? (
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={buildHref(searchParams, {
                      page: currentPage > 1 ? String(currentPage - 1) : null,
                    })}
                    aria-disabled={currentPage <= 1}
                    className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>

                {pageSequence.map((item) => {
                  if (item === "ellipsis" || item === "ellipsis-end") {
                    return (
                      <PaginationItem key={item}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href={buildHref(searchParams, { page: String(item) })}
                        isActive={currentPage === item}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href={buildHref(searchParams, {
                      page: currentPage < totalPages ? String(currentPage + 1) : String(totalPages),
                    })}
                    aria-disabled={currentPage >= totalPages}
                    className={cn(currentPage >= totalPages && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : null}
        </div>
      </section>
    </main>
  );
}
