import { Suspense } from "react";
import { SearchResults } from "@/components/organisms/search/SearchResults";
import VBox from "@/components/atoms/box/VBox";
import { PageSection } from "@/components/atoms/ui/page-section";
import { CartSheet } from "@/components/molecules/cart/CartSheet";
import { SearchBar } from "@/components/molecules/SearchBar";

export default function SearchPage() {
	return (
		<PageSection
			title="Search"
			description="Find products by name, category, or keyword."
			trailing={<CartSheet />}
		>
			{/* Main search section */}
			<section className="w-full py-12">
				<VBox className="mx-auto gap-8 px-4">
					<SearchBar className="!text-3xl px-4 py-5" />
					<h1 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Search Results</h1>
					<Suspense fallback={<p className="text-center text-muted-foreground">Loading...</p>}>
						<SearchResults />
					</Suspense>
				</VBox>
			</section>
			{/* End search section */}
		</PageSection>
	);
}
