import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation, useLanguageQuery } from "next-export-i18n";
import { ReactElement } from "react";

import { LanguagePicker } from "./LanguagePicker";

export function Navbar(): ReactElement {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();
	const router = useRouter();

	const navbarOptions = [
		{ title: t("blog.title"), path: "/blog" },
		{ title: t("work.title"), path: "/work" },
		{ title: t("education.title"), path: "/education" },
		{ title: t("projects.title"), path: "/projects" },
		{ title: t("contact.title"), path: "/contact" },
	];

	return (
		<nav className="flex flex-col md:flex-row items-center justify-center md:justify-between flex-wrap bg-blue-700 p-4">
			<div className="flex items-center flex-shrink-0 text-white md:mx-6">
				<Link href={{ pathname: "/", query: query }}>
					<span className="font-semibold text-3xl tracking-tight">
						Stanislav Kosorin
					</span>
				</Link>
			</div>
			<div className="flex justify-center mt-3 md:flex-grow items-center w-full md:items-center md:w-auto  md:mt-1">
				{navbarOptions.map((option, idx) => (
					<Link
						key={idx.toString()}
						href={{ pathname: option.path, query: query }}
					>
						<button
							type="button"
							className={`block md:inline-block md:mt-0 ${
								router.asPath.startsWith(option.path)
									? "text-white"
									: "text-pink-200"
							} hover:text-white mr-6`}
						>
							{option.title}
						</button>
					</Link>
				))}
				<div className="flex md:ml-auto">
					<LanguagePicker />
				</div>
			</div>
		</nav>
	);
}
