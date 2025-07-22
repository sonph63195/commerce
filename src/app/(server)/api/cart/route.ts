import { NextResponse } from 'next/server';
import { ICartItem } from '@/models/cart-item.model';

let cart: ICartItem[] = [];

export async function GET() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return NextResponse.json({
    items: cart,
    total,
  });
}

export async function POST(request: Request) {
  const { productId, quantity, name, price } = await request.json();

  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, name, price });
  }

  return NextResponse.json({
    message: "Product added to cart",
    cart: cart,
  });
}