"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
	return (
		<div>
			<h2 className="text-xl font-bold">Oh no!</h2>
			<p className="my-2">
				There was an issue with our storefront. This could be a temporary issue, please try your
				action again.
			</p>
			<button
				type="button"
				className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
				onClick={() => reset()}
			>
				Try Again
			</button>
		</div>
	);
}
