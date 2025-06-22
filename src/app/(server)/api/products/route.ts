/**
 * GET /api/products
 * Returns a list of featured products (mock data).
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ProductsResponseSchema } from "@/models/product.model";

const categories = [
	"Audio",
	"Wearables",
	"Computers",
	"Accessories",
	"Smart Home",
	"Fitness",
	"Cameras",
	"Office",
	"Gaming",
	"Lighting",
];

const FEATURED_PRODUCTS = Array.from({ length: 50 }, (_, i) => {
	const id = i + 1;
	const titles = [
		"Wireless Headphones",
		"Smart Watch",
		"Bluetooth Speaker",
		"Gaming Mouse",
		"Mechanical Keyboard",
		"4K Monitor",
		"Portable SSD",
		"Noise Cancelling Earbuds",
		"Fitness Tracker",
		"Action Camera",
		"Smartphone",
		"Tablet",
		"Laptop",
		"Wireless Charger",
		"VR Headset",
		"Smart Light Bulb",
		"Robot Vacuum",
		"Streaming Microphone",
		"Webcam",
		"Portable Projector",
	];
	const title = titles[i % titles.length];
	const price =
		i % 2 === 0
			? Math.floor(Math.random() * 2000000 + 500000)
			: Math.round(Math.random() * 200 + 50);
	const currency = i % 2 === 0 ? "VND" : "USD";
	const unsplashIds = [
		"1517841905240-472988babdf9",
		"1511707171634-5f897ff02aa9",
		"1465101046530-73398c7f28ca",
		"1506744038136-46273834b3fb",
		"1519125323398-675f0ddb6308",
		"1465101178521-c1a9136a3b99",
	];
	const imgId = unsplashIds[i % unsplashIds.length];
	const category = categories[i % categories.length];
	return {
		id,
		title,
		price,
		currency,
		category,
		image: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=facearea&w=400&h=400&q=80`,
		thumbnail: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=thumb&w=100&h=100&q=80`,
	};
});

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10);
	const pageNumber = Number.parseInt(searchParams.get("pageNumber") || "1", 10);
	const category = searchParams.get("category");
	const q = searchParams.get("q");

	let filtered = FEATURED_PRODUCTS;
	if (category) {
		filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
	}
	if (q) {
		filtered = filtered.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
	}

	const total = filtered.length;
	const start = (pageNumber - 1) * pageSize;
	const end = start + pageSize;
	const data = filtered.slice(start, end);

	const result = ProductsResponseSchema.safeParse({
		success: true,
		data,
	});

	// Fake response delay for demonstration purposes
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (!result.success) {
		return NextResponse.json({ success: false, error: "Invalid data format" }, { status: 500 });
	}

	return NextResponse.json({
		success: true,
		data,
		total,
		pageSize,
		pageNumber,
	});
}
