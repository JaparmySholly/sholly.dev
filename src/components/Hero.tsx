'use client';

import { ChevronDown } from 'lucide-react';
import Button from './Button';
import AnimatedSection from './AnimatedSection';
import ProfileImage from './ProfileImage';



export default function Hero() {
  return (
    <section
      id="home"
      className="section relative min-h-screen md:min-h-screen flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-32 px-4 md:px-0"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyber-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <AnimatedSection animation="fade-in" className="text-center max-w-4xl w-full">
        {/* Professional Profile Image */}
        <ProfileImage />

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-7 md:mb-8 lg:mb-10 leading-tight">
          Hi, I'm{' '}
          <span className="gradient-text">Sholly</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-5 md:mb-6 leading-relaxed max-w-2xl mx-auto px-2 md:px-0">
          Cybersecurity Engineer • Academic Researcher • Software Developer
        </p>

        <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2 md:px-0 leading-relaxed">
          I build secure systems and develop innovative security solutions. Passionate about protecting systems and uncovering vulnerabilities.
          I help students and organizations navigate academic challenges, cybersecurity concepts, and software development projects through research-driven and innovative solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center w-full sm:w-auto px-2 sm:px-0">
          <a href="#projects" className="w-full sm:w-auto">
            <Button size="md" variant="primary" className="w-full sm:w-auto">
              View My Projects
            </Button>
          </a>
          <a href="#contact" className="w-full sm:w-auto">
            <Button size="md" variant="outline" className="w-full sm:w-auto">
              Get In Touch
            </Button>
          </a>
        </div>
      </AnimatedSection>

      {/* Scroll indicator - Desktop only */}
      <AnimatedSection
        animation="slide-up"
        className="hidden md:flex mt-12 lg:mt-16 justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <ChevronDown
            size={20}
            className="text-cyber-accent animate-bounce-soft"
          />
        </div>
      </AnimatedSection>
    </section>
  );
}