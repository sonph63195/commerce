"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRightIcon,
  CircleDotIcon,
  CompassIcon,
  LeafIcon,
  MoveRightIcon,
  OrbitIcon,
  PaletteIcon,
  ScanSearchIcon,
  ScissorsLineDashedIcon,
  SparklesIcon,
  StarsIcon,
} from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components";

const pillars = [
  {
    title: "Modern essentials",
    description:
      "Thiết kế tinh gọn, dễ mặc mỗi ngày nhưng vẫn giữ được cảm giác chỉn chu và có chủ đích.",
    icon: SparklesIcon,
  },
  {
    title: "Material first",
    description:
      "Ưu tiên bề mặt vải, độ rủ và khả năng sử dụng lâu dài để sản phẩm đẹp cả khi nhìn gần.",
    icon: LeafIcon,
  },
  {
    title: "Built for movement",
    description:
      "Phom dáng được cân bằng giữa sự thoải mái và đường nét, phù hợp nhịp sống thành thị.",
    icon: CompassIcon,
  },
] as const;

const values = [
  "Phom dáng sạch, ít chi tiết thừa.",
  "Màu sắc trung tính để phối đồ linh hoạt.",
  "Sản phẩm tập trung vào cảm giác mặc thật.",
  "Bộ sưu tập nhỏ, chọn lọc và có câu chuyện rõ ràng.",
] as const;

const processCards = [
  {
    title: "Thiết kế theo tủ đồ, không theo xu hướng ngắn hạn",
    description:
      "Mỗi collection được phát triển như một hệ sản phẩm có thể mặc cùng nhau, thay vì các item rời rạc.",
    icon: ScissorsLineDashedIcon,
  },
  {
    title: "Chất liệu là phần cốt lõi của trải nghiệm",
    description:
      "Chúng tôi ưu tiên cảm giác chạm, độ bền bề mặt và khả năng giữ form sau nhiều lần sử dụng.",
    icon: LeafIcon,
  },
  {
    title: "Visual language cần nhất quán với cách sản phẩm vận hành",
    description:
      "Hình ảnh, câu chữ và storefront đều được xây dựng để phản ánh cùng một tinh thần: điềm tĩnh, chính xác và dễ tiếp cận.",
    icon: PaletteIcon,
  },
] as const;

const milestones = [
  {
    year: "2022",
    phase: "Phase 01",
    title: "Brand direction",
    description:
      "Bắt đầu từ câu hỏi rất cơ bản: một brand tối giản cần làm gì để vẫn có cá tính khi bước vào đời sống thật.",
    focus: "Định nghĩa bản sắc",
    focusDetail: "Tạo ngôn ngữ thị giác đủ tối giản nhưng không lạnh, đủ hiện đại nhưng vẫn gần gũi.",
    outcome: "Định hình palette trung tính, cấu trúc thiết kế sạch và một giọng điệu điềm tĩnh.",
    userValue: "Người xem bắt đầu nhận ra brand qua cảm giác nhất quán thay vì qua các chi tiết gây ồn.",
    details: [
      "Nghiên cứu thói quen mặc đồ trong môi trường đô thị.",
      "Xác lập nguyên tắc về phom dáng, nhịp điệu layout và bề mặt chất liệu.",
      "Định nghĩa cách thương hiệu xuất hiện trên hình ảnh, câu chữ và không gian số.",
    ],
  },
  {
    year: "2024",
    phase: "Phase 02",
    title: "Signature edits",
    description:
      "Từ định hướng thương hiệu, brand chuyển sang tạo ra các dòng sản phẩm nền tảng có thể mặc lặp lại mỗi tuần.",
    focus: "Tinh chỉnh sản phẩm cốt lõi",
    focusDetail: "Thu hẹp để tập trung vào những item bán được lâu, mặc được nhiều và giữ form ổn định.",
    outcome: "Ra mắt nhóm wardrobe staples với khả năng phối đồ linh hoạt và cảm giác mặc đáng tin cậy.",
    userValue: "Người dùng thấy rõ brand không chỉ đẹp trên hình mà còn giải quyết nhu cầu mặc hàng ngày.",
    details: [
      "Thu gọn collection để tập trung vào item có tuổi thọ sử dụng cao.",
      "Tinh chỉnh độ rủ, độ đứng và độ thoải mái của từng thiết kế.",
      "Tạo hệ phối màu giúp các sản phẩm kết nối tự nhiên với nhau.",
    ],
  },
  {
    year: "2026",
    phase: "Phase 03",
    title: "Commerce Studio",
    description:
      "Brand bước sang giai đoạn kể câu chuyện hoàn chỉnh hơn, nơi trải nghiệm storefront phản ánh đúng tinh thần sản phẩm.",
    focus: "Mở rộng trải nghiệm mua sắm",
    focusDetail: "Biến catalog, storytelling và điều hướng mua hàng thành một hành trình thống nhất.",
    outcome: "Kết nối brand story, catalog và shopping flow thành trải nghiệm liền mạch hơn cho người dùng.",
    userValue: "Khách hàng hiểu brand nhanh hơn, tìm sản phẩm rõ hơn và cảm thấy hành trình mua sắm có chủ đích.",
    details: [
      "Đưa brand story vào storefront thay vì chỉ hiển thị sản phẩm.",
      "Tổ chức lại catalog để hỗ trợ khám phá nhanh và có chiều sâu hơn.",
      "Xây dựng shopping flow rõ ràng, mượt và nhất quán với visual language.",
    ],
  },
] as const;

