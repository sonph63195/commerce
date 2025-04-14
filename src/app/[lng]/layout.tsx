import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { baseUrl, removeEmptyValue } from "@/lib/utils";
import { fallbackLng, type ILangParam, languages } from "@/lib/settings/i18n/i18n.constant";
import { dir } from "i18next";
import React from "react";
import Providers from "@/components/providers";

const { SITE_NAME } = process.env;

const interSans = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: removeEmptyValue(SITE_NAME),
		template: `%s | ${removeEmptyValue(SITE_NAME)}`,
	},
	robots: {
		follow: true,
		index: true,
	},
};

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }));
}

interface IRootLayoutProps {
	params: Promise<ILangParam>;
}

export default function RootLayout({
	children,
	params,
}: Readonly<React.PropsWithChildren<IRootLayoutProps>>) {
	const { lng: _param_lng } = React.use(params);
	const lng = removeEmptyValue(_param_lng, fallbackLng);

	return (
		<Providers lang={lng}>
			<html lang={lng} dir={dir(lng)} className={interSans.variable}>
				<body>{children}</body>
			</html>
		</Providers>
	);
}
