import Head from "next/head";
import { generateNextSeo, type NextSeoProps } from "next-seo/pages";
import type { ReactElement } from "react";

export function Seo(props: NextSeoProps): ReactElement {
	return <Head>{generateNextSeo(props)}</Head>;
}
