import Link from "next/link";

import { Category } from "@/models/catalog/category";
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

type SearchCategoryListProps = {
  categories: Category[];
  className?: string;
  getHref?: (category: Category) => string;
};

export function SearchCategoryList({
  categories,
  className,
  getHref = (category) => `/categories/${category.slug}`,
}: SearchCategoryListProps) {
  if (categories.length === 0) return null;

  return (
    <ItemGroup className={cn("space-y-2", className)}>
      {categories.map((category) => (
        <Item key={category.id} asChild variant="outline">
          <Link href={getHref(category)}>
            <ItemMedia variant="image">
              {category.thumbnailUrl ? (
                <img
                  src={category.thumbnailUrl}
                  alt={category.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full rounded-sm bg-muted" />
              )}
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="line-clamp-1">{category.title}</ItemTitle>
              {category.description ? (
                <ItemDescription className="line-clamp-2">
                  {category.description}
                </ItemDescription>
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
