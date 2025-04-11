import { type NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages, lngCookieName } from "./lib/settings/i18n/i18n.constant";
import acceptLanguage from "accept-language";
import { removeEmptyValue } from "./lib/utils";

export const config = {
	// matcher: ["/:path*"],
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)"],
};

acceptLanguage.languages(languages);

/**
 * NextJS Middleware
 * This function can be marked `async` if using `await` inside
 *
 * @link Readmore https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export async function middleware(request: NextRequest) {
	let lng: string | null = null;
	// get language from cookie
	if (request.cookies.has(lngCookieName)) {
		lng = acceptLanguage.get(request.cookies.get(lngCookieName)?.value);
	}
	// get language from header
	if (!lng) {
		lng = acceptLanguage.get(request.headers.get("accept-language"));
	}

	// get from fallback setting if both of theme are not found
	if (!lng) {
		lng = fallbackLng;
	}

	// Redirect if lng in path is not supported
	if (
		!languages.some((item) => request.nextUrl.pathname.startsWith(`/${item}`)) &&
		!request.nextUrl.pathname.startsWith("/_next")
	) {
		return NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url));
	}

	if (request.headers.has("referer")) {
		const refererUrl = new URL(removeEmptyValue(request.headers.get("referer")));
		const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
		const response = NextResponse.next();
		if (lngInReferer) response.cookies.set(lngCookieName, lngInReferer);
		return response;
	}

	return NextResponse.next();
}
