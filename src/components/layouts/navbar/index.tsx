"use client";

import Link from "next/link";
import { BadgeInfo, Compass, Home, NotebookText, Search, ShoppingCart } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useCart } from "@/store/cart.slice";

const navigationItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/brand", label: "Về brand", icon: BadgeInfo },
  { href: "#editorial", label: "Bộ sưu tập", icon: NotebookText },
  { href: "/categories", label: "Danh mục", icon: Compass },
  { href: "/search", label: "Tìm kiếm", icon: Search },
] as const;

export function TopNavBar() {
  const itemCount = useCart((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Commerce Studio
          </span>
          <span className="truncate text-base font-semibold sm:text-lg">
            Modern Fashion Landing
          </span>
        </Link>

        <NavigationMenu viewport={false} className="max-w-none">
          <NavigationMenuList className="flex flex-wrap justify-end gap-2">
            {navigationItems.map(({ href, label, icon: Icon }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  asChild
                  className="flex-row items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-border"
                >
                  <Link href={href}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="relative flex-row items-center gap-2 rounded-full border border-border px-3 py-2 text-sm"
              >
                <Link href="/cart">
                  <ShoppingCart />
                  <span>Giỏ hàng</span>
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-xs font-medium text-primary-foreground">
                    {itemCount}
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export const Navbar = TopNavBar;
