import Link from "next/link";

type Props = {
  slug: string;
  title: string;
};

export function CategoryPill({ slug, title }: Props) {
  return (
    <Link href={`/categories/${slug}`} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-muted/40 text-muted-foreground hover:bg-muted">
      {title}
    </Link>
  );
}
