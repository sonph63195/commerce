/**
 * Simple mock authentication API (login/logout/me) for demo purposes.
 * In production, use a real authentication provider.
 */
import { NextResponse } from "next/server";
import { z } from "zod";

const LoginSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(3),
});

const MOCK_USER = {
	id: 1,
	username: "demo",
	name: "Demo User",
	avatar: "https://randomuser.me/api/portraits/men/1.jpg",
	settings: {
		darkMode: false,
	},
};

export async function POST(req: Request) {
	const body = await req.json();
	const result = LoginSchema.safeParse(body);
	if (!result.success) {
		return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 400 });
	}
	const { username, password } = result.data;

	// Fake response delay for demonstration purposes
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (username === "demo" && password === "demo") {
		return NextResponse.json({ success: true, data: MOCK_USER });
	}
	return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}
