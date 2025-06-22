/**
 * Login page for NextAuth credentials provider.
 */
"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VBox from "@/components/atoms/box/VBox";
import { Button } from "@/components/atoms/ui/button";

export default function LoginPage() {
	const { data: session } = useSession();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Redirect after login using useEffect to avoid setState in render
	useEffect(() => {
		if (session) {
			router.replace("/user");
		}
	}, [session, router]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");
		const res = await signIn("credentials", {
			redirect: false,
			username,
			password,
		});
		if (res?.error) {
			setError("Invalid credentials");
		} else {
			router.replace("/user");
		}
		setLoading(false);
	}

	return (
		<VBox className="max-w-sm mx-auto mt-20 gap-6 p-6 bg-card rounded shadow">
			<h1 className="text-2xl font-bold mb-2">Sign In</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="border rounded px-3 py-2"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border rounded px-3 py-2"
					required
				/>
				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Signing in..." : "Sign In"}
				</Button>
				{error && <span className="text-destructive text-sm">{error}</span>}
			</form>
		</VBox>
	);
}
