import React from 'react';

export interface BlogPostMeta {
  title: string;
  date: string;
  image: string;
  tags: string[];
}

export interface BlogPostListProps {
  posts: BlogPostMeta[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:ml-44 mt-16 lg:mt-20">
      {posts.map((post, index) => (
        <div
          key={index}
          className=" lg:w-10/12 h-96 mb-16 rounded-lg shadow-md hover:bg-orange-100 bg-white flex flex-row items-center justify-start group"
        >
          <img src={post.image} alt={post.title} className="w-1/2 object-cover rounded-lg h-96 shrink-0" />\
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
        </div>
      ))}
    </div>
  );
}
