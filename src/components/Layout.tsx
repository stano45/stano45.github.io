import React, { type ReactNode } from "react";

import { Navbar } from "./Navbar";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<>
			<Navbar />
			<div className="flex justify-center w-full h-fit">
				<div className="flex flex-col justify-center items-center md:w-2/3 m-6 md:mt-10 opacity-0 fade-in-first">
					{children}
				</div>
			</div>
		</>
	);
}
