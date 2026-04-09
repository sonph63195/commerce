"use client";

import Link from "next/link";
import { ArrowRight, Share2 } from "lucide-react";
import { CartContents } from "@/components/cart/cart-contents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart.slice";

export default function CartPage() {
  const totalItemCount = useCart((state) => state.totalItemCount());
  const selectedItemCount = useCart((state) => state.selectedItemCount());

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-linear-to-b from-muted/50 via-background to-background" />

      <div className="container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-border/70 bg-background/90 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Cart overview</Badge>
                <Badge variant="outline">{totalItemCount} items in cart</Badge>
                <Badge variant={selectedItemCount > 0 ? "secondary" : "outline"}>
                  {selectedItemCount} ready for checkout
                </Badge>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Choose which products to check out
                </h1>
                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                  Tick the items you want to purchase now. Unselected items stay in the cart for later.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
            </div>
          </div>
        </section>

        <CartContents
          variant="page"
          footer={
            <div className="flex flex-col gap-3">
              {selectedItemCount > 0 ? (
                <Button asChild className="w-full justify-between">
                  <Link href="/checkout">
                    Proceed to checkout
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              ) : (
                <Button type="button" className="w-full justify-between" disabled>
                  Proceed to checkout
                  <ArrowRight data-icon="inline-end" />
                </Button>
              )}
              <Button asChild variant="outline" className="w-full">
                <Link href="/categories">
                  <Share2 data-icon="inline-start" />
                  Continue shopping
                </Link>
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
