import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import type { ILangParam } from "@/lib/settings/i18n/i18n.constant";

interface IHomeProps {
	params: Promise<ILangParam>;
}

export default function Home({ params }: IHomeProps) {
	return (
		<div>
			<Text params={params} text="greeting" />
			<Button variant="secondary" buttonStyle="gray">
				Click me
			</Button>
		</div>
	);
}
