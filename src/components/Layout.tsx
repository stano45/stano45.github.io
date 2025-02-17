import { ReactElement, type ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps): ReactElement {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow flex justify-center">
				<div className="w-full h-full flex flex-col justify-center items-center md:w-1/2 m-4 md:mt-10 opacity-0 fade-in-first">
					{children}
				</div>
			</main>
			<footer className="text-gray-600 text-center py-4">
				<p>
					© {new Date().getFullYear()} Stanislav Kosorin. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
