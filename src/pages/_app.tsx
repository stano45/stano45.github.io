import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { Layout } from "@/components";
import { ReactElement, useEffect, useRef } from "react";

const SUPPORTED_LANGS = ["en", "de", "sk", "sv"];

export default function App({ Component, pageProps }: AppProps): ReactElement {
	const router = useRouter();
	const detected = useRef(false);

	// Detect the browser language after hydration only. The static HTML is always
	// rendered in the default language (English), so applying a language during
	// the first client render would cause a hydration mismatch. Once mounted, we
	// set the `lang` query param, which next-export-i18n picks up.
	useEffect(() => {
		if (detected.current || !router.isReady || router.query.lang) {
			return;
		}
		detected.current = true;
		const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
		if (
			browserLang &&
			browserLang !== "en" &&
			SUPPORTED_LANGS.includes(browserLang)
		) {
			router.replace(
				{
					pathname: router.pathname,
					query: { ...router.query, lang: browserLang },
				},
				undefined,
				{ shallow: true },
			);
		}
	}, [router]);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
				/>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
