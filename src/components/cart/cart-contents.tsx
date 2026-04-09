"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCheck,
  CircleX,
  ShoppingBag,
  Sparkles,
  Tag,
  TicketPercent,
  Trash2,
  Truck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { getPromoCodeMeta, useCart } from "@/store/cart.slice";
import { CartItemRow } from "./cart-item-row";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Item, ItemGroup } from "../ui/item";

type Props = {
  variant?: "sheet" | "page";
  footer?: React.ReactNode;
};

const SHIPPING_OPTIONS = [
  { value: "0", label: "Store pickup", description: "Ready today" },
  { value: "30000", label: "Standard delivery", description: "2-4 business days" },
  { value: "70000", label: "Express delivery", description: "Next day in major cities" },
] as const;

function SummaryRow({
  label,
  value,
  emphasized = false,
  labelClassName,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
  labelClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className={cn("text-muted-foreground", labelClassName)}>{label}</span>
      <span className={emphasized ? "text-lg font-semibold tracking-tight" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}

export function CartContents({ variant = "page", footer }: Props) {
  const hydrated = useCart((state) => state.hydrated);
  const items = useCart((state) => state.items);
  const promoCode = useCart((state) => state.promoCode);
  const shippingAmount = useCart((state) => state.shippingAmount);
  const subtotal = useCart((state) => state.getSubtotal());
  const discount = useCart((state) => state.getDiscount());
  const taxAmount = useCart((state) => state.getTax());
  const taxPercent = useCart((state) => state.taxPercent);
  const total = useCart((state) => state.getTotal());
  const applyPromoCode = useCart((state) => state.applyPromoCode);
  const removePromoCode = useCart((state) => state.removePromoCode);
  const setShipping = useCart((state) => state.setShipping);
  const totalItemCount = useCart((state) => state.totalItemCount());
  const selectedItemCount = useCart((state) => state.selectedItemCount());
  const selectedQuantityCount = useCart((state) => state.selectedQuantityCount());
  const selectAllItems = useCart((state) => state.selectAllItems);
  const clearSelection = useCart((state) => state.clearSelection);
  const removeSelectedItems = useCart((state) => state.removeSelectedItems);

  const [promoInput, setPromoInput] = useState(promoCode ?? "");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const shippingValue = String(shippingAmount);
  const isSheet = variant === "sheet";
  const allItemsSelected = items.length > 0 && selectedItemCount === items.length;
  const promoMeta = getPromoCodeMeta(promoCode);
  const showSummaryPanel = !isSheet;

  const shippingDescription = useMemo(
    () =>
      SHIPPING_OPTIONS.find((option) => option.value === shippingValue)?.description ??
      "Select your shipping method",
    [shippingValue]
  );

  useEffect(() => {
    setPromoInput(promoCode ?? "");
  }, [promoCode]);

  if (!hydrated) {
    return <div className="py-8 text-sm text-muted-foreground">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <Empty className="py-14">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingBag />
          </EmptyMedia>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyDescription>
            Build your selection from categories and your saved cart will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link
            href="/categories"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Browse products
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6 py-4", isSheet && "gap-5")}>
      <div
        className={cn(
          "grid gap-6",
          showSummaryPanel ? "lg:grid-cols-[minmax(0,1fr)_360px]" : "grid-cols-1"
        )}
      >
        <section className="flex flex-col gap-4">
          <div className="rounded-[1.75rem] border border-border/70 bg-linear-to-r from-muted/40 via-background to-muted/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {!isSheet ? <Badge variant="secondary">Curated cart</Badge> : null}
                  <Badge variant="outline">{totalItemCount} items</Badge>
                  <Badge variant={selectedItemCount > 0 ? "secondary" : "outline"}>
                    {selectedItemCount} selected
                  </Badge>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Select products for checkout</h2>
                  <p className="text-sm text-muted-foreground">
                    Chosen items will be used for pricing, shipping, and the final checkout order.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => (allItemsSelected ? clearSelection() : selectAllItems())}
                >
                  <CheckCheck data-icon="inline-start" />
                  {allItemsSelected ? "Unselect all" : "Select all"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeSelectedItems()}
                  disabled={selectedItemCount === 0}
                >
                  <Trash2 data-icon="inline-start" />
                  Remove selected
                </Button>
                <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Checkout total
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">{formatPrice(total)}</p>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            <ItemGroup className="gap-4">
              {items.map((item) => (
                <Item
                  key={item.itemKey ?? item.productId}
                  asChild
                  role="listitem"
                  variant="outline"
                  className="rounded-[1.5rem] border-border/70 bg-background p-4 shadow-xs sm:p-5"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ type: "spring", stiffness: 280, damping: 30 }}
                    className={cn("items-start", isSheet ? "gap-4" : "gap-5")}
                  >
                    <CartItemRow item={item} variant={variant} />
                  </motion.div>
                </Item>
              ))}
            </ItemGroup>
          </AnimatePresence>
        </section>

        {showSummaryPanel ? (
          <section className="flex flex-col gap-4 rounded-[1.75rem] border border-border/70 bg-background p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <TicketPercent />
                  Order summary
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedQuantityCount} unit{selectedQuantityCount !== 1 ? "s" : ""} from{" "}
                  {selectedItemCount} selected item{selectedItemCount !== 1 ? "s" : ""}.
                </p>
              </div>
              <Badge variant={selectedItemCount > 0 ? "secondary" : "outline"}>Live pricing</Badge>
            </div>

            <div className="rounded-[1.4rem] border border-border/70 bg-muted/20 p-4">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Tag />
                Promo code
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input
                    id={`promo-code-${variant}`}
                    value={promoInput}
                    placeholder="FREESHIP"
                    onChange={(event) => {
                      setPromoInput(event.target.value);
                      if (promoMessage) setPromoMessage(null);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const result = applyPromoCode(promoInput);
                      setPromoMessage(result.message ?? null);
                      if (result.ok) {
                        setPromoInput(promoInput.trim().toUpperCase());
                      }
                    }}
                  >
                    Apply
                  </Button>
                </div>

                {promoCode ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-2"
                      style={promoMeta?.styles}
                    >
                      <Sparkles className="size-4" />
                      <span className="text-sm font-semibold">{promoCode}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-full"
                        style={{ color: promoMeta?.styles.color }}
                        onClick={() => removePromoCode()}
                        aria-label={`Remove promo code ${promoCode}`}
                      >
                        <CircleX />
                      </Button>
                    </div>
                  </div>
                ) : null}

                {promoMessage ? <p className="text-xs text-muted-foreground">{promoMessage}</p> : null}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-border/70 bg-muted/20 p-4">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Truck />
                Shipping method
              </div>

              <div className="flex flex-col gap-3">
                <Select value={shippingValue} onValueChange={(value) => setShipping(Number(value))}>
                  <SelectTrigger id={`shipping-method-${variant}`} className="w-full">
                    <SelectValue placeholder="Select shipping" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIPPING_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{shippingDescription}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-[1.4rem] border border-border/70 bg-foreground px-5 py-4 text-background">
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} labelClassName="text-background/70" />
              <SummaryRow
                label="Discount"
                value={discount > 0 ? `- ${formatPrice(discount)}` : formatPrice(0)}
                labelClassName="text-background/70"
              />
              <SummaryRow
                label={`Tax (${taxPercent}%)`}
                value={formatPrice(taxAmount)}
                labelClassName="text-background/70"
              />
              <SummaryRow
                label="Shipping"
                value={formatPrice(selectedItemCount > 0 ? shippingAmount : 0)}
                labelClassName="text-background/70"
              />
              <div className="border-t border-background/15 pt-3">
                <SummaryRow
                  label="Estimated total"
                  value={formatPrice(total)}
                  emphasized
                  labelClassName="text-background/70"
                />
              </div>
            </div>

            {selectedItemCount === 0 ? (
              <p className="text-sm text-muted-foreground">
                Select at least one product above to continue to checkout.
              </p>
            ) : null}

            {footer}
          </section>
        ) : footer ? (
          <div>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
