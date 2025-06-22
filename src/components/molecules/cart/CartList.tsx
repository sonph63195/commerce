import type { ICartItem } from "@/store/user-cart-store";
import { CartItem } from "./CartItem";

interface ICartListProps {
	items: ICartItem[];
	onRemove: (id: number) => void;
}

export function CartList({ items, onRemove }: ICartListProps) {
	if (!items.length)
		return <p className="text-center text-muted-foreground">Your cart is empty.</p>;
	return (
		<ul className="divide-y divide-border">
			{items.map((item) => (
				<CartItem key={item.id} item={item} onRemove={onRemove} />
			))}
		</ul>
	);
}
