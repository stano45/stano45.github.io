import { ReactNode } from "react";

export interface BlogPostMeta {
	title: string;
	date: string;
	image: string;
	tags: string[];
	id: string;
	description?: string;
}

export interface BlogPostListProps {
	posts: BlogPostMeta[];
}

export interface BlogPostProps {
	post: BlogPostMeta;
	children: ReactNode;
}
