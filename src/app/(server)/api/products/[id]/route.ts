import { NextResponse } from 'next/server';
import { IProduct } from '@/models/product.model';

const products: IProduct[] = [
  { "id": "p001", "name": "T-shirt", "price": 20, "category": "clothing", "description": "100% cotton, sizes S to XL", "images": ["/images/tshirt.jpg"], "stock": 25 },
  { "id": "p002", "name": "Jeans", "price": 50, "category": "clothing", "description": "Blue denim jeans", "images": ["/images/jeans.jpg"], "stock": 10 },
  { "id": "p003", "name": "Sneakers", "price": 80, "category": "shoes", "description": "Comfortable walking shoes", "images": ["/images/sneakers.jpg"], "stock": 15 },
  { "id": "p004", "name": "Hat", "price": 15, "category": "accessories", "description": "Stylish baseball cap", "images": ["/images/hat.jpg"], "stock": 30 },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find(p => p.id === id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return new NextResponse('Product not found', { status: 404 });
  }
}
