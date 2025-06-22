import { formatCurrency } from "@/lib/utils";
import type { TProduct } from "@/models/product.model";
import { useUserCartStore } from "@/components/provider/user-cart-context";
import { Button } from "@/components/atoms/ui/button";
import VBox from "@/components/atoms/box/VBox";

interface IProductCardItemProps {
	product: TProduct;
}

export function ProductCardItem({ product }: IProductCardItemProps) {
	const addToCart = useUserCartStore((state) => state.addToCart);

	return (
		<VBox className="bg-card rounded-lg shadow p-6 items-center gap-4">
			<img
				src={product.thumbnail}
				alt={product.title}
				className="w-20 h-20 object-contain mb-2 rounded"
			/>
			<h3 className="text-lg font-medium text-foreground">{product.title}</h3>
			<p className="text-primary font-bold text-xl">
				{formatCurrency(product.price, product.currency)}
			</p>
			<span className="text-xs text-muted-foreground">{product.category}</span>
			<Button size="sm" className="mt-2 w-full" onClick={() => addToCart(product)}>
				Add to Cart
			</Button>
		</VBox>
	);
}
