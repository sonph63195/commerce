import { create } from "zustand";

const CART_STORAGE_KEY = "commerce.cart";

type PromoCodeMeta = {
  amount: number;
  styles: {
    borderColor: string;
    backgroundColor: string;
    color: string;
  };
};

const PROMO_CODES: Record<string, PromoCodeMeta> = {
  FREESHIP: {
    amount: 30_000,
    styles: {
      borderColor: "rgb(14 165 233 / 0.24)",
      backgroundColor: "rgb(14 165 233 / 0.12)",
      color: "rgb(3 105 161)",
    },
  },
  SAVE50: {
    amount: 50_000,
    styles: {
      borderColor: "rgb(245 158 11 / 0.24)",
      backgroundColor: "rgb(245 158 11 / 0.12)",
      color: "rgb(180 83 9)",
    },
  },
  WELCOME10: {
    amount: 10_000,
    styles: {
      borderColor: "rgb(16 185 129 / 0.24)",
      backgroundColor: "rgb(16 185 129 / 0.12)",
      color: "rgb(4 120 87)",
    },
  },
};

export type CartItem = {
  itemKey?: string;
  productId: string;
  slug: string;
  title: string;
  price?: number;
  thumbnailUrl?: string;
  quantity: number;
  variantId?: string;
  options?: Record<string, string>;
  metadata?: Record<string, unknown>;
};

type CartStoragePayload = {
  items: CartItem[];
  selectedItemKeys?: string[];
  discountAmount: number;
  shippingAmount: number;
  promoCode: string | null;
  taxPercent: number;
};

type ApplyPromoResult = {
  ok: boolean;
  message?: string;
};

type CartState = {
  items: CartItem[];
  selectedItemKeys: string[];
  open: boolean;
  hydrated: boolean;
  discountAmount: number;
  shippingAmount: number;
  promoCode: string | null;
  taxPercent: number;
  taxAmount: number;
  estimatedTotal: number;
  setOpen: (open: boolean) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemKey: string) => void;
  removeSelectedItems: () => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clear: () => void;
  toggleItemSelection: (itemKey: string) => void;
  selectAllItems: () => void;
  clearSelection: () => void;
  setSelectedItems: (itemKeys: string[]) => void;
  applyPromoCode: (code: string) => ApplyPromoResult;
  removePromoCode: () => void;
  setShipping: (amount: number) => void;
  setTaxPercent: (percent: number) => void;
  itemCount: () => number;
  totalItemCount: () => number;
  selectedItemCount: () => number;
  selectedQuantityCount: () => number;
  getSelectedItems: () => CartItem[];
  isItemSelected: (itemKey: string) => boolean;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getTotal: () => number;
};

function getItemKey(item: Pick<CartItem, "productId" | "variantId" | "options">) {
  const optionEntries = Object.entries(item.options ?? {}).sort(([left], [right]) =>
    left.localeCompare(right)
  );
  const optionKey = optionEntries.map(([key, value]) => `${key}:${value}`).join("|");

  return [item.productId, item.variantId ?? "default", optionKey].filter(Boolean).join("::");
}

function normalizeCartItem(item: CartItem): CartItem {
  return {
    ...item,
    itemKey: item.itemKey ?? getItemKey(item),
  };
}

function roundCurrency(value: number) {
  return Math.max(0, Math.round(value));
}

function getSubtotal(items: CartItem[]) {
  return roundCurrency(
    items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0)
  );
}

function getDiscountAmount(subtotal: number, promoCode: string | null) {
  if (!promoCode) return 0;

  const meta = PROMO_CODES[promoCode.toUpperCase()];
  return Math.min(subtotal, meta?.amount ?? 0);
}

function sanitizeSelectedItemKeys(items: CartItem[], selectedItemKeys: string[]) {
  const availableKeys = new Set(items.map((item) => item.itemKey ?? getItemKey(item)));
  return selectedItemKeys.filter((key) => availableKeys.has(key));
}

