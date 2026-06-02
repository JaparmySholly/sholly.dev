# Blog System Quick Reference

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── blog/
│   │       └── page.tsx              # Admin dashboard
│   ├── api/
│   │   ├── blog/
│   │   │   └── route.ts              # Create post API
│   │   └── sitemap/
│   │       └── route.ts              # XML sitemap
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx              # Article detail
│   │   └── page.tsx                  # Blog listing
│   └── layout.tsx                    # (existing - no changes)
├── components/
│   ├── Blog.tsx                      # ✨ MODIFIED - now dynamic
│   └── RelatedPosts.tsx              # NEW
├── lib/
│   ├── blog.ts                       # NEW - Blog utilities
│   ├── seo.ts                        # NEW - SEO helpers
│   └── supabase.ts                   # (existing - no changes)
└── types/
    └── blog.ts                       # NEW - TypeScript types
```

## Database Schema

```sql
blog_posts {
  id: uuid (primary key)
  title: text
  slug: text (unique)
  excerpt: text
  content: text
  category: text
  cover_image: text (nullable)
  published: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

## Key Functions

### Reading Data
```typescript
import { 
  getBlogPosts,           // All published posts
  getBlogPostBySlug,      // Single article
  getBlogPostsByCategory, // Filter by category
  getRelatedPosts,        // Similar posts
  searchBlogPosts,        // Full-text search
  getBlogCategories       // All categories
} from '@/lib/blog';
```

### Admin Operations
```typescript
import {
  createBlogPost,   // Create new post
  updateBlogPost,   // Edit post
  deleteBlogPost,   // Delete post
  uploadCoverImage, // Upload image
  getAllBlogPosts   // Include unpublished
} from '@/lib/blog';
```

### Utilities
```typescript
import {
  calculateReadingTime, // Calculate read duration
  generateSlug         // Title → URL slug
} from '@/lib/blog';
```

### SEO
```typescript
import {
  generateBlogPostMetadata,      // Post metadata
  generateBlogMetadata,          // Blog page metadata
  generateBlogPostStructuredData, // Schema.org JSON-LD
  generateBlogSitemapEntry       // Sitemap entry
} from '@/lib/seo';
```

## URL Routes

### Public
- `/blog` - Blog listing with filters
- `/blog/[slug]` - Individual article

### Admin
- `/admin/blog` - Admin dashboard

### API
- `/api/blog` - Create post (POST)
- `/api/sitemap` - XML sitemap (GET)

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com
NEXT_PUBLIC_SITE_URL=https://sholly.dev
```

## PostHog Events

| Event | When | Properties |
|-------|------|-----------|
| `blog_opened` | User opens article | post_id, post_title, category |
| `article_read` | User scrolls to 80% | post_id, post_title, reading_time |
| `article_shared` | User clicks share | post_id, post_title |

## Component Usage

### Blog Component (Home Page)
```typescript
import Blog from '@/components/Blog';

// Fetches 3 most recent published posts
// Displays in card grid (md:2 lg:3)
// Links to /blog/[slug]
<Blog />
```

### RelatedPosts Component
```typescript
import RelatedPosts from '@/components/RelatedPosts';

<RelatedPosts posts={relatedPostsArray} />
```

## Common Operations

### Add Sample Post
```typescript
const post = await createBlogPost({
  title: 'My First Post',
  slug: 'my-first-post',
  excerpt: 'A great post',
  content: 'Full content here...',
  category: 'Cybersecurity',
  published: true
});
```

### Get Posts by Category
```typescript
const posts = await getBlogPostsByCategory('Cybersecurity');
```

### Search Posts
```typescript
const results = await searchBlogPosts('malware');
```

### Update Post Status
```typescript
await updateBlogPost(postId, { published: true });
```

### Get Related Posts
```typescript
const related = await getRelatedPosts(slug, category, 3);
```

## Styling Classes Used

All styling preserved from original design:
- `.glass` - Glassmorphism effect
- `.cyber-accent` - Primary cyan color
- `.cyber-accent-secondary` - Purple accent
- `.rounded-2xl` - Curved corners
- `.border-cyber-accent/10` - Subtle borders
- `.hover:border-cyber-accent/30` - Hover states
- `.text-gray-400` - Secondary text

## Customization Points

### 1. Categories
Edit select options in `/admin/blog/page.tsx`:
```typescript
<option>Your Category Here</option>
```

### 2. Content Formatting
Extend in `/blog/[slug]/page.tsx` content rendering logic

### 3. Reading Time Formula
Adjust in `calculateReadingTime()`:
```typescript
const words = content.split(/\s+/).length;
return Math.ceil(words / 200); // Change 200 to adjust
```

### 4. Related Posts Count
Customize in `getRelatedPosts()` calls:
```typescript
const related = await getRelatedPosts(slug, category, 5); // Default 3
```

### 5. Admin Dashboard Access
Add authentication in `/admin/blog/page.tsx`

## Testing Checklist

- [ ] Blog section shows on homepage
- [ ] Blog page lists all published posts
- [ ] Category filters work
- [ ] Clicking a card navigates to article
- [ ] Article page displays correctly
- [ ] Related posts show at bottom
- [ ] Share button works
- [ ] Admin dashboard loads
- [ ] Can create new post
- [ ] Can edit post
- [ ] Can delete post
- [ ] Can toggle publish/unpublish
- [ ] Can upload cover image
- [ ] PostHog events fire (check console)
- [ ] Sitemap generates at `/api/sitemap`

---

**Questions?** Check `BLOG_IMPLEMENTATION_GUIDE.md` for detailed documentation.
