/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation, useLanguageQuery } from "next-export-i18n";
import React, { useState } from "react";

import { LanguagePicker } from "./LanguagePicker";

export function Navbar(): JSX.Element {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navbarOptions = [
		{ title: t("blog.title"), path: "/blog" },
		{ title: t("cv.title"), path: "/cv" },
		{ title: t("contact.title"), path: "/contact" },
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="flex items-center justify-between flex-wrap bg-blue-700 p-4">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<Link href={{ pathname: "/", query: query }}>
					<span className="font-semibold text-3xl tracking-tight">
						Stanislav Kosorin
					</span>
				</Link>
			</div>
			<div className="flex flex-row md:flex-grow items-center w-full md:flex md:items-center md:w-auto mt-3 md:mt-1">
				{navbarOptions.map((option, idx) => (
					<Link
						key={idx.toString()}
						href={{ pathname: option.path, query: query }}
					>
						<button
							type="button"
							onClick={toggleMenu}
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
