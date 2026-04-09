export function formatCategoryProductPrice(price?: number) {
  if (typeof price !== "number") return "Contact us";

  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
