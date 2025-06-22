import type { PropsWithChildren } from "react";

interface IfProps {
	condition: boolean;
}

export default function If({ condition, children }: PropsWithChildren<IfProps>) {
	return condition && children;
}
