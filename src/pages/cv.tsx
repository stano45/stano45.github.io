import { Fragment, ReactElement } from "react";
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import { AiOutlineDownload } from "react-icons/ai";
import { Tooltip } from "@heroui/tooltip";

import { Period, type PeriodProps } from "@/components/Period";

export default function CV(): ReactElement {
	const { t } = useTranslation();
	const cvContent: PeriodProps[] = t("cv.content");

	return (
		<div className="w-full h-full">
			<NextSeo title={t("cv.title")} description={t("cv.description")} />
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl md:text-4xl font-bold text-center md:text-left leading-relaxed">
					{t("cv.title")}
				</h1>
				<Tooltip
					content={<span className="text-xl">{t("cv.download")}</span>}
					offset={-0.5}
					closeDelay={150}
				>
					<a
						className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 opacity-0 fade-in-second"
						href="/stanislav_kosorin_cv.pdf"
						download="stanislav_kosorin_cv.pdf"
					>
						<AiOutlineDownload className="text-2xl md:text-4xl" />
					</a>
				</Tooltip>
			</div>

			<div className="grid grid-cols-[auto,1fr] gap-x-4">
				{cvContent.map((period, index) => (
					<Fragment key={period.date}>
						<div className="relative flex flex-col items-center">
							<div className="w-4 h-4 bg-blue-500 rounded-full z-10" />
							{index < cvContent.length - 1 && (
								<div
									className="w-px bg-gray-300 flex-1"
									style={{
										marginTop: "-1rem",
										marginBottom: "-1rem",
									}}
								/>
							)}
						</div>
						<div className="mb-8">
							<Period {...period} />
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
}
