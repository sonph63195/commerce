"use client";

import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components";
import { useCart } from "@/store/cart.slice";
import Link from "next/link";
import { CartContents } from "@/components/cart/cart-contents";

export function CartSheet() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
        </SheetHeader>

        <div className="py-2">
          <CartContents variant="sheet" footer={
            <div className="flex gap-2">
              <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-primary w-full">Checkout</Link>
              <Link href="/cart" onClick={() => setOpen(false)} className="btn w-full">View cart</Link>
            </div>
          } />
        </div>

        <SheetFooter>
          <div className="text-xs text-muted-foreground">Secure checkout with no payment processing in demo</div>
        </SheetFooter>

        <SheetClose asChild>
          <button aria-label="Close" className="sr-only">Close</button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
