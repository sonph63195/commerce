import { create } from "zustand";

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  price?: number;
  thumbnailUrl?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  getTotal: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  open: false,
  setOpen(open) {
    set({ open });
  },
  addItem(item) {
    const existing = get().items.find((it) => it.productId === item.productId);
    if (existing) {
      set({ items: get().items.map((it) => it.productId === item.productId ? { ...it, quantity: it.quantity + item.quantity } : it) });
    } else {
      set({ items: [...get().items, item] });
    }
  },
  removeItem(productId) {
    set({ items: get().items.filter((it) => it.productId !== productId) });
  },
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({ items: get().items.map((it) => it.productId === productId ? { ...it, quantity } : it) });
  },
  clear() {
    set({ items: [] });
  },
  getTotal() {
    return get().items.reduce((acc, it) => acc + ((it.price ?? 0) * it.quantity), 0);
  }
}));
