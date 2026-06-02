import { supabase } from './supabase';
import { BlogPost, BlogPostInsert, BlogPostUpdate, BlogPostWithReadingTime } from '@/types/blog';

// Utility: Calculate reading time (average 200 words per minute)
export const calculateReadingTime = (content: string): number => {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200) || 1;
};

// Utility: Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Fetch all published blog posts
export const getBlogPosts = async (): Promise<BlogPostWithReadingTime[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
};

// Fetch single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPostWithReadingTime | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data ? {
    ...data,
    reading_time: calculateReadingTime(data.content),
  } : null;
};

// Fetch posts by category
export const getBlogPostsByCategory = async (category: string): Promise<BlogPostWithReadingTime[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
};

// Fetch related posts (same category, excluding current post)
export const getRelatedPosts = async (
  slug: string,
  category: string,
  limit: number = 3
): Promise<BlogPostWithReadingTime[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .neq('slug', slug)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
};

// Search blog posts
export const searchBlogPosts = async (query: string): Promise<BlogPostWithReadingTime[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
};

// Admin: Create blog post
export const createBlogPost = async (post: BlogPostInsert): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    return null;
  }

  return data;
};

// Admin: Update blog post
export const updateBlogPost = async (id: string, updates: Partial<BlogPostInsert>): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    return null;
  }

  return data;
};

// Admin: Delete blog post
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }

  return true;
};

// Admin: Get all blog posts (including unpublished)
export const getAllBlogPosts = async (): Promise<BlogPostWithReadingTime[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    reading_time: calculateReadingTime(post.content),
  }));
};

// Upload cover image
export const uploadCoverImage = async (file: File, postId: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${postId}-${Date.now()}.${fileExt}`;
  const filePath = `blog-covers/${fileName}`;

  const { error } = await supabase.storage
    .from('portfolio')
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio')
    .getPublicUrl(filePath);

  return publicUrl;
};

// Get unique categories
export const getBlogCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('published', true)
    .neq('category', null);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = data?.map(post => post.category) || [];
  return [...new Set(categories)].sort();
};
