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
      <div className="section px-4 md:px-0">
        <AnimatedSection animation="fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Brand */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary flex items-center justify-center font-bold text-black text-xs md:text-sm flex-shrink-0">
                  S
                </div>
                <span className="text-lg md:text-xl font-bold gradient-text">Sholly</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Cybersecurity engineer building secure systems & solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className="font-semibold mb-3 md:mb-4 text-cyber-accent text-sm md:text-base">Quick Links</h3>
              <ul className="space-y-1.5 md:space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-cyber-accent transition-smooth text-xs md:text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-cyber-accent transition-smooth text-xs md:text-sm"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-gray-400 hover:text-cyber-accent transition-smooth text-xs md:text-sm"
                  >
                    Skills
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
              <h3 className="font-semibold mb-3 md:mb-4 text-cyber-accent text-sm md:text-base">Connect</h3>
              <div className="flex gap-2 md:gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg glass hover:bg-cyber-accent/20 hover-glow flex items-center justify-center transition-smooth group flex-shrink-0"
                      aria-label={social.label}
                    >
                      <Icon
                        size={16}
                        className="md:w-5 md:h-5 text-cyber-accent group-hover:scale-110 transition-transform"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cyber-accent/10 pt-6 md:pt-8">
            <p className="text-center text-gray-500 text-xs md:text-sm">
              © {currentYear} Sholly.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
