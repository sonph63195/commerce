import { Navbar } from "@/components/layouts";
import { CartSheet } from "@/components/cart/cart-sheet";

export default function StorefrontRootLayout(props: LayoutProps<"/">) {
  return <>
    <Navbar />
    <CartSheet />

  {props.children}</>
}
