"use client";

/**
 * SearchBar atom for the navbar.
 */
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "../atoms/ui/input";

interface ISearchBarProps {
	className?: string;
}
export function SearchBar({ className }: ISearchBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [value, setValue] = useState(searchParams.get("q") || "");

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const params = new URLSearchParams(Array.from(searchParams.entries()));
		if (value) {
			params.set("q", value);
		} else {
			params.delete("q");
		}
		router.push(`/search?${params.toString()}`);
	}

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<Input
				placeholder="Search products..."
				value={value}
				onChange={handleChange}
				className={cn("bg-background", className)}
				name="q"
				autoComplete="off"
			/>
		</form>
	);
}
