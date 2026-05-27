const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, 'src', 'components', 'ui');

// Create directory
if (!fs.existsSync(uiDir)) {
  fs.mkdirSync(uiDir, { recursive: true });
  console.log(`Created directory: ${uiDir}`);
}

// Button.tsx
const buttonContent = `'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-xl transition-smooth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-accent disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary text-black hover:shadow-lg hover:shadow-cyber-accent/50',
    secondary:
      'bg-cyber-accent-secondary text-white hover:bg-cyber-accent hover:text-black',
    outline:
      'border-2 border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={\\`\\${baseStyles} \\${sizeStyles[size]} \\${variantStyles[variant]} \\${className}\\`}
    >
      {children}
    </button>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'Button.tsx'), buttonContent);
console.log('Created Button.tsx');

// Card.tsx
const cardContent = `'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  animated?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = true,
  animated = false,
}: CardProps) {
  return (
    <div
      className={\\`glass rounded-2xl p-6 transition-smooth \\${
        hover ? 'hover-glow hover:shadow-xl' : ''
      } \\${animated ? 'animate-fade-in' : ''} \\${className}\\`}
    >
      {children}
    </div>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'Card.tsx'), cardContent);
console.log('Created Card.tsx');

// Badge.tsx
const badgeContent = `'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  animated?: boolean;
}

export default function Badge({
  children,
  variant = 'primary',
  className = '',
  animated = false,
}: BadgeProps) {
  const baseStyles =
    'inline-block rounded-full px-4 py-2 text-sm font-medium transition-smooth';

  const variantStyles = {
    primary:
      'bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/50 hover:bg-cyber-accent/30',
    secondary:
      'bg-cyber-accent-secondary/20 text-cyber-accent-secondary border border-cyber-accent-secondary/50 hover:bg-cyber-accent-secondary/30',
    outline:
      'border-2 border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10',
  };

  return (
    <span
      className={\\`\\${baseStyles} \\${variantStyles[variant]} \\${
        animated ? 'animate-fade-in' : ''
      } \\${className}\\`}
    >
      {children}
    </span>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'Badge.tsx'), badgeContent);
console.log('Created Badge.tsx');

// AnimatedSection.tsx
const animatedSectionContent = `'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-down';
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={\\`\\${
        isVisible ? \\`animate-\\${animation}\\` : 'opacity-0'
      } transition-smooth \\${className}\\`}
    >
      {children}
    </div>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'AnimatedSection.tsx'), animatedSectionContent);
console.log('Created AnimatedSection.tsx');

// Navbar.tsx
const navbarContent = `'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="glass-lg fixed top-0 left-0 right-0 z-50 border-b border-cyber-accent/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary flex items-center justify-center font-bold text-black">
            S
          </div>
          <span className="text-xl font-bold gradient-text">Sholly</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-cyber-accent transition-smooth text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-4">
          <Button variant="outline" size="sm">
            Resume
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-cyber-accent/10 transition-smooth"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={24} className="text-cyber-accent" />
          ) : (
            <Menu size={24} className="text-cyber-accent" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-cyber-accent/20 bg-cyber-dark/80 backdrop-blur-sm">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-cyber-accent transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Resume
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'Navbar.tsx'), navbarContent);
console.log('Created Navbar.tsx');

// index.ts
const indexContent = `export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Badge } from './Badge';
export { default as Navbar } from './Navbar';
export { default as AnimatedSection } from './AnimatedSection';
`;

fs.writeFileSync(path.join(uiDir, 'index.ts'), indexContent);
console.log('Created index.ts');

console.log('\n✅ All UI components created successfully!');
