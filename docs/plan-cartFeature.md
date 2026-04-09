## Plan: Cart Feature (Chức năng giỏ hàng)

TL;DR - Triển khai kế hoạch cải tiến chức năng giỏ hàng trong dự án existing Next.js + Zustand + shadcn. Tái sử dụng store `cart.slice.ts` và các component `CartItemRow`, `CartContents`, `CartSheet`, `cart/page.tsx`; thêm nhánh persistence + nâng cấp logic giá + test.

Steps
1. Audit hiện trạng (đã xong): `src/store/cart.slice.ts`, `src/components/cart/*`, `src/app/(storefront)/cart/page.tsx`, `src/components/product/add-to-cart-button.tsx`, `src/components/layouts/navbar/index.tsx`.

2. Thiết kế mô hình dữ liệu mở rộng: `CartItem` cộng thêm `price`, `variantId`, `options`, `metadata` nếu cần.
   - CartItem: `{productId, slug, title, price?, thumbnailUrl?, quantity, variantId?, options?: Record<string,string>, metadata?: Record<string,any>}`.
   - State bổ sung: `discountAmount`, `shippingAmount`, `promoCode`, `taxPercent`, `taxAmount`, `estimatedTotal`.

3. Bổ sung tính năng store:
   a. `loadFromStorage` và `saveToStorage` (localStorage, `useEffect` client-only) trong `cart.slice.ts`.
   b. `itemCount`, `totalItemCount` selectors.
   c. `applyPromoCode(code)` / `removePromoCode()` / `getDiscount` logic.
   d. `setShipping(amount)` / `setTaxPercent(percent)`.
   e. `getTotal` mở rộng thành `getSubtotal`, `getTax`, `getTotal`.

4. UI nâng cấp:
   a. `cart-item-row` thêm `variant`, `options` hiển thị, sửa quantity buttons, xoá button.
   b. `cart-contents` thêm summary card: Subtotal / Discount / Tax / Shipping / Total, danh sách item qua `ItemGroup`, empty state.
   c. `cart-sheet` + `cart/page` dùng mới các selector và thêm input `promo code`, `shipping method`, `estimated total`.
   d. `navbar` hiển thị cart badge `itemCount` (hiện có) và chuyển `onClick` mở cart sheet.

5. Tích hợp kiểm thử:
   a. Unit tests cho `cart.slice` (Vitest): addItem existing/new, updateQuantity, removeItem, clear, pricing, persistence runner.
   b. Component tests for `CartContents` và `CartItemRow` (React Testing Library, `@testing-library/react`): UI render + interactions.
   c. E2E test (Playwright nếu set): add to cart -> open sheet -> update quantity -> checkout.

6. Release validation (manual):
   - Chạy `yarn lint`, `yarn test`, `yarn build`.
   - Chạy manual flow with dev server.

Relevant files
- `src/store/cart.slice.ts` (core state/logic, add persistence, discount, methods)
- `src/components/cart/cart-item-row.tsx` (cart row controls)
- `src/components/cart/cart-contents.tsx` (list và summary)
- `src/components/cart/cart-sheet.tsx` (drawer view, hành động nhanh)
- `src/app/(storefront)/cart/page.tsx` (cart page)
- `src/components/product/add-to-cart-button.tsx` (flow thêm vào giỏ hàng)
- `src/components/layouts/navbar/index.tsx` (badge, sheet trigger)

Verification
1. `yarn test` phải vượt qua toàn bộ test.
2. `yarn lint` sạch Biome lỗi.
3. `yarn build` thành công.
4. Mô phỏng: Mở trang sản phẩm, thêm 2 item, mở cart sheet, tăng giảm quantity, remove item, apply coupon, checkout button hiển thị giá chính xác.
5. Refresh trang (persisted cart) giữ được items.

Decisions
- Dùng Zustand + localStorage cho persist. Nếu cần shared server cart, tách ra sau.
- Promo đơn giản (fixed VND). Scope không bao gồm gateway thanh toán.
- Chỉ sửa cart feature, không chạm các route admin/cosmic.

Further Considerations
1. Nếu bạn cần priority: tôi đề xuất prior1=Persistence + detect item dedupe, prior2=cart summary breakdown, prior3=promo + shipping.
2. Nếu nên hỗ trợ multi-currency, đề xuất thêm `currency` vào CartItem rồi xử lý format.
3. Đã chạy review code, không cần thêm new shadcn component ngoại trừ giảm dùng Item primitives.*