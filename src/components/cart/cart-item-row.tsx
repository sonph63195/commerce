"use client";

import Link from "next/link";
import { type CartItem, useCart } from "@/store/cart.slice";
import { motion } from "framer-motion";
import { ItemActions, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "../ui/item";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  item: CartItem;
  variant?: "sheet" | "page";
};

export function CartItemRow({ item, variant = "page" }: Props) {
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const isSheet = variant === "sheet";

  return (
    <>
      {item.thumbnailUrl && isSheet && (
        // <ItemHeader>
          <ItemMedia variant="image">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              width={96}
              height={96}
              className={cn(
                "object-cover",
              )}
            />
          </ItemMedia>
        // </ItemHeader>
      )}

      {item.thumbnailUrl && !isSheet && (
        <ItemHeader>
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            width={144}
            height={144}
            className={cn(
              "object-cover",
            )}
          />
        </ItemHeader>
      )}

      <ItemContent className="flex-1">
        <ItemTitle>
          <Link href={`/products/${item.slug}`} className="font-medium">
            {item.title}
          </Link>
        </ItemTitle>
        <ItemDescription>
          {(item.price ?? 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </ItemDescription>
      </ItemContent>

      <ItemContent>
        <div className="flex items-center gap-2">
          <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} className="px-2 py-1 border rounded">-</button>
          <motion.div key={item.quantity} initial={{ scale: 0.9, opacity: 0.8 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} className="px-3">
            {item.quantity}
          </motion.div>
          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
        </div>


      </ItemContent>

      <ItemActions>
        {isSheet ? (
          <Button onClick={() => removeItem(item.productId)} variant="ghost">Remove</Button>
        ) : (
          <div className="w-32 text-right">
            <div className="font-medium">{((item.price ?? 0) * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
            <Button onClick={() => removeItem(item.productId)} variant="ghost">Remove</Button>
          </div>
        )}
      </ItemActions>
    </>
  );
}
