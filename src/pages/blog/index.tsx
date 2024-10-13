/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Image from "next/image";
import Link from "next/link";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import React from "react";

import { CSGuidePost, internationalizationPost } from "@/blogposts";

const POSTS = [CSGuidePost, internationalizationPost];

export default function Blog(): JSX.Element {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();

	return (
		<>
			<NextSeo title={t("blog.title")} description={t("blog.description")} />
			<div className="grid grid-cols-1">
				{POSTS.map((post) => (
					<Link
						key={post.id}
						href={{ pathname: `/blog/${post.id}`, query: query }}
					>
						<div className="mb-10 rounded-lg shadow-md hover:bg-orange-100 bg-white flex flex-row items-center justify-start group break-words max-h-56 overflow-hidden">
							<Image
								src={post.image}
								alt={post.title}
								className="w-1/2 object-cover rounded-lg md:h-80 shrink-0"
								width={1000}
								height={1000}
								style={{ objectFit: "cover", height: "100%" }} // Ensure the image covers the height fully
							/>
							<div
								className="w-1/2 p-4 justify-start items-center"
								style={{ overflow: "hidden" }}
							>
								<h2 className="text-lg md:text-2xl text-black font-semibold break-normal">
									{post.title}
								</h2>
								<span className="text-xs md:text-sm text-black">
									{post.date}
								</span>
								<ul className="flex flex-wrap mt-2">
									{post.tags.map((tag) => (
										<li
											key={tag}
											className="bg-orange-100 text-gray-700 px-2 py-1 mr-2 mb-2 rounded-md text-xs md:text-sm group-hover:bg-white"
										>
											{tag}
										</li>
									))}
								</ul>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
}
