import InteractiveCV from '@/components/InteractiveCV';
import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function CV() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('cv.title')} description={t('cv.description')} />
      <div id="cv" className="w-full min-h-screen bg-black flex flex-row justify-center items-start">
        <InteractiveCV />
      </div>
    </>
  );
}
