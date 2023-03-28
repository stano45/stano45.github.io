import React from 'react';
import { BlogPostContent } from '@/components';
import BlogPost from '@/components/BlogPost';

export default function BlogPostPage() {
  // Replace this with your code to fetch the blog post data using the ID
  const blogPost: BlogPostContent = {
    title: 'Adding Internationalization to My Next.js Site',
    date: 'March 28, 2023',
    image: 'https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_1280.jpg',
    content:
      '<p>While working on my personal website, I decided to add internationalization for fun. I wanted a simple language picker on the top right of the website, which would switch the top navbar’s strings to the translated versions.</p>\
    <p>I chose a tech stack for my website that was both simple and flexible in terms of styling: next.js with Tailwind CSS on the frontend, and GitHub Pages as the host. The website doesn\'t require any network calls, so it\'s possible to statically generate the content (SSG). GitHub provides a fantastic .yml template for actions that handles everything for you; all you need to do is push the code to your repo, and voila, it\'s up and running. You can see this in action by checking out the source of my site: <a href="https://github.com/stano45/stano45.github.io">link</a></p>\
    <p>Next.js has supported internationalization out of the box since v10 (<a href="https://nextjs.org/docs/advanced-features/i18n-routing">https://nextjs.org/docs/advanced-features/i18n-routing</a>). With a few config files, your site will automatically redirect users to the appropriate sub-path or sub-domain. The user\'s preferred language will be detected automatically (if enabled), and they will be redirected accordingly. For instance, a user with French as their preferred language would be redirected from example.com to example.com/fr (sub-path) or example.fr (sub-domain).</p>\
    <p>However, Next.js doesn\'t provide the actual management of translations and hooks to integrate them into your application. Fortunately, there\'s a library specifically designed for this purpose: next-i18next (<a href="https://github.com/i18next/next-i18next">https://github.com/i18next/next-i18next</a>). With just a couple of lines of code, this library allows you to easily set up localization. There is a catch, though.</p>\
    <p>As I mentioned earlier, we want to statically generate our site content. However, next-i18n provides translations via server-side rendering (SSR), which makes it impossible to export the site statically since we rely on network calls for our translations.</p>\
    <p>One option to provide translations locally is to route to another site on changing language. So if we have 3 languages which we want to support, we would have 3 versions of each page. This solution is not very elegant and definitely not scalable in the long run.</p>\
    <p>Luckily, some awesome folks built next-export-18n (<a href="https://github.com/martinkr/next-export-i18n">https://github.com/martinkr/next-export-i18n</a>) to address this exact issue. It provides convenient internationalization with a useTranslation hook, exactly as with i18next, but does not rely on SSR. It achieves this by saving the localization as a query parameter instead of using sub-paths or sub-domains.</p>\
    <p>The languages that I support on my website are English, German, Slovak and Swedish. I created a translations.X.json file for each of the languages, where the X is the 2-letter code of the language.\
    As the module supports nesting in the .json files, I split up my translations into views, such as home, about, etc. \
    "home": {\
      "title": "Stanislav Kosorin",\
      "description": "The personal website of Stanislav Kosorin, including his portfolio, blog, and resume"\
    },\
    "contact": {\
      "title": "Contact",\
      "description": "The contact page of Stanislav Kosorin, including his email address and social media profiles",\
      "linkedin": "Connect with me on LinkedIn 🌍",\
      "github": "Check out my projects on Github 🐱‍💻",\
      "email": "Send me an email 📧"\
    }\
   }\
   </pre>\
   <p>Then, in each component, the author used the useTranslation hook and picked the right localization string with t(\'view.title\') or similar:</p>\
   <pre>\
    const { t } = useTranslation();\
    return (\
      &lt;&gt;\
        &lt;NextSeo title={t(\'contact.title\')} description={t(\'contact.description\')} /&gt;\
        ...\
      &lt;/&gt;\
   );\
   </pre>\
   <p>Finally, the author created a custom language picker component, which can be found here: <a href="https://github.com/stano45/stano45.github.io/blob/main/src/components/LanguagePicker.tsx">https://github.com/stano45/stano45.github.io/blob/main/src/components/LanguagePicker.tsx</a>. You can also check it out live on the author\'s site: <a href="http://kosorin.com">http://kosorin.com</a>.</p>\
   <p>With the help of <a href="https://github.com/martinkr/next-export-i18n">next-export-i18n</a>, the author was able to easily add internationalization to their Next.js site, without relying on server-side rendering. The library allows convenient localization with a useTranslation hook and saves the localization as a query parameter instead of using sub-paths or sub-domains. The author also created their own custom language picker component to switch between languages on their site.</p>\
   <p>Thank you for reading, and happy translating!</p>',
    tags: ['Tag1', 'Tag2'],
    id: '1',
  };

  return <BlogPost post={blogPost} />;
}
