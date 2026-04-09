import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Separator,
} from "@/components";
import type { Category } from "@/models/catalog/category";
import { ArrowUpRightIcon, FolderTreeIcon, ShapesIcon } from "lucide-react";
import Link from "next/link";

interface CategorySubcategoriesSectionProps {
  subCategories: Category[];
}

export function CategorySubcategoriesSection({ subCategories }: CategorySubcategoriesSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">Subcategories</p>
          <h2 className="text-2xl font-semibold tracking-tight">Browse deeper collections</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Structured entry points for shoppers who want a more focused slice of the catalog.
        </p>
      </div>

      <Separator />

      {subCategories.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subCategories.map((subCategory) => (
            <Link key={subCategory.id} href={`/categories/${subCategory.slug}`} className="group">
              <Card className="h-full rounded-[1.5rem] shadow-none transition-all group-hover:-translate-y-1 group-hover:border-foreground/25">
                <CardHeader className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border bg-muted">
                    {subCategory.thumbnailUrl ? (
                      <img
                        src={subCategory.thumbnailUrl}
                        alt={subCategory.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center text-muted-foreground">
                        <ShapesIcon />
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <CardTitle className="text-xl">{subCategory.title}</CardTitle>
                      <CardDescription className="line-clamp-3 text-sm leading-6">
                        {subCategory.description || "Open this subcategory to see a narrower selection and its related products."}
                      </CardDescription>
                    </div>
                    <ArrowUpRightIcon className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Empty className="rounded-[1.5rem] border border-dashed">
          <EmptyHeader>
            <EmptyMedia>
              <FolderTreeIcon />
            </EmptyMedia>
            <EmptyTitle>No subcategories yet</EmptyTitle>
            <EmptyDescription>
              This category is currently a leaf node, so shoppers can continue directly to the product list below.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}
