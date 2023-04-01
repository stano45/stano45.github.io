import { BlogPostList } from '@/components/BlogPostList';
import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function Blog() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('blog.title')} description={t('blog.description')} />
      <div id="blog" className="w-full min-h-screen bg-black flex flex-row justify-center items-start">
        <BlogPostList
          posts={[
            {
              title: 'Internationalization for static Next.js',
              date: '2023-03-27',
              image: '/internationalization.png',
              tags: ['Frontend', 'Next.js', 'Typescript'],
              id: 'internationalizaton-for-static-nextjs',
            },
          ]}
        />
      </div>
    </>
  );
}
