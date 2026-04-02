import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import { ArrowRight, RefreshCcwIcon, TagIcon } from "lucide-react";
import Link from "next/link";

export default async function CategoryPage() {
  const { data: categories, total } = await categoryRepository.getCategories({ limit: 10, skip: 0 });

  if (categories.length === 0) return (
    <Empty className="from-muted/50 to-background h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TagIcon />
        </EmptyMedia>
        <EmptyTitle>There is no category</EmptyTitle>
        <EmptyDescription>
          It looks like there are no categories yet.
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

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Browse</p>
        <h1 className="text-3xl font-semibold">Categories</h1>
        <p className="text-sm text-muted-foreground">Discover collections curated for your storefront. ({total} total)</p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <li key={category.id} className="h-full">
            <Link
              className="group block h-full"
              href={{ pathname: `/categories/${category.slug}` }}
            >
              <Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-lg border bg-muted/30">
                    <AspectRatio ratio={4 / 3} className="bg-muted/40">
                      {category.thumbnailUrl ? (
                        <img
                          src={category.thumbnailUrl}
                          alt={category.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <TagIcon className="h-8 w-8" />
                        </div>
                      )}
                    </AspectRatio>
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="text-lg font-semibold text-foreground">{category.title}</div>
                    {category.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                    <span>View category</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
