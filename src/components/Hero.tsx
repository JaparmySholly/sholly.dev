'use client';

import { ChevronDown } from 'lucide-react';
import Button from './Button';
import AnimatedSection from './AnimatedSection';

export default function Hero() {
  return (
    <section
      id="home"
      className="section relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-24"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyber-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <AnimatedSection animation="fade-in" className="text-center max-w-4xl">
        <div className="inline-block mb-6">
          <div className="glass px-6 py-3 rounded-full text-sm font-medium text-cyber-accent border border-cyber-accent/50">
            Welcome to my portfolio
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Hi, I'm{' '}
          <span className="gradient-text">Sholly</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          Cybersecurity Engineer • Academic Researcher • Software Developer
        </p>

        <p className="text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">          I build secure systems, conduct threat hunting, and develop innovative
          security solutions. Passionate about protecting systems and uncovering vulnerabilities.
          <br />
          I help students and organizations navigate academic challenges, cybersecurity concepts, and software development projects through research-driven and innovative solutions.
        </p>
        {/* <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          I help students and organizations navigate academic challenges, cybersecurity concepts, and software development projects through research-driven and innovative solutions.
        </p> */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects">
            <Button size="lg" variant="primary">
              View My Projects
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline">
              Get In Touch
            </Button>
          </a>
        </div>
      </AnimatedSection>

      {/* Scroll indicator - Desktop only */}
      <AnimatedSection
        animation="slide-up"
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
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