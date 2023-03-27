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
              title: 'Internationalization for statically exported Next.js sites',
              date: '2021-01-01',
              image: 'https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_1280.jpg',
              tags: ['test', 'test2'],
            },
            {
              title: 'Test',
              date: '2021-01-01',
              image: 'https://picsum.photos/200/300',
              tags: ['test', 'test2'],
            },
          ]}
        />
      </div>
    </>
  );
}
