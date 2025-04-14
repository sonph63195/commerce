import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary: "",
				secondary: "",
				tertiary: "",
				link: "",
			},
			size: {
				sm: "px-3 py-1.5 text-sm",
				md: "px-4 py-2 text-base",
				lg: "px-5 py-2.5 text-lg",
				xl: "px-6 py-3 text-xl",
			},
			buttonStyle: {
				color: "",
				gray: "",
			},
			destructive: {
				true: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			},
			iconPosition: {
				true: "", // icon only
				leading: "",
				trailing: "",
			},
		},
		compoundVariants: [
			// Style variants
			{
				variant: "primary",
				buttonStyle: "color",
				class: "bg-primary text-primary-foreground hover:bg-primary/90",
			},
			{
				variant: "primary",
				buttonStyle: "gray",
				class: "bg-foreground text-background hover:bg-foreground/90",
			},
			{
				variant: "secondary",
				buttonStyle: "color",
				class: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			},
			{
				variant: "secondary",
				buttonStyle: "gray",
				class: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			},
			{
				variant: "tertiary",
				buttonStyle: "color",
				class: "border border-primary text-primary hover:bg-primary/10",
			},
			{
				variant: "tertiary",
				buttonStyle: "gray",
				class: "border border-foreground text-foreground hover:bg-foreground/10",
			},
			{
				variant: "link",
				buttonStyle: "color",
				class: "text-primary underline-offset-4 hover:underline",
			},
			{
				variant: "link",
				buttonStyle: "gray",
				class: "text-foreground underline-offset-4 hover:underline",
			},
			// Icon size variants
			{
				iconPosition: true,
				size: "sm",
				class: "p-1.5",
			},
			{
				iconPosition: true,
				size: "md",
				class: "p-2",
			},
			{
				iconPosition: true,
				size: "lg",
				class: "p-2.5",
			},
			{
				iconPosition: true,
				size: "xl",
				class: "p-3",
			},
			// Icon spacing variants
			{
				iconPosition: "leading",
				class: "flex-row",
			},
			{
				iconPosition: "trailing",
				class: "flex-row-reverse",
			},
		],
		defaultVariants: {
			variant: "primary",
			size: "md",
			buttonStyle: "color",
		},
	},
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	iconContent?: React.ReactNode;
}

export default function Button({
	className,
	variant,
	size,
	buttonStyle,
	destructive,
	iconPosition,
	children,
	iconContent,
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				buttonVariants({ variant, size, buttonStyle, destructive, iconPosition }),
				className,
			)}
			{...props}
		>
			{iconContent}
			{iconPosition !== true && children}
		</button>
	);
}
