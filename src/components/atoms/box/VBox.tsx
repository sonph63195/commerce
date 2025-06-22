import type { ComponentProps } from "react";
import Box from ".";
import { cn } from "@/lib/utils";

export default function VBox({ className, ...props }: ComponentProps<typeof Box>) {
	return <Box className={cn("flex flex-col", className)} {...props} />;
}
