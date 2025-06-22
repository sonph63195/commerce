"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { TProduct } from "@/models/product.model";
import { ProductFilters } from "@/components/molecules/product/ProductFilters";
import { ProductPagination } from "@/components/molecules/product/ProductPagination";
import { ProductCardList } from "@/components/molecules/product/ProductCardList";
import { SkeletonList } from "@/components/molecules/SkeletonList";

interface IApiResponse {
	success: boolean;
	data: TProduct[];
	total: number;
	pageSize: number;
	pageNumber: number;
}

export function SearchResults() {
	const searchParams = useSearchParams();
	const q = searchParams.get("q") || "";
	const pageNumber = Number(searchParams.get("pageNumber") || 1);
	const pageSize = Number(searchParams.get("pageSize") || 9);
	const category = searchParams.get("category") || "";
	const [products, setProducts] = useState<TProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	const [categories, setCategories] = useState<string[]>([]);

	useEffect(() => {
		async function fetchProducts() {
			setLoading(true);
			const url = `/api/products?pageSize=${pageSize}&pageNumber=${pageNumber}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`;
			const res = await fetch(url);
			const json: IApiResponse = await res.json();
			if (json.success) {
				setProducts(json.data);
				setTotal(json.total);
			}
			setLoading(false);
		}
		fetchProducts();
	}, [q, pageNumber, pageSize, category]);

	useEffect(() => {
		fetch("/api/categories")
			.then((res) => res.json())
			.then((json) => {
				if (json.success && Array.isArray(json.data)) {
					setCategories(json.data);
				}
			});
	}, []);

	const totalPages = Math.ceil(total / pageSize);

	if (loading) {
		return <SkeletonList count={pageSize} />;
	}

	return (
		<>
			<ProductFilters
				categories={categories}
				selectedCategory={category}
				q={q}
				pageSize={pageSize}
			/>
			{!products.length ? (
				<p className="text-center text-muted-foreground">No products found.</p>
			) : (
				<>
					<ProductCardList products={products} />
					<ProductPagination
						totalPages={totalPages}
						currentPage={pageNumber}
						pageSize={pageSize}
						q={q}
						category={category}
					/>
				</>
			)}
		</>
	);
}
