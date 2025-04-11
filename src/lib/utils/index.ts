import className from "classnames";
import { twMerge } from "tailwind-merge";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: "http://localhost:3000";

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
	if (v === undefined) {
		throw new Error(errorMessage);
	}

	return v;
}

export function removeEmptyValue<T>(value: T | undefined, fallbackText?: string): string {
	if (typeof value === "string") {
		return value.trim();
	}
	return fallbackText ?? "";
}

export function cn(...inputs: className.ArgumentArray) {
	return twMerge(className(inputs));
}
