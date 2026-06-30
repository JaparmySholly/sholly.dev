'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import PageWrapper from '@/components/PageWrapper';
import RelatedPosts from '@/components/RelatedPosts';
import SubscriptionCard from '@/components/SubscriptionCard';
import ReactMarkdown from 'react-markdown';
import { getBlogPostBySlug, getRelatedPosts, incrementViews } from '@/lib/blog';
import type { BlogPostWithReadingTime } from '@/types/blog';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const posthog = usePostHog();

  const [post, setPost] = useState<BlogPostWithReadingTime | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithReadingTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getBlogPostBySlug(slug);
      
      if (!postData) {
        router.push('/blog');
        return;
      }

      // Check if this post has already been viewed during this user's session/device
      const viewKey = `viewed-${slug}`;
      const hasViewed = localStorage.getItem(viewKey);
      let finalViews = postData.views || 0;

      if (!hasViewed) {
        const updatedViews = await incrementViews(slug);
        if (updatedViews !== null) {
          localStorage.setItem(viewKey, 'true');
          finalViews = updatedViews;
        }
      }

      setPost({
        ...postData,
        views: finalViews,
      });

      // Track blog_opened event
      posthog?.capture('blog_opened', {
        post_id: postData.id,
        post_title: postData.title,
        category: postData.category,
      });

      // Fetch related posts
      const related = await getRelatedPosts(slug, postData.category);
      setRelatedPosts(related);

      setLoading(false);
    };

    fetchPost();
  }, [slug, router, posthog]);

  // Track article read when user scrolls to end
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      // If user has scrolled to 80% of the page
      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        posthog?.capture('article_read', {
          post_id: post.id,
          post_title: post.title,
          reading_time: post.reading_time,
        });
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, posthog]);

  // Monitor scroll height to compute reading progress percentage
  useEffect(() => {
    if (!post) return;

    const handleProgressScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setReadingProgress(0);
        console.log('Reading progress bar: scrollHeight <= 0', scrollHeight);
        return;
      }
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const progress = (scrollTop / scrollHeight) * 100;
      console.log('Reading progress bar scroll status:', {
        scrollTop,
        scrollHeight,
        calculatedProgress: progress,
      });
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleProgressScroll);
    handleProgressScroll(); // Set initial layout progress
    return () => window.removeEventListener('scroll', handleProgressScroll);
  }, [post]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleShare = () => {
    if (!post) return;

    posthog?.capture('article_shared', {
      post_id: post.id,
      post_title: post.title,
    });

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch();
    }
  };

  if (loading) {
    return (
      <>
        <BackgroundOrbs className="fixed top-0 left-0 w-full h-full pointer-events-none" />
        <Navbar />
        <PageWrapper>
          <main className="text-white min-h-screen relative z-10">
            <section className="section pt-20 pb-4">
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="h-12 bg-cyber-accent/20 rounded-lg animate-pulse"></div>
                <div className="h-6 bg-cyber-accent/20 rounded-lg animate-pulse"></div>
                <div className="space-y-3 mt-8">
                  {Array(10).fill(0).map((_, i) => (
                    <div key={i} className="h-4 bg-cyber-accent/20 rounded-lg animate-pulse w-full"></div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-cyber-accent via-cyber-accent-tertiary to-cyber-accent-secondary transition-all duration-75 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <BackgroundOrbs className="fixed top-0 left-0 w-full h-full pointer-events-none" />
      <Navbar />
      <PageWrapper>
        <main className="text-white min-h-screen relative z-10">
          {/* Article Header */}
          <section className="section pt-32 pb-12">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="text-cyber-accent hover:text-cyber-accent-secondary transition-colors text-sm mb-6 inline-block">
                ← Back to Blog
              </Link>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
                <span>{formatDate(post.created_at)}</span>
                <span>•</span>
                <span>{post.reading_time} min read</span>
                <span>•</span>
                <span className="text-cyber-accent">{post.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">👁 {post.views || 0} views</span>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-lg border border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent/10 transition-colors text-sm"
              >
                Share Article
              </button>
            </div>
          </section>

          {/* Cover Image */}
          {post.cover_image && (
            <section className="section py-0 mb-12">
              <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden h-96">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </section>
          )}

          {/* Article Content */}
          <section className="section py-12">
            <div className="max-w-3xl mx-auto">
              <div
                className="
                  prose
                  prose-invert
                  prose-lg
                  max-w-none
                  prose-headings:text-white
                  prose-p:text-gray-300
                  prose-p:text-justify
                  prose-strong:text-white
                  prose-a:text-cyber-accent
                  prose-li:text-gray-300
                  prose-blockquote:border-cyber-accent
                  prose-blockquote:text-gray-300
                  prose-code:text-cyber-accent
                "
              >
                <ReactMarkdown
                  components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        className="rounded-xl max-w-full h-auto my-8 mx-auto object-cover border border-cyber-accent/10 shadow-lg"
                      />
                    ),
                  }}
                >
                  {post.content.replace(/!\s+\[/g, '![').replace(/\]\s+\(/g, '](')}
                </ReactMarkdown>
              </div>
            </div>
          </section>

          {/* Subscription Section */}
          <section className="section py-12 border-t border-cyber-accent/10">
            <div className="max-w-3xl mx-auto">
              <SubscriptionCard />
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}

          {/* Back to Blog */}
          <section className="section pt-0 py-8">
            <div className="max-w-3xl mx-auto text-center">
              <Link href="/blog" className="inline-block px-6 py-3 rounded-lg border border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10 transition-colors">
                ← Back to All Articles
              </Link>
            </div>
          </section>
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
