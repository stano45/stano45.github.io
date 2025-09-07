import Image from "next/image";
import Link from "next/link";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

import { CSGuidePost, internationalizationPost } from "@/blogposts";

const POSTS = [CSGuidePost, internationalizationPost];

export default function Blog(): ReactElement {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();

	return (
		<div className="w-full">
			<NextSeo title={t("blog.title")} description={t("blog.description")} />
			<div className="w-full flex flex-col items-center justify-center p-4 md:p-10 gap-4 md:gap-8">
				{POSTS.map((post) => (
					<Link
						key={post.id}
						href={{ pathname: `/blog/${post.id}`, query }}
						className="w-full rounded-lg shadow-md hover:bg-orange-100 bg-white flex flex-col md:flex-row items-center justify-start group break-words overflow-hidden"
					>
						{/* https://stackoverflow.com/a/65134645 */}
						<div className="w-80 h-44 md:w-96 md:h-64 relative">
							<Image
								src={post.image}
								alt={post.title}
								priority
								fill
								sizes="100vw"
							/>
						</div>
						<div className="w-full p-4 overflow-hidden">
							<h2 className="text-lg md:text-2xl text-black font-semibold break-normal">
								{post.title}
							</h2>
							<span className="text-xs md:text-sm text-black">{post.date}</span>
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
					</Link>
				))}
			</div>
		</div>
	);
}
