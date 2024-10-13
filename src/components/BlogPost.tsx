import Image from "next/image";
import { NextSeo } from "next-seo";

import type { BlogPostProps } from "../types";

import { BlogPostHeading } from "./BlogPostHeading";

export function BlogPost({ post, children }: BlogPostProps): JSX.Element {
	return (
		<div className="w-5/6 md:w-2/3">
			<NextSeo title={post.title} description={post.description} />
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

			<Image src={post.image} alt={post.title} width={1000} height={1000} />

			<div className="text-md md:text-lg md:text-justify">{children}</div>
		</div>
	);
}
