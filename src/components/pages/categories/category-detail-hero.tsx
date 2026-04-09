import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  buttonVariants,
} from "@/components";
import type { CategoryDetail } from "@/models/catalog/category";
import {
  ArrowLeft,
  ArrowUpRightIcon,
  FolderTreeIcon,
  Package2Icon,
  ShapesIcon,
} from "lucide-react";
import Link from "next/link";

interface CategoryDetailHeroProps {
  category: CategoryDetail;
}

export function CategoryDetailHero({ category }: CategoryDetailHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border bg-gradient-to-br from-muted/70 via-background to-muted/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_32%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.3),transparent_18%)]" />

      <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/categories" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <ArrowLeft data-icon="inline-start" />
              All categories
            </Link>
            <Badge variant="outline" className="rounded-full">
              Category detail
            </Badge>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start gap-4">
              <div className="overflow-hidden rounded-2xl border bg-background/80">
                {category.thumbnailUrl ? (
                  <img
                    src={category.thumbnailUrl}
                    alt={category.title}
                    className="size-24 object-cover sm:size-28"
                  />
                ) : (
                  <div className="flex size-24 items-center justify-center bg-muted text-muted-foreground sm:size-28">
                    <ShapesIcon />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {category.products.length} products
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    {category.subCategories.length} subcategories
                  </Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                    {category.title}
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {category.description || "Curated products and related collections organized under this category."}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="rounded-2xl bg-background/80 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <FolderTreeIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Parent</p>
                    <p className="text-sm font-medium">{category.parentTitle ?? "Top-level category"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-background/80 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <ShapesIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Collections</p>
                    <p className="text-sm font-medium">{category.subCategories.length} related groups</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-background/80 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Package2Icon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Inventory</p>
                    <p className="text-sm font-medium">{category.products.length} available items</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="rounded-[1.75rem] border-border/70 bg-background/85 shadow-none">
          <CardHeader className="flex flex-col gap-3">
            <Badge variant="outline" className="w-fit rounded-full">
              Navigation
            </Badge>
            <CardTitle className="text-2xl">Explore this branch of the catalog</CardTitle>
            <CardDescription className="text-sm leading-6">
              Move between parent structure, related collections, and products without losing context.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {category.parentId && category.parentSlug && (
              <Link href={`/categories/${category.parentSlug}`}>
                <Card className="rounded-2xl border-dashed shadow-none transition-colors hover:bg-muted/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="overflow-hidden rounded-xl border bg-muted">
                      {category.parentThumbnail ? (
                        <img
                          src={category.parentThumbnail}
                          alt={category.parentTitle ?? "Parent category"}
                          className="size-16 object-cover"
                        />
                      ) : (
                        <div className="flex size-16 items-center justify-center text-muted-foreground">
                          <FolderTreeIcon />
                        </div>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Parent category</p>
                      <p className="truncate font-medium">{category.parentTitle}</p>
                    </div>
                    <ArrowUpRightIcon className="text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            )}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Card className="rounded-2xl shadow-none">
                <CardContent className="flex flex-col gap-2 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Subcategories</p>
                  <p className="text-2xl font-semibold">{category.subCategories.length}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Refined groups that help customers browse narrower product themes faster.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-none">
                <CardContent className="flex flex-col gap-2 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Products</p>
                  <p className="text-2xl font-semibold">{category.products.length}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Items currently surfaced in this category and ready to be explored in detail.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
