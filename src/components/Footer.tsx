'use client';

import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/JaparmySholly',
      label: 'GitHub',
    },
    {
      icon: Twitter,
      href: 'https://x.com/japarmysholly',
      label: 'Twitter',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/japarmysholly/',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:japarmysholly@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <footer className="border-t border-cyber-accent/20 bg-cyber-dark/50 backdrop-blur">
      <AnimatedSection animation="fade-in">

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary flex items-center justify-center font-bold text-black">
                  S
                </div>

                <span className="text-xl font-bold gradient-text">
                  Sholly
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-cyber-accent">
                Quick Links
              </h3>

              <div className="flex flex-wrap gap-5 text-sm">
                <a
                  href="#home"
                  className="text-gray-400 hover:text-cyber-accent transition-colors"
                >
                  Home
                </a>

                <a
                  href="#skills"
                  className="text-gray-400 hover:text-cyber-accent transition-colors"
                >
                  Skills
                </a>

                <a
                  href="#projects"
                  className="text-gray-400 hover:text-cyber-accent transition-colors"
                >
                  Projects
                </a>

                <a
                  href="#certifications"
                  className="text-gray-400 hover:text-cyber-accent transition-colors"
                >
                  Certifications
                </a>

                <a
                  href="#blog"
                  className="text-gray-400 hover:text-cyber-accent transition-colors"
                >
                  Blog
                </a>

                <a
                  href="#contact"
                  className="text-gray-400 hover:text-cyber-accent transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4 text-cyber-accent">
                Connect
              </h3>

              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="
                        w-10 h-10
                        rounded-lg
                        glass
                        hover:bg-cyber-accent/20
                        hover-glow
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        group
                      "
                    >
                      <Icon
                        size={18}
                        className="text-cyber-accent group-hover:scale-110 transition-transform"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Full Width Divider */}
        <div className="w-full border-t border-cyber-accent/10">

          <div className="max-w-7xl mx-auto px-6 py-5">

            <p className="text-center text-gray-500 text-sm">
              © {currentYear} Sholly. All rights reserved.
            </p>

          </div>

        </div>

      </AnimatedSection>
    </footer>
  );
}