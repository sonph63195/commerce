"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart.slice";

export function CartStoreSync() {
  const hydrated = useCart((state) => state.hydrated);
  const loadFromStorage = useCart((state) => state.loadFromStorage);

  useEffect(() => {
    if (!hydrated) {
      loadFromStorage();
    }
  }, [hydrated, loadFromStorage]);

  return null;
}
