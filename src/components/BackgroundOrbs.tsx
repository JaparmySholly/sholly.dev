'use client';

import { motion } from 'framer-motion';

interface BackgroundOrbsProps {
  className?: string;
}

export default function BackgroundOrbs({ className = '' }: BackgroundOrbsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1: Ambient base glow */}
      <div className="absolute inset-0 bg-ambient-glow opacity-40" />

      {/* Layer 2: Primary Cyan Orb - Top Right with enhanced blur and glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-radial-cyan-premium rounded-full blur-[120px]"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 3: Secondary Purple Orb - Bottom Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-radial-purple-premium rounded-full blur-[120px]"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />

      {/* Layer 4: Tertiary Blue Orb - Top Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute -top-64 -left-32 w-80 h-80 bg-gradient-radial-blue-premium rounded-full blur-[110px] opacity-30"
        animate={{
          y: [0, 20, 0],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Layer 5: Center soft glow for depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial-cyan-soft rounded-full blur-[100px] opacity-15"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 6: Bottom right accent glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute -bottom-32 -right-32 w-72 h-72 bg-gradient-radial-purple-soft rounded-full blur-[100px] opacity-20"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
        }}
      />

      {/* Layer 7: Subtle grid overlay for depth */}
      <div className="absolute inset-0 bg-subtle-grid opacity-30" />

      {/* Layer 8: Vignette for premium feel */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
}
