'use client';

import { ChevronDown } from 'lucide-react';
import Button from './Button';
import AnimatedSection from './AnimatedSection';
import ProfileImage from './ProfileImage';
import Terminal from './Terminal';

export default function Hero() {
  return (
    <section
      id="home"
      className="
        section
        relative
        min-h-fit
        lg:min-h-screen
        flex
        flex-col
        items-center
        justify-start
        pt-20
        sm:pt-24
        md:pt-16
        lg:pt-28
        pb-8
        md:pb-16
        px-4
      "
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyber-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <AnimatedSection
        animation="fade-in"
        className="w-full text-center"
      >
        {/* Main Grid: items-stretch aligns column heights, gap-4 narrows the column distance */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-stretch">
          
          {/* Left Column: Operator Centered Identity Block (6 cols, centered alignment) */}
          <div className="lg:col-span-6 flex flex-col items-center text-center">
            
            {/* Unified personal identity stack */}
            <div className="flex flex-col items-center w-full">
              {/* Profile Image with 32px-40px spacing block */}
              <div className="mb-8 md:mb-10 w-full flex justify-center">
                <ProfileImage size="md" className="mb-0" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 md:mb-3 leading-tight text-white font-sans">
                Hi, I'm <span className="gradient-text text-white font-bold">Sholly</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-cyber-accent font-mono mb-4 tracking-wider uppercase font-semibold">
                [ Cybersecurity Engineer • Software Developer ]
              </p>

              {/* Widened paragraph (max-w-2xl) for better line length and readability, justified */}
              <p 
                className="text-xs sm:text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-2xl leading-relaxed font-sans"
                style={{ textAlign: 'justify' }}
              >
                I build secure systems and develop innovative security solutions.
                Passionate about protecting systems and uncovering vulnerabilities.
                I help students and organizations navigate academic challenges,
                cybersecurity concepts, and software development projects through
                research-driven and innovative solutions.
              </p>
            </div>

            {/* CTA Buttons - Centered horizontally across all viewports */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center w-full max-w-md sm:max-w-none mt-6">
              <a href="#projects" className="w-full sm:w-auto">
                <Button
                  size="md"
                  variant="primary"
                  className="w-full sm:w-auto hover-glow"
                >
                  View My Projects
                </Button>
              </a>

              <a href="#contact" className="w-full sm:w-auto">
                <Button
                  size="md"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Get In Touch
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Terminal console (6 cols, aligned top-to-top, narrower by 8-10%, aligned closer to left) */}
          <div className="lg:col-span-6 w-full mt-0 lg:h-full flex flex-col">
            <div className="relative w-full h-[350px] sm:h-[400px] lg:h-full flex flex-col lg:max-w-[90%] lg:mr-auto">
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary opacity-15 blur-lg pointer-events-none"></div>
              <div className="relative h-full flex flex-col">
                <Terminal />
              </div>
            </div>
          </div>

        </div>
      </AnimatedSection>

      {/* Scroll indicator - Desktop only */}
      <AnimatedSection
        animation="slide-up"
        className="hidden lg:flex mt-12 justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
            SCROLL TO EXPLORE
          </span>

          <ChevronDown
            size={18}
            className="text-cyber-accent animate-bounce-soft"
          />
        </div>
      </AnimatedSection>
    </section>
  );
}