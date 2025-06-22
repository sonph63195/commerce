/**
 * Homepage organism for the eCommerce app.
 * Composes the hero and featured products sections.
 */
import { HeroSection } from "./HeroSection";
import { FeaturedProducts } from "./FeaturedProducts";
import VBox from "@/components/atoms/box/VBox";

export function HomePage() {
	return (
		<VBox>
			<HeroSection />
			<FeaturedProducts />
		</VBox>
	);
}
