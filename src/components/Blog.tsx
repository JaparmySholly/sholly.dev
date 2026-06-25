'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { getBlogPosts } from '@/lib/blog';
import type { BlogPostWithReadingTime } from '@/types/blog';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostWithReadingTime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data.slice(0, 3)); // Show only 3 most recent
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <section id="blog" className="section">
      <AnimatedSection animation="slide-up">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Blog & Insights
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full mx-auto mb-6"></div>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Sharing insights on cybersecurity, software development,
            research, and emerging technologies.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton loading state with same styling
          Array(3).fill(0).map((_, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 border border-cyber-accent/10 animate-pulse"
            >
              <div className="h-4 w-20 bg-cyber-accent/20 rounded"></div>
              <div className="h-6 bg-cyber-accent/20 rounded mt-3 mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-cyber-accent/20 rounded"></div>
                <div className="h-4 w-5/6 bg-cyber-accent/20 rounded"></div>
              </div>
              <div className="h-3 w-16 bg-cyber-accent/20 rounded mt-4"></div>
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass rounded-2xl border border-cyber-accent/10 hover:border-cyber-accent/30 transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col h-full bg-cyber-card hover:bg-cyber-card-lg"
            >
              {/* Cover Image or Thematic Fallback Visual */}
              {post.cover_image ? (
                <div className="relative h-48 w-full overflow-hidden border-b border-cyber-accent/10">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent"></div>
                </div>
              ) : (
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker border-b border-cyber-accent/15 flex items-center justify-center">
                  <div className="absolute inset-0 bg-subtle-grid opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-radial-cyan opacity-35"></div>
                  <span className="text-[10px] font-mono font-bold text-cyber-accent bg-cyber-accent/10 border border-cyber-accent/20 px-3 py-1 rounded tracking-wider uppercase select-none z-10">
                    {post.category || 'Security Log'}
                  </span>
                </div>
              )}

              {/* Text Area padding */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-cyber-accent font-mono text-xs tracking-wider uppercase">
                    [ {post.category} ]
                  </span>

                  <h3 className="text-xl font-bold mt-2.5 mb-3 text-white group-hover:text-cyber-accent-secondary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/5">
                  <span>{formatDate(post.created_at)}</span>
                  <span className="font-mono text-cyber-accent/70">{post.reading_time} min read</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No blog posts published yet.
          </div>
        )}
      </div>
    </section>
  );
}