import type React from "react";
import { useState, useCallback } from "react";

export interface PeriodProps {
	title: string;
	date: string;
	company: string;
	details: React.ReactNode;
	url: string;
	urlName: string;
	urlLabel: string;
	type: string;
}

export function Period({
	title,
	date,
	company,
	details,
	url,
	urlLabel,
	type,
}: PeriodProps) {
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const toggleDropdown = useCallback(() => {
		setDropdownVisible((prev) => !prev);
	}, []);

	return (
		<>
			<div
				className="flex items-start cursor-pointer group"
				onClick={toggleDropdown}
				onKeyDown={toggleDropdown}
			>
				<div className="w-1/4 flex flex-col mr-4">
					<h4 className="text-xs md:text-sm font-medium text-gray-200">
						{date}
					</h4>
					<h4 className="hidden md:block text-xs md:text-sm text-gray-500">
						{type}
					</h4>
				</div>
				<h3
					className={`w-3/4 text-md md:text-xl font-bold transition duration-300 ease-in-out ${
						dropdownVisible
							? "-translate-y-1 scale-105"
							: "group-hover:-translate-y-1 group-hover:scale-105"
					}`}
				>
					<span className="title-style">{title}</span>
					<br className="sm:hidden" />
					<span className="mr-1 md:mx-2" aria-hidden="true">
						@
					</span>
					<span className="text-blue-200">{company}</span>
				</h3>
				<div
					className={`transform transition duration-300 ${
						dropdownVisible
							? "rotate-180 -translate-y-1 scale-105"
							: "group-hover:-translate-y-1 group-hover:scale-105"
					}`}
				>
					<svg
						role="img"
						aria-label="Toggle dropdown"
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
			<div
				className={`w-3/4 ml-auto overflow-hidden transition-all duration-300 ${
					dropdownVisible ? "max-h-[1000px]" : "max-h-0"
				}`}
			>
				<div className="text-md md:text-md mt-4 p-4 border border-gray-200 rounded">
					{details}
					<div className="mt-4">
						<a
							className="text-blue-500 underline"
							href={url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{urlLabel}
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
