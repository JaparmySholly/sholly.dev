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
    md: 'w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56', // Increased desktop sizing by 10%
    lg: 'w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72',
    xl: 'w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]',
  };

  return (
    <motion.div
      className={`flex justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 90,
      }}
    >
      <div className="relative">
        {/* Subtle Blue/Purple Glow behind the image */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyber-accent-tertiary to-cyber-accent-secondary opacity-35 blur-xl pointer-events-none"></div>

        {/* Image wrapper with thin 2px white border */}
        <div className="relative overflow-hidden rounded-full border-2 border-white bg-cyber-dark shadow-2xl">
          <Image
            src="/sholly.jpg"
            alt="Sholly"
            width={500}
            height={500}
            priority
            className={`${sizeClasses[size]} object-cover`}
          />
        </div>
      </div>
    </motion.div>
  );
}