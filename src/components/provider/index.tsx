import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<Toaster />
		</ThemeProvider>
	);
}
