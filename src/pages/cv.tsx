import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import { Fragment, ReactElement } from "react";

import { Period, type PeriodProps } from "@/components/Period";

export default function CV(): ReactElement {
	const { t } = useTranslation();
	const cvContent: PeriodProps[] = t("cv.content");

	return (
		<div>
			<NextSeo title={t("cv.title")} description={t("cv.description")} />
			{cvContent.map((period, index) => (
				<Fragment key={period.title}>
					<Period {...period} />
					{index < cvContent.length - 1 && (
						<hr className="my-6 border-t border-gray-500" />
					)}
				</Fragment>
			))}
		</div>
	);
}
