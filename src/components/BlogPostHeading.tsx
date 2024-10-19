import type { ReactElement, ReactNode } from "react";

interface BlogPostHeadingProps {
	children: ReactNode;
	level?: "h1" | "h2" | "h3";
}

export function BlogPostHeading({
	children,
	level = "h2",
}: BlogPostHeadingProps): ReactElement {
	if (level === "h1") {
		return <h1 className="my-8 text-3xl md:text-4xl font-bold">{children}</h1>;
	}
	if (level === "h2") {
		return <h2 className="mt-4 text-2xl md:text-3xl font-bold">{children}</h2>;
	}
	return <h3 className="mt-4 text-xl md:text-2xl font-bold">{children}</h3>;
}
