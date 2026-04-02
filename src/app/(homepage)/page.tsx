import { Footer, Navbar } from "@/components/layouts";
import { productListingRepository } from "@/infra/cosmic/product/product-listing.repo";
import { HomePageContent } from "./home-page-content";

export default async function HomePage() {
  const { data: featuredProducts } = await productListingRepository.list({
    limit: 4,
    skip: 0,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HomePageContent featuredProducts={featuredProducts} />
      <Footer />
    </div>
  );
}
