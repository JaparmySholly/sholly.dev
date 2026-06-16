'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';
import { slideDownVariants, floatingVariants, containerVariants, itemVariants } from './animations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Set active section based on pathname for non-home pages
  useEffect(() => {
    if (pathname === '/about') {
      setActiveSection('about');
    } else if (pathname.startsWith('/blog')) {
      setActiveSection('blog');
    }
  }, [pathname]);

  const navItems = [
    {
      label: 'Home',
      href: pathname === '/' ? '#home' : '/#home',
      id: 'home',
    },
    {
      label: 'About',
      href: '/about',
      id: 'about',
    },
    {
      label: 'Skills',
      href: pathname === '/' ? '#skills' : '/#skills',
      id: 'skills',
    },
    {
      label: 'Projects',
      href: pathname === '/' ? '#projects' : '/#projects',
      id: 'projects',
    },
    {
      label: 'Blog',
      href: pathname === '/' ? '#blog' : '/#blog',
      id: 'blog',
    },
    {
      label: 'Contact',
      href: pathname === '/' ? '#contact' : '/#contact',
      id: 'contact',
    },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Find the current active section
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 0) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);

    const element = document.getElementById(sectionId);

    if (element) {
      // Close menu before scrolling
      setIsOpen(false);
      
      // Use setTimeout to ensure menu closes before scroll
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  return (
    <>
      {/* Premium Glassmorphism Navbar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-cyber-dark/70 border-b border-cyber-accent/10' 
            : 'bg-cyber-dark/40 border-b border-transparent'
        }`}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        initial="hidden"
        animate="visible"
        variants={slideDownVariants}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <motion.div 
              className="flex items-center gap-2 md:gap-3 cursor-pointer flex-shrink-0 min-w-max"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              onClick={() => {
                window.location.assign('/');
              }}
            >
              <motion.div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary flex items-center justify-center font-bold text-black text-xs md:text-sm relative shadow-lg shadow-cyber-accent/30 flex-shrink-0"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.span
                  className="font-bold"
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(6, 182, 212, 0.5)',
                      '0 0 10px rgba(6, 182, 212, 0.8)',
                      '0 0 0px rgba(6, 182, 212, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  S
                </motion.span>
              </motion.div>
              <motion.span 
              className="text-sm md:text-lg font-bold gradient-text hidden xs:inline-block"                
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
              >
                Sholly
              </motion.span>
            </motion.div>

            {/* Desktop Navigation Menu */}
            <motion.div 
              className="hidden md:flex items-center gap-1 lg:gap-2"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  custom={index}
                >
                  <motion.a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative px-3 py-2 text-xs lg:text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                      activeSection === item.id
                        ? 'text-cyber-accent'
                        : 'text-gray-300 hover:text-cyber-accent'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {item.label}
                    
                    {/* Active indicator with smooth animation */}
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyber-accent to-purple-500 rounded-full"
                      initial={false}
                      animate={{
                        opacity: activeSection === item.id ? 1 : 0,
                        scale: activeSection === item.id ? 1 : 0.8,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop CTA Button */}
            <motion.div 
              className="hidden md:flex gap-2 lg:gap-3 ml-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 400 }}
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  posthog.capture('resume_clicked');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Button variant="outline" size="sm" className="glass-navbar-btn text-xs lg:text-sm">
                  Resume
                </Button>
              </motion.a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-1.5 rounded-lg glass-navbar-mobile-btn transition-all duration-300 ml-auto flex-shrink-0"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                {isOpen ? (
                  <X size={20} className="text-cyber-accent" strokeWidth={2} />
                ) : (
                  <Menu size={20} className="text-cyber-accent" strokeWidth={2} />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={
            isOpen
              ? { opacity: 1, height: 'auto', y: 0 }
              : { opacity: 0, height: 0, y: -10 }
          }
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="md:hidden bg-cyber-dark/95 border-t border-cyber-accent/20 shadow-xl overflow-hidden"          
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <motion.div 
            className="px-3 py-2 sm:px-4 sm:py-3 space-y-1"
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setIsOpen(false);

                  setTimeout(() => {
                    window.location.href = item.href;
                  }, 150);
                }}
                className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === item.id
                    ? 'text-cyber-accent bg-cyber-accent/10'
                    : 'text-gray-300 hover:text-cyber-accent hover:bg-cyber-accent/5'
                }`}
                variants={itemVariants}
                custom={index}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {/* Active indicator dot */}
                <motion.div
                  className="mr-2 sm:mr-3 w-2 h-2 rounded-full bg-gradient-to-r from-cyber-accent to-purple-500 flex-shrink-0"
                  animate={{
                    scale: activeSection === item.id ? 1 : 0,
                    opacity: activeSection === item.id ? 1 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
                {item.label}
              </motion.a>
            ))}
            
            <motion.div
              className="pt-3 sm:pt-4 border-t border-cyber-accent/20 mt-3"
              variants={itemVariants}
              custom={navItems.length}
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  posthog.capture('resume_clicked');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Button variant="outline" size="sm" className="w-full glass-navbar-btn text-xs sm:text-sm">
                  Resume
                </Button>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Navbar spacing compensation - responsive */}
      <div className="h-16 flex-shrink-0" />
    </>
  );
}
