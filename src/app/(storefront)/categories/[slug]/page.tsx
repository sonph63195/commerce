import { buttonVariants, Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components";
import { categoryRepository } from "@/infra/cosmic/category/category.repo";
import { ArrowLeft, BoxSelectIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryDetailPage(props: PageProps<'/categories/[slug]'>) {
  const { slug } = await props.params;
  const category = await categoryRepository.getDetailBySlug(slug);

  if (!category) {
    return notFound();
  }

  return (
    <main className="px-6 py-8">
      <section>
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Link href="/categories" className={buttonVariants({ variant: 'ghost' })}>
            <ArrowLeft />
          </Link>
          <span>{category.title}</span>
        </h1>

        <div className="aspect-square w-40 rounded-md border mb-4">
          {category.thumbnailUrl && (
            <img
              src={category.thumbnailUrl}
              alt={category.title}
              className="w-full h-full rounded-md object-cover"
            />
          )}
        </div>


        {category.description && (
          <p className="max-w-2xl text-gray-700 leading-relaxed">
            {category.description}
          </p>
        )}
      </section>
      <section className="mt-6 flex flex-col gap-4">
        {category.parentId && (
          <Link href={`/categories/${category.parentSlug}`}>
            <div className="aspect-square w-20 rounded-md border mb-2">
              {category.parentThumbnail && (
                <img
                  src={category.parentThumbnail}
                  alt={category.parentTitle}
                  className="w-full h-full rounded-md object-cover"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>{category.parentTitle ?? ''}</span>
            </h2>
          </Link>
        )}

        {category.subCategories.map((subCategory) => (
          <Link key={subCategory.id} href={`/categories/${subCategory.slug}`}>
            <div className="aspect-square w-20 rounded-md border mb-2">
              {subCategory.thumbnailUrl && (
                <img
                  src={subCategory.thumbnailUrl}
                  alt={subCategory.title}
                  className="w-full h-full rounded-md object-cover"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>{subCategory.title ?? ''}</span>
            </h2>
            {subCategory.description && (
              <p className="text-gray-700 leading-relaxed line-clamp-2">
                {subCategory.description}
              </p>
            )}
          </Link>
        ))}

      </section>

      <section className="mt-6 flex flex-col gap-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span>Products</span>
        </h3>

        {category.products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <div className="aspect-square w-20 rounded-md border mb-1">
              {product.thumbnailUrl && (
                <img
                  src={product.thumbnailUrl}
                  alt={product.title}
                  className="w-full h-full rounded-md object-cover"
                />
              )}
            </div>
            <h3 className="text-md font-semibold mb-1 flex items-center gap-2">
              <span>{product.title ?? ''}</span>
            </h3>
            <p className="leading-relaxed">
                {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </p>
            {product.shortDescription && (
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                {product.shortDescription}
              </p>
            )}
          </Link>
        ))}

        {category.products.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <BoxSelectIcon />
              </EmptyMedia>
              <EmptyTitle>No products found</EmptyTitle>
              <EmptyDescription>
                No products were found in this category.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

      </section>
    </main>
  );
}
