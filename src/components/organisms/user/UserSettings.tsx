/**
 * UserSettings component for user profile and preferences.
 * Allows toggling dark mode and (mock) user info.
 */
"use client";
import { useState, useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import LoginPage from "@/app/login/page";
import { useTheme } from "next-themes";
import { Switch } from "@/components/atoms/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/molecules/tabs";
import VBox from "@/components/atoms/box/VBox";
import { Label } from "@/components/atoms/ui/label";
import { Button } from "@/components/atoms/ui/button";

export function UserSettings() {
	const { data: session, status } = useSession();
	const { theme, setTheme } = useTheme();
	const [darkMode, setDarkMode] = useState(false);
	const [themeMode, setThemeMode] = useState(theme ?? "system");
	const [tab, setTab] = useState("account");

	useEffect(() => {
		setDarkMode(theme === "dark");
		setThemeMode(theme ?? "system");
	}, [theme]);

	if (status === "loading") {
		return <p className="text-center mt-10">Loading...</p>;
	}

	if (!session) {
		return <LoginPage />;
	}

	const user = session.user;

	return (
		<VBox className="max-w-md mx-auto mt-10 gap-6 p-6 bg-card rounded shadow">
			<div className="flex flex-col items-center gap-2">
				<img
					src={user?.image || "https://randomuser.me/api/portraits/men/1.jpg"}
					alt="avatar"
					className="w-16 h-16 rounded-full"
				/>
				<span className="font-semibold text-lg">{user?.name}</span>
				<span className="text-muted-foreground text-sm">{user?.email}</span>
			</div>
			<Tabs defaultValue="general" value={tab} onValueChange={setTab} className="w-full">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<div className="flex flex-col gap-4">
						<h2 className="text-lg font-semibold text-primary">Appearance</h2>
						<VBox className="gap-2">
							<span className="text-xs text-muted-foreground">
								You can also select "System" below to follow your device's theme.
							</span>
							<Label>Dark Mode</Label>
							<Switch
								checked={themeMode === "dark"}
								onCheckedChange={(checked) =>
									setTheme(checked ? "dark" : themeMode === "system" ? "system" : "light")
								}
							/>
						</VBox>

						<VBox className="gap-2">
							<Label>System</Label>
							<Switch
								checked={themeMode === "system"}
								onCheckedChange={(checked) => setTheme(checked ? "system" : "light")}
							/>
							<span className="text-xs text-muted-foreground">
								Choose "System" to automatically match your device's dark or light mode.
							</span>
						</VBox>

						<h2 className="text-lg font-semibold text-primary mt-6">Accessibility</h2>
						<VBox className="gap-2">
							<Label>Reduce Motion</Label>
							<Switch
								checked={
									typeof window !== "undefined" &&
									window.matchMedia("(prefers-reduced-motion: reduce)").matches
								}
								onCheckedChange={(checked) => {
									if (typeof window !== "undefined") {
										if (checked) {
											document.documentElement.classList.add("reduce-motion");
											localStorage.setItem("reduce-motion", "true");
										} else {
											document.documentElement.classList.remove("reduce-motion");
											localStorage.removeItem("reduce-motion");
										}
									}
								}}
							/>
							<span className="text-xs text-muted-foreground">
								Enable to reduce animations and transitions for accessibility.
							</span>
						</VBox>
					</div>
				</TabsContent>
				<TabsContent value="account">
					<div className="flex flex-col gap-4">
						<h2 className="text-lg font-semibold text-primary mt-6">Security</h2>
						<VBox className="gap-2">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									// Mock: Show success message
									alert("Password changed successfully (mock)");
								}}
								className="flex flex-col gap-2"
							>
								<label className="text-sm font-medium">
									Current Password
									<input
										type="password"
										className="mt-1 border rounded px-2 py-1 bg-background text-foreground w-full"
										required
										minLength={3}
									/>
								</label>
								<label className="text-sm font-medium">
									New Password
									<input
										type="password"
										className="mt-1 border rounded px-2 py-1 bg-background text-foreground w-full"
										required
										minLength={3}
									/>
								</label>
								<label className="text-sm font-medium">
									Confirm New Password
									<input
										type="password"
										className="mt-1 border rounded px-2 py-1 bg-background text-foreground w-full"
										required
										minLength={3}
									/>
								</label>
								<Button type="submit" className="w-full mt-2">
									Change Password
								</Button>
							</form>
							<span className="text-xs text-muted-foreground">
								Password change is mocked for demo purposes.
							</span>
						</VBox>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => signOut({ callbackUrl: "/login" })}
						>
							Log out
						</Button>
					</div>
				</TabsContent>
			</Tabs>
		</VBox>
	);
}
