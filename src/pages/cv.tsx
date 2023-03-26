import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function CV() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('cv.title')} description={t('cv.description')} />
      <div id="cv" className="w-full min-h-screen bg-black">
        <h1>Portfolio</h1>
        <p>This is the Portfolio section.</p>
      </div>
    </>
  );
}
