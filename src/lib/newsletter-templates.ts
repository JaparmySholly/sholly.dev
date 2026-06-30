interface EmailWrapperProps {
  title: string;
  preheader: string;
  contentHtml: string;
  appUrl: string;
}

/**
 * Standard dark cybersecurity email template wrapper.
 * Reusable for multiple types of transactional emails.
 */
export function generateEmailWrapper({
  title,
  preheader,
  contentHtml,
  appUrl
}: EmailWrapperProps): string {
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
        .title {
          font-size: 22px;
          font-weight: bold;
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .text {
          font-size: 15px;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 20px;
        }
        .list-item {
          font-size: 15px;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 8px;
          padding-left: 10px;
        }
        .btn-container {
          text-align: center;
          margin: 28px 0;
        }
        .btn-primary {
          display: inline-block;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: #ffffff !important;
          font-weight: bold;
          font-size: 15px;
          text-decoration: none;
          padding: 12px 36px;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
          text-align: center;
        }
        .btn-secondary {
          display: inline-block;
          color: #06b6d4 !important;
          font-weight: bold;
          font-size: 13px;
          text-decoration: none;
          padding: 8px 24px;
          border: 1px solid rgba(6, 182, 212, 0.3);
          background-color: rgba(6, 182, 212, 0.05);
          border-radius: 8px;
          text-align: center;
        }
        .signature {
          margin-top: 32px;
          font-size: 15px;
          line-height: 1.6;
          color: #94a3b8;
        }
        .footer {
          text-align: center;
          font-size: 11px;
          color: #64748b;
          line-height: 1.6;
          margin-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 24px;
        }
        .footer a {
          color: #a855f7;
          text-decoration: underline;
        }
        .preheader {
          display: none;
          max-height: 0px;
          overflow: hidden;
          opacity: 0;
        }
      </style>
    </head>
    <body>
      <!-- Invisible preheader text to show in email client preview -->
      <span class="preheader">${preheader}</span>
      
      <div class="container">
        <div class="card">
          <div class="logo">
            [ Insights by JaparmySholly ]
          </div>
          <div class="divider"></div>
          
          ${contentHtml}
          
        </div>
      </div>
    </body>
    </html>
  `;
}

interface WelcomeEmailProps {
  appUrl: string;
}

/**
 * Generates the HTML body content for the Welcome Email.
 */
export function generateWelcomeEmailHtml({ appUrl }: WelcomeEmailProps): string {
  const contentHtml = `
    <h2 class="title" style="text-align: center;">Welcome to the Community</h2>
    
    <p class="text">Hi,</p>
    
    <p class="text">Thank you for subscribing to my newsletter.</p>
    <p class="text">I'm excited to have you here.</p>
    
    <p class="text">You'll occasionally receive carefully written articles covering topics such as:</p>
    
    <div style="margin: 16px 0 16px 12px;">
      <div class="list-item">• Cybersecurity</div>
      <div class="list-item">• AI & Machine Learning</div>
      <div class="list-item">• Malware Analysis</div>
      <div class="list-item">• Secure Software Development</div>
      <div class="list-item">• Threat Intelligence</div>
      <div class="list-item">• Research & Technical Writing</div>
    </div>
    
    <p class="text">I don't send spam, promotional emails, or unnecessary updates.</p>
    <p class="text">You'll only hear from me whenever I publish something genuinely worth reading.</p>
    
    <div class="btn-container">
      <a href="${appUrl}/blog" class="btn-primary" target="_blank">Read My Insights</a>
    </div>
    
    <div class="btn-container" style="margin-top: -12px;">
      <a href="${appUrl}" class="btn-secondary" target="_blank">Visit My Portfolio</a>
    </div>
    
    <p class="text">Thank you for joining.</p>
    <p class="text">I look forward to sharing future research, projects and technical insights with you.</p>
    
    <div class="signature">
      — <strong>Japarmy Sholly</strong><br/>
      <span style="font-size: 13px; color: #64748b;">Cybersecurity Engineer | Software Developer</span>
    </div>
    
    <div class="footer">
      <p>You're receiving this email because you subscribed at <a href="${appUrl}" style="color: #06b6d4; text-decoration: none;">japarmysholly.dev</a>.</p>
      <p>If you ever change your mind, you can unsubscribe anytime using the link at the bottom of future newsletter emails.</p>
    </div>
  `;

  return generateEmailWrapper({
    title: 'Welcome to Insights by JaparmySholly 👋',
    preheader: "Thanks for subscribing. You'll be the first to know when I publish new articles.",
    contentHtml,
    appUrl
  });
}
