import { IProduct } from "@/models/product.model";
import { NextResponse } from "next/server";

let products: IProduct[] = [];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product: IProduct = await request.json();
  products.push(product);
  return NextResponse.json({ message: "Product added", products }, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedProduct: IProduct = await request.json();
  products = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
  return NextResponse.json({ message: "Product updated", products });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  products = products.filter((product) => product.id !== id);
  return NextResponse.json({ message: "Product deleted", products });
}
