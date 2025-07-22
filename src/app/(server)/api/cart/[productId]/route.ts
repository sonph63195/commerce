import { NextResponse } from 'next/server';
import { ICartItem } from '@/models/cart-item.model';

let cart: ICartItem[] = []; // This should ideally be a persistent storage

export async function DELETE(request: Request, { params }: { params: { productId: string } }) {
  const { productId } = params;
  cart = cart.filter(item => item.productId !== productId);

  return NextResponse.json({
    message: "Item removed"
  });
}
