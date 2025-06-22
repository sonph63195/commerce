import { nanoid } from "nanoid";
import VBox from "../atoms/box/VBox";

export function SkeletonList({ count = 9 }: { count?: number }) {
	const keys = Array.from({ length: count }, () => nanoid());
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{keys.map((key) => (
				<VBox key={key} className="bg-muted rounded-lg shadow p-6 items-center gap-4 animate-pulse">
					<div className="w-20 h-20 bg-gray-300 rounded mb-2" />
					<div className="h-5 w-2/3 bg-gray-300 rounded mb-1" />
					<div className="h-4 w-1/2 bg-gray-200 rounded mb-1" />
					<div className="h-4 w-1/3 bg-gray-200 rounded mb-1" />
					<div className="h-8 w-full bg-gray-200 rounded" />
				</VBox>
			))}
		</div>
	);
}
