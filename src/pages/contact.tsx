/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Tooltip } from "@nextui-org/react";
import { useTranslation } from "next-export-i18n";
import { NextSeo } from "next-seo";
import React from "react";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

export default function Contact(): JSX.Element {
	const { t } = useTranslation();

	return (
		<>
			<NextSeo
				title={t("contact.title")}
				description={t("contact.description")}
			/>
			<div
				id="contact"
				className="flex flex-col justify-center items-center w-full h-5/6 bg-black"
			>
				<div className="flex flex-col md:flex-row justify-center items-center">
					<Tooltip
						content={<span className="text-2xl">{t("contact.linkedin")}</span>}
					>
						<a
							className="opacity-0 fade-in-first mx-10 my-6 md:my-0 flex items-center justify-center"
							href="https://www.linkedin.com/in/stanislav-kosorin-b88452170/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AiFillLinkedin size="5em" className="md:text-5xl" />
						</a>
					</Tooltip>
					<Tooltip
						content={<span className="text-2xl">{t("contact.github")}</span>}
					>
						<a
							className="opacity-0 fade-in-second mx-10 my-6 md:my-0 flex items-center justify-center"
							href="https://github.com/stano45"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AiFillGithub size="5em" className="md:text-5xl" />
						</a>
					</Tooltip>
					<Tooltip
						content={<span className="text-2xl">{t("contact.email")}</span>}
					>
						<a
							className="opacity-0 fade-in-third mx-10 my-6 md:my-0 flex items-center justify-center"
							href="mailto:stanokosorin4@gmail.com"
						>
							<AiOutlineMail size="5em" className="md:text-5xl" />
						</a>
					</Tooltip>
				</div>
			</div>
		</>
	);
}
