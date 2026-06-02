'use client';

import Link from 'next/link';
import type { BlogPostWithReadingTime } from '@/types/blog';

interface RelatedPostsProps {
  posts: BlogPostWithReadingTime[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <section className="section py-12 border-t border-cyber-accent/10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Related Articles</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass rounded-2xl p-6 border border-cyber-accent/10 hover:border-cyber-accent/30 transition-all cursor-pointer group"
            >
              {post.cover_image && (
                <div className="mb-4 rounded-lg overflow-hidden h-32 -mx-6 -mt-6 mb-4">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <span className="text-cyber-accent text-sm">
                {post.category}
              </span>

              <h3 className="text-lg font-semibold mt-3 mb-3 group-hover:text-cyber-accent-secondary transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{formatDate(post.created_at)}</span>
                <span>{post.reading_time} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
