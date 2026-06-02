import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Save to Supabase
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          message,
        },
      ]);

    if (error) {
      throw error;
    }

    // Send email notification
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'japarmysholly@gmail.com',
      subject: `New Portfolio Enquiry from ${name}`,
      html: `
        <h2>New Portfolio Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}