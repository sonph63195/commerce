import Button, { type buttonVariants } from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import type { ILangParam } from "@/lib/settings/i18n/i18n.constant";

interface IHomeProps {
	params: Promise<ILangParam>;
}

export default function Home({ params }: IHomeProps) {
	return (
		<div className="flex flex-col align-items-center justify-center my-10 max-w-2xl mx-auto gap-10">
			<h1 className="text-3xl font-semibold">
				<Text params={params} text="greeting" />
			</h1>
		</div>
	);
}
