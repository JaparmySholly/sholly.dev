'use client';

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
      className={`${baseStyles} ${variantStyles[variant]} ${
        animated ? 'animate-fade-in' : ''
      } ${className}`}
    >
      {children}
    </span>
  );
}
