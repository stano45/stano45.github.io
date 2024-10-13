/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import Link from "next/link";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import React from "react";

export default function About(): JSX.Element {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();

	return (
		<>
			<NextSeo title={t("about.title")} description={t("about.description")} />
			<div className="mx-4 lg:mx-20 mt-10 flex justify-center opacity-0 fade-in-first">
				<div className="flex flex-col lg:flex-row items-center lg:items-center">
					<div className="max-w-4xl shadow-lg rounded-lg p-8">
						<h1 className="text-4xl font-bold mb-4 text-center lg:text-left">
							{t("about.heading")}
						</h1>
						<div className="mt-10">
							<p className="text-lg leading-relaxed mb-4 text-center lg:text-left">
								{t("about.intro")}
								<Link
									href={{ pathname: "https://www.tu.berlin/en" }}
									className="text-blue-500 underline"
								>
									{t("about.tub")}
								</Link>
								.
							</p>
							<p className="text-lg leading-relaxed mb-4 text-center lg:text-left">
								{t("about.cresta.intro")}
								<Link
									href={{ pathname: "https://www.cresta.com/" }}
									className="text-blue-500 underline"
								>
									{t("about.cresta.content")}
								</Link>{" "}
								{t("about.cresta.outro")}
							</p>
							<p className="text-lg leading-relaxed mb-4 text-center lg:text-left">
								{t("about.cv.intro")}
								<Link
									href={{ pathname: "/cv", query: query }}
									className="text-blue-500 underline"
								>
									{t("about.cv.content")}
								</Link>
								{t("about.cv.outro")}
							</p>
							<p className="text-lg leading-relaxed mb-4 text-center lg:text-left">
								{t("about.projects.intro")}
								<Link
									href={{ pathname: "/cv", query: query }}
									className="text-blue-500 underline"
								>
									{t("about.projects.content")}
								</Link>
								{t("about.projects.outro")}
							</p>
							<p className="text-lg leading-relaxed mb-4 text-center lg:text-left">
								{t("about.sports.content")}
							</p>
						</div>
					</div>
					<div className="w-full lg:w-1/3 p-4 mt-10 lg:mt-0 flex justify-center lg:justify-center">
						<Image
							src={"/ai-campus-pic.jpeg"}
							alt={"Picture of Stanislav Kosorin"}
							className="rounded-full"
							width={300}
							height={300}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
