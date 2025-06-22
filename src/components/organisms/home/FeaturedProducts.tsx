"use client";

/**
 * FeaturedProducts component for the eCommerce homepage.
 * Displays a grid of featured products (mock data for now).
 */
import { useEffect, useState } from "react";
import type { TProduct } from "@/models/product.model";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProductCardList } from "@/components/molecules/product/ProductCardList";
import { ProductPagination } from "@/components/molecules/product/ProductPagination";
import VBox from "@/components/atoms/box/VBox";
import { SkeletonList } from "@/components/molecules/SkeletonList";

interface IApiResponse {
	success: boolean;
	data: TProduct[];
	total: number;
	pageSize: number;
	pageNumber: number;
}

export function FeaturedProducts() {
	const [products, setProducts] = useState<TProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize] = useState(9);
	const [total, setTotal] = useState(0);
	const router = useRouter();

	const search = typeof window !== "undefined" ? window.location.search : "";
	const params = new URLSearchParams(search);
	const q = params.get("q") || "";
	const category = params.get("category") || "";

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
	}, [pageNumber, q, category, pageSize]);

	const totalPages = Math.ceil(total / pageSize);

	return (
		<section className="w-full py-12">
			<VBox className="mx-auto gap-8 px-4">
				<h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">Featured Products</h2>
				{loading ? (
					<SkeletonList count={pageSize} />
				) : products.length === 0 ? (
					<p className="text-center text-muted-foreground">No products found.</p>
				) : (
					<ProductCardList products={products} />
				)}
				<ProductPagination
					totalPages={totalPages}
					currentPage={pageNumber}
					pageSize={pageSize}
					q={q}
					category={category}
					onPageChange={(page) => {
						setPageNumber(page);
						router.push(`?pageSize=${pageSize}&pageNumber=${page}`);
					}}
				/>
			</VBox>
		</section>
	);
}
