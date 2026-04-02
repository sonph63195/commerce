import type { Metadata } from "next";
import { Footer } from "@/components/layouts";
import { BrandPageContent } from "./brand-page-content";

export const metadata: Metadata = {
  title: "Brand - Commerce Studio",
  description:
    "Khám phá câu chuyện, triết lý thiết kế và định hướng phát triển của Commerce Studio.",
};

export default function BrandPage() {
  return (
    <>
      <BrandPageContent />
      <Footer />
    </>
  );
}
