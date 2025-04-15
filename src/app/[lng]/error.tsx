"use client";

import Button from "@/components/atoms/button";
import { ButtonLink } from "@/components/atoms/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
	return (
		<div className="flex flex-col justify-center items-center h-svh">
			<div className="border border-divider bg-card p-6 rounded-2xl shadow-xs md:max-w-md">
				<div className="pt-2 pb-8">
					<h2 className="text-xl font-bold mb-5">Oh no!</h2>
					<p>
						There was an issue with our storefront. This could be a temporary issue, please try your
						action again.
					</p>
				</div>
				<div className="pt-6 flex gap-3">
					<ButtonLink variant="secondary" buttonStyle="gray" href="/">
						Go to homepage
					</ButtonLink>
					<Button onClick={() => reset()}>Try Again</Button>
				</div>
			</div>
		</div>
	);
}
