import { Fragment, ReactElement } from "react";
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import { AiOutlineDownload } from "react-icons/ai";
import { Tooltip } from "@heroui/tooltip";

import { Period, type PeriodProps } from "@/components/Period";

interface PeriodTimelineProps {
	periods: PeriodProps[];
}

export function PeriodTimeline({ periods }: PeriodTimelineProps): ReactElement {
	return (
		<div className="grid grid-cols-[auto,1fr] gap-x-4">
			{periods.map((period, index) => (
				<Fragment key={period.date}>
					<div className="relative flex flex-col items-center">
						<div className="w-4 h-4 bg-blue-500 rounded-full z-10" />
						{index < periods.length - 1 && (
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
	);
}
