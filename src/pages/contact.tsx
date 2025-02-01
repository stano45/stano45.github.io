import { Tooltip } from "@heroui/react";
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

export default function Contact(): ReactElement {
	const { t } = useTranslation();

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<NextSeo
				title={t("contact.title")}
				description={t("contact.description")}
			/>
			<div className="relative mt-4 md:top-2/3">
				<div className="h-full w-full flex flex-col md:flex-row justify-center items-center">
					<Tooltip
						content={<span className="text-2xl">{t("contact.linkedin")}</span>}
						offset={-15}
					>
						<a
							className="opacity-0 fade-in-first mx-10 mb-4 md:my-0 flex items-center justify-center"
							href="https://www.linkedin.com/in/kosorin"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AiFillLinkedin size="5em" className="text-3xl md:text-5xl" />
						</a>
					</Tooltip>
					<Tooltip
						content={<span className="text-2xl">{t("contact.github")}</span>}
						offset={-15}
					>
						<a
							className="opacity-0 fade-in-second mx-10 mb-4 md:my-0 flex items-center justify-center"
							href="https://github.com/stano45"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AiFillGithub size="5em" className="text-3xl md:text-5xl" />
						</a>
					</Tooltip>
					<Tooltip
						content={<span className="text-2xl">{t("contact.email")}</span>}
						offset={-15}
					>
						<a
							className="opacity-0 fade-in-third mx-10 mb-4 md:my-0 flex items-center justify-center"
							href="mailto:stanokosorin4@gmail.com"
						>
							<AiOutlineMail size="5em" className="text-3xl md:text-5xl" />
						</a>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}
