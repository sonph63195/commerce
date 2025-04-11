import type { ILangParam } from "@/lib/settings/i18n/i18n.constant";
import { useBaseTranslation } from "@/lib/settings/i18n";
import { use, type PropsWithChildren } from "react";

interface ITextProps {
	params: Promise<ILangParam>;
	text: string;
	namespace?: string;
}

export default function Text({ params, text, namespace }: PropsWithChildren<ITextProps>) {
	const { lng: _param_lng } = use(params);
	const { t } = use(useBaseTranslation(_param_lng, namespace));

	return <>{t(text)}</>;
}
