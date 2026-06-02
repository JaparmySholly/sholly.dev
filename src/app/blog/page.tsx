import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import PageWrapper from '@/components/PageWrapper';
import { getBlogPosts, getBlogCategories } from '@/lib/blog';
import type { BlogPostWithReadingTime } from '@/types/blog';

export const metadata: Metadata = {
  title: 'Blog & Insights | Sholly',
  description: 'Read articles on cybersecurity, software development, threat hunting, and emerging technologies.',
  openGraph: {
    title: 'Blog & Insights | Sholly',
    description: 'Read articles on cybersecurity, software development, threat hunting, and emerging technologies.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {

  const params = await searchParams;
  const selectedCategory = params.category;
  const allPosts = await getBlogPosts();

  const posts = selectedCategory
    ? allPosts.filter(
        (post) => post.category === selectedCategory
      )
    : allPosts;

  const categories = await getBlogCategories();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <BackgroundOrbs className="fixed top-0 left-0 w-full h-full pointer-events-none" />
      <Navbar />
      <PageWrapper>
        <main className="text-white min-h-screen relative z-10">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 pt-20 pb-2">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Blog & Insights
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Exploring cybersecurity, software development, and emerging technologies.
              </p>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Link
                  href="/blog"
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    !selectedCategory
                      ? 'bg-cyber-accent/20 text-cyber-accent border-cyber-accent hover:bg-cyber-accent/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105'
                      : 'border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10 hover:scale-105'
                  }`}                >
                  {!selectedCategory ? '✓ All' : 'All'}
                </Link>
                {categories.map((category) => {
                  const isActive = selectedCategory === category;

                  return (
                    <Link
                      key={category}
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                        isActive
                          ? 'bg-cyber-accent/20 text-cyber-accent border-cyber-accent hover:bg-cyber-accent/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105'
                          : 'border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10 hover:scale-105'
                      }`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Posts Grid */}
          <section className="max-w-7xl mx-auto px-4 pb-8">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="glass rounded-2xl p-6 border border-cyber-accent/10 hover:border-cyber-accent/30 transition-all cursor-pointer group"
                  >
                    {post.cover_image && (
                      <div className="mb-4 rounded-lg overflow-hidden h-48 -mx-6 -mt-6 mb-6">
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

                    <h3 className="text-xl font-semibold mt-3 mb-3 group-hover:text-cyber-accent-secondary transition-colors">
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
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No blog posts yet.</p>
              </div>
            )}
          </section>
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
