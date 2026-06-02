import type { Metadata } from 'next';
import type { BlogPostWithReadingTime } from '@/types/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sholly.dev';

export const generateBlogPostMetadata = (post: BlogPostWithReadingTime): Metadata => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.cover_image || `${SITE_URL}/og-image.png`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ['Sholly'],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
};

export const generateBlogMetadata = (): Metadata => {
  const url = `${SITE_URL}/blog`;

  return {
    title: 'Blog & Insights | Sholly',
    description: 'Read articles on cybersecurity, software development, threat hunting, and emerging technologies.',
    openGraph: {
      title: 'Blog & Insights | Sholly',
      description: 'Read articles on cybersecurity, software development, threat hunting, and emerging technologies.',
      type: 'website',
      url,
    },
  };
};

export const generateBlogPostStructuredData = (post: BlogPostWithReadingTime) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image || `${SITE_URL}/og-image.png`,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: 'Sholly',
      url: SITE_URL,
    },
    articleBody: post.content,
    keywords: post.category,
  };
};

export const generateBlogSitemapEntry = (post: BlogPostWithReadingTime) => {
  return {
    url: `${SITE_URL}/blog/${post.slug}`,
    lastmod: new Date(post.updated_at).toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  };
};
