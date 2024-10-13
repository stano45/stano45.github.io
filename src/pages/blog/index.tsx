/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import React from "react";

import { CSGuidePost, internationalizationPost } from "@/blogposts";
import { BlogPostList } from "@/components";

export default function Blog(): JSX.Element {
	const { t } = useTranslation();

	return (
		<>
			<NextSeo title={t("blog.title")} description={t("blog.description")} />
			<div
				id="blog"
				className="mx-20 lg:ml-72 m-8 lg:mt-10 bg-black flex flex-col justify-center items-start opacity-0 fade-in-first"
			>
				<h1 className="text-4xl font-bold mb-10">{t("blog.heading")}</h1>
				<BlogPostList posts={[internationalizationPost, CSGuidePost]} />
			</div>
		</>
	);
}
