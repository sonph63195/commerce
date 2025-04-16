"use client";

import Link from "@/components/atoms/link";
import LoadingIndicator from "@/components/atoms/link/loading-indicator";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

const menuTabs = [
	{ href: "/dev/button", label: "Button" },
	{ href: "/dev/input", label: "Input" },
	{ href: "/dev/dropdown", label: "Dropdown" },
	{ href: "/dev/checkbox", label: "Chekbox" },
];

export default function DevLayout({ children }: PropsWithChildren) {
	const pathname = usePathname();
	const params = useParams();

	const isActive = (path: string) => `/${params.lng}${path}` === pathname;

	return (
		<div className="m-5 flex flex-col gap-5 bg-card p-5 rounded-lg border border-border">
			<div>
				<h2 className="text-2xl font-semibold">Develop Page</h2>
				<nav className="md:max-w-xl mx-auto">
					<ul className="flex w-full gap-2 items-center justify-evenly p-0.5 rounded-lg bg-gray-200">
						{menuTabs.map((tab) => (
							<li key={tab.href} className="flex w-full flex-1">
								<Link
									className={cn(
										"flex-1 rounded-md py-1 px-2 border border-transparent font-semibold text-sm text-center",
										"transition-all duration-200 ease-in-out",
										"focus:outline-none focus:shadow-xs-focused-primary",
										!isActive(tab.href) && "hover:bg-gray-300 hover:scale-105",
										isActive(tab.href) && "bg-white shadow-xs border border-border",
									)}
									href={tab.href}
									scroll={false}
									prefetch={false}
									aria-current={isActive(tab.href) ? "page" : undefined}
									aria-label={tab.label}
								>
									{tab.label}
									<LoadingIndicator />
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			{children}
		</div>
	);
}
