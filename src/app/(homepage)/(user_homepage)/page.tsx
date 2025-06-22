import { PageSection } from "@/components/atoms/ui/page-section";
import { CartSheet } from "@/components/molecules/cart/CartSheet";
import { HomePage } from "@/components/organisms/home/HomePage";

export default function Home() {
	return (
		<PageSection trailing={<CartSheet />}>
			<HomePage />
		</PageSection>
	);
}
