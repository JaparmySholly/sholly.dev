export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInsert {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image?: string | null;
  published?: boolean;
}

export interface BlogPostUpdate extends Partial<BlogPostInsert> {
  id: string;
}

export interface BlogPostWithReadingTime extends BlogPost {
  reading_time: number;
}
