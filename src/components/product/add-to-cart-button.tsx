"use client";

import React, { useState } from "react";
import { useCart, type CartItem } from "@/store/cart.slice";
import { ProductDetail } from "@/models/catalog/product-detail";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

type Props = {
  product: ProductDetail;
};

export function AddToCartButton({ product }: Props) {
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);

  function onAdd() {
    // compute previous quantity so undo can revert
    const prev = useCart.getState().items.find(i => i.productId === product.id);
    const prevQty = prev?.quantity ?? 0;

    const item: CartItem = {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      thumbnailUrl: product.thumbnailUrl,
      quantity: qty,
    };

    addItem(item);
    // open cart sheet
    useCart.getState().setOpen(true);

    // show toast with Undo action
    toast.success(`${product.title} added to cart`, {
      action: {
        label: 'Undo',
        // revert the change when clicked
        onClick: async () => {
          // if no previous quantity, remove the item; otherwise restore previous quantity
          if (prevQty === 0) {
            useCart.getState().removeItem(product.id);
            toast('Removed from cart');
            trackEvent('remove_from_cart', { productId: product.id, sku: product.id, name: product.title });
          } else {
            useCart.getState().updateQuantity(product.id, prevQty);
            toast('Cart restored');
            trackEvent('remove_from_cart', { productId: product.id, sku: product.id, name: product.title, quantity: qty * -1 });
          }
        }
      }
    });

    // analytics
    trackEvent('add_to_cart', {
      productId: product.id,
      sku: product.id,
      name: product.title,
      price: product.price ?? 0,
      quantity: qty,
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm">Qty</label>
        <div className="inline-flex items-center border rounded-md overflow-hidden">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1">-</button>
          <div className="px-4 py-1">{qty}</div>
          <button onClick={() => setQty(qty + 1)} className="px-3 py-1">+</button>
        </div>
      </div>

      <button onClick={onAdd} className="btn btn-primary w-full">Add to cart</button>
    </div>
  );
}
