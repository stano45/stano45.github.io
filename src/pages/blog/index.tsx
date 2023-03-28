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
              image: 'https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_1280.jpg',
              tags: ['Frontend', 'Next.js', 'Typescript'],
              id: 'internationalizaton-for-static-nextjs',
            },
          ]}
        />
      </div>
    </>
  );
}
