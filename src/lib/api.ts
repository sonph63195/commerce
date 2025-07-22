import { API_ENDPOINTS } from "./constants";

async function fetcher(url: string, options?: RequestInit) {
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error(`Failed to fetch from ${url}`);
	}
	return response.json();
}

export async function getProducts(category?: string | null) {
	const categoryQuery = category ? `?category=${category}` : "";
	const url = `${API_ENDPOINTS.PRODUCTS}${categoryQuery}`;
	return fetcher(url, { cache: 'no-store' });
}

export async function getCategories() {
	return fetcher(API_ENDPOINTS.CATEGORIES, { cache: 'no-store' });
}
