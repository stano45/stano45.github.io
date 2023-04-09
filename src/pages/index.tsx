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
          <h1 className="text-4xl font-bold mb-4 opacity-0 fade-in-first">{t('home.heading')}</h1>
          <div className="opacity-0 fade-in-second mt-10">
            <p className="text-lg leading-relaxed mb-4">
              {t('home.intro')}
              <Link href={{ pathname: '/about', query: query }} passHref className="text-blue-500 underline">
                {t('home.gettoknowme')}
              </Link>
              {t('home.learnaboutmy')}
              <Link href={{ pathname: '/cv', query: query }} passHref className="text-blue-500 underline">
                {t('home.workexperience')}
              </Link>
              {t('home.andeven')}
              <Link href={{ pathname: '/blog', query: query }} passHref className="text-blue-500 underline">
                {t('home.blogposts')}
              </Link>
              {t('home.whileatit')}
            </p>
            <p className="text-lg leading-relaxed mb-4">
              {t('home.wannachat')}
              <Link href={{ pathname: '/contact', query: query }} passHref className="text-blue-500 underline">
                {t('home.contactpage')}
              </Link>
            </p>
            <p className="text-lg leading-relaxed mb-4">{t('home.outro')}</p>
          </div>
        </div>
      </div>
    </>
  );
}
