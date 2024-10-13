/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import React from "react";

import { InteractiveCV } from "@/components";

export default function CV(): JSX.Element {
	const { t } = useTranslation();

	return (
		<>
			<NextSeo title={t("cv.title")} description={t("cv.description")} />
			<div
				id="cv"
				className="w-full bg-black flex flex-row justify-center items-start"
			>
				<InteractiveCV />
			</div>
		</>
	);
}
