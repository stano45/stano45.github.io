import { ReactElement, type ReactNode } from "react";

import { Navbar } from "./Navbar";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps): ReactElement {
	return (
		<>
			<Navbar />
			<div className="flex justify-center">
				<div className="w-full h-full flex flex-col justify-center items-center md:w-1/2 m-4 md:mt-10 opacity-0 fade-in-first">
					{children}
				</div>
			</div>
		</>
	);
}
