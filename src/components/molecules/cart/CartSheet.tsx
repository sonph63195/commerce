"use client";

import { useState } from "react";
import { useUserCartStore } from "@/components/provider/user-cart-context";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { CartList } from "@/components/molecules/cart/CartList";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../sheet";
import { Button } from "@/components/atoms/ui/button";
import HBox from "@/components/atoms/box/HBox";

export function CartSheet() {
	const [open, setOpen] = useState(false);
	const items = useUserCartStore((state) => state.items);
	const removeFromCart = useUserCartStore((state) => state.removeFromCart);
	const clearCart = useUserCartStore((state) => state.clearCart);
	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<Button variant="ghost" onClick={() => setOpen(true)}>
				<ShoppingCart />
				<span className="sr-only md:not-sr-only ml-2">My shopping list</span>
				{items.length > 0 && (
					<span className="ml-2 inline-block rounded-full bg-primary text-primary-foreground px-2 text-xs font-bold">
						{items.length}
					</span>
				)}
			</Button>
			<SheetContent side="right" className="w-full max-w-md flex flex-col pb-2 gap-4">
				<SheetHeader>
					<SheetTitle>My Shopping List</SheetTitle>
					<SheetDescription>Products you have added to your cart.</SheetDescription>
				</SheetHeader>
				<div className="flex-1 flex flex-col gap-4 overflow-auto">
					{items.length === 0 ? (
						<p className="text-center text-muted-foreground">Your cart is empty.</p>
					) : (
						<div className="px-4">
							<CartList items={items} onRemove={removeFromCart} />
						</div>
					)}
				</div>
				{items.length > 0 && (
					<div className="flex flex-col gap-2 px-4">
						<div className="flex justify-between font-semibold">
							<span>Total</span>
							<span>{formatCurrency(total, items[0]?.currency || "USD")}</span>
						</div>
						<HBox className="gap-2 mt-2">
							<Button className="flex-1" variant="ghost" onClick={clearCart}>
								Clear Cart
							</Button>
							<Button className="flex-1" disabled>
								Checkout (Coming soon)
							</Button>
						</HBox>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
