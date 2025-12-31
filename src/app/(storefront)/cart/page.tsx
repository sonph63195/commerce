"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/store/cart.slice";
import { CartShare } from "@/components/cart/cart-share";
import { CartContents } from "@/components/cart/cart-contents";

export default function CartPage() {
  const items = useCart((s) => s.items);

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your cart</h1>

      <div className="space-y-4">
        <CartContents variant="page" footer={
          <div className="flex gap-3">
            <Link href="/checkout" className="btn btn-primary">Proceed to checkout</Link>
            <button onClick={() => useCart.getState().clear()} className="btn">Clear cart</button>
            <div className="ml-auto">
              <CartShare />
            </div>
          </div>
        } />
      </div>
    </div>
  );
}
