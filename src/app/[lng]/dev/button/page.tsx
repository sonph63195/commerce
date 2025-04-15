import Button, { type buttonVariants } from "@/components/atoms/button";
import { ButtonLink } from "@/components/atoms/link";
import { CircleIcon, PlusIcon } from "@radix-ui/react-icons";
import type { VariantProps } from "class-variance-authority";
import { use } from "react";

interface IDevButtonPageProps {
	searchParams: Promise<{
		variant: VariantProps<typeof buttonVariants>["variant"];
		style: VariantProps<typeof buttonVariants>["buttonStyle"];
	}>;
}

export default function DevButtonPage({ searchParams }: IDevButtonPageProps) {
	const { variant = "primary", style = "color" } = use(searchParams);

	return (
		<>
			<div className="flex flex-col  my-10 mx-auto gap-10">
				<div className="flex flex-col gap-5">
					<div className="flex gap-5 justify-center items-center">
						<h3>Variant:</h3>
						<ul className="flex gap-5 divide-x-1 divide-divider">
							<li>
								<ButtonLink
									variant="link"
									href={{
										pathname: "",
										query: {
											variant: "primary",
											style,
										},
									}}
								>
									Primary
								</ButtonLink>
							</li>
							<li>
								<ButtonLink
									variant="link"
									href={{
										pathname: "",
										query: {
											variant: "secondary",
											style,
										},
									}}
								>
									Secondary
								</ButtonLink>
							</li>
							<li>
								<ButtonLink
									variant="link"
									href={{
										pathname: "",
										query: {
											variant: "tertiary",
											style,
										},
									}}
								>
									Tertiary
								</ButtonLink>
							</li>
							<li>
								<ButtonLink
									variant="link"
									href={{
										pathname: "",
										query: {
											variant: "link",
											style,
										},
									}}
								>
									Link
								</ButtonLink>
							</li>
						</ul>
					</div>
					<div className="flex gap-5 justify-center items-center">
						<h3>Style:</h3>
						<ul className="flex gap-5 divide-x-1 divide-divider">
							<li>
								<ButtonLink
									variant="link"
									href={{
										pathname: "",
										query: {
											variant,
											style: "color",
										},
									}}
								>
									Color
								</ButtonLink>
							</li>
							<li>
								<ButtonLink
									variant="link"
									href={{
										pathname: "",
										query: {
											variant,
											style: "gray",
										},
									}}
								>
									Gray
								</ButtonLink>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex gap-5 bg-card p-6 rounded-2xl border border-divider shadow-xs">
					<div>
						<Button variant={variant} buttonStyle={style} size="sm">
							Click me
						</Button>
					</div>

					<div>
						<Button variant={variant} buttonStyle={style} size="md">
							Click me
						</Button>
					</div>

					<div>
						<Button variant={variant} buttonStyle={style} size="lg">
							Click me
						</Button>
					</div>

					<div>
						<Button variant={variant} buttonStyle={style} size="xl">
							Click me
						</Button>
					</div>

					<div>
						<Button variant={variant} buttonStyle={style} disabled>
							Click me
						</Button>
					</div>

					<div>
						<Button
							variant={variant}
							buttonStyle={style}
							size="sm"
							iconPosition={true}
							iconContent={<CircleIcon width={20} height={20} />}
						>
							Click me
						</Button>
					</div>

					<div>
						<Button
							variant={variant}
							buttonStyle={style}
							size="sm"
							iconPosition={true}
							iconContent={<PlusIcon width={20} height={20} />}
							className="rounded-full"
						>
							Click me
						</Button>
					</div>

					<div>
						<Button
							variant={variant}
							buttonStyle={style}
							size="xl"
							iconPosition={"leading"}
							iconContent={<PlusIcon width={20} height={20} />}
						>
							Click
						</Button>
					</div>
				</div>
				<div className="flex gap-5 bg-card p-6 rounded-2xl border border-divider shadow-xs">
					<div>
						<Button variant={variant} destructive>
							Click me
						</Button>
					</div>

					<div>
						<Button variant={variant} destructive disabled>
							Disabled
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
