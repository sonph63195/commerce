import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface IBaseInputProps extends ComponentProps<"input"> {
	ref?: React.Ref<HTMLInputElement>;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	hint?: string;
	isError?: boolean;
	leadingText?: string;
}

export default function BaseInput({
	leadingIcon,
	trailingIcon,
	className,
	hint,
	isError,
	leadingText,
	...props
}: IBaseInputProps) {
	return (
		<div data-error={isError} className="group flex flex-col gap-1.5">
			<div
				className={cn(
					"group bg-input border border-border shadow-xs rounded-md inline-flex items-center gap-2",
					"text-base text-input-foreground [&_.icon]:text-input-placeholder",
					!isError && "has-[:focus]:shadow-xs-focused-primary has-[:focus]:border-primary",
					isError && "has-[:focus]:shadow-xs-focused-error border-destructive",
					"has-disabled:bg-input-disabled",
					!leadingText && "py-2.5 px-3.5",
					!!leadingText && "[&>.addon.leading-text]:border-r-1 [&>:last-child]:pr-3.5 *:py-2.5",
					className,
				)}
			>
				{leadingText && (
					<span className="addon leading-text px-3.5 bg-input-disabled rounded-[inherit] rounded-r-none">
						{leadingText}
					</span>
				)}
				{leadingIcon && <span className="icon leading-icon">{leadingIcon}</span>}
				<input
					className={cn(
						"flex-1 focus:outline-none text-base",
						"text-[inherit] placeholder:text-input-placeholder",
					)}
					{...props}
				/>
				{trailingIcon && <span className="icon trailing-icon">{trailingIcon}</span>}
			</div>
			{hint && (
				<p className={cn("text-sm text-input-placeholder", isError && "text-destructive")}>
					{hint}
				</p>
			)}
		</div>
	);
}
