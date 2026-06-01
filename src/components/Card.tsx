'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={hover ? { scale: 0.995 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass rounded-2xl p-6 transition-smooth ${
        hover ? 'hover-glow hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

