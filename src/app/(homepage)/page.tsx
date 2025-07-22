"use client";

import { useState, useEffect } from "react";
import { IProduct } from "@/models/product.model";
import { ICategory } from "@/models/category.model";
import {
	Button,
	Typography,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	AspectRatio,
} from "@/components";

export default function HomePage() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/categories");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setCategories(data.categories.map((name: string) => ({ name })));
			} catch (e: any) {
				setError(e.message);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setError(null);
			try {
				const categoryQuery = selectedCategory
					? `category=${selectedCategory}`
					: "";
				const response = await fetch(`/api/products?${categoryQuery}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setProducts(data.products);
			} catch (e: any) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [selectedCategory]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen text-xl">
				Loading products...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen text-xl text-red-500">
				Error: {error}
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<Typography variant="h1" className="mb-6 text-center">
				Our Products
			</Typography>

			<div className="flex justify-center space-x-4 mb-8">
				<Button
					onClick={() => setSelectedCategory(null)}
					variant={!selectedCategory ? "default" : "outline"}
				>
					All
				</Button>
				{categories.map((category) => (
					<Button
						key={category.name}
						onClick={() => setSelectedCategory(category.name)}
						variant={selectedCategory === category.name ? "default" : "outline"}
					>
						{category.name}
					</Button>
				))}
			</div>

			{products.length === 0 ? (
				<Typography variant="p" className="text-center text-xl text-gray-500">
					No products found for this category.
				</Typography>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<Card key={product.id} className="overflow-hidden">
							{product.images && product.images.length > 0 && (
								<AspectRatio ratio={16 / 9}>
									<img
										src={product.images[0]}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
								</AspectRatio>
							)}
							<CardHeader>
								<CardTitle>{product.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<Typography variant="p" className="text-lg">
									${product.price.toFixed(2)}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
