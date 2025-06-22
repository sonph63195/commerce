import { Button } from "@/components/atoms/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { ICartItem } from "@/store/user-cart-store";

interface ICartItemProps {
	item: ICartItem;
	onRemove: (id: number) => void;
}

export function CartItem({ item, onRemove }: ICartItemProps) {
	return (
		<li className="flex items-center gap-4 py-3">
			<img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain rounded" />
			<div className="flex-1">
				<div className="font-medium text-foreground">{item.title}</div>
				<div className="text-xs text-muted-foreground">{item.category}</div>
				<div className="text-sm font-bold mt-1">
					{formatCurrency(item.price, item.currency)} x {item.quantity}
				</div>
			</div>
			<Button size="icon" variant="ghost" onClick={() => onRemove(item.id)} aria-label="Remove">
				&times;
			</Button>
		</li>
	);
}
