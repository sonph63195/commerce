"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCart } from "@/store/cart.slice";
import { trackEvent } from "@/lib/analytics";

type FormValues = {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.getTotal());
  const clear = useCart((s) => s.clear);

  const { register, handleSubmit } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    // create fake order id
    const orderId = `ORD-${Date.now()}`;

    // analytics: order placed
    trackEvent('order_placed', {
      orderId,
      total: total,
      items: items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price }))
    });

    // we could send to server here
    clear();
    router.push(`/checkout/confirmation?orderId=${orderId}`);
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input {...register('name', { required: true })} className="input w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register('email', { required: true })} className="input w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input {...register('address', { required: true })} className="input w-full" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input {...register('city', { required: true })} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium">Postal code</label>
            <input {...register('postal', { required: true })} className="input w-full" />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium">Order total</div>
            <div className="text-xl font-bold">{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
          </div>

          <button type="submit" className="btn btn-primary w-full">Place order</button>
        </div>
      </form>
    </div>
  );
}
