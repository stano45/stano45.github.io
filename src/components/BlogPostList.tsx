import { useLanguageQuery } from 'next-export-i18n';
import Link from 'next/link';
import React from 'react';
import { BlogPostListProps } from './types';

export function BlogPostList({ posts }: BlogPostListProps) {
  const [query] = useLanguageQuery();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:ml-44 mt-16 lg:mt-20">
      {posts.map((post, index) => (
        <Link
          key={index}
          href={{ pathname: `/blog/${post.id}`, query: query }}
          className="lg:w-3/4 mb-16 rounded-lg shadow-md hover:bg-orange-100 bg-white flex flex-row items-center justify-start group"
          passHref
        >
          <img src={post.image} alt={post.title} className="w-1/2 object-cover rounded-lg h-80 shrink-0" />\
          <div className="w-1/2 m-4  justify-start items-center">
            <h2 className="text-2xl text-black font-semibold">{post.title}</h2>
            <span className="text-sm text-black">{post.date}</span>
            <ul className="flex flex-wrap mt-2">
              {post.tags.map((tag, idx) => (
                <li
                  key={idx}
                  className="bg-orange-100 text-gray-700 px-2 py-1 mr-2 mb-2 rounded-md text-sm group-hover:bg-white"
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
