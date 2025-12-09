import { Button, buttonVariants, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import { cn } from "@/lib/utils";
import { RefreshCcwIcon, TagIcon } from "lucide-react";
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
    <main className="px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Categories ({total})</h1>


      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <li key={category.id} className="border rounded-lg p-4">
            <div className="mb-2 aspect-4/3 w-full rounded-md border">
              {category.thumbnailUrl && (
                <img
                  src={category.thumbnailUrl}
                  alt={category.title}
                  className="rounded-md object-cover"
                />
              )}
            </div>
            <div className="font-medium">{category.title}</div>
            {category.description && (
              <p className="text-sm text-gray-500 line-clamp-2">
                {category.description}
              </p>
            )}
            <div className="mt-4 flex justify-end">
              <Link className={cn(buttonVariants({}))} href={{ pathname: `/categories/${category.slug}` }}>See detail</Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
