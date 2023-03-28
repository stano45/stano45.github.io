export interface BlogPostMeta {
  title: string;
  date: string;
  image: string;
  tags: string[];
  id: string;
}

export interface BlogPostContent extends BlogPostMeta {
  content: string;
}

export interface BlogPostListProps {
  posts: BlogPostMeta[];
}

export interface BlogPostProps {
  post: BlogPostContent;
}
