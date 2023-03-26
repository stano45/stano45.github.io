import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function Blog() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('blog.title')} description={t('blog.description')} />
      <div id="blog" className="w-full min-h-screen bg-black">
        <h1>Blog</h1>
        <p>This is the Blog section.</p>
      </div>
    </>
  );
}
