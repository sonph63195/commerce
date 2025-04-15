import Button, { type buttonVariants } from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import type { ILangParam } from "@/lib/settings/i18n/i18n.constant";
import type { VariantProps } from "class-variance-authority";
import { use } from "react";

interface IHomeProps {
	params: Promise<ILangParam>;
	searchParams: Promise<{
		variant: VariantProps<typeof buttonVariants>["variant"];
	}>;
}

export default function Home({ params, searchParams }: IHomeProps) {
	const { variant = "primary" } = use(searchParams);

	return (
		<div className="flex flex-col align-items-center justify-center my-10 max-w-2xl mx-auto gap-10">
			<Text params={params} text="greeting" />
			<div className="flex gap-5">
				<div>
					<Button variant={variant} size="sm">
						Click me
					</Button>
				</div>

				<div>
					<Button variant={variant} size="md">
						Click me
					</Button>
				</div>

				<div>
					<Button variant={variant} size="lg">
						Click me
					</Button>
				</div>

				<div>
					<Button variant={variant} size="xl">
						Click me
					</Button>
				</div>

				<div>
					<Button variant={variant} disabled>
						Click me
					</Button>
				</div>
			</div>
		</div>
	);
}
