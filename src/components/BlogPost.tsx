import Image from "next/legacy/image";
import { ArticleJsonLd, NextSeo } from "next-seo";

import type { BlogPostProps } from "../types";

import { BlogPostHeading } from "./BlogPostHeading";
import { ReactElement } from "react";

export function BlogPost({ post, children }: BlogPostProps): ReactElement {
	return (
		<div>
			<NextSeo title={post.title} description={post.description} />
			<ArticleJsonLd
				useAppDir={false}
				url={`https://kosorin.com/blog/${post.id}`}
				title={post.title}
				images={[`https://kosorin.com${post.image}`]}
				datePublished={new Date(post.date).toISOString()}
				dateModified={new Date(post.date).toISOString()}
				authorName={[
					{
						name: "Stanislav Kosorin",
						url: "https://kosorin.com",
					},
				]}
				publisherName="Stanislav Kosorin"
				publisherLogo="https://kosorin.com/favicon.ico"
				description={post.description ?? ""}
				isAccessibleForFree={true}
			/>
			<BlogPostHeading level="h1">{post.title}</BlogPostHeading>

			<div className="flex justify-between items-center mb-4">
				<span className="hidden sm:block text-gray-500">{post.date}</span>
				<ul className="hidden sm:flex space-x-2">
					{post.tags.map((tag) => (
						<li
							key={tag}
							className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md flex justify-center items-center"
						>
							<p>{tag}</p>
						</li>
					))}
				</ul>
			</div>

			<Image
				src={post.image}
				alt={post.title}
				width={1000}
				height={1000}
				priority
			/>

			<div className="text-md md:text-justify">{children}</div>
		</div>
	);
}
