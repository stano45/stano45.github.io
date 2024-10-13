/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useTranslation } from "next-export-i18n";
import React from "react";

import "./Period.module.css";
import { Period, type PeriodProps } from "./Period";

export function InteractiveCV(): JSX.Element {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const { t } = useTranslation();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const cvContent: PeriodProps[] | undefined | null = t("cv.content");

	return (
		<div className="opacity-0 fade-in-first w-5/6 lg:w-3/4 mt-10">
			<h1 className="text-4xl font-bold mb-10">{t("cv.title")}</h1>
			<div className="scroll-area h-[80vh] overflow-y-scroll px-4">
				{cvContent ? (
					cvContent.map((period, index) => (
						<React.Fragment key={period.title}>
							<Period {...period} />
							{index < cvContent.length - 1 && (
								<hr className="my-6 border-t border-gray-500" />
							)}
						</React.Fragment>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
