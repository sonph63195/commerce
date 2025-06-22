import { createStore } from "zustand/vanilla";
import type { TProduct } from "@/models/product.model";

export interface ICartItem extends TProduct {
	quantity: number;
}

export interface IUserCartState {
	items: ICartItem[];
	addToCart: (product: TProduct) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
}

export const defaultCartState: IUserCartState = {
	items: [],
	addToCart: () => {},
	removeFromCart: () => {},
	updateQuantity: () => {},
	clearCart: () => {},
};

export const createUserCartStore = (initState: IUserCartState = defaultCartState) => {
	return createStore<IUserCartState>()((set, get) => ({
		...initState,
		addToCart: (product) => {
			set((state) => {
				const existing = state.items.find((item) => item.id === product.id);
				if (existing) {
					return {
						items: state.items.map((item) =>
							item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
						),
					};
				}
				return {
					items: [...state.items, { ...product, quantity: 1 }],
				};
			});
		},
		removeFromCart: (productId) => {
			set((state) => ({ items: state.items.filter((item) => item.id !== productId) }));
		},
		updateQuantity: (productId, quantity) => {
			set((state) => ({
				items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
			}));
		},
		clearCart: () => set({ items: [] }),
	}));
};
