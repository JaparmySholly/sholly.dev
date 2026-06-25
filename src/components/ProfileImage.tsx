'use client';
 
import Image from 'next/image';
import { motion } from 'framer-motion';
 
interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
 
export default function ProfileImage({ size = 'md', className = '' }: ProfileImageProps) {
  // Restored original circular sizing classes for visual consistency and spacing balance
  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
    md: 'w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56',
    lg: 'w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72',
    xl: 'w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]',
  };
 
  return (
    <motion.div
      className={`flex justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 90,
      }}
    >
      <div className="relative">
        {/* Soft, subtle cyan outer glow behind the circular frame */}
        <div className="absolute -inset-3 rounded-full bg-cyber-accent/10 blur-xl pointer-events-none"></div>
 
        {/* Very thin secondary ring with a slow, elegant pulse animation */}
        <motion.div 
          className="absolute -inset-4 rounded-full border border-cyber-accent/15 pointer-events-none"
          animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
 
        {/* Minimal HUD Corner reticle brackets framing the circle */}
        <div className="absolute -inset-1.5 pointer-events-none">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-cyber-accent/35 rounded-tl-[3px]"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-cyber-accent/35 rounded-tr-[3px]"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-cyber-accent/35 rounded-bl-[3px]"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-cyber-accent/35 rounded-br-[3px]"></div>
        </div>
 
        {/* Profile Image Wrapper: clean 2px white border with soft drop shadow */}
        <div className={`relative overflow-hidden rounded-full border-2 border-white/95 bg-cyber-dark shadow-2xl shadow-black/80 ${sizeClasses[size]}`}>
          <Image
            src="/sholly.jpg"
            alt="Sholly"
            width={500}
            height={500}
            priority
            className="w-full h-full object-cover"
          />
 
          {/* Extremely subtle horizontal laser scan line overlay */}
          <motion.div
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-accent/30 to-transparent pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}