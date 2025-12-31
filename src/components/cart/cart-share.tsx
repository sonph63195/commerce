"use client";

import React from "react";
import { useCart } from "@/store/cart.slice";

export function CartShare() {
  const items = useCart((s) => s.items);

  async function onShare() {
    const title = `My cart (${items.length} items)`;
    const text = items.map(i => `${i.title} x${i.quantity}`).join('\n');
    const url = typeof window !== 'undefined' ? window.location.href : '';

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
        alert('Cart details copied to clipboard.');
      }
    } catch (err) {
      console.error('Share failed', err);
      alert('Unable to share');
    }
  }

  if (items.length === 0) return null;

  return (
    <button onClick={onShare} className="btn btn-outline">Share cart</button>
  );
}
