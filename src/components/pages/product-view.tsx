import { useState } from "react";
import { useApiQuery } from "@/hooks/use-axios";
import { API_ENDPOINTS } from "@/lib/constants";
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

interface ProductViewProps {
	initialProducts: IProduct[];
	categories: ICategory[];
}

export function ProductView({ initialProducts, categories }: ProductViewProps) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const { data: productsData, isLoading, error } = useApiQuery(
		["products", selectedCategory],
		`${API_ENDPOINTS.PRODUCTS}${selectedCategory ? `?category=${selectedCategory}` : ""}`,
		{},
		{
			initialData: { products: initialProducts },
			enabled: true,
		}
	);

	const products = productsData?.products || [];

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen text-xl">
				Loading products...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen text-xl text-red-500">
				Error: {error.message}
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