import Image from "next/image";
import type { ReactElement, ReactNode } from "react";

interface ImageWrapperProps {
	imagePath: string;
	description?: ReactNode | string;
}

export function ImageWrapper({
	imagePath,
	description,
}: ImageWrapperProps): ReactElement {
	return (
		<div className="flex flex-col justify-center items-center mb-8">
			<Image
				src={imagePath}
				alt={typeof description === "string" ? description : "alt"}
				className="w-full"
				width={1000}
				height={1000}
				style={{
					maxWidth: "100%",
					height: "auto",
				}}
			/>
			{description && (
				<p className="text-sm text-gray-300 italic">{description}</p>
			)}
		</div>
	);
}
