import NextLink from "next/link";
import type { ComponentProps } from "react";

interface ILinkProps extends ComponentProps<typeof NextLink> {}

export default function Link(props: ILinkProps) {
	return <NextLink {...props} />;
}
