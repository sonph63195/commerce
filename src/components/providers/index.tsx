import type React from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: React.PropsWithChildren) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
			{children}
		</ThemeProvider>
	);
}
