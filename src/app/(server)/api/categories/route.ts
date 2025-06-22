import { NextResponse } from "next/server";

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

export async function GET() {
	// Fake response delay for demonstration purposes
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return NextResponse.json({ success: true, data: categories });
}
