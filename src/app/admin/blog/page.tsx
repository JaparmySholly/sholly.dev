'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllBlogPosts, deleteBlogPost, updateBlogPost, uploadCoverImage } from '@/lib/blog';
import { generateSlug } from '@/lib/blog';
import type { BlogPostWithReadingTime, BlogPostInsert } from '@/types/blog';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostWithReadingTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPostInsert>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'General',
    published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getAllBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formData.cover_image;

      // Upload image if selected
      if (imageFile) {
        const tempId = editingId || 'new-' + Date.now();
        const url = await uploadCoverImage(imageFile, tempId);
        if (url) imageUrl = url;
      }

      const finalData = {
        ...formData,
        cover_image: imageUrl,
        slug: generateSlug(formData.title || ''),
      };

      if (editingId) {
        // Update existing post
        await updateBlogPost(editingId, finalData);
      } else {
        // Create new post via API
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }
      }

      // Reset form
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'General',
        published: false,
      });
      setImageFile(null);

      // Refresh posts
      await fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: BlogPostWithReadingTime) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      cover_image: post.cover_image,
      published: post.published,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteBlogPost(id);
      await fetchPosts();
    }
  };

  const handleTogglePublish = async (post: BlogPostWithReadingTime) => {
    await updateBlogPost(post.id, { published: !post.published });
    await fetchPosts();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker text-white p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-cyber-accent hover:text-cyber-accent-secondary text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Blog Admin</h1>
          <p className="text-gray-400">Manage your blog posts</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingId(null);
                setFormData({
                  title: '',
                  excerpt: '',
                  content: '',
                  category: 'General',
                  published: false,
                });
              }
            }}
            className="px-4 py-2 rounded-lg border border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10 transition-colors"
          >
            {showForm ? 'Cancel' : '+ New Post'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="glass rounded-2xl p-8 border border-cyber-accent/10 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Post' : 'Create Post'}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  placeholder="Post title"
                  className="w-full bg-cyber-card rounded-lg px-4 py-2 border border-cyber-accent/20 focus:border-cyber-accent/50 focus:outline-none text-white placeholder-gray-500"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt || ''}
                  onChange={handleInputChange}
                  placeholder="Brief description of the post"
                  className="w-full bg-cyber-card rounded-lg px-4 py-2 border border-cyber-accent/20 focus:border-cyber-accent/50 focus:outline-none text-white placeholder-gray-500 h-24 resize-none"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
                  className="w-full bg-cyber-card rounded-lg px-4 py-2 border border-cyber-accent/20 focus:border-cyber-accent/50 focus:outline-none text-white"
                >
                  <option>General</option>
                  <option>Cybersecurity</option>
                  <option>Security Awareness</option>
                  <option>Digital Forensics</option>
                  <option>Development</option>
                  <option>Research</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content || ''}
                  onChange={handleInputChange}
                  placeholder="Post content (supports markdown-like formatting with ##, ###, >, -, ```)"
                  className="w-full bg-cyber-card rounded-lg px-4 py-2 border border-cyber-accent/20 focus:border-cyber-accent/50 focus:outline-none text-white placeholder-gray-500 h-64 resize-none font-mono text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Supports: ## headings, ### subheadings, blockquotes, - lists, code blocks</p>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full bg-cyber-card rounded-lg px-4 py-2 border border-cyber-accent/20 focus:border-cyber-accent/50 focus:outline-none text-white"
                />
                {formData.cover_image && (
                  <div className="mt-2">
                    <img src={formData.cover_image} alt="Preview" className="w-48 h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              {/* Published */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published || false}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-cyber-accent/20"
                />
                <label className="ml-2 text-sm">Published</label>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg border border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts Table */}
        <div className="glass rounded-2xl border border-cyber-accent/10 overflow-hidden">
          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-cyber-accent/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-cyber-accent/10 hover:bg-cyber-accent/5">
                      <td className="px-6 py-4 text-sm font-medium">{post.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{post.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.published
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{formatDate(post.created_at)}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleTogglePublish(post)}
                            className="px-3 py-1 rounded text-xs border border-cyber-accent-secondary/50 text-cyber-accent-secondary hover:bg-cyber-accent-secondary/10"
                          >
                            {post.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => handleEdit(post)}
                            className="px-3 py-1 rounded text-xs border border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-3 py-1 rounded text-xs border border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              No posts yet. Create your first post!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
