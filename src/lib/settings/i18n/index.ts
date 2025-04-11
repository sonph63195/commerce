import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultNS, fallbackLng, getOptions } from "./i18n.constant";

// all settings here following https://www.locize.com/blog/next-app-dir-i18n

const initI18next = async (lng: string, ns: string) => {
	const i18nInstance = createInstance();

	await i18nInstance
		.use(
			resourcesToBackend(
				(language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`),
			),
		)
		.init(getOptions(lng, ns));
	return i18nInstance;
};

export async function useBaseTranslation(
	lng?: string,
	ns?: string,
	options: Record<string, string> = {},
) {
	const i18nLng = lng ?? fallbackLng;
	const i18nNs = ns ?? defaultNS;

	const i18nextInstance = await initI18next(i18nLng, i18nNs);

	return {
		t: i18nextInstance.getFixedT(
			i18nLng,
			Array.isArray(i18nNs) ? i18nNs[0] : i18nNs,
			options.keyPrefix,
		),
		i18n: i18nextInstance,
	};
}
