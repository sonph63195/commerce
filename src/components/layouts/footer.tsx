import Link from "next/link";

import { Separator } from "@/components";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Commerce Studio
            </p>
            <h2 className="max-w-md text-2xl font-semibold tracking-tight">
              Thời trang hiện đại cho nhịp sống thành thị.
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Khám phá các thiết kế tập trung vào phom dáng, chất liệu và khả năng phối đồ linh hoạt mỗi ngày.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <p className="font-medium">Điều hướng</p>
            <Link href="/">Trang chủ</Link>
            <Link href="/brand">Về brand</Link>
            <Link href="/categories">Danh mục</Link>
            <Link href="/search">Tìm kiếm</Link>
            <Link href="/cart">Giỏ hàng</Link>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <p className="font-medium">Liên hệ</p>
            <p className="text-muted-foreground">hello@commerce-studio.vn</p>
            <p className="text-muted-foreground">Ho Chi Minh City, Vietnam</p>
            <p className="text-muted-foreground">Mon - Sat, 09:00 - 21:00</p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Commerce Studio. All rights reserved.</p>
          <p>Crafted for modern storefront experiences.</p>
        </div>
      </div>
    </footer>
  );
}
