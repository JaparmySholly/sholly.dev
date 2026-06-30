import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { generateWelcomeEmailHtml } from '@/lib/newsletter-templates';

// Setup Supabase admin client to handle subscriptions bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

const validateEmail = (val: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(val.trim());
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const trimmedEmail = (email || '').trim().toLowerCase();

    if (!trimmedEmail) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    if (!validateEmail(trimmedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // 1. Check if email already exists in Supabase
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('subscribers')
      .select('email, active')
      .eq('email', trimmedEmail)
      .maybeSingle();

    if (checkError) {
      console.error('Database query error checking subscriber:', checkError);
      return NextResponse.json({ error: 'Database verification failure' }, { status: 500 });
    }

    let shouldSendWelcome = false;
    let responseStatus = 'success';
    let responseMessage = "Thanks! You'll be notified whenever I publish a new article.";

    if (existing) {
      const isActive = existing.active !== false; // treat null/undefined/true as active

      if (isActive) {
        // Case 2: Already subscribed and active. Do NOT send welcome email.
        return NextResponse.json({
          status: 'active',
          message: "You're already subscribed. You'll automatically receive future Insights in your inbox."
        });
      } else {
        // Case 3: Previously unsubscribed. Reactivate and send welcome email.
        const { error: updateError } = await supabaseAdmin
          .from('subscribers')
          .update({ active: true })
          .eq('email', trimmedEmail);

        if (updateError) {
          console.error('Database update error reactivating subscriber:', updateError);
          return NextResponse.json({ error: 'Database update failure' }, { status: 500 });
        }

        shouldSendWelcome = true;
        responseStatus = 'reactivated';
        responseMessage = "Welcome back! Your subscription has been reactivated.";
      }
    } else {
      // Case 1: Brand new subscriber. Insert and send welcome email.
      const { error: insertError } = await supabaseAdmin
        .from('subscribers')
        .insert([{ email: trimmedEmail, active: true }]);

      if (insertError) {
        // Handle potential duplicate key race condition
        if (insertError.code === '23505') {
          const { data: retryCheck } = await supabaseAdmin
            .from('subscribers')
            .select('active')
            .eq('email', trimmedEmail)
            .maybeSingle();
            
          const isRetryActive = retryCheck?.active !== false;
          if (isRetryActive) {
            return NextResponse.json({
              status: 'active',
              message: "You're already subscribed. You'll automatically receive future Insights in your inbox."
            });
          } else {
            await supabaseAdmin.from('subscribers').update({ active: true }).eq('email', trimmedEmail);
            shouldSendWelcome = true;
            responseStatus = 'reactivated';
            responseMessage = "Welcome back! Your subscription has been reactivated.";
          }
        } else {
          console.error('Database insert error creating subscriber:', insertError);
          return NextResponse.json({ error: 'Database insertion failure' }, { status: 500 });
        }
      } else {
        shouldSendWelcome = true;
      }
    }

    // 2. Dispatch Welcome Email (Non-blocking: don't interrupt signup if email fails)
    if (shouldSendWelcome) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || 'insights@japarmysholly.dev';
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://japarmysholly.dev';

        console.info(`Attempting welcome email dispatch for: ${trimmedEmail}`);

        const { error: sendError } = await resend.emails.send({
          from: `Insights by JaparmySholly <${fromEmail}>`,
          to: trimmedEmail,
          subject: 'Welcome to Insights by JaparmySholly 👋',
          html: generateWelcomeEmailHtml({ appUrl })
        });

        if (sendError) {
          throw sendError;
        }

        console.info(`Welcome email successfully sent to: ${trimmedEmail}`);
      } catch (emailErr: any) {
        console.error(`Gracefully handled welcome email failure for ${trimmedEmail}:`, emailErr);
      }
    }

    return NextResponse.json({
      status: responseStatus,
      message: responseMessage
    });

  } catch (error: any) {
    console.error('Fatal signup api error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
