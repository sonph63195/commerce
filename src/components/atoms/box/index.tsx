import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}
export default function Box({ asChild, className, ...props }: BoxProps) {
	const Comp = asChild ? Slot : "div";

	return <Comp className={cn("flex", className)} {...props} />;
}
