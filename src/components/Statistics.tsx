'use client';

import { Users, Shield, BookOpen, Zap } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface Stat {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: any;
  color: 'cyan' | 'blue' | 'purple' | 'accent';
  bgGradient: string;
}

const stats: Stat[] = [
  {
    id: 'students',
    value: '20+',
    label: 'International Research Students Mentored',
    description: 'Guiding the next generation of researchers',
    icon: Users,
    color: 'cyan',
    bgGradient: 'gradient-radial-cyan-premium',
  },
  {
    id: 'projects',
    value: '15+',
    label: 'Cybersecurity Projects',
    description: 'Secure systems and innovative solutions',
    icon: Shield,
    color: 'blue',
    bgGradient: 'gradient-radial-blue-premium',
  },
  {
    id: 'papers',
    value: '50+',
    label: 'Research Papers Reviewed',
    description: 'Advancing academic excellence',
    icon: BookOpen,
    color: 'purple',
    bgGradient: 'gradient-radial-purple-premium',
  },
  {
    id: 'technologies',
    value: '5+',
    label: 'Technologies Used Daily',
    description: 'Modern stack, continuous learning',
    icon: Zap,
    color: 'cyan',
    bgGradient: 'gradient-radial-cyan-premium',
  },
];

function StatCard({
  value,
  label,
  description,
  icon: Icon,
  color,
  bgGradient,
  delay,
}: {
  value: string;
  label: string;
  description: string;
  icon: any;
  color: 'cyan' | 'blue' | 'purple' | 'accent';
  bgGradient: string;
  delay: number;
}) {
  const colorConfig = {
    cyan: {
      border: 'border-cyber-accent/40',
      textAccent: 'text-cyber-accent',
      hover: 'hover:border-cyber-accent/70 hover:shadow-glow-cyan',
      bgHover: 'group-hover:bg-gradient-radial-cyan-premium',
      iconBg: 'bg-cyber-accent/10',
    },
    blue: {
      border: 'border-cyber-accent-tertiary/40',
      textAccent: 'text-cyber-accent-tertiary',
      hover: 'hover:border-cyber-accent-tertiary/70 hover:shadow-glow-blue',
      bgHover: 'group-hover:bg-gradient-radial-blue-premium',
      iconBg: 'bg-cyber-accent-tertiary/10',
    },
    purple: {
      border: 'border-cyber-accent-secondary/40',
      textAccent: 'text-cyber-accent-secondary',
      hover: 'hover:border-cyber-accent-secondary/70 hover:shadow-glow-purple',
      bgHover: 'group-hover:bg-gradient-radial-purple-premium',
      iconBg: 'bg-cyber-accent-secondary/10',
    },
    accent: {
      border: 'border-cyber-accent/40',
      textAccent: 'text-cyber-accent',
      hover: 'hover:border-cyber-accent/70 hover:shadow-glow-cyan',
      bgHover: 'group-hover:bg-gradient-radial-cyan-premium',
      iconBg: 'bg-cyber-accent/10',
    },
  };

  const config = colorConfig[color];

  return (
    <AnimatedSection
      animation="slide-up"
      delay={delay}
    >
      <div className="group h-full">
        <div
          className={`relative h-full p-8 rounded-2xl border backdrop-blur-md transition-all duration-500 ease-smooth ${config.border} ${config.hover} bg-cyber-card hover:bg-cyber-card-lg overflow-hidden`}
        >
          {/* Animated background gradient */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${config.bgHover}`}
            aria-hidden="true"
          ></div>

          {/* Gradient border shimmer effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${
                color === 'cyan'
                  ? '#06b6d4'
                  : color === 'blue'
                    ? '#3b82f6'
                    : color === 'purple'
                      ? '#a855f7'
                      : '#06b6d4'
              } 0%, transparent 50%)`,
              filter: 'blur(20px)',
            }}
            aria-hidden="true"
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <div className="mb-6">
              <div
                className={`inline-flex p-3 rounded-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 ${config.iconBg}`}
              >
                <Icon
                  size={32}
                  className={`transition-all duration-300 ${config.textAccent}`}
                />
              </div>
            </div>

            {/* Value and Label */}
            <div className="flex-1 mb-4">
              <div className={`text-5xl md:text-6xl font-bold mb-3 transition-all duration-300 ${config.textAccent}`}>
                {value}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                {label}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              {description}
            </p>

            {/* Bottom accent line */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out rounded-full ${
                color === 'cyan'
                  ? 'bg-gradient-to-r from-cyber-accent to-transparent'
                  : color === 'blue'
                    ? 'bg-gradient-to-r from-cyber-accent-tertiary to-transparent'
                    : color === 'purple'
                      ? 'bg-gradient-to-r from-cyber-accent-secondary to-transparent'
                      : 'bg-gradient-to-r from-cyber-accent to-transparent'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Statistics() {
  return (
    <section id="statistics" className="section py-24 relative">
      {/* Subtle background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyber-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyber-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <AnimatedSection animation="slide-up" className="mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Impact & Achievements</h2>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full"></div>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Driving excellence in cybersecurity, research, and software development
          </p>
        </div>
      </AnimatedSection>

      {/* Statistics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            value={stat.value}
            label={stat.label}
            description={stat.description}
            icon={stat.icon}
            color={stat.color}
            bgGradient={stat.bgGradient}
            delay={index * 100}
          />
        ))}
      </div>
    </section>
  );
}
