'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInVariants, slideUpVariants, slideDownVariants, scrollRevealVariants, containerVariants } from './animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-down';
  delay?: number; // milliseconds
  stagger?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) {
  const delaySec = Math.max(0, delay) / 1000;

  // Choose variant
  let variants = scrollRevealVariants(delaySec);
  if (animation === 'fade-in') variants = fadeInVariants;
  if (animation === 'slide-up') variants = scrollRevealVariants(delaySec);
  if (animation === 'slide-down') variants = slideDownVariants;

  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </motion.div>
  );
}
