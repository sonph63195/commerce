import Link from "@/components/atoms/link";
import type { PropsWithChildren } from "react";

export default function DevLayout({ children }: PropsWithChildren) {
	return (
		<div className="m-5 flex flex-col gap-5">
			<nav>
				<ul className="">
					<li>
						<Link href="/dev/button">Button</Link>
					</li>
					<li>
						<Link href="/dev/input">Input</Link>
					</li>
				</ul>
			</nav>
			{children}
		</div>
	);
}
