import Image from "next/image";
import Link from "next/link";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

export default function About(): ReactElement {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();

	return (
		<>
			<NextSeo title={t("about.title")} description={t("about.description")} />
			<div className="flex flex-col items-center md:items-center">
				<div className="text-md md:text-lg flex flex-col gap-4">
					<h1 className="text-2xl md:text-4xl font-bold text-center md:text-left leading-relaxed ">
						{t("about.heading")}
					</h1>
					<p>
						{t("about.intro")}
						<Link
							href={{ pathname: "https://www.tu.berlin/en" }}
							className="text-blue-500 underline"
						>
							{t("about.tub")}
						</Link>
						.
					</p>
					<p>
						{t("about.cresta.intro")}
						<Link
							href={{ pathname: "https://www.cresta.com/" }}
							className="text-blue-500 underline"
						>
							{t("about.cresta.content")}
						</Link>{" "}
						{t("about.cresta.outro")}
					</p>
					<p>
						{t("about.cv.intro")}
						<Link
							href={{ pathname: "/cv", query: query }}
							className="text-blue-500 underline"
						>
							{t("about.cv.content")}
						</Link>
						{t("about.cv.outro")}
					</p>
					<p>
						{t("about.projects.intro")}
						<Link
							href={{ pathname: "/cv", query: query }}
							className="text-blue-500 underline"
						>
							{t("about.projects.content")}
						</Link>
						{t("about.projects.outro")}
					</p>
					<p>{t("about.sports.content")}</p>
				</div>
				<div className="w-80 h-80 relative mt-10">
					<Image
						className="rounded-full"
						src={"/ai-campus-pic.webp"}
						alt={"Picture of Stanislav Kosorin"}
						layout="fill"
						priority
					/>
				</div>
			</div>
		</>
	);
}
