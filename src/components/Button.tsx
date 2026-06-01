'use client';

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
    'font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2.5 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30',

    secondary:
      'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',

    outline:
      'border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:scale-105',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}