function createFadeUp(prefersReducedMotion: boolean, delay = 0) {
  if (prefersReducedMotion) return {};

  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  };
}

function createStagger(prefersReducedMotion: boolean, amount = 0.1) {
  if (prefersReducedMotion) return {};

  return {
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.15 },
    variants: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: amount,
        },
      },
    },
  };
}

function createStaggerItem(prefersReducedMotion: boolean, x = 0) {
  if (prefersReducedMotion) return {};

  return {
    variants: {
      hidden: { opacity: 0, y: 28, x },
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.65, ease: "easeOut" as const },
      },
    },
  };
}

export function BrandPageContent() {
  const prefersReducedMotion = useReducedMotion()!;
  const fadeUp = createFadeUp(prefersReducedMotion);
  const stagger = createStagger(prefersReducedMotion);
  const staggerItem = createStaggerItem(prefersReducedMotion);

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden border-b bg-[linear-gradient(135deg,rgba(12,10,9,0.04),transparent_28%,rgba(245,158,11,0.12)_100%)]">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(12,10,9,0.12),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(245,158,11,0.24),transparent_20%),radial-gradient(circle_at_72%_68%,rgba(251,191,36,0.16),transparent_18%)]"
          animate={prefersReducedMotion ? undefined : { opacity: [0.85, 1, 0.9] }}
          transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-16 top-10 size-56 rounded-full bg-amber-200/45 blur-3xl"
          animate={prefersReducedMotion ? undefined : { x: [0, 28, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-1/3 size-64 rounded-full bg-stone-300/40 blur-3xl"
          animate={prefersReducedMotion ? undefined : { x: [0, -24, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={prefersReducedMotion ? undefined : { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <motion.div className="space-y-6" {...createStagger(prefersReducedMotion, 0.12)}>
            <motion.div {...createStaggerItem(prefersReducedMotion)}>
              <Badge
                variant="outline"
                className="rounded-full border-foreground/15 bg-background/75 px-4 py-1 text-[11px] uppercase tracking-[0.28em] backdrop-blur"
              >
                Brand Story
              </Badge>
            </motion.div>

            <motion.div className="space-y-4" {...createStaggerItem(prefersReducedMotion)}>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Một brand thời trang không chỉ được nhìn thấy. Nó phải được cảm nhận qua từng bước chạm.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-foreground/72 sm:text-lg">
                Commerce Studio được xây dựng như một thế giới thị giác có nhịp điệu rõ ràng:
                từ phom dáng sản phẩm, chất liệu, ngôn ngữ hình ảnh cho đến trải nghiệm khám phá và mua sắm.
              </p>
            </motion.div>

            <motion.div className="grid max-w-2xl gap-3 sm:grid-cols-3" {...createStagger(prefersReducedMotion, 0.08)}>
              {[
                { value: "03", label: "Giai đoạn phát triển chính" },
                { value: "01", label: "Tinh thần thiết kế xuyên suốt" },
                { value: "∞", label: "Khả năng phối đồ hàng ngày" },
              ].map((item) => (
                <motion.div key={item.label} {...createStaggerItem(prefersReducedMotion)}>
                  <Card className="rounded-3xl border-foreground/10 bg-background/75 shadow-none backdrop-blur">
                    <CardContent className="p-4">
                      <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-3" {...createStaggerItem(prefersReducedMotion)}>
              <Button asChild size="lg" className="rounded-full shadow-sm">
                <Link href="/categories">
                  Khám phá danh mục
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-background/75 backdrop-blur">
                <Link href="/search">
                  Tìm sản phẩm
                  <ScanSearchIcon />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="relative" {...createFadeUp(prefersReducedMotion, 0.1)}>
            <motion.div
              className="absolute -right-3 top-8 rounded-full border border-foreground/10 bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground shadow-sm backdrop-blur"
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              From identity to experience
            </motion.div>

            <Card className="relative overflow-hidden rounded-[2rem] border-border/70 bg-card/80 shadow-none backdrop-blur">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
              <div className="absolute -bottom-8 right-0 size-40 rounded-full bg-amber-200/30 blur-3xl" />

              <CardHeader className="space-y-4">
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Design Notes</p>
                <CardTitle className="max-w-sm text-2xl leading-tight">
                  Tính nhận diện đến từ nhịp điệu rõ ràng, không đến từ việc thêm quá nhiều chi tiết.
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" {...createStagger(prefersReducedMotion, 0.08)}>
                  {values.map((value) => (
                    <motion.div key={value} {...createStaggerItem(prefersReducedMotion, 18)}>
                      <div className="flex gap-3 rounded-2xl border bg-background/75 p-4 transition-transform duration-300 hover:translate-x-1">
                        <CircleDotIcon className="mt-0.5 size-4 text-muted-foreground" />
                        <p className="text-sm leading-6">{value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="rounded-[1.75rem] border bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(245,245,244,0.82))] p-5"
                  {...createFadeUp(prefersReducedMotion, 0.15)}
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <OrbitIcon className="size-4" />
                    Hành trình thương hiệu
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {["Identity", "Product", "Experience"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="rounded-full border bg-background px-3 py-1 text-sm">{item}</span>
                        {index < 2 ? <MoveRightIcon className="size-4 text-muted-foreground" /> : null}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div className="flex flex-col gap-3 pb-8" {...fadeUp}>
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Core Pillars</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ba nguyên tắc định hình toàn bộ brand.
          </h2>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-3" {...stagger}>
          {pillars.map(({ title, description, icon: Icon }) => (
            <motion.div key={title} {...staggerItem}>
              <Card className="group h-full rounded-3xl border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,245,244,0.8))] shadow-none transition-all duration-300 hover:-translate-y-2 hover:border-foreground/20">
                <CardHeader className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-muted transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-2xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-y bg-[linear-gradient(180deg,rgba(245,245,244,0.78),rgba(255,255,255,1))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_22%),radial-gradient(circle_at_85%_80%,rgba(12,10,9,0.08),transparent_24%)]" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div className="relative space-y-4" {...fadeUp}>
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Our Process</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Từ cảm hứng đến một tủ đồ sống được lâu.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Brand được xây dựng từ góc nhìn thực tế: sản phẩm cần đẹp trên hình, nhưng quan trọng hơn là
              phải mặc ổn định, phối dễ và giữ được giá trị sử dụng qua nhiều mùa.
            </p>
          </motion.div>

          <motion.div className="relative grid gap-5" {...createStagger(prefersReducedMotion, 0.12)}>
            {processCards.map(({ title, description, icon: Icon }, index) => (
              <motion.div key={title} {...createStaggerItem(prefersReducedMotion, index % 2 === 0 ? 28 : -28)}>
                <div className="rounded-3xl border bg-background/85 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                          Step 0{index + 1}
                        </span>
                        <span className="h-px flex-1 bg-border" />
                      </div>
                      <h3 className="text-lg font-medium">{title}</h3>
                      <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]" {...createStagger(prefersReducedMotion, 0.12)}>
          <motion.div className="space-y-4 lg:sticky lg:top-28 lg:self-start" {...createStaggerItem(prefersReducedMotion)}>
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Timeline</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Hành trình phát triển được nhìn như một chuỗi quyết định, không chỉ là vài mốc năm.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Mỗi phase dưới đây trả lời ba câu hỏi: brand đang tập trung vào điều gì, thay đổi cụ thể là gì,
              và người dùng cuối cảm nhận được giá trị đó như thế nào trong hành trình mua sắm.
            </p>

            <motion.div
              className="rounded-[1.75rem] border bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,245,244,0.92))] p-5 shadow-none"
              {...createFadeUp(prefersReducedMotion, 0.1)}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <StarsIcon className="size-4" />
                Timeline logic
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl border bg-background p-4">
                  <p className="font-medium">1. Identity</p>
                  <p className="mt-1 text-muted-foreground">Xây nền nhận diện và cảm xúc thương hiệu.</p>
                </div>
                <div className="rounded-2xl border bg-background p-4">
                  <p className="font-medium">2. Product</p>
                  <p className="mt-1 text-muted-foreground">Biến định hướng đó thành sản phẩm mặc được thật.</p>
                </div>
                <div className="rounded-2xl border bg-background p-4">
                  <p className="font-medium">3. Experience</p>
                  <p className="mt-1 text-muted-foreground">Mở rộng sang hành trình khám phá và mua sắm liền mạch.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="relative pl-8 sm:pl-12" {...createStaggerItem(prefersReducedMotion)}>
            <div className="absolute bottom-2 left-3 top-2 w-px overflow-hidden rounded-full bg-gradient-to-b from-foreground/12 via-foreground/8 to-transparent sm:left-5">
              <motion.div
                className="w-full origin-top rounded-full bg-gradient-to-b from-amber-400 via-stone-900/70 to-transparent"
                initial={prefersReducedMotion ? undefined : { scaleY: 0, opacity: 0.4 }}
                whileInView={prefersReducedMotion ? undefined : { scaleY: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={prefersReducedMotion ? undefined : { duration: 1.4, ease: "easeOut" }}
                style={{ height: "100%" }}
              />
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.article
                  key={milestone.year}
                  className="relative"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40, x: index % 2 === 0 ? 32 : -32 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={prefersReducedMotion ? undefined : { duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute left-[-1.85rem] top-8 flex size-7 items-center justify-center rounded-full border border-foreground/15 bg-background shadow-sm sm:left-[-2.95rem]"
                    initial={prefersReducedMotion ? undefined : { scale: 0.7, opacity: 0 }}
                    whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: index * 0.12 }}
                  >
                    <motion.div
                      className="size-2.5 rounded-full bg-foreground/80"
                      animate={prefersReducedMotion ? undefined : { scale: [1, 1.35, 1], opacity: [1, 0.75, 1] }}
                      transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                    />
                  </motion.div>

                  <Card className="overflow-hidden rounded-[2rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.92))] shadow-none transition-transform duration-300 hover:-translate-y-1">
                    <div className="grid gap-0 lg:grid-cols-[170px_1fr]">
                      <div className="border-b bg-[linear-gradient(180deg,rgba(245,245,244,0.88),rgba(255,255,255,0.92))] p-6 lg:border-r lg:border-b-0">
                        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                          {milestone.phase}
                        </p>
                        <p className="mt-3 text-4xl font-semibold tracking-tight">{milestone.year}</p>
                        <div className="mt-4 rounded-2xl border bg-background/85 p-4">
                          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Mục tiêu chính</p>
                          <p className="mt-2 text-sm font-medium">{milestone.focus}</p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{milestone.focusDetail}</p>
                        </div>
                      </div>

                      <div className="space-y-5 p-6">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.24em]">
                              {milestone.phase}
                            </Badge>
                            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              {index === 0 ? "Khởi tạo" : index === 1 ? "Củng cố" : "Mở rộng"}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold">{milestone.title}</h3>
                          <p className="text-sm leading-7 text-muted-foreground">{milestone.description}</p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <div className="rounded-2xl border bg-muted/25 p-4">
                            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                              Brand changed
                            </p>
                            <p className="mt-2 text-sm leading-7">{milestone.outcome}</p>
                          </div>
                          <div className="rounded-2xl border bg-amber-50/60 p-4">
                            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                              User feels
                            </p>
                            <p className="mt-2 text-sm leading-7">{milestone.userValue}</p>
                          </div>
                        </div>

                        <motion.div className="grid gap-3" {...createStagger(prefersReducedMotion, 0.07)}>
                          {milestone.details.map((detail) => (
                            <motion.div key={detail} {...createStaggerItem(prefersReducedMotion, 18)}>
                              <div className="flex gap-3 rounded-2xl border border-dashed bg-background p-4">
                                <CircleDotIcon className="mt-1 size-4 text-muted-foreground" />
                                <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>

                        {index < milestones.length - 1 ? (
                          <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            <span>Tiếp nối sang</span>
                            <MoveRightIcon className="size-4" />
                            <span>{milestones[index + 1].phase}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            <span>Hiện tại</span>
                            <MoveRightIcon className="size-4" />
                            <span>Mở rộng chiều sâu trải nghiệm brand</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
