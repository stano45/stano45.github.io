import { CopyBlock, dracula } from "react-code-blocks";

import { internationalizationPost } from "@/blogposts";
import { BlogPost, BlogPostHeading } from "@/components";
import { ReactElement } from "react";

export default function BlogPostPage(): ReactElement {
	const translations = `{
    "home": {
      "title": "Stanislav Kosorin",
      "description": "The personal website of Stanislav Kosorin."
    },
    "contact": {
      "title": "Contact",
      "description": "The contact page of Stanislav Kosorin.",
      "linkedin": "Connect with me on LinkedIn 🌍",
      "github": "Check out my projects on Github 🐱‍💻",
      "email": "Send me an email 📧"
    }
  }
  `;
	const component = `const { t } = useTranslation(); \nreturn (
  <>
    <NextSeo 
      title={
	  	t('contact.title')
	  }
      description={
	  	t('contact.description')
	  } 
    />
    {other components}
  </>
);
`;
	const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

	function scrollToTop() {
		if (!isBrowser()) return;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	return (
		<BlogPost post={internationalizationPost}>
			<div className="flex flex-col gap-4">
				<BlogPostHeading>Background</BlogPostHeading>
				<p>
					While working on my personal website, I decided to add
					internationalization for fun. I wanted a simple language picker on the
					top right of the website, which would switch the top navbar’s strings
					to the translated versions.
				</p>
				<p>
					I chose a tech stack for my website that was both simple and flexible
					in terms of styling: <strong>Next.js</strong> with{" "}
					<strong>Tailwind CSS</strong> on the frontend, and GitHub Pages as the
					host. The &apos;s possible to statically generate the content (SSG).
					GitHub provides a fantastic{" "}
					<a
						href="https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml"
						className="text-blue-500 underline"
					>
						.yml template
					</a>{" "}
					for actions that handles everything for you; all you need to do is
					push the code to your repo, and voila, it&apos;s up and running.
				</p>
				<p>
					Next.js has supported internationalization out of the box (
					<a
						href="https://nextjs.org/docs/advanced-features/i18n-routing"
						className="text-blue-500 underline"
					>
						since v10
					</a>
					). With a few config files, your site will automatically redirect
					users to the appropriate <strong>sub-path</strong> or
					<strong> sub-domain</strong>. The user&apos;s preferred language will
					be detected automatically (if enabled), and they will be redirected
					accordingly. For instance, a user with French as their preferred
					language would be redirected from example.com to example.com/fr
					(sub-path) or example.fr (sub-domain).
				</p>
				<p>
					However, Next.js doesn&apos;t provide the actual management of
					translations and hooks to integrate them into your application.
					Fortunately, there&apos;s a library specifically designed for this
					purpose:{" "}
					<a
						href="https://github.com/i18next/next-i18next"
						className="text-blue-500 underline"
					>
						next-i18next
					</a>
					. With just a couple of lines of code, this library allows you to
					easily set up localization. There is a catch, though.
				</p>
				<BlogPostHeading>The catch</BlogPostHeading>
				<p>
					As I mentioned earlier, we want to statically generate our site
					content. However, next-i18n provides translations via server-side
					rendering (SSR), which makes it impossible to export the site
					statically since we rely on network calls for our translations.
				</p>
				<p>
					One option to provide translations locally is to route to another HTML
					page on changing language. So if we have 3 languages which we want to
					support, we would have 3 versions of each page. This solution is not
					very elegant and definitely not scalable in the long run.
				</p>
				<p>
					Luckily, some awesome folks built{" "}
					<a
						href="https://github.com/martinkr/next-export-i18n"
						className="text-blue-500 underline"
					>
						next-export-18n
					</a>{" "}
					to address this exact issue. It provides convenient
					internationalization with a useTranslation hook, exactly as with
					i18next, but does not rely on SSR. It achieves this by saving the
					localization as a query parameter instead of using sub-paths or
					sub-domains.
				</p>
				<p>
					I will not be providing a tutorial for the setup in this post, as the
					devs of the module have already done a great job explaining it in the
					readme of their repo. However, I want to show how I integrated this
					into my site.
				</p>
				<p>
					The languages that I support on my website are English, German, Slovak
					and Swedish. I created a translations.X.json file for each of the
					languages, where the X is the 2-letter code of the language. As the
					module supports nesting in the .json files, I split up my translations
					into views, such as home, about, etc.
				</p>
				<CopyBlock
					text={translations}
					language="json"
					theme={dracula}
					showLineNumbers
					wrapLongLines
				/>

				<p>
					Then, in each component, I used the useTranslation hook and picked the
					right localization string using t(), e.g. t(‘view.title’).
				</p>
				<CopyBlock
					text={component}
					language="typescript"
					theme={dracula}
					showLineNumbers
					wrapLongLines
				/>

				<p>
					I also created a minimal language picker, which you can reuse{" "}
					<a
						className="text-blue-500 underline"
						href="https://github.com/stano45/stano45.github.io/blob/main/src/components/LanguagePicker.tsx"
					>
						from here
					</a>
					. But since you&apos;re reading this, you get an exclusive chance to
					check it out live on this very site, in the{" "}
					<button
						type="button"
						className="text-blue-500 underline"
						onClick={scrollToTop}
					>
						{" "}
						top right corner
					</button>
					.
				</p>
				<BlogPostHeading>Summary</BlogPostHeading>

				<p>
					With the help of{" "}
					<a href="https://github.com/martinkr/next-export-i18n">
						next-export-i18n
					</a>
					, you can easily add internationalization to a{" "}
					<strong>statically exported </strong> Next.js site, without relying on
					server-side rendering. The library allows convenient localization with
					a useTranslation hook and saves the localization as a query parameter
					instead of using sub-paths or sub-domains.
				</p>
				<BlogPostHeading>
					Thank you for reading, and happy translating!
				</BlogPostHeading>
			</div>
		</BlogPost>
	);
}
