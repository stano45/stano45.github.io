/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageQuery } from 'next-export-i18n';
import React from 'react';

import { BlogPostListProps } from '../types';

export function BlogPostList({ posts }: BlogPostListProps): JSX.Element {
  const [query] = useLanguageQuery();

  return (
    <div className="grid grid-cols-1 lg:ml-44 mt-8 lg:mt-20 opacity-0 fade-in-first">
      {posts.map((post, index) => (
        <Link
          key={index}
          href={{ pathname: `/blog/${post.id}`, query: query }}
          className="lg:w-3/4 mb-16 rounded-lg shadow-md hover:bg-orange-100 bg-white flex flex-row items-center justify-start group break-words"
          passHref
        >
          <Image
            src={post.image}
            alt={post.title}
            className="w-1/2 object-cover rounded-lg lg:h-80 shrink-0"
            width={1000}
            height={1000}
          />
          <div className="w-1/2 p-4 justify-start items-center">
            <h2 className="text-lg lg:text-2xl text-black font-semibold break-normal">{post.title}</h2>
            <span className="text-xs lg:text-sm text-black">{post.date}</span>
            <ul className="flex flex-wrap mt-2">
              {post.tags.map((tag, idx) => (
                <li
                  key={idx}
                  className="bg-orange-100 text-gray-700 px-2 py-1 mr-2 mb-2 rounded-md text-xs lg:text-sm group-hover:bg-white"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
