import { useLanguageQuery, useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';

export default function About() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  return (
    <>
      <NextSeo title={t('about.title')} description={t('about.description')} />
      <div className=" mt-10 flex justify-center">
        <div className="max-w-4xl shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4 opacity-0 fade-in-first">{t('about.heading')}</h1>
          <div className="opacity-0 fade-in-second mt-10">
            <p className="text-lg leading-relaxed mb-4">
              {t('about.intro')}
              <Link href={{ pathname: 'https://www.tu.berlin/' }} passHref className="text-blue-500 underline">
                {t('about.tub')}
              </Link>
              .
            </p>
            <p className="text-lg leading-relaxed mb-4">
              {t('about.cresta.intro')}
              <Link href={{ pathname: 'https://www.cresta.com/' }} passHref className="text-blue-500 underline">
                {t('about.cresta.content')}
              </Link>{' '}
              {t('about.cresta.outro')}
            </p>
            <p className="text-lg leading-relaxed mb-4">
              {t('about.cv.intro')}
              <Link href={{ pathname: '/cv', query: query }} passHref className="text-blue-500 underline">
                {t('about.cv.content')}
              </Link>
              {t('about.cv.outro')}
            </p>

            <p className="text-lg leading-relaxed mb-4">{t('about.sports.content')}</p>
            <p className="text-lg leading-relaxed mb-4">
              {t('about.languages.intro')}
              <Link href={{ pathname: '/contact', query: query }} passHref className="text-blue-500 underline">
                {t('about.languages.content')}
              </Link>
              {t('about.languages.outro')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
