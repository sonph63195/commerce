import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// src/lib/utils.ts
export function formatCurrency(amount: number, currency: string) {
	try {
		return new Intl.NumberFormat(currency === "VND" ? "vi-VN" : "en-US", {
			style: "currency",
			currency,
			maximumFractionDigits: currency === "VND" ? 0 : 2,
		}).format(amount);
	} catch {
		return amount.toString();
	}
}