function getSelectedItems(items: CartItem[], selectedItemKeys: string[]) {
  const selectedKeySet = new Set(selectedItemKeys);
  return items.filter((item) => selectedKeySet.has(item.itemKey ?? getItemKey(item)));
}

function calculateTotals(
  state: Pick<CartState, "items" | "selectedItemKeys" | "promoCode" | "shippingAmount" | "taxPercent">
) {
  const sanitizedSelectedItemKeys = sanitizeSelectedItemKeys(
    state.items,
    state.selectedItemKeys
  );
  const selectedItems = getSelectedItems(state.items, sanitizedSelectedItemKeys);
  const subtotal = getSubtotal(selectedItems);
  const discountAmount = getDiscountAmount(subtotal, state.promoCode);
  const taxableAmount = Math.max(subtotal - discountAmount, 0);
  const taxAmount = roundCurrency(taxableAmount * (state.taxPercent / 100));
  const effectiveShippingAmount = selectedItems.length > 0 ? state.shippingAmount : 0;
  const estimatedTotal = roundCurrency(taxableAmount + taxAmount + effectiveShippingAmount);

  return {
    selectedItemKeys: sanitizedSelectedItemKeys,
    discountAmount,
    taxAmount,
    estimatedTotal,
  };
}

function persistCartState(
  state: Pick<
    CartState,
    | "items"
    | "selectedItemKeys"
    | "discountAmount"
    | "shippingAmount"
    | "promoCode"
    | "taxPercent"
  >
) {
  if (typeof window === "undefined") return;

  const payload: CartStoragePayload = {
    items: state.items,
    selectedItemKeys: state.selectedItemKeys,
    discountAmount: state.discountAmount,
    shippingAmount: state.shippingAmount,
    promoCode: state.promoCode,
    taxPercent: state.taxPercent,
  };

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  selectedItemKeys: [],
  open: false,
  hydrated: false,
  discountAmount: 0,
  shippingAmount: 0,
  promoCode: null,
  taxPercent: 8,
  taxAmount: 0,
  estimatedTotal: 0,
  setOpen(open) {
    set({ open });
  },
  loadFromStorage() {
    if (typeof window === "undefined" || get().hydrated) return;

    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }

      const parsed = JSON.parse(raw) as Partial<CartStoragePayload>;
      const items = Array.isArray(parsed.items) ? parsed.items.map(normalizeCartItem) : [];
      const nextState = {
        items,
        selectedItemKeys: Array.isArray(parsed.selectedItemKeys)
          ? parsed.selectedItemKeys
          : items.map((item) => item.itemKey ?? getItemKey(item)),
        shippingAmount:
          typeof parsed.shippingAmount === "number" ? parsed.shippingAmount : 0,
        promoCode: typeof parsed.promoCode === "string" ? parsed.promoCode : null,
        taxPercent: typeof parsed.taxPercent === "number" ? parsed.taxPercent : 8,
        hydrated: true,
      };

      set({
        ...nextState,
        ...calculateTotals(nextState),
      });
    } catch {
      set({ hydrated: true });
    }
  },
  saveToStorage() {
    persistCartState(get());
  },
  addItem(item) {
    const normalizedItem = normalizeCartItem(item);
    const currentItems = get().items;
    const existing = currentItems.find((entry) => entry.itemKey === normalizedItem.itemKey);
    const items = existing
      ? currentItems.map((entry) =>
          entry.itemKey === normalizedItem.itemKey
            ? { ...entry, quantity: entry.quantity + normalizedItem.quantity }
            : entry
        )
      : [...currentItems, normalizedItem];

    const selectedItemKeys = existing
      ? get().selectedItemKeys
      : [...get().selectedItemKeys, normalizedItem.itemKey ?? getItemKey(normalizedItem)];

    const nextState = {
      items,
      selectedItemKeys,
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  removeItem(itemKey) {
    const items = get().items.filter((item) => item.itemKey !== itemKey);
    const nextState = {
      items,
      selectedItemKeys: get().selectedItemKeys.filter((key) => key !== itemKey),
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  removeSelectedItems() {
    const selectedKeySet = new Set(get().selectedItemKeys);
    const items = get().items.filter(
      (item) => !selectedKeySet.has(item.itemKey ?? getItemKey(item))
    );
    const nextState = {
      items,
      selectedItemKeys: [],
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  updateQuantity(itemKey, quantity) {
    if (quantity <= 0) {
      get().removeItem(itemKey);
      return;
    }

    const items = get().items.map((item) =>
      item.itemKey === itemKey ? { ...item, quantity } : item
    );
    const nextState = {
      items,
      selectedItemKeys: get().selectedItemKeys,
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  clear() {
    set({
      items: [],
      selectedItemKeys: [],
      discountAmount: 0,
      shippingAmount: 0,
      promoCode: null,
      taxAmount: 0,
      estimatedTotal: 0,
    });
    get().saveToStorage();
  },
  toggleItemSelection(itemKey) {
    const selectedItemKeys = get().selectedItemKeys.includes(itemKey)
      ? get().selectedItemKeys.filter((key) => key !== itemKey)
      : [...get().selectedItemKeys, itemKey];
    const nextState = {
      items: get().items,
      selectedItemKeys,
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  selectAllItems() {
    const nextState = {
      items: get().items,
      selectedItemKeys: get().items.map((item) => item.itemKey ?? getItemKey(item)),
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  clearSelection() {
    const nextState = {
      items: get().items,
      selectedItemKeys: [],
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  setSelectedItems(itemKeys) {
    const nextState = {
      items: get().items,
      selectedItemKeys: itemKeys,
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  applyPromoCode(code) {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      return { ok: false, message: "Enter a promo code." };
    }

    if (!PROMO_CODES[normalizedCode]) {
      return { ok: false, message: "Promo code is not valid." };
    }

    const nextState = {
      items: get().items,
      selectedItemKeys: get().selectedItemKeys,
      promoCode: normalizedCode,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();

    return { ok: true, message: "Promo code applied." };
  },
  removePromoCode() {
    const nextState = {
      items: get().items,
      selectedItemKeys: get().selectedItemKeys,
      promoCode: null,
      shippingAmount: get().shippingAmount,
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  setShipping(amount) {
    const nextState = {
      items: get().items,
      selectedItemKeys: get().selectedItemKeys,
      promoCode: get().promoCode,
      shippingAmount: Math.max(0, amount),
      taxPercent: get().taxPercent,
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  setTaxPercent(percent) {
    const nextState = {
      items: get().items,
      selectedItemKeys: get().selectedItemKeys,
      promoCode: get().promoCode,
      shippingAmount: get().shippingAmount,
      taxPercent: Math.max(0, percent),
    };

    set({
      ...nextState,
      ...calculateTotals(nextState),
    });
    get().saveToStorage();
  },
  itemCount() {
    return get().items.length;
  },
  totalItemCount() {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },
  selectedItemCount() {
    return get().getSelectedItems().length;
  },
  selectedQuantityCount() {
    return get().getSelectedItems().reduce((acc, item) => acc + item.quantity, 0);
  },
  getSelectedItems() {
    return getSelectedItems(get().items, get().selectedItemKeys);
  },
  isItemSelected(itemKey) {
    return get().selectedItemKeys.includes(itemKey);
  },
  getSubtotal() {
    return getSubtotal(get().getSelectedItems());
  },
  getDiscount() {
    return get().discountAmount;
  },
  getTax() {
    return get().taxAmount;
  },
  getTotal() {
    return get().estimatedTotal;
  },
}));

export { getItemKey as createCartItemKey };
export function getPromoCodeMeta(code: string | null) {
  if (!code) return null;
  return PROMO_CODES[code.toUpperCase()] ?? null;
}
