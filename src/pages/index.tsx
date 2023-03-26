import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('home.title')} description={t('home.description')} />
      <div id="home" className="w-full min-h-screen bg-black">
        <h1>home</h1>
        <p>This is the home section.</p>
      </div>
    </>
  );
}
