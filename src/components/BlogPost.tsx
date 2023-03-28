import { BlogPostProps } from './types';

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div>
      <h1>{post.title}</h1>
      <span>{post.date}</span>
      <img src={post.image} alt={post.title} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <ul>
        {post.tags.map((tag, idx) => (
          <li key={idx}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
