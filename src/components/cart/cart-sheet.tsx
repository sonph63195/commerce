"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components";
import { CartContents } from "@/components/cart/cart-contents";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/store/cart.slice";

export function CartSheet() {
  const open = useCart((state) => state.open);
  const setOpen = useCart((state) => state.setOpen);
  const total = useCart((state) => state.getTotal());
  const selectedItemCount = useCart((state) => state.selectedItemCount());

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="overflow-y-auto border-l-border/70 bg-background sm:max-w-2xl">
        <div className="flex min-h-full flex-col gap-4">
          <SheetHeader className="rounded-[1.6rem] border border-border/70 bg-linear-to-r from-muted/40 via-background to-muted/20 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <SheetTitle>Your cart</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedItemCount} item{selectedItemCount !== 1 ? "s" : ""} selected for checkout
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Total
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight">{formatPrice(total)}</p>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1">
            <CartContents
              variant="sheet"
              footer={
                <div className="flex flex-col gap-3">
                  {selectedItemCount > 0 ? (
                    <Button asChild className="w-full justify-between">
                      <Link href="/checkout" onClick={() => setOpen(false)}>
                        Checkout
                        <ArrowRight data-icon="inline-end" />
                      </Link>
                    </Button>
                  ) : (
                    <Button type="button" className="w-full justify-between" disabled>
                      Checkout
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  )}

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart" onClick={() => setOpen(false)}>
                      View full cart
                    </Link>
                  </Button>
                </div>
              }
            />
          </div>

          <SheetFooter className="rounded-[1.4rem] border border-border/70 bg-muted/20 p-4">
            <div className="text-xs text-muted-foreground">
              Only selected products move into checkout. Payment processing is not connected in this demo.
            </div>
          </SheetFooter>
        </div>

        <SheetClose asChild>
          <button aria-label="Close" className="sr-only" type="button">
            Close
          </button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
