import { useLanguageQuery, useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  return (
    <>
      <NextSeo title={t('home.title')} description={t('home.description')} />
      <div className=" mt-10 flex  justify-center">
        <div className="max-w-4xl  shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4 opacity-0 fade-in-first">Hey there! Welcome to my website!</h1>
          <div className="opacity-0 fade-in-second mt-10">
            <p className="text-lg leading-relaxed mb-4">
              I'm Stanislav Kosorin, but just call me Stan. On this site, you can{' '}
              <Link href={{ pathname: '/about', query: query }} passHref className="text-blue-500 underline">
                get to know me,
              </Link>{' '}
              learn about my{' '}
              <Link href={{ pathname: '/cv', query: query }} passHref className="text-blue-500 underline">
                work experience
              </Link>
              , and even read some of my{' '}
              <Link href={{ pathname: '/blog', query: query }} passHref className="text-blue-500 underline">
                blog posts
              </Link>{' '}
              while you’re at it.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Wanna chat? You can find my socials on the{' '}
              <Link href={{ pathname: '/contact', query: query }} passHref className="text-blue-500 underline">
                contact page.
              </Link>{' '}
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Oh, and I've translated the site into the four languages I speak (or, you know, trying to speak-Swedish,
              I'm looking at you). Feel free to choose your favorite language using the picker in the top right corner
              of the screen.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
