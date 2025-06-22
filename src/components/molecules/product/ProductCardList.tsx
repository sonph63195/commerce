import { ProductCardItem } from "./ProductCardItem";
import type { TProduct } from "@/models/product.model";

interface IProductCardListProps {
	products: TProduct[];
}

export function ProductCardList({ products }: IProductCardListProps) {
	if (!products.length) return null;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
			{products.map((product) => (
				<ProductCardItem key={product.id} product={product} />
			))}
		</div>
	);
}
