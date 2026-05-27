'use client';

import { Mail, Github, Linkedin, ExternalLink, Twitter } from 'lucide-react';
import Button from './Button';
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
      <div className="section">
        <AnimatedSection animation="fade-in">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary flex items-center justify-center font-bold text-black">
                  S
                </div>
                <span className="text-xl font-bold gradient-text">Sholly</span>
              </div>
              <p className="text-gray-400 text-sm">
                Cybersecurity engineer building secure systems & solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-cyber-accent">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-cyber-accent transition-smooth text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-cyber-accent transition-smooth text-sm"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-gray-400 hover:text-cyber-accent transition-smooth text-sm"
                  >
                    Skills
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-4 text-cyber-accent">Connect</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg glass hover-glow flex items-center justify-center transition-smooth group"
                      aria-label={social.label}
                    >
                      <Icon
                        size={20}
                        className="text-cyber-accent group-hover:scale-110 transition-transform"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cyber-accent/10 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © {currentYear} Sholly.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
