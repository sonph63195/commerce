import {
  Button,
  Card,
  CardContent,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Separator,
} from "@/components";
import type { ProductListing } from "@/models/catalog/product-listing";
import { ArrowUpRightIcon, BoxSelectIcon, Package2Icon } from "lucide-react";
import Link from "next/link";
import { formatCategoryProductPrice } from "./category-price";

interface CategoryProductsSectionProps {
  products: ProductListing[];
}

export function CategoryProductsSection({ products }: CategoryProductsSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">Products</p>
          <h2 className="text-2xl font-semibold tracking-tight">Available in this category</h2>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/search">Explore all products</Link>
        </Button>
      </div>

      <Separator />

      {products.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group">
              <Card className="h-full rounded-[1.5rem] shadow-none transition-all group-hover:-translate-y-1 group-hover:border-foreground/25">
                <div className="overflow-hidden rounded-t-[1.5rem] border-b bg-muted">
                  {product.thumbnailUrl ? (
                    <img
                      src={product.thumbnailUrl}
                      alt={product.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center text-muted-foreground">
                      <Package2Icon />
                    </div>
                  )}
                </div>

                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-tight">{product.title}</h3>
                      <ArrowUpRightIcon className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="text-base font-medium">{formatCategoryProductPrice(product.price)}</p>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {product.shortDescription || "Open the product detail page to review visuals, pricing, and category context."}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Empty className="rounded-[1.5rem] border border-dashed">
          <EmptyHeader>
            <EmptyMedia>
              <BoxSelectIcon />
            </EmptyMedia>
            <EmptyTitle>No products found</EmptyTitle>
            <EmptyDescription>
              No products are assigned to this category yet. Populate Cosmic content or move shoppers to adjacent categories.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}
