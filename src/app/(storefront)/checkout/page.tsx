"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format-price";
import { trackEvent } from "@/lib/analytics";
import { useCart } from "@/store/cart.slice";

type FormValues = {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useCart((state) => state.hydrated);
  const selectedItems = useCart((state) => state.getSelectedItems());
  const total = useCart((state) => state.getTotal());
  const removeSelectedItems = useCart((state) => state.removeSelectedItems);

  const { register, handleSubmit } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    const orderId = `ORD-${Date.now()}`;

    trackEvent("order_placed", {
      orderId,
      total,
      customer: data,
      items: selectedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    removeSelectedItems();
    router.push(`/checkout/confirmation?orderId=${orderId}`);
  }

  if (!hydrated) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <h1 className="mb-4 text-2xl font-semibold">Checkout</h1>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (selectedItems.length === 0) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <h1 className="mb-4 text-2xl font-semibold">Checkout</h1>
        <p className="mb-4">No products are selected for checkout.</p>
        <Button asChild variant="outline">
          <Link href="/cart">Back to cart</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-4 text-2xl font-semibold">Checkout</h1>

      <div className="mb-6 rounded-2xl border border-border/70 bg-muted/20 p-4">
        <p className="text-sm font-medium">Selected items</p>
        <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
          {selectedItems.map((item) => (
            <div key={item.itemKey ?? item.productId} className="flex items-center justify-between gap-4">
              <span className="truncate">{item.title}</span>
              <span className="whitespace-nowrap">
                x{item.quantity} • {formatPrice((item.price ?? 0) * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="checkout-name">
            Full name
          </label>
          <Input id="checkout-name" {...register("name", { required: true })} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="checkout-email">
            Email
          </label>
          <Input id="checkout-email" {...register("email", { required: true })} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="checkout-address">
            Address
          </label>
          <Input id="checkout-address" {...register("address", { required: true })} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="checkout-city">
              City
            </label>
            <Input id="checkout-city" {...register("city", { required: true })} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="checkout-postal">
              Postal code
            </label>
            <Input id="checkout-postal" {...register("postal", { required: true })} />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-medium">Order total</div>
            <div className="text-xl font-bold">{formatPrice(total)}</div>
          </div>

          <Button type="submit" className="w-full">
            Place order
          </Button>
        </div>
      </form>
    </div>
  );
}
