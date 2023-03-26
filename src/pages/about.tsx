import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('about.title')} description={t('about.description')} />
      <div id="about" className="w-full min-h-screen bg-black">
        <h1>About</h1>
        <p>This is the About section.</p>
      </div>
    </>
  );
}
