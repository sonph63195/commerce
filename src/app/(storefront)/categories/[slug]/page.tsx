import {
  AspectRatio,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import { ArrowLeft, BoxSelectIcon, TagIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryDetailPage(props: PageProps<'/categories/[slug]'>) {
  const { slug } = await props.params;
  const category = await categoryRepository.getDetailBySlug(slug);

  if (!category) {
    return notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 space-y-10">
      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_240px] md:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Link
              href="/categories"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition hover:text-foreground"
              aria-label="Back to categories"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Category</p>
              <h1 className="text-3xl font-semibold">{category.title}</h1>
            </div>
          </div>

          {category.description && (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
          )}
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <AspectRatio ratio={1}>
              {category.thumbnailUrl ? (
                <img
                  src={category.thumbnailUrl}
                  alt={category.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted/40 text-muted-foreground">
                  <TagIcon className="h-8 w-8" />
                </div>
              )}
            </AspectRatio>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Subcategories</h2>
          {category.parentId && category.parentSlug && (
            <Link href={`/categories/${category.parentSlug}`} className="text-sm text-muted-foreground hover:text-foreground">
              View parent category
            </Link>
          )}
        </div>

        {category.parentId && category.parentSlug && (
          <Link href={`/categories/${category.parentSlug}`} className="block">
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Parent category</CardTitle>
                <CardDescription>{category.parentTitle ?? "Back to parent"}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}

        {category.subCategories.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.subCategories.map((subCategory) => (
              <li key={subCategory.id}>
                <Link href={`/categories/${subCategory.slug}`} className="group block h-full">
                  <Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                    <CardContent className="flex h-full flex-col gap-4">
                      <div className="overflow-hidden rounded-lg border bg-muted/30">
                        <AspectRatio ratio={4 / 3} className="bg-muted/40">
                          {subCategory.thumbnailUrl ? (
                            <img
                              src={subCategory.thumbnailUrl}
                              alt={subCategory.title}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <TagIcon className="h-7 w-7" />
                            </div>
                          )}
                        </AspectRatio>
                      </div>
                      <div className="flex flex-1 flex-col gap-2">
                        <h3 className="text-lg font-semibold">{subCategory.title ?? ""}</h3>
                        {subCategory.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {subCategory.description}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">Explore</span>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <TagIcon />
              </EmptyMedia>
              <EmptyTitle>No subcategories yet</EmptyTitle>
              <EmptyDescription>This category does not have subcategories.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-sm text-muted-foreground">{category.products.length} items</p>
        </div>

        {category.products.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`} className="group block h-full">
                  <Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                    <CardContent className="flex h-full flex-col gap-4">
                      <div className="overflow-hidden rounded-lg border bg-muted/30">
                        <AspectRatio ratio={4 / 3} className="bg-muted/40">
                          {product.thumbnailUrl ? (
                            <img
                              src={product.thumbnailUrl}
                              alt={product.title}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <BoxSelectIcon className="h-7 w-7" />
                            </div>
                          )}
                        </AspectRatio>
                      </div>
                      <div className="flex flex-1 flex-col gap-2">
                        <h3 className="text-lg font-semibold">{product.title ?? ""}</h3>
                        {product.shortDescription && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.shortDescription}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {product.price?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <BoxSelectIcon />
              </EmptyMedia>
              <EmptyTitle>No products found</EmptyTitle>
              <EmptyDescription>No products were found in this category.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </section>
    </main>
  );
}
