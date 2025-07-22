import { getProducts, getCategories } from "@/lib/api";
import { IProduct } from "@/models/product.model";
import { ICategory } from "@/models/category.model";
import { ProductView } from "@/components/pages/product-view";

export default async function HomePage() {
	const productData = await getProducts();
	const categoryData = await getCategories();

	const products: IProduct[] = productData.products;
	const categories: ICategory[] = categoryData.categories.map((name: string) => ({ name }));

	return <ProductView initialProducts={products} categories={categories} />;
}
