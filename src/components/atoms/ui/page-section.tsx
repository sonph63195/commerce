import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/organisms/app-header";
import VBox from "../box/VBox";

/**
 * PageSection is a reusable layout for pages with a header and main content.
 * @param title - The page title
 * @param description - Optional page description
 * @param leading - Optional leading element (overrides default title/description)
 * @param trailing - Optional trailing element (e.g., actions, cart)
 * @param children - Main content of the page
 */
export interface IPageSectionProps {
	title?: string;
	description?: string;
	leading?: ReactNode;
	trailing?: ReactNode;
	children: ReactNode;
	className?: string;
}

export function PageSection({
	title,
	description,
	leading,
	trailing,
	children,
	className,
}: IPageSectionProps) {
	return (
		<main className={cn("flex-1", className)}>
			<AppHeader
				leading={
					leading ?? (
						<VBox>
							<h1 className="text-lg font-semibold ml-2">{title ?? ""}</h1>
							{description && (
								<span className="text-sm text-muted-foreground ml-2">{description}</span>
							)}
						</VBox>
					)
				}
				trailing={trailing}
			/>
			{children}
		</main>
	);
}
