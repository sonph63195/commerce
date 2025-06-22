import type { PropsWithChildren } from "react";
import { UserCartStoreProvider } from "@/components/provider/user-cart-context";
import type { Metadata } from "next";
import VBox from "@/components/atoms/box/VBox";
import { SidebarProvider } from "@/components/atoms/ui/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";

export const metadata: Metadata = {
	title: {
		template: "%s | Commerce", // Adds " | My App" to child page titles
		default: "My Commerce Homepage", // Fallback title for pages without a specific title
	},
	description:
		"Welcome to our eCommerce platform. Explore products, manage your cart, and enjoy a seamless shopping experience.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<UserCartStoreProvider>
			<SidebarProvider>
				<AppSidebar />
				<VBox className="flex-1">
					{children}

					<footer className="w-full py-6 bg-background border-t border-border mt-8">
						<div className="flex flex-col items-center text-center gap-2">
							<p className="text-sm text-muted-foreground">
								&copy; {new Date().getFullYear()} Commerce. All rights reserved.
							</p>
						</div>
					</footer>
				</VBox>
			</SidebarProvider>
		</UserCartStoreProvider>
	);
}
