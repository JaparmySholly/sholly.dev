import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase admin client using the service role key to bypass RLS policies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Authorization Secret
    const incomingSecret = request.headers.get('x-api-secret');
    const systemSecret = process.env.NEWSLETTER_API_SECRET;

    if (!systemSecret) {
      console.error('NEWSLETTER_API_SECRET is not configured in server environment.');
      return NextResponse.json({ error: 'Server environment misconfigured' }, { status: 500 });
    }

    if (incomingSecret !== systemSecret) {
      console.warn('Unauthorized attempt to trigger newsletter send API.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // 2. Resolve parameters (supports direct payloads and Supabase Webhook event payloads)
    let id: string | undefined;
    let title: string | undefined;
    let slug: string | undefined;
    let excerpt: string | undefined;
    let cover_image: string | undefined;

    if (body.record && body.table === 'blog_posts') {
      // Supabase webhook payload
      const { record } = body;
      id = record.id;
      title = record.title;
      slug = record.slug;
      excerpt = record.excerpt;
      cover_image = record.cover_image;
    } else {
      // Direct request payload
      id = body.id;
      title = body.title;
      slug = body.slug;
      excerpt = body.excerpt;
      cover_image = body.cover_image;
    }

    if (!title || !slug) {
      return NextResponse.json({ error: 'Missing required parameters: title and slug' }, { status: 400 });
    }

    // 3. Database Check: Fetch and verify the post status
    let query = supabaseAdmin.from('blog_posts').select('*');
    if (id) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', slug);
    }

    const { data: dbPost, error: dbPostError } = await query.maybeSingle();

    if (dbPostError) {
      console.error('Error fetching blog post from database:', dbPostError);
      return NextResponse.json({ error: 'Database fetch failure' }, { status: 500 });
    }

    if (!dbPost) {
      return NextResponse.json({ error: `Blog post not found in database for identifier: ${id || slug}` }, { status: 404 });
    }

    // Safeguard check: exit if newsletter was already sent
    if (dbPost.newsletter_sent) {
      console.info(`Newsletter duplicate prevention: already sent for post id: ${dbPost.id}. Exiting.`);
      return NextResponse.json({
        success: true,
        message: 'Newsletter already sent for this blog post. Execution aborted to prevent duplication.'
      });
    }

    // Safeguard check: exit if post is not published
    if (!dbPost.published) {
      console.info(`Newsletter delivery skipped: post id ${dbPost.id} is not marked as published.`);
      return NextResponse.json({
        success: true,
        message: 'Blog post is not published. Newsletter will not be sent.'
      });
    }

    // 4. Acquire send lock (update newsletter_sent to true) immediately before sending
    const { error: lockError } = await supabaseAdmin
      .from('blog_posts')
      .update({ newsletter_sent: true })
      .eq('id', dbPost.id);

    if (lockError) {
      console.error('Failed to acquire newsletter send lock for post:', dbPost.id, lockError);
      return NextResponse.json({ error: 'Failed to update newsletter lock status' }, { status: 500 });
    }

    // 5. Query active subscribers list
    const { data: subscribers, error: subError } = await supabaseAdmin
      .from('subscribers')
      .select('id, email')
      .eq('active', true);

    if (subError) {
      console.error('Failed to retrieve subscribers:', subError);
      // Revert the send lock so we can re-try later
      await supabaseAdmin.from('blog_posts').update({ newsletter_sent: false }).eq('id', dbPost.id);
      return NextResponse.json({ error: 'Database subscribers fetch failure' }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      console.info('No active subscribers found. Exiting.');
      return NextResponse.json({
        success: true,
        totalSubscribers: 0,
        successfulSends: 0,
        failedSends: 0,
        message: 'No active subscribers found.'
      });
    }

    // 6. Send newsletter emails via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || 'insights@japarmysholly.dev';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://japarmysholly.dev';

    const results = {
      totalSubscribers: subscribers.length,
      successfulSends: 0,
      failedSends: 0,
      failures: [] as { email: string; error: string }[]
    };

    console.info(`Beginning newsletter dispatch for "${dbPost.title}" to ${subscribers.length} active subscribers.`);

    // Batch sending in parallel chunks of 5 to respect rate limits
    const batchSize = 5;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (sub) => {
          const unsubscribeUrl = `${appUrl}/unsubscribe?id=${sub.id}`;
          const articleUrl = `${appUrl}/blog/${dbPost.slug}`;
          
          try {
            const { error: sendError } = await resend.emails.send({
              from: `Insights by JaparmySholly <${fromEmail}>`,
              to: sub.email,
              subject: `Insights by JaparmySholly: ${dbPost.title}`,
              html: generateEmailHtml({
                title: dbPost.title,
                excerpt: dbPost.excerpt,
                cover_image: dbPost.cover_image || undefined,
                articleUrl,
                unsubscribeUrl,
                appUrl
              })
            });

            if (sendError) {
              throw sendError;
            }

            results.successfulSends++;
          } catch (err: any) {
            console.error(`Failed sending to subscriber ${sub.email}:`, err);
            results.failedSends++;
            results.failures.push({ email: sub.email, error: err.message || 'Unknown error' });
          }
        })
      );

      // Brief pause between batches to prevent rate limiting
      if (i + batchSize < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    console.info(`Newsletter dispatch finished. Successful: ${results.successfulSends}, Failed: ${results.failedSends}`);

    return NextResponse.json({
      success: true,
      totalSubscribers: results.totalSubscribers,
      successfulSends: results.successfulSends,
      failedSends: results.failedSends,
      failures: results.failures.length > 0 ? results.failures : undefined
    });

  } catch (error: any) {
    console.error('Fatal newsletter send error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

interface EmailHtmlProps {
  title: string;
  excerpt: string;
  cover_image?: string;
  articleUrl: string;
  unsubscribeUrl: string;
  appUrl: string;
}

function generateEmailHtml({
  title,
  excerpt,
  cover_image,
  articleUrl,
  unsubscribeUrl,
  appUrl
}: EmailHtmlProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #050810;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #cbd5e1;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .card {
          background-color: #0f172a;
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        .logo {
          text-align: center;
          font-family: 'Courier New', Courier, monospace;
          font-weight: bold;
          font-size: 18px;
          color: #06b6d4;
          letter-spacing: 2px;
          margin-bottom: 24px;
          text-transform: uppercase;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
          margin-bottom: 24px;
        }
        .cover-image {
          width: 100%;
          max-height: 280px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .excerpt {
          font-size: 16px;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 28px;
        }
        .btn-container {
          text-align: center;
          margin-bottom: 32px;
        }
        .btn {
          display: inline-block;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: #ffffff !important;
          font-weight: bold;
          font-size: 15px;
          text-decoration: none;
          padding: 12px 32px;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
          text-align: center;
        }
        .footer {
          text-align: center;
          font-size: 11px;
          color: #64748b;
          line-height: 1.5;
          margin-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 24px;
        }
        .footer a {
          color: #a855f7;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="logo">
            [ Insights by JaparmySholly ]
          </div>
          <div class="divider"></div>
          
          ${cover_image ? `<img src="${cover_image}" alt="Article Cover" class="cover-image" />` : ''}
          
          <h2 class="title">${title}</h2>
          
          <p class="excerpt">${excerpt}</p>
          
          <div class="btn-container">
            <a href="${articleUrl}" class="btn" target="_blank">Read Insight</a>
          </div>
          
          <div class="footer">
            <p>You're receiving this because you subscribed on <a href="${appUrl}" style="color: #06b6d4; text-decoration: none;">japarmysholly.dev</a>.</p>
            <p><a href="${unsubscribeUrl}">Unsubscribe</a> from these notifications at any time.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
