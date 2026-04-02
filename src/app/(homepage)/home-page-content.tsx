"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
} from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components";
import type { ProductListing } from "@/models/catalog/product-listing";

type HomePageContentProps = {
  featuredProducts: ProductListing[];
};

function formatPrice(price?: number) {
  if (typeof price !== "number") return "Liên hệ";

  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export function HomePageContent({ featuredProducts }: HomePageContentProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroProduct = featuredProducts[0];

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  const stagger = prefersReducedMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
        variants: {
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        },
      };

  const staggerItem = prefersReducedMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: "easeOut" as const },
          },
        },
      };

  return (
    <main>
      <section className="overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <motion.div className="flex flex-col justify-center gap-8" {...stagger}>
            <motion.div className="flex flex-col gap-4" {...staggerItem}>
              <Badge variant="secondary" className="w-fit rounded-full px-4 py-1">
                New season editorial
              </Badge>
              <div className="flex flex-col gap-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Định hình phong cách hàng ngày bằng những thiết kế gọn gàng, sắc nét.
                </h1>
                <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                  Landing page tập trung vào hình ảnh thời trang nổi bật, thông điệp rõ ràng và trải nghiệm mua sắm trực quan từ cái nhìn đầu tiên.
                </p>
              </div>
            </motion.div>

            <motion.div className="flex flex-col gap-3 sm:flex-row" {...staggerItem}>
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/categories">
                  Khám phá bộ sưu tập
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link href="/search">Tìm sản phẩm phù hợp</Link>
              </Button>
            </motion.div>

            <motion.div className="grid gap-4 sm:grid-cols-3" {...stagger}>
              {[
                {
                  title: "Giao nhanh",
                  description: "Toàn quốc",
                  icon: TruckIcon,
                },
                {
                  title: "Thanh toán",
                  description: "Minh bạch",
                  icon: ShieldCheckIcon,
                },
                {
                  title: "Chọn lọc",
                  description: "Thiết kế nổi bật",
                  icon: SparklesIcon,
                },
              ].map(({ title, description, icon: Icon }) => (
                <motion.div key={title} {...staggerItem}>
                  <Card className="rounded-3xl border-border/70 bg-card/70 shadow-none">
                    <CardContent className="flex items-center gap-3 p-5">
                      <Icon className="text-muted-foreground" />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div id="editorial" className="relative" {...fadeUp}>
            <motion.div
              className="absolute inset-0 -z-10 rounded-[2rem] bg-muted/50"
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.02, 1] }}
              transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                transition={prefersReducedMotion ? undefined : { duration: 0.25, ease: "easeOut" }}
              >
                <Card className="overflow-hidden rounded-[2rem] border-border/70 bg-card shadow-none">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                      transition={prefersReducedMotion ? undefined : { duration: 0.45, ease: "easeOut" }}
                    >
                      {heroProduct?.thumbnailUrl ? (
                        <img
                          src={heroProduct.thumbnailUrl}
                          alt={heroProduct.title}
                          className="aspect-[4/5] h-full w-full object-cover"
                        />
                      ) : (
                        <div className="aspect-[4/5] w-full bg-muted" />
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div className="flex flex-col gap-4" {...stagger}>
                <motion.div {...staggerItem}>
                  <Card className="rounded-[2rem] border-border/70 bg-card shadow-none">
                    <CardHeader className="gap-3">
                      <Badge variant="outline" className="w-fit rounded-full">
                        Hero highlight
                      </Badge>
                      <CardTitle className="text-2xl">
                        {heroProduct?.title ?? "Curated fashion selection"}
                      </CardTitle>
                      <CardDescription>
                        {heroProduct?.shortDescription ?? "Hình ảnh thời trang chủ đạo được đặt ở vị trí trung tâm để truyền tải tinh thần bộ sưu tập."}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="items-end justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-muted-foreground">Giá từ</p>
                        <motion.p
                          className="text-2xl font-semibold"
                          initial={prefersReducedMotion ? undefined : { opacity: 0, filter: "blur(6px)" }}
                          whileInView={prefersReducedMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
                          viewport={{ once: true }}
                          transition={prefersReducedMotion ? undefined : { duration: 0.45, delay: 0.2 }}
                        >
                          {formatPrice(heroProduct?.price)}
                        </motion.p>
                      </div>
                      {heroProduct ? (
                        <Button asChild variant="outline" className="rounded-full">
                          <Link href={`/products/${heroProduct.slug}`}>Xem chi tiết</Link>
                        </Button>
                      ) : null}
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div {...staggerItem}>
                  <Card className="rounded-[2rem] border-border/70 bg-card shadow-none">
                    <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-1">
                        <p className="text-3xl font-semibold">24h</p>
                        <p className="text-sm text-muted-foreground">Cập nhật nhanh các thiết kế mới và giá bán rõ ràng.</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-3xl font-semibold">4+</p>
                        <p className="text-sm text-muted-foreground">Mẫu nổi bật được đẩy lên đầu trang để tăng khả năng chuyển đổi.</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <motion.div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" {...fadeUp}>
          <div className="flex flex-col gap-3">
            <Badge variant="secondary" className="w-fit rounded-full px-4 py-1">
              Sản phẩm nổi bật
            </Badge>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold tracking-tight">Các thẻ sản phẩm được trình bày rõ ràng, cao cấp và dễ mua.</h2>
              <p className="max-w-2xl text-muted-foreground">
                Mỗi card ưu tiên hình ảnh lớn, giá minh bạch và đường dẫn trực tiếp tới trang chi tiết sản phẩm.
              </p>
            </div>
          </div>

          <Button asChild variant="outline" className="rounded-full">
            <Link href="/categories">
              Xem toàn bộ danh mục
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </motion.div>

        {featuredProducts.length > 0 ? (
          <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" {...stagger}>
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                {...staggerItem}
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                transition={prefersReducedMotion ? undefined : { duration: 0.25, ease: "easeOut" }}
              >
                <Card className="overflow-hidden rounded-[2rem] border-border/70 bg-card shadow-none">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                      transition={prefersReducedMotion ? undefined : { duration: 0.45, ease: "easeOut" }}
                    >
                      {product.thumbnailUrl ? (
                        <img
                          src={product.thumbnailUrl}
                          alt={product.title}
                          className="aspect-[4/5] h-full w-full object-cover"
                        />
                      ) : (
                        <div className="aspect-[4/5] w-full bg-muted" />
                      )}
                    </motion.div>
                  </CardContent>
                  <CardHeader className="gap-3">
                    {product.category ? (
                      <Badge variant="outline" className="w-fit rounded-full">
                        {product.category.title}
                      </Badge>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <CardTitle className="line-clamp-1 text-xl">{product.title}</CardTitle>
                      <CardDescription className="line-clamp-2 min-h-10">
                        {product.shortDescription ?? "Thiết kế tối giản, dễ phối và phù hợp cho nhiều bối cảnh sử dụng."}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-muted-foreground">Giá bán</p>
                      <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
                    </div>
                    <Button asChild className="rounded-full">
                      <Link href={`/products/${product.slug}`}>Mua ngay</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Empty className="rounded-[2rem] border border-dashed">
            <EmptyHeader>
              <EmptyTitle>Chưa có sản phẩm nổi bật</EmptyTitle>
              <EmptyDescription>
                Khi dữ liệu từ Cosmic sẵn sàng, section này sẽ tự hiển thị sản phẩm thật trên landing page.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </section>
    </main>
  );
}
