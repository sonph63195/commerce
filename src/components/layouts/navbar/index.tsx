"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Compass, Home, NotebookText, Search } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const isMobile = useIsMobile()

  return <>
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
            <Link href="#">
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
            <Link href="#">
              <Search />
              <span>Search</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </>;
}
