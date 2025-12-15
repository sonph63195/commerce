import Link from "next/link";

import { ProductListing } from "@/models/catalog/product-listing";
import { cn } from "@/lib/utils";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ChevronRightIcon } from "lucide-react";

type SearchProductListProps = {
  products: ProductListing[];
  className?: string;
  getHref?: (product: ProductListing) => string;
};

function formatPrice(price?: number) {
  return price?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export function SearchProductList({
  products,
  className,
  getHref = (product) => `/products/${product.slug}`,
}: SearchProductListProps) {
  if (products.length === 0) return null;

  return (
    <ItemGroup className={cn("space-y-2", className)}>
      {products.map((product) => (
        <Item key={product.id} asChild variant="outline">
          <Link href={getHref(product)}>
            <ItemMedia variant="image">
              {product.thumbnailUrl ? (
                <img
                  src={product.thumbnailUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full rounded-sm bg-muted" />
              )}
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="line-clamp-1">{product.title}</ItemTitle>
              {product.shortDescription ? (
                <ItemDescription className="line-clamp-2">
                  {product.shortDescription}
                </ItemDescription>
              ) : null}
              {formatPrice(product.price) ? (
                <p className="text-sm font-medium">{formatPrice(product.price)}</p>
              ) : null}
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      ))}
    </ItemGroup>
  );
}
