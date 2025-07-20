import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";
import NextAuthProvider from "./next-auth-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
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
	);
}
