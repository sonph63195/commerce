import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface IBaseTextareaProps extends ComponentProps<"textarea"> {
	hint?: string;
	isError?: boolean;
}

export default function BaseTextarea({ className, hint, isError, ...props }: IBaseTextareaProps) {
	return (
		<div data-error={isError} className="group flex flex-col gap-1.5">
			<textarea
				className={cn(
					"border border-border rounded-md px-3.5 py-2.5 shadow-xs",
					"focus:outline-none",
					!isError && "focus:shadow-xs-focused-primary focus:border-primary",
					isError && "focus:shadow-xs-focused-error border-destructive",
					"disabled:bg-input-disabled",
					className,
				)}
				{...props}
			/>
		</div>
	);
}
