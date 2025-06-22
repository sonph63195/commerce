"use client";
import { Link as UILink } from "@/components/atoms/ui/link";

interface IProductFiltersProps {
	categories: string[];
	selectedCategory: string;
	q?: string;
	pageSize?: number;
}

export function ProductFilters({
	categories,
	selectedCategory,
	q = "",
	pageSize = 9,
}: IProductFiltersProps) {
	return (
		<div className="flex flex-wrap gap-2 mb-6">
			<UILink
				href={`?q=${encodeURIComponent(q)}&pageSize=${pageSize}&pageNumber=1`}
				className={`px-3 py-1 rounded ${!selectedCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
			>
				All
			</UILink>
			{categories.map((cat) => (
				<UILink
					key={cat}
					href={`?q=${encodeURIComponent(q)}&category=${encodeURIComponent(cat)}&pageSize=${pageSize}&pageNumber=1`}
					className={`px-3 py-1 rounded ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
				>
					{cat}
				</UILink>
			))}
		</div>
	);
}
