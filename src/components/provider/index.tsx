"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";
import NextAuthProvider from "./next-auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<NextAuthProvider>{children}</NextAuthProvider>

				{/* Sonner Toast Notifications */}
				<Toaster />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
