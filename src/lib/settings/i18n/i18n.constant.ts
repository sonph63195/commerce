export const fallbackLng = "vi";
export const languages = [fallbackLng, "en"];
export const lngCookieName = "locale";
export const defaultNS = "common";

export function getOptions(lng?: string, ns?: string) {
	return {
		// debug: true,
		supportedLngs: languages,
		fallbackLng,
		lng: lng ?? fallbackLng,
		fallbackNS: defaultNS,
		defaultNS,
		ns: ns ?? defaultNS,
	};
}

export interface ILangParam {
	lng: string;
}
