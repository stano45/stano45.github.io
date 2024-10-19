import { useLanguageQuery, LanguageSwitcher } from "next-export-i18n";
import { ReactElement, useEffect, useRef, useState } from "react";
import { ReactCountryFlag } from "react-country-flag";

interface Language {
	code: string;
	name: string;
	flag: string;
}

export function LanguagePicker(): ReactElement {
	const [query] = useLanguageQuery();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const languages: Language[] = [
		{ code: "en", name: "English", flag: "GB" },
		{ code: "de", name: "Deutsch", flag: "DE" },
		{ code: "sk", name: "Slovenčina", flag: "SK" },
		{ code: "sv", name: "Svenska", flag: "SE" },
	];
	const [selectedLang, setSelectedLang] = useState(
		languages.find((lang) => lang.code === query?.lang) ?? languages[0],
	);

	useEffect(() => {
		setSelectedLang(
			languages.find((lang) => lang.code === query?.lang) ?? languages[0],
		);
	}, [query?.lang]);

	const onSelectLang = (lang: Language) => {
		setSelectedLang(lang);
		setDropdownOpen(false);
	};

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: { target: unknown }) {
			if (ref.current && !ref.current.contains(event.target as Node | null)) {
				setDropdownOpen(false);
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		// Unbind the event listener on cleanup
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative z-10" ref={ref}>
			<button
				type="button"
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className="p-1 inline-flex justify-between items-center w-full text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500  "
			>
				<ReactCountryFlag
					countryCode={selectedLang.flag}
					svg
					style={{
						width: "1.5em",
						height: "1.5em",
					}}
					title={selectedLang.name}
				/>
			</button>
			{dropdownOpen && (
				<div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg w-full bg-blue-500 ring-1 ring-black ring-opacity-5">
					<ul className="py-1 text-sm">
						{languages.map((lang) => (
							<>
								<li
									key={lang.code}
									className="hover:bg-blue-500 hover:text-white"
								>
									<LanguageSwitcher lang={lang.code}>
										<button
											type="button"
											onClick={() => onSelectLang(lang)}
											className="inline-flex justify-between items-center w-full p-1 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
										>
											<ReactCountryFlag
												countryCode={lang.flag}
												svg
												style={{
													width: "1.5em",
													height: "1.5em",
												}}
												title={lang.flag}
											/>
										</button>
									</LanguageSwitcher>
								</li>
							</>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
