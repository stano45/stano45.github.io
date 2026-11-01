---
title: Internationalization for static Next.js
description: How the earlier Next.js version of this site was translated into four languages while staying statically exported, using next-export-i18n.
url: https://kosorin.com/blog/internationalizaton-for-static-nextjs
date: 2023-03-27
---

# Internationalization for static Next.js

By [Stanislav Kosorin](https://kosorin.com/) · 27 March 2023

![Close-up of rows of metal letterpress type](https://kosorin.com/internationalization.webp)

_This post is about an earlier version of this website. Back then, the site was a Next.js app available in English, German, Slovak and Swedish. It has since been rewritten as plain HTML in English only, so the language picker mentioned below is gone. The [old code](https://github.com/stano45/stano45.github.io/tree/df00646a7734218bd040b543aa9a46df01f080cc) is still on GitHub._

## Background

While working on my personal website, I decided to add internationalization for fun. I wanted a simple language picker on the top right of the website, which would switch the top navbar's strings to the translated versions.

I chose a tech stack for my website that was both simple and flexible in terms of styling: **Next.js** with **Tailwind CSS** on the frontend, and GitHub Pages as the host. With Next.js, it's possible to generate the content statically (SSG). GitHub provides a fantastic [.yml template](https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml) for actions that handles everything for you; all you need to do is push the code to your repo, and voila, it's up and running.

Next.js has supported internationalization out of the box ([since v10](https://nextjs.org/docs/advanced-features/i18n-routing)). With a few config files, your site will automatically redirect users to the appropriate **sub-path** or **sub-domain**. The user's preferred language will be detected automatically (if enabled), and they will be redirected accordingly. For instance, a user with French as their preferred language would be redirected from example.com to example.com/fr (sub-path) or example.fr (sub-domain).

However, Next.js doesn't provide the actual management of translations and hooks to integrate them into your application. Fortunately, there's a library specifically designed for this purpose: [next-i18next](https://github.com/i18next/next-i18next). With just a couple of lines of code, this library allows you to easily set up localization. There is a catch, though.

## The catch

As I mentioned earlier, I wanted to statically generate the site content. However, next-i18next provides translations via server-side rendering (SSR), which makes it impossible to export the site statically since we rely on network calls for our translations.

One option to provide translations locally is to route to another HTML page on changing language. So if we have 3 languages which we want to support, we would have 3 versions of each page. This solution is not very elegant and definitely not scalable in the long run.

Luckily, some awesome folks built [next-export-i18n](https://github.com/martinkr/next-export-i18n) to address this exact issue. It provides convenient internationalization with a `useTranslation` hook, exactly as with i18next, but does not rely on SSR. It achieves this by saving the localization as a query parameter instead of using sub-paths or sub-domains.

I will not be providing a tutorial for the setup in this post, as the devs of the module have already done a great job explaining it in the readme of their repo. Instead, here is how I integrated it into my site.

The languages that I supported on my website were English, German, Slovak and Swedish. I created a `translations.X.json` file for each of the languages, where the X is the 2-letter code of the language. As the module supports nesting in the .json files, I split up my translations into views, such as home, about, etc.

```
{
"home": {
"title": "Stanislav Kosorin",
"description": "My personal site."
},
"contact": {
"title": "Contact",
"linkedin": "Find me on LinkedIn",
"github": "My projects on GitHub",
"email": "Send me an email"
}
}
```

Then, in each component, I used the `useTranslation` hook and picked the right localization string using `t()`, e.g. `t('view.title')`.

```
const { t } = useTranslation();
return (
<>
<NextSeo
title={t('contact.title')}
description={
t('contact.description')
}
/>
{/* other components */}
</>
);
```

I also created a minimal language picker, which you can still find [on GitHub](https://github.com/stano45/stano45.github.io/blob/df00646a7734218bd040b543aa9a46df01f080cc/src/components/LanguagePicker.tsx).

## Summary

With the help of [next-export-i18n](https://github.com/martinkr/next-export-i18n), you can easily add internationalization to a **statically exported** Next.js site, without relying on server-side rendering. The library allows convenient localization with a `useTranslation` hook and saves the localization as a query parameter instead of using sub-paths or sub-domains.

Thank you for reading, and happy translating!
