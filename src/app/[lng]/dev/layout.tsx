import Link from "@/components/atoms/link";
import type { PropsWithChildren } from "react";

export default function DevLayout({ children }: PropsWithChildren) {
	return (
		<div className="m-5 flex flex-col gap-5">
			<nav className="">
				<ul className="flex w-full gap-3 items-center justify-evenly p-0.5 rounded-lg bg-gray-200">
					<li className="flex-1 bg-white  rounded-md py-1 px-2 shadow-xs border border-border">
						<Link href="/dev/button">Button</Link>
					</li>
					<li className="flex-1">
						<Link href="/dev/input">Input</Link>
					</li>
				</ul>
			</nav>
			{children}
		</div>
	);
}
