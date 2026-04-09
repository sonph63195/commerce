"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type CartItem, useCart } from "@/store/cart.slice";
import { formatPrice } from "@/lib/format-price";
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "../ui/item";

type Props = {
  item: CartItem;
  variant?: "sheet" | "page";
};

function renderOptions(options?: Record<string, string>) {
  if (!options || Object.keys(options).length === 0) return null;

  return Object.entries(options).map(([key, value]) => (
    <Badge key={`${key}-${value}`} variant="secondary" className="rounded-full">
      {key}: {value}
    </Badge>
  ));
}

export function CartItemRow({ item, variant = "page" }: Props) {
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const isSelected = useCart((state) => state.isItemSelected(item.itemKey ?? item.productId));
  const toggleItemSelection = useCart((state) => state.toggleItemSelection);
  const itemKey = item.itemKey ?? item.productId;
  const isSheet = variant === "sheet";
  const imageSize = isSheet ? 96 : 132;

  return (
    <>
      <div className="flex flex-none items-start pt-1">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleItemSelection(itemKey)}
          aria-label={`Select ${item.title} for checkout`}
        />
      </div>

      {item.thumbnailUrl ? (
        <ItemMedia
          variant="image"
          className={isSheet ? "size-24 rounded-2xl" : "size-32 rounded-[1.35rem]"}
        >
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            width={imageSize}
            height={imageSize}
            className="size-full object-cover"
          />
        </ItemMedia>
      ) : null}

      <ItemContent className="min-w-0 flex-[1_1_260px] gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <ItemTitle className="w-auto">
              <Link href={`/products/${item.slug}`} className="line-clamp-2 text-base font-semibold">
                {item.title}
              </Link>
            </ItemTitle>
            {isSelected ? <Badge variant="outline">Checkout</Badge> : null}
          </div>

          <ItemDescription className="text-sm">{formatPrice(item.price)}</ItemDescription>
        </div>

        {item.variantId ? (
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Variant: {item.variantId}
          </div>
        ) : null}

        {item.options ? <div className="flex flex-wrap gap-2">{renderOptions(item.options)}</div> : null}
      </ItemContent>

      <ItemContent className="flex-none gap-4 sm:items-end">
        <ItemHeader className="basis-auto justify-start sm:justify-end">
          <div className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">
            {formatPrice((item.price ?? 0) * item.quantity)}
          </div>
        </ItemHeader>

        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background px-2 py-1 shadow-xs">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label={`Decrease quantity for ${item.title}`}
            onClick={() => updateQuantity(itemKey, item.quantity - 1)}
          >
            <Minus />
          </Button>

          <motion.div
            key={item.quantity}
            initial={{ scale: 0.92, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="min-w-8 text-center text-sm font-semibold"
          >
            {item.quantity}
          </motion.div>

          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label={`Increase quantity for ${item.title}`}
            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
          >
            <Plus />
          </Button>
        </div>
      </ItemContent>

      <ItemActions className={isSheet ? "w-full justify-between" : "justify-end"}>
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {item.quantity} unit{item.quantity > 1 ? "s" : ""}
        </div>
        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => removeItem(itemKey)}
        >
          <Trash2 data-icon="inline-start" />
          Remove
        </Button>
      </ItemActions>
    </>
  );
}
