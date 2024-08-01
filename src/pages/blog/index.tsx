/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

import { CSGuidePost, internationalizationPost } from '@/blogposts';
import { BlogPostList } from '@/components';

export default function Blog(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('blog.title')} description={t('blog.description')} />
      <div
        id="blog"
        className="w-full min-h-screen bg-black flex flex-row justify-center items-start opacity-0 fade-in-first"
      >
        <BlogPostList posts={[internationalizationPost, CSGuidePost]} />
      </div>
    </>
  );
}
