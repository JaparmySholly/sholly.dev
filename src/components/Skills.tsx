'use client';

import {
  Shield,
  Code2,
  Cloud,
  BookOpen,
  Zap,
  Lock,
  Server,
  GitBranch,
  Users,
  PenTool,
  Laptop,
  Database,
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const skillCategories = [
  {
    id: 'cybersecurity',
    category: 'Cybersecurity',
    description: 'Advanced threat detection and security operations expertise',
    icon: Shield,
    color: 'cyber-accent',
    bgGradient: 'gradient-radial-cyan-premium',
    skills: [
      'Threat Hunting',
      'DFIR',
      'SOC Operations',
      'Cloud Security',
      'Penetration Testing',
    ],
  },
  {
    id: 'development',
    category: 'Software Development',
    description: 'Full-stack development with modern technologies and best practices',
    icon: Code2,
    color: 'cyber-accent-tertiary',
    bgGradient: 'gradient-radial-blue-premium',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python'],
  },
  {
    id: 'cloud',
    category: 'Cloud & DevOps',
    description: 'Infrastructure automation, containerization, and cloud platform management',
    icon: Cloud,
    color: 'cyber-accent-secondary',
    bgGradient: 'gradient-radial-purple-premium',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Supabase', 'Git'],
  },
  {
    id: 'research',
    category: 'Research & Mentorship',
    description: 'Academic research, technical writing, and student guidance',
    icon: BookOpen,
    color: 'cyber-accent',
    bgGradient: 'gradient-radial-cyan-premium',
    skills: [
      'Academic Research',
      'Technical Writing',
      'Literature Review',
      'Research Supervision',
      'APA 7 Referencing',
      'Student Mentorship',
      'Cybersecurity Research',
    ],
  },
];

function SkillCard({
  category,
  description,
  icon: Icon,
  color,
  bgGradient,
  skills,
  delay,
}: {
  category: string;
  description: string;
  icon: any;
  color: string;
  bgGradient: string;
  skills: string[];
  delay: number;
}) {
  const colorMap: Record<string, { border: string; glow: string; hover: string }> = {
    'cyber-accent': {
      border: 'border-cyber-accent/30',
      glow: 'group-hover:shadow-glow-cyan',
      hover: 'hover:border-cyber-accent/60',
    },
    'cyber-accent-tertiary': {
      border: 'border-cyber-accent-tertiary/30',
      glow: 'group-hover:shadow-glow-blue',
      hover: 'hover:border-cyber-accent-tertiary/60',
    },
    'cyber-accent-secondary': {
      border: 'border-cyber-accent-secondary/30',
      glow: 'group-hover:shadow-glow-purple',
      hover: 'hover:border-cyber-accent-secondary/60',
    },
  };

  const colorStyle = colorMap[color];
  const bgClass =
    bgGradient === 'gradient-radial-cyan-premium'
      ? 'group-hover:bg-gradient-radial-cyan-premium'
      : bgGradient === 'gradient-radial-blue-premium'
        ? 'group-hover:bg-gradient-radial-blue-premium'
        : 'group-hover:bg-gradient-radial-purple-premium';

  return (
    <AnimatedSection
      animation="slide-up"
      delay={delay}
    >
      <div className="group h-full">
        <div
          className={`relative h-full p-8 rounded-xl border backdrop-blur-sm transition-all duration-500 ease-smooth ${colorStyle.border} ${colorStyle.hover} ${colorStyle.glow} bg-cyber-card hover:bg-cyber-card-lg overflow-hidden`}
        >
          {/* Background gradient effect */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${bgClass}`}
            aria-hidden="true"
          ></div>

          {/* Content container */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                style={{
                  background:
                    color === 'cyber-accent'
                      ? 'rgba(6, 182, 212, 0.1)'
                      : color === 'cyber-accent-tertiary'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(168, 85, 247, 0.1)',
                }}
              >
                <Icon
                  size={24}
                  className={`transition-all duration-300 ${
                    color === 'cyber-accent'
                      ? 'text-cyber-accent'
                      : color === 'cyber-accent-tertiary'
                        ? 'text-cyber-accent-tertiary'
                        : 'text-cyber-accent-secondary'
                  } group-hover:scale-110`}
                />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                {category}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              {description}
            </p>

            {/* Skills Grid */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                    color === 'cyber-accent'
                      ? 'bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent/20 hover:border-cyber-accent/60'
                      : color === 'cyber-accent-tertiary'
                        ? 'bg-cyber-accent-tertiary/10 text-cyber-accent-tertiary border border-cyber-accent-tertiary/30 hover:bg-cyber-accent-tertiary/20 hover:border-cyber-accent-tertiary/60'
                        : 'bg-cyber-accent-secondary/10 text-cyber-accent-secondary border border-cyber-accent-secondary/30 hover:bg-cyber-accent-secondary/20 hover:border-cyber-accent-secondary/60'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section px-4 md:px-0">
      {/* Header */}
      <AnimatedSection animation="slide-up">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">Skills & Expertise</h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full"></div>
        </div>
      </AnimatedSection>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {skillCategories.map((category, index) => (
          <SkillCard
            key={category.id}
            category={category.category}
            description={category.description}
            icon={category.icon}
            color={category.color}
            bgGradient={category.bgGradient}
            skills={category.skills}
            delay={index * 120}
          />
        ))}
      </div>
    </section>
  );
}