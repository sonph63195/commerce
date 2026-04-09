"use client";

import { Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/store/cart.slice";

export function CartShare() {
  const items = useCart((state) => state.items);
  const total = useCart((state) =>
    state.items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0)
  );

  async function onShare() {
    const title = "My cart";
    const text = [
      ...items.map((item) => `${item.title} x${item.quantity} - ${formatPrice((item.price ?? 0) * item.quantity)}`),
      `Total: ${formatPrice(total)}`,
    ].join("\n");
    const url = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
        alert("Cart details copied to clipboard.");
      }
    } catch (error) {
      console.error("Share failed", error);
      alert("Unable to share");
    }
  }

  if (items.length === 0) return null;

  return (
    <Card className="w-full max-w-md gap-4 py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-base">Cart summary</CardTitle>
        <CardDescription>Products selected in your cart and the current total.</CardDescription>
      </CardHeader>

      <CardContent className="px-4">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.itemKey ?? item.productId} className="flex items-start justify-between gap-4 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium">{item.title}</p>
                <p className="text-muted-foreground">Qty {item.quantity}</p>
              </div>
              <div className="shrink-0 font-medium">
                {formatPrice((item.price ?? 0) * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t px-4 pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Total</p>
          <p className="text-lg font-semibold">{formatPrice(total)}</p>
        </div>
        <Button type="button" variant="outline" onClick={onShare}>
          <Share2 data-icon="inline-start" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
