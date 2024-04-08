import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

import { CSGuidePost, internationalizationPost } from './posts';

import { BlogPostList } from '@/components/BlogPostList';

export default function Blog() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('blog.title')} description={t('blog.description')} />
      <div id="blog" className="w-full min-h-screen bg-black flex flex-row justify-center items-start">
        <BlogPostList posts={[internationalizationPost, CSGuidePost]} />
      </div>
    </>
  );
}
