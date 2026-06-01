'use client';

import AnimatedSection from './AnimatedSection';

export default function Blog() {
  const posts = [
    {
      title: 'How I Built an AI Malware Detection System',
      date: 'August 2025',
      category: 'Cybersecurity',
      excerpt:
        'A walkthrough of designing a hybrid malware detection system using machine learning and signature matching.',
    },
    {
      title: 'Understanding Phishing Attacks in 2025',
      date: 'July 2025',
      category: 'Security Awareness',
      excerpt:
        'Common phishing techniques and practical steps to protect yourself and your organization.',
    },
    {
      title: 'Using Python for DFIR Automation',
      date: 'June 2025',
      category: 'Digital Forensics',
      excerpt:
        'Automating incident response and forensic analysis using Python scripts and open-source tools.',
    },
  ];

  return (
    <section id="blog" className="section">
      <AnimatedSection animation="slide-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Blog & Insights
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full mx-auto mb-6"></div>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Sharing insights on cybersecurity, software development,
            research, and emerging technologies.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.title}
            className="glass rounded-2xl p-6 border border-cyber-accent/10 hover:border-cyber-accent/30 transition-all"
          >
            <span className="text-cyber-accent text-sm">
              {post.category}
            </span>

            <h3 className="text-xl font-semibold mt-3 mb-3">
              {post.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              {post.excerpt}
            </p>

            <p className="text-xs text-gray-500">
              {post.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}