"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ProductDetail } from "@/models/catalog/product-detail";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { type CartItem, createCartItemKey, useCart } from "@/store/cart.slice";

type Props = {
  product: ProductDetail;
};

export function AddToCartButton({ product }: Props) {
  const [qty, setQty] = useState(1);
  const addItem = useCart((state) => state.addItem);

  function onAdd() {
    const item: CartItem = {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      thumbnailUrl: product.thumbnailUrl,
      quantity: qty,
    };

    const itemKey = createCartItemKey(item);
    const prev = useCart.getState().items.find((entry) => entry.itemKey === itemKey);
    const prevQty = prev?.quantity ?? 0;

    addItem(item);
    useCart.getState().setOpen(true);

    toast.success(`${product.title} added to cart`, {
      action: {
        label: "Undo",
        onClick: async () => {
          if (prevQty === 0) {
            useCart.getState().removeItem(itemKey);
            toast("Removed from cart");
            trackEvent("remove_from_cart", {
              productId: product.id,
              sku: product.id,
              name: product.title,
            });
            return;
          }

          useCart.getState().updateQuantity(itemKey, prevQty);
          toast("Cart restored");
          trackEvent("remove_from_cart", {
            productId: product.id,
            sku: product.id,
            name: product.title,
            quantity: qty * -1,
          });
        },
      },
    });

    trackEvent("add_to_cart", {
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
        <label htmlFor={`qty-${product.id}`} className="text-sm">
          Qty
        </label>
        <div className="inline-flex items-center overflow-hidden rounded-md border">
          <Button type="button" variant="ghost" onClick={() => setQty(Math.max(1, qty - 1))}>
            -
          </Button>
          <div id={`qty-${product.id}`} className="px-4 py-1 text-sm font-medium">
            {qty}
          </div>
          <Button type="button" variant="ghost" onClick={() => setQty(qty + 1)}>
            +
          </Button>
        </div>
      </div>

      <Button type="button" onClick={onAdd} className="w-full">
        Add to cart
      </Button>
    </div>
  );
}
