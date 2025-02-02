// Period.tsx
import type React from "react";
import { useState, useCallback, ReactElement, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./Period.module.css";

export interface PeriodProps {
	title: string;
	date: string;
	description: string;
	details: React.ReactNode;
	url: string;
	urlName: string;
	urlLabel: string;
	type: string;
}

export function Period({
	title,
	date,
	description,
	details,
	url,
	urlName,
	urlLabel,
	type,
}: PeriodProps): ReactElement {
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = useCallback(() => {
		setDropdownVisible(!dropdownVisible);
	}, [dropdownVisible]);

	return (
		<>
			<div
				className="flex items-start cursor-pointer"
				onClick={toggleDropdown}
				onKeyDown={toggleDropdown}
			>
				<div className="w-1/4 flex flex-col mr-4">
					<h4 className="text-xs md:text-sm text-gray-400">{date}</h4>
					<h4 className="text-xs md:text-sm text-gray-500">{type}</h4>
				</div>
				<div className="w-3/4">
					<h3 className="text-lg md:text-xl font-bold">{title}</h3>
					<p className="text-sm md:text-lg mt-2">{description}</p>
				</div>
				<div
					className={`transform transition duration-300 ${dropdownVisible ? "rotate-180" : ""}`}
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
			<div className="w-3/4 ml-auto">
				<CSSTransition
					in={dropdownVisible}
					timeout={300}
					classNames={{
						enter: styles.slideEnter,
						enterActive: styles.slideEnterActive,
						exit: styles.slideExit,
						exitActive: styles.slideExitActive,
					}}
					unmountOnExit
					appear
					nodeRef={dropdownRef}
				>
					<div className="text-sm md:text-lg mt-4 p-4 border border-gray-200 rounded">
						{details}
						<div className="mt-4">
							{urlLabel}
							{": "}
							<a
								className="text-blue-500 underline"
								href={url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{urlName}
							</a>
						</div>
					</div>
				</CSSTransition>
			</div>
		</>
	);
}
