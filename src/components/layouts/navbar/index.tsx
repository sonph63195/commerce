"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeInfo, Compass, Home, ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SearchAutocompleteInput } from "@/components/search/search-autocomplete-input";
import { CartStoreSync } from "@/components/cart/cart-store-sync";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart.slice";

const navigationItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/brand", label: "Về brand", icon: BadgeInfo },
  { href: "/categories", label: "Danh mục", icon: Compass },
] as const;

export function TopNavBar() {
  const totalItemCount = useCart((state) => state.totalItemCount());
  const setOpen = useCart((state) => state.setOpen);
  const pathname = usePathname();

  const isCurrentPage = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/";
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <CartStoreSync />

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 flex-col">
              <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Commerce Studio
              </span>
              <span className="truncate text-base font-semibold sm:text-lg">
                Modern Fashion Landing
              </span>
            </Link>

            <div className="hidden min-w-0 max-w-xl flex-1 lg:block">
              <SearchAutocompleteInput />
            </div>

            <NavigationMenu viewport={false} className="max-w-none">
              <NavigationMenuList className="flex flex-wrap justify-end gap-2">
                {navigationItems.map(({ href, label, icon: Icon }) => (
                  <NavigationMenuItem key={href}>
                    {(() => {
                      const isActive = isCurrentPage(href);

                      return (
                        <NavigationMenuLink
                          asChild
                          className={cn(
                            "flex-row items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors [&_svg]:text-current",
                            isActive
                              ? "!border-foreground/15 !bg-foreground !text-background hover:!bg-foreground/90 hover:!text-background focus:!bg-foreground focus:!text-background"
                              : "border-transparent text-foreground hover:border-border"
                          )}
                        >
                          <Link href={href} aria-current={isActive ? "page" : undefined}>
                            <Icon />
                            <span>{label}</span>
                          </Link>
                        </NavigationMenuLink>
                      );
                    })()}
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "relative flex-row items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-foreground"
                    )}
                  >
                    <button type="button" onClick={() => setOpen(true)} aria-label="Open cart">
                      <ShoppingCart />
                      <span>Giỏ hàng</span>
                      <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-xs font-medium text-primary-foreground">
                        {totalItemCount}
                      </span>
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="lg:hidden">
            <SearchAutocompleteInput />
          </div>
        </div>
      </header>
    </>
  );
}

export const Navbar = TopNavBar;
