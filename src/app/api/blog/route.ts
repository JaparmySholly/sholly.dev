import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { BlogPostInsert } from '@/types/blog';

export async function POST(request: NextRequest) {
  try {
    const body: BlogPostInsert = await request.json();

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
