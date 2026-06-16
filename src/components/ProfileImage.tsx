'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function ProfileImage({ size = 'md', className = '' }: ProfileImageProps) {
  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
    md: 'w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52',
    lg: 'w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72',
    xl: 'w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]',
  };

  return (
    <motion.div
      className={`mb-4 md:mb-6 flex justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
    >
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyber-accent via-cyber-accent-secondary to-cyber-accent-tertiary opacity-20 blur-xl"></div>

        {/* Outer ring */}
        <motion.div
          className="absolute -inset-2 md:-inset-4 rounded-full border border-cyber-accent/40"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Second ring */}
        <motion.div
          className="absolute -inset-4 md:-inset-8 rounded-full border border-white/20"
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden rounded-full border-4 border-white/80 bg-cyber-dark shadow-2xl shadow-cyber-accent/20">
          <Image
            src="/sholly.jpg"
            alt="Sholly"
            width={500}
            height={500}
            priority
            className={`${sizeClasses[size]} object-cover`}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute -top-2 -right-2 w-5 h-5 md:w-8 md:h-8 border-t-2 border-r-2 border-white rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-5 h-5 md:w-8 md:h-8 border-b-2 border-l-2 border-white rounded-bl-lg" />
      </div>
    </motion.div>
  );
}