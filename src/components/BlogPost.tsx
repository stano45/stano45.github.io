import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { BlogPostProps } from './types';

export function BlogPost({ post, children }: BlogPostProps): JSX.Element {
  return (
    <>
      <NextSeo title={post.title} description={post.title} />
      <div className="max-w-4xl mx-auto p-4 text-justify">
        <h1 className="text-3xl font-bold my-4">{post.title}</h1>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">{post.date}</span>
          <ul className="flex space-x-2">
            {post.tags.map((tag, idx) => (
              <li key={idx} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image src={post.image} alt={post.title} className="w-full" width={1000} height={1000} />

        {children}
      </div>
    </>
  );
}
