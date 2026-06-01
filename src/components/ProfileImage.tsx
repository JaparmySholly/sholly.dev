'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProfileImage() {
  return (
    <motion.div
      className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
    >
      <div className="relative">
        {/* Premium glow */}
        <div className="absolute -inset-4 md:-inset-6 rounded-full bg-gradient-to-r from-cyber-accent via-cyber-accent-secondary to-cyber-accent-tertiary opacity-30 blur-2xl animate-pulse"></div>

        {/* Rotating ring */}
        <motion.div
          className="absolute -inset-2 rounded-full border border-cyber-accent/30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Secondary rotating ring */}
        <motion.div
          className="absolute -inset-4 rounded-full border border-cyber-accent-secondary/20"
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Profile image */}
        <div className="relative overflow-hidden rounded-full border-4 border-cyber-accent/50 shadow-2xl bg-cyber-dark">
          <Image
            src="/sholly.jpg"
            alt="Sholly - Cybersecurity Engineer"
            width={250}
            height={250}
            priority
            className="
              w-28 h-28
              sm:w-32 sm:h-32
              md:w-40 md:h-40
              lg:w-48 lg:h-48
              xl:w-56 xl:h-56
              object-cover
            "
          />
        </div>

        {/* Corner accents */}
        <motion.div
          className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-cyber-accent rounded-tr-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-cyber-accent-secondary rounded-bl-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
      </div>
    </motion.div>
  );
}