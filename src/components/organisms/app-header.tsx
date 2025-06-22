import type { ReactNode } from "react";
import { SidebarTrigger } from "../atoms/ui/sidebar";
import HBox from "../atoms/box/HBox";

/**
 * AppHeader component for consistent page headers.
 * Accepts leading (title, description, etc.) and trailing (actions, etc.) content.
 */
export interface IAppHeaderProps {
	leading?: ReactNode;
	trailing?: ReactNode;
	hideSidebarTrigger?: boolean; // Optional prop to hide sidebar trigger
}

export function AppHeader({ leading, trailing, hideSidebarTrigger = false }: IAppHeaderProps) {
	return (
		<HBox className="justify-between items-center p-2 bg-background border-b border-border sticky top-0 z-50">
			<HBox className="leading items-center gap-2">
				{!hideSidebarTrigger && (
					<SidebarTrigger className="mr-2">
						<span className="sr-only">Toggle sidebar</span>
					</SidebarTrigger>
				)}
				{leading}
			</HBox>
			<HBox className="trailing">{trailing}</HBox>
		</HBox>
	);
}
