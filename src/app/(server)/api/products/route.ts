import { NextResponse } from 'next/server';
import { IProduct } from '@/models/product.model';

const products: IProduct[] = [
  { "id": "p001", "name": "T-shirt", "price": 20, "category": "clothing", "description": "100% cotton, sizes S to XL", "images": ["/images/tshirt.jpg"], "stock": 25 },
  { "id": "p002", "name": "Jeans", "price": 50, "category": "clothing", "description": "Blue denim jeans", "images": ["/images/jeans.jpg"], "stock": 10 },
  { "id": "p003", "name": "Sneakers", "price": 80, "category": "shoes", "description": "Comfortable walking shoes", "images": ["/images/sneakers.jpg"], "stock": 15 },
  { "id": "p004", "name": "Hat", "price": 15, "category": "accessories", "description": "Stylish baseball cap", "images": ["/images/hat.jpg"], "stock": 30 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const price_min = parseFloat(searchParams.get('price_min') || '0');
  const price_max = parseFloat(searchParams.get('price_max') || '999999');

  let filteredProducts = products.filter(product => {
    let matches = true;
    if (category && product.category !== category) {
      matches = false;
    }
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
      matches = false;
    }
    if (product.price < price_min || product.price > price_max) {
      matches = false;
    }
    return matches;
  });

  const total = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    products: paginatedProducts,
    pagination: { page, limit, total }
  });
}
