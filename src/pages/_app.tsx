import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Layout } from "@/components";
import { ReactElement } from "react";

export default function App({ Component, pageProps }: AppProps): ReactElement {
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
