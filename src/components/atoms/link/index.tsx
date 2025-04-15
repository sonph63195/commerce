import NextLink from "next/link";
import type { ComponentProps } from "react";
import ButtonLink from "./button-link";

export function Link(props: ComponentProps<typeof NextLink>) {
	return <NextLink {...props} />;
}

export { ButtonLink };
export default Link;
