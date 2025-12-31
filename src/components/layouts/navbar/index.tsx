"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Compass, Home, NotebookText, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/cart.slice";

export function Navbar() {
  const isMobile = useIsMobile();
  const itemCount = useCart((s) => s.items.length);

  return (
    <>
      <NavigationMenu viewport={isMobile} className="absolute inset-x-0 bottom-1 md:top-1 md:bottom-[unset] bg-background my-0 mx-auto border rounded-lg p-1">
      <NavigationMenuList className={cn(
        "",
         // items
        "[&>li]:rounded-full ",
        "[&_li_a]:flex md:[&_li_a]:flex-row [&_li_a]:items-center",
        "[&_li>a>svg]:size-5!"
      )}>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <Home/>
              <span>Home</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#">
              <NotebookText />
              <span>News</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/categories">
              <Compass />
              <span>Explorer</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/search">
              <Search />
              <span>Search</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart />
              <span>Cart</span>
              <span className="absolute -top-1 -right-2 inline-flex items-center justify-center rounded-full bg-red-600 text-white text-xs px-1.5 py-0.5">{itemCount}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </>);
}

