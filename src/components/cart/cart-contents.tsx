"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/store/cart.slice";
import { CartItemRow } from "./cart-item-row";
import { motion, AnimatePresence } from "framer-motion";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Item, ItemGroup } from "../ui/item";

type Props = {
  variant?: "sheet" | "page";
  footer?: React.ReactNode;
};

export function CartContents({ variant = "page", footer }: Props) {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const total = useCart((s) => s.getTotal());

  const isSheet = variant === "sheet";

  if (items.length === 0) {
    // return <div className="text-sm text-muted-foreground">Your cart is empty.</div>;
    return <>
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBag />
        </EmptyMedia>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptyDescription>
          Go and browse products.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/categories" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Browse products
        </Link>
      </EmptyContent>
    </Empty>
    </>
  }

  return (
    <div className="space-y-4 py-4">
      <AnimatePresence initial={false}>
        <ItemGroup className="gap-4">
          {items.map((it) => (
            <Item key={it.productId} asChild role="listitem" variant="outline">
              <motion.div
                key={it.productId}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <CartItemRow item={it} variant={variant} />
              </motion.div>
            </Item>
          ))}
        </ItemGroup>
      </AnimatePresence>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Subtotal</div>
          <div className="text-lg font-bold">{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
        </div>

        {footer}
      </div>
    </div>
  );
}
