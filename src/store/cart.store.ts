import { create } from "zustand";
import { ICartItem } from "@/models/cart-item.model";

interface CartState {
  items: ICartItem[];
  addItem: (item: ICartItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: async (item) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    set({ items: data.cart });
  },

  removeItem: async (productId) => {
    await fetch(`/api/cart/${productId}`, {
      method: 'DELETE',
    });
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },

  clearCart: async () => {
    // In a real app, you might have a backend endpoint to clear the cart
    // For now, we'll just clear the frontend state
    set({ items: [] });
  },

  fetchCart: async () => {
    const response = await fetch('/api/cart');
    const data = await response.json();
    set({ items: data.items });
  },
}));
