import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation, useLanguageQuery } from "next-export-i18n";
import { ReactElement, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { LanguagePicker } from "./LanguagePicker";

export function Navbar(): ReactElement {
	const { t } = useTranslation();
	const [query] = useLanguageQuery();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const navbarOptions = [
		{ title: t("blog.title"), path: "/blog" },
		{ title: t("work.title"), path: "/work" },
		{ title: t("education.title"), path: "/education" },
		{ title: t("projects.title"), path: "/projects" },
		{ title: t("contact.title"), path: "/contact" },
	];

	return (
		<nav className="flex flex-col md:flex-row items-center justify-center md:justify-between flex-wrap bg-blue-700 p-4">
			<div className="flex items-center flex-shrink-0 text-white md:mx-6 w-full md:w-auto">
				<Link href={{ pathname: "/", query }}>
					<span className="font-semibold text-3xl tracking-tight">
						Stanislav Kosorin
					</span>
				</Link>
				<div className="ml-auto flex items-center gap-3 md:hidden">
					<LanguagePicker />
					<button
						type="button"
						className="inline-flex items-center justify-center rounded p-2 text-pink-200 hover:text-white focus:outline-none"
						aria-expanded={open}
						aria-controls="mobile-menu"
						onClick={() => setOpen(!open)}
					>
						<span className="sr-only">Menu</span>
						{open ? (
							<AiOutlineClose className="h-6 w-6" />
						) : (
							<AiOutlineMenu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			<div className="hidden w-full md:flex md:flex-grow md:items-center md:w-auto md:mt-1">
				<div className="flex justify-center md:flex-grow items-center w-full md:items-center md:w-auto">
					{navbarOptions.map((option, idx) => (
						<Link key={idx.toString()} href={{ pathname: option.path, query }}>
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
			</div>

			{open && (
				<div id="mobile-menu" className="md:hidden w-full">
					<div className="flex flex-col pt-2">
						{navbarOptions.map((option, idx) => (
							<Link
								key={idx.toString()}
								href={{ pathname: option.path, query }}
								onClick={() => setOpen(false)}
							>
								<span
									className={`block py-3 text-lg ${
										router.asPath.startsWith(option.path)
											? "text-white"
											: "text-pink-200"
									} hover:text-white`}
								>
									{option.title}
								</span>
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
