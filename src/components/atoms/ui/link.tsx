"use client";
import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";

/**
 * Universal Link component for internal and external navigation.
 * Wraps next/link and applies consistent styling and accessibility.
 */
export type TLinkProps = React.PropsWithChildren<
	NextLinkProps & {
		className?: string;
		external?: boolean;
	}
> &
	React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = React.forwardRef<HTMLAnchorElement, TLinkProps>(
	({ href, className, external, children, ...props }, ref) => {
		// External link detection
		const isExternal = external || (typeof href === "string" && /^(http|mailto:|tel:)/.test(href));

		if (isExternal) {
			return (
				<a
					ref={ref}
					href={href as string}
					className={cn("underline-offset-2 transition-colors hover:underline", className)}
					target="_blank"
					rel="noopener noreferrer"
					{...props}
				>
					{children}
				</a>
			);
		}
		return (
			<NextLink
				ref={ref}
				href={href}
				className={cn("underline-offset-2 transition-colors hover:underline", className)}
				{...props}
			>
				{children}
			</NextLink>
		);
	},
);
Link.displayName = "Link";

export { Link as default };
