import Link from "next/link";

type Props = {
  category?: { slug: string; title: string } | null;
  productTitle?: string;
};

export default function ProductBreadcrumb({ category, productTitle }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-3">
      <ol className="inline-flex items-center gap-2">
        <li>
          <Link href="/" className="text-muted-foreground">Home</Link>
        </li>
        <li className="text-muted-foreground">/</li>
        <li>
          <Link href="/categories" className="text-muted-foreground">Categories</Link>
        </li>
        {category && (
          <>
            <li className="text-muted-foreground">/</li>
            <li>
              <Link href={`/categories/${category.slug}`} className="font-medium">{category.title}</Link>
            </li>
          </>
        )}
        {productTitle && (
          <>
            <li className="text-muted-foreground">/</li>
            <li className="font-medium">{productTitle}</li>
          </>
        )}
      </ol>
    </nav>
  );
}
