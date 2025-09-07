import { ReactElement } from "react";
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import {
	AiOutlineGithub,
	AiOutlineDownload,
	AiOutlineFilePdf,
} from "react-icons/ai";
import { Tooltip } from "@heroui/tooltip";

import { type PeriodProps } from "@/components/Period";
import { PeriodTimeline } from "@/components/PeriodTimeline";

export default function Projects(): ReactElement {
	const { t } = useTranslation();
	const periods: PeriodProps[] = t("projects.content");

	return (
		<div className="w-full h-full">
			<NextSeo
				title={t("projects.title")}
				description={t("projects.description")}
			/>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl md:text-4xl font-bold leading-relaxed">
					{t("projects.title")}
				</h1>
				<div className="flex gap-4">
					<Tooltip
						content={<span className="text-xl">{t("projects.github")}</span>}
						offset={-0.5}
						closeDelay={150}
					>
						<a
							className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 opacity-0 fade-in-second"
							href="https://github.com/stano45"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AiOutlineGithub className="text-2xl md:text-4xl" />
						</a>
					</Tooltip>
					<Tooltip
						content={<span className="text-xl">{t("work.open")}</span>}
						offset={-0.5}
						closeDelay={150}
					>
						<a
							className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 opacity-0 fade-in-second"
							href="Stanislav_Kosorin_Resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AiOutlineFilePdf className="text-2xl md:text-4xl" />
						</a>
					</Tooltip>
					<Tooltip
						content={<span className="text-xl">{t("work.download")}</span>}
						offset={-0.5}
						closeDelay={150}
					>
						<a
							className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 opacity-0 fade-in-second"
							href="Stanislav_Kosorin_Resume.pdf"
							download="Stanislav_Kosorin_Resume.pdf"
						>
							<AiOutlineDownload className="text-2xl md:text-4xl" />
						</a>
					</Tooltip>
				</div>
			</div>
			<PeriodTimeline periods={periods} />
		</div>
	);
}
