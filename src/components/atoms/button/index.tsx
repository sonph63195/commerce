import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
	"flex w-full items-center justify-center gap-2 tracking-wide rounded-lg shadow-xs cursor-pointer active:scale-95 transition delay-100 duration-200 ease-in-out focus:outline-none disabled:cursor-default disabled:active:scale-100",
	{
		variants: {
			variant: {
				primary: "",
				secondary: "",
				tertiary: "",
				link: "",
			},
			size: {
				sm: "text-sm font-semibold py-2 px-3.5",
				md: "text-sm font-semibold py-2.5 px-4",
				lg: "text-base font-semibold py-2.5 px-4.5",
				xl: "text-base font-semibold py-3 px-5",
			},
			buttonStyle: {
				color: "",
				gray: "",
			},
			destructive: {
				true: "",
			},
			iconPosition: {
				true: "", // icon only
				leading: "",
				trailing: "",
			},
		},
		compoundVariants: [
			// MARK: Style variants
			{
				variant: "primary",
				buttonStyle: ["color", "gray"],
				destructive: false,
				class:
					"bg-primary text-primary-foreground border border-blue-800 hover:bg-primary-hover focus:shadow-xs-focused-primary disabled:border-transparent disabled:bg-primary-disabled shadow-xs-inset",
			},
			{
				variant: "secondary",
				buttonStyle: "color",
				destructive: false,
				// TODO: Naming for color
				class:
					"bg-blue-50 hover:bg-blue-100 disabled:bg-blue-50/50 text-blue-700 disabled:text-blue-300 focus:shadow-xs-focused-primary",
			},
			{
				variant: "secondary",
				buttonStyle: "gray",
				destructive: false,
				class:
					"bg-secondary hover:bg-secondary-hover disabled:hover:bg-secondary text-secondary-foreground disabled:text-gray-300 border disabled:border-gray-200 focus:shadow-xs-focused-secondary",
			},
			{
				variant: "tertiary",
				buttonStyle: "color",
				destructive: false,
				// TODO: Naming for color
				class:
					"bg-transparent hover:bg-blue-50 disabled:hover:bg-transparent text-blue-700 disabled:text-gray-300 shadow-none",
			},
			{
				variant: "tertiary",
				buttonStyle: "gray",
				destructive: false,
				class:
					"bg-transparent hover:bg-gray-50 disabled:hover:bg-transparent text-gray-600 disabled:text-gray-300 shadow-none",
			},
			{
				variant: "link",
				buttonStyle: "color",
				destructive: false,
				// TODO: Naming for color
				class:
					"bg-transparent text-blue-700 hover:text-blue-800 disabled:text-gray-300 shadow-none",
			},
			{
				variant: "link",
				buttonStyle: "gray",
				destructive: false,
				class:
					"bg-transparent text-gray-600 hover:text-gray-700 disabled:text-gray-300 shadow-none",
			},

			// MARK: Icon only with size variants
			{
				iconPosition: true,
				size: "sm",
				class: "p-2",
			},
			{
				iconPosition: true,
				size: "md",
				class: "p-2.5",
			},
			{
				iconPosition: true,
				size: "lg",
				class: "p-3",
			},
			{
				iconPosition: true,
				size: "xl",
				class: "p-3.5",
			},
			// MARK:  Icon spacing variants
			{
				iconPosition: "leading",
				class: "flex-row",
			},
			{
				iconPosition: "trailing",
				class: "flex-row-reverse",
			},
			// MARK: Destructive variants
			{
				destructive: true,
				buttonStyle: ["color", "gray"],
				variant: "primary",
				class:
					"bg-destructive hover:bg-red-700 text-destructive-foreground focus:shadow-xs-focused-error disabled:bg-red-50/50 disabled:text-red-300 disabled:shadow-none shadow-xs-inset border border-red-700 disabled:border-transparent",
			},
			{
				destructive: true,
				buttonStyle: ["color", "gray"],
				variant: "secondary",
				class:
					"bg-white hover:bg-red-50 text-red-700 hover:text-red-800 border border-red-300 focus:shadow-xs-focused-error disabled:bg-red-50/50 disabled:text-red-300 disabled:shadow-none disabled:border-red-100",
			},
			{
				destructive: true,
				buttonStyle: ["color", "gray"],
				variant: "tertiary",
				class:
					"bg-red-50 hover:red-100 text-red-700 focus:shadow-xs-focused-error disabled:bg-red-50/50 disabled:text-red-300 disabled:shadow-none",
			},
			{
				destructive: true,
				buttonStyle: ["color", "gray"],
				variant: "link",
				class: "shadow-none text-red-700 hover:text-red-800 disabled:text-red-300",
			},
		],
		defaultVariants: {
			variant: "primary",
			size: "md",
			buttonStyle: "color",
			destructive: false,
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
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(
				"",
				buttonVariants({ variant, size, buttonStyle, destructive, iconPosition }),
				className,
			)}
			{...props}
		>
			{typeof iconContent === "string" ? <span>{iconContent}</span> : iconContent}
			{iconPosition !== true && children}
		</button>
	);
}
