'use client';

import { ChevronDown } from 'lucide-react';
import Button from './Button';
import AnimatedSection from './AnimatedSection';
import ProfileImage from './ProfileImage';



export default function Hero() {
  return (
    <section
      id="home"
      className="section relative min-h-screen md:min-h-screen flex flex-col items-center justify-center py-12 md:py-24 px-4 md:px-0"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyber-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <AnimatedSection animation="fade-in" className="text-center max-w-3xl w-full">
        {/* Professional Profile Image */}
        <ProfileImage />

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight">
          Hi, I'm{' '}
          <span className="gradient-text">Sholly</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 leading-relaxed max-w-md mx-auto">
          Cybersecurity Engineer • Academic Researcher • Software Developer
        </p>

        <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
          I build secure systems and develop innovative security solutions. Passionate about protecting systems and uncovering vulnerabilities.
          I help students and organizations navigate academic challenges, cybersecurity concepts, and software development projects through research-driven and innovative solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-0">
          <a href="#projects" className="w-full sm:w-auto">
            <Button size="sm" variant="primary" className="w-full sm:w-auto">
              View My Projects
            </Button>
          </a>
          <a href="#contact" className="w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              Get In Touch
            </Button>
          </a>
        </div>
      </AnimatedSection>

      {/* Scroll indicator - Desktop only */}
      <AnimatedSection
        animation="slide-up"
        className="hidden md:flex mt-8 justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">Scroll to explore</span>
          <ChevronDown
            size={16}
            className="text-cyber-accent animate-bounce-soft"
          />
        </div>
      </AnimatedSection>
    </section>
  );
}