import { NextResponse } from 'next/server';
import { ICartItem } from '@/models/cart-item.model';
import { IOrder } from '@/models/order.model';

export async function POST(request: Request) {
  const { userId, cart, paymentMethod, shippingAddress } = await request.json();

  // In a real application, you would process the payment, save the order to a database, etc.
  const orderId = `o${Date.now()}`;
  const total = cart.reduce((sum: number, item: ICartItem) => sum + item.price * item.quantity, 0);

  const order: IOrder = {
    orderId,
    userId,
    cart,
    paymentMethod,
    shippingAddress,
    total,
  };

  return NextResponse.json({
    orderId: order.orderId,
    message: "Checkout successful",
    total: order.total,
  });
}
