import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import { Fragment, ReactElement } from "react";

import { Period, type PeriodProps } from "@/components/Period";
import { AiOutlineDownload } from "react-icons/ai";
import { Tooltip } from "@heroui/react";

export default function CV(): ReactElement {
	const { t } = useTranslation();
	const cvContent: PeriodProps[] = t("cv.content");

	return (
		<div>
			<NextSeo title={t("cv.title")} description={t("cv.description")} />
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl md:text-4xl font-bold text-center md:text-left  leading-relaxed ">
					{t("cv.title")}
				</h1>
				<Tooltip
					content={<span className="text-xl">{t("cv.download")}</span>}
					offset={-5}
				>
					<a
						className="opacity-0 fade-in-second"
						href="/stanislav_kosorin_cv.pdf"
						download="stanislav_kosorin_cv.pdf"
					>
						<AiOutlineDownload className="text-2xl md:text-4xl" />
					</a>
				</Tooltip>
			</div>
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
