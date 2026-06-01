'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProfileImage() {
  return (
    <motion.div
      className="mb-4 md:mb-6 flex justify-center"
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
          className="absolute -inset-2 rounded-full border border-cyber-accent/40"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Second ring */}
        <motion.div
          className="absolute -inset-4 rounded-full border border-white/20"
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden rounded-full border-4 border-white/80 bg-cyber-dark">
          <Image
            src="/sholly.jpg"
            alt="Sholly"
            width={300}
            height={300}
            priority
            className="
              w-32 h-32
              sm:w-36 sm:h-36
              md:w-44 md:h-44
              lg:w-52 lg:h-52
              object-cover
            "
          />
        </div>

        {/* Corner accents */}
        <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl-lg" />
      </div>
    </motion.div>
  );
}