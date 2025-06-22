/**
 * HeroSection component for the eCommerce homepage.
 * Displays a prominent hero banner with a call to action.
 */

import HBox from "@/components/atoms/box/HBox";
import VBox from "@/components/atoms/box/VBox";
import { Button } from "@/components/atoms/ui/button";

export function HeroSection() {
	return (
		<section className="w-full py-16 bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-muted/10">
			<VBox className="items-center max-w-3xl mx-auto text-center gap-6 px-4">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
					Discover the Best Deals in Tech
				</h1>
				<p className="text-lg md:text-xl text-muted-foreground">
					Shop the latest electronics, gadgets, and accessories at unbeatable prices.
				</p>
				<HBox className="gap-4 justify-center mt-4">
					<Button size="lg">Shop Now</Button>
					<Button variant="outline" size="lg">
						Learn More
					</Button>
				</HBox>
				<div className="flex flex-wrap gap-4 justify-center mt-8">
					<span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
						Free Shipping
					</span>
					<span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
						24/7 Support
					</span>
					<span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
						Secure Payment
					</span>
					<span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
						Easy Returns
					</span>
				</div>
			</VBox>
		</section>
	);
}
