# Blog System - Database Setup Guide

## Supabase Table Creation

Run the following SQL in your Supabase dashboard (SQL Editor) to create the `blog_posts` table:

```sql
-- Create blog_posts table
create table blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null default 'General',
  cover_image text,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index on slug for faster lookups
create index blog_posts_slug_idx on blog_posts(slug);

-- Create index on published and created_at for sorting
create index blog_posts_published_created_idx on blog_posts(published desc, created_at desc);

-- Enable Row Level Security
alter table blog_posts enable row level security;

-- Create policy: Anyone can read published posts
create policy "Allow public read published posts"
  on blog_posts for select
  using (published = true);

-- Create policy: Authenticated users can read all posts
create policy "Allow authenticated read all posts"
  on blog_posts for select
  using (auth.role() = 'authenticated');

-- Create policy: Authenticated users can create posts
create policy "Allow authenticated insert posts"
  on blog_posts for insert
  with check (auth.role() = 'authenticated');

-- Create policy: Authenticated users can update own posts (or all if you want)
create policy "Allow authenticated update posts"
  on blog_posts for update
  using (auth.role() = 'authenticated');

-- Create policy: Authenticated users can delete posts
create policy "Allow authenticated delete posts"
  on blog_posts for delete
  using (auth.role() = 'authenticated');
```

## Storage Setup

For cover images, create a storage bucket:

1. Go to Supabase Dashboard > Storage
2. Click "Create a new bucket"
3. Name it: `portfolio`
4. Make it public
5. In the Storage tab, select `portfolio` bucket
6. Click "Policies"
7. Create a policy to allow public reads:
   - Name: "Allow public read"
   - Operation: SELECT
   - Target roles: Public
   - Using: `true`

## Sample Data (Optional)

You can insert sample blog posts:

```sql
insert into blog_posts (title, slug, excerpt, content, category, published) values
(
  'How I Built an AI Malware Detection System',
  'ai-malware-detection-system',
  'A walkthrough of designing a hybrid malware detection system using machine learning and signature matching.',
  '## Introduction
AI-powered malware detection is becoming essential for modern cybersecurity.

## Approach
We combined machine learning models with traditional signature-based detection to create a hybrid system.

## Implementation
- Used Python with scikit-learn for ML models
- Integrated with VirusTotal API
- Built a web dashboard for monitoring

## Results
Our system achieved 94% detection accuracy with minimal false positives.',
  'Cybersecurity',
  true
),
(
  'Understanding Phishing Attacks in 2025',
  'understanding-phishing-attacks-2025',
  'Common phishing techniques and practical steps to protect yourself and your organization.',
  '## What is Phishing?
Phishing is a social engineering attack that tricks users into revealing sensitive information.

## Common Techniques
- Email spoofing
- Credential harvesting
- Business email compromise (BEC)
- SMS phishing (smishing)

## Protection Strategies
- User awareness training
- Email filtering
- Multi-factor authentication
- Regular security audits

## Best Practices
Always verify sender addresses and be cautious with unsolicited requests.',
  'Security Awareness',
  true
),
(
  'Using Python for DFIR Automation',
  'python-dfir-automation',
  'Automating incident response and forensic analysis using Python scripts and open-source tools.',
  '## Why Automate DFIR?
Manual forensic analysis is time-consuming and error-prone. Automation accelerates investigations.

## Python Tools
- python-evtx: Parse Windows Event Logs
- pycurl: Automate artifact collection
- volatility: Memory analysis
- yara-python: Pattern matching

## Workflow Automation
- Automated log parsing
- Artifact collection
- Timeline generation
- Report generation

## Example Script
```
import evtx
import json

def parse_event_log(path):
    with evtx.Evtx(path) as evtx_file:
        for event in evtx_file.records():
            print(json.dumps(event.xml(), indent=2))
```',
  'Digital Forensics',
  true
);
```

## Environment Variables

Make sure these are set in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

## Accessing the Admin Dashboard

Once everything is set up:

1. Navigate to `/admin/blog`
2. Click "New Post" to create a blog post
3. Fill in the form and click "Save Post"
4. Check "Published" to make it visible on the blog page
5. Click "Edit" or "Delete" to manage existing posts

## Troubleshooting

- **Posts not showing?** Check if `published` is set to `true`
- **Image upload failing?** Ensure the `portfolio` storage bucket is public and accessible
- **Auth errors?** Verify RLS policies allow public reads for published posts
- **Slugs not unique?** The system auto-generates slugs from titles; edit if needed
