import NextLink from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface IButtonLinkProps
	extends ComponentProps<typeof NextLink>,
		VariantProps<typeof buttonVariants> {
	iconContent?: React.ReactNode;
}

export default function ButtonLink({
	className,
	variant = "primary",
	size = "md",
	buttonStyle = "color",
	destructive,
	iconPosition,
	children,
	iconContent,
	...props
}: IButtonLinkProps) {
	return (
		<NextLink
			className={cn(
				"",
				buttonVariants({ variant, size, buttonStyle, destructive, iconPosition }),
				"w-fit",
				className,
			)}
			{...props}
		>
			{iconContent}
			{iconPosition !== true && children}
		</NextLink>
	);
}
