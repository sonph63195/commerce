import { notFound } from "next/navigation";
import { productDetailRepository } from "@/infra/cosmic/product/product-detail.repo";
import { productListingRepository } from "@/infra/cosmic/product/product-listing.repo";
import { SearchProductList } from "@/components/search/search-product-list";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import ProductBreadcrumb from "@/components/product/breadcrumb";
import { CategoryPill } from "@/components/product/category-pill";
import type { Metadata } from "next";

async function getProductForMetadata(slug: string) {
  try {
    const product = await productDetailRepository.getBySlug(slug);
    return product;
  } catch {
    return null;
  }
}

function stripHtml(html?: string) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductForMetadata(slug);

  if (!product) {
    return {
      title: `Product - Commerce`,
      description: 'Product details on Commerce',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const url = baseUrl ? `${baseUrl}/products/${product.slug}` : `/products/${product.slug}`;
  const description = (product.description ? stripHtml(product.description).slice(0, 160) : undefined) ?? undefined;
  const image = (product.images && product.images.length > 0) ? product.images[0] : product.thumbnailUrl;

  const metadata: Metadata = {
    title: `${product.title} — Commerce`,
    description: description,
    openGraph: {
      title: `${product.title} — Commerce`,
      description: description,
      url: url,
      images: image ? [{ url: image, alt: product.title }] : undefined,
      type: 'website',
      siteName: 'Commerce',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: description,
      images: image ? [image] : undefined,
    },
  };

  return metadata;
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await productDetailRepository.getBySlug(slug);

  if (!product) return notFound();

  const relatedResult = product.category
    ? await productListingRepository.getProductListingsByCategoryId(product.category.id, { limit: 8 })
    : { data: [] };

  const related = relatedResult.data ?? [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const canonical = baseUrl ? `${baseUrl}/products/${product.slug}` : undefined;
  const ld = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images && product.images.length > 0 ? product.images : (product.thumbnailUrl ? [product.thumbnailUrl] : []),
    description: stripHtml(product.description),
    sku: product.id,
    url: canonical ?? `/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      price: product.price?.toString() ?? '',
      availability: "https://schema.org/InStock",
      url: canonical ?? `/products/${product.slug}`,
    }
  } as const;

  return (
    <div className="container max-w-6xl mx-auto py-8">
      {canonical && <link rel="canonical" href={canonical} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Breadcrumb */}
          <ProductBreadcrumb category={product.category ?? null} productTitle={product.title} />

          {/* Product gallery component */}
          <ProductGallery images={product.images ?? (product.thumbnailUrl ? [product.thumbnailUrl] : [])} />

          {product.description && (
            <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
        </div>

        <aside className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>

          {product.price ? (
            <p className="text-xl font-bold">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          ) : null}

          <div className="space-y-2">
            <AddToCartButton product={product} />
          </div>

          {product.category && (
            <p className="text-sm text-muted-foreground">
              Category: <span className="font-medium"><CategoryPill slug={product.category.slug} title={product.category.title} /></span>
            </p>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Related products</h2>
          <SearchProductList products={related} getHref={(p) => `/products/${p.slug}`} />
        </section>
      )}
    </div>
  )
}
