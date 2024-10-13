/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import React from "react";

import { Period, type PeriodProps } from "@/components/Period";

export default function CV(): JSX.Element {
	const { t } = useTranslation();
	const cvContent: PeriodProps[] = t("cv.content");

	return (
		<>
			<NextSeo title={t("cv.title")} description={t("cv.description")} />
			{cvContent.map((period, index) => (
				<React.Fragment key={period.title}>
					<Period {...period} />
					{index < cvContent.length - 1 && (
						<hr className="my-6 border-t border-gray-500" />
					)}
				</React.Fragment>
			))}
		</>
	);
}
