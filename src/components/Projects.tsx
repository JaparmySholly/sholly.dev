'use client';

import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 'malware-detection',
    title: 'AI Malware Detection System',
    description:
      'Advanced machine learning-based malware scanner with real-time threat analysis.',
    thumbnail: undefined,
    tags: ['Python', 'ML', 'Cybersecurity'],
    link: '#',
    github: '#',
  },
  {
    id: 'phishing-detection',
    title: 'Phishing Detection Platform',
    description:
      'Real-time phishing analysis dashboard with email scanning and threat intelligence.',
    thumbnail: undefined,
    tags: ['React', 'Node.js', 'Security'],
    link: '#',
    github: '#',
  },
  {
    id: 'soc-dashboard',
    title: 'SOC Monitoring Dashboard',
    description:
      'Comprehensive security event monitoring and analytics platform with real-time alerts.',
    thumbnail: undefined,
    tags: ['Next.js', 'TypeScript', 'Analytics'],
    link: '#',
    github: '#',
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const accentColors = ['cyber-accent', 'cyber-accent-tertiary', 'cyber-accent-secondary'];
  const accentColor = accentColors[index % accentColors.length];

  const colorConfig =
    accentColor === 'cyber-accent'
      ? { 
          border: 'border-cyber-accent/40', 
          glow: 'hover:shadow-glow-cyan',
          badge: 'border-cyber-accent/50 text-cyber-accent',
          badgeHover: 'hover:bg-cyber-accent/10',
          button: 'text-cyber-accent hover:text-cyber-accent'
        }
      : accentColor === 'cyber-accent-tertiary'
        ? { 
            border: 'border-cyber-accent-tertiary/40', 
            glow: 'hover:shadow-glow-blue',
            badge: 'border-cyber-accent-tertiary/50 text-cyber-accent-tertiary',
            badgeHover: 'hover:bg-cyber-accent-tertiary/10',
            button: 'text-cyber-accent-tertiary hover:text-cyber-accent-tertiary'
          }
        : { 
            border: 'border-cyber-accent-secondary/40', 
            glow: 'hover:shadow-glow-purple',
            badge: 'border-cyber-accent-secondary/50 text-cyber-accent-secondary',
            badgeHover: 'hover:bg-cyber-accent-secondary/10',
            button: 'text-cyber-accent-secondary hover:text-cyber-accent-secondary'
          };

  return (
    <AnimatedSection animation="slide-up" delay={index * 100}>
      <div className="group h-full">
        <div
          className={`relative h-full p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 ease-smooth ${colorConfig.border} ${colorConfig.glow} bg-cyber-card hover:bg-cyber-card-lg`}
        >
          {/* Content Wrapper with proper z-index */}
          <div className="relative z-10">
            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-white">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-300 ${colorConfig.badge} ${colorConfig.badgeHover}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div
              className={`h-px mb-6 transition-all duration-300 ${
                accentColor === 'cyber-accent'
                  ? 'bg-gradient-to-r from-cyber-accent/30 to-transparent'
                  : accentColor === 'cyber-accent-tertiary'
                    ? 'bg-gradient-to-r from-cyber-accent-tertiary/30 to-transparent'
                    : 'bg-gradient-to-r from-cyber-accent-secondary/30 to-transparent'
              }`}
            ></div>

            {/* Action Buttons */}
            <div className="flex gap-4 items-center relative z-20">
              <a
                href={project.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:translate-y-[-2px] cursor-pointer ${
                  accentColor === 'cyber-accent'
                    ? 'text-cyber-accent hover:text-cyber-accent hover:bg-cyber-accent/10 hover:shadow-glow-cyan'
                    : accentColor === 'cyber-accent-tertiary'
                      ? 'text-cyber-accent-tertiary hover:text-cyber-accent-tertiary hover:bg-cyber-accent-tertiary/10 hover:shadow-glow-blue'
                      : 'text-cyber-accent-secondary hover:text-cyber-accent-secondary hover:bg-cyber-accent-secondary/10 hover:shadow-glow-purple'
                }`}
                aria-label="View live demo"
                title="Open live demo in new tab"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>

              <a
                href={project.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:translate-y-[-2px] cursor-pointer ${
                  accentColor === 'cyber-accent'
                    ? 'text-cyber-accent hover:text-cyber-accent hover:bg-cyber-accent/10 hover:shadow-glow-cyan'
                    : accentColor === 'cyber-accent-tertiary'
                      ? 'text-cyber-accent-tertiary hover:text-cyber-accent-tertiary hover:bg-cyber-accent-tertiary/10 hover:shadow-glow-blue'
                      : 'text-cyber-accent-secondary hover:text-cyber-accent-secondary hover:bg-cyber-accent-secondary/10 hover:shadow-glow-purple'
                }`}
                aria-label="View source code on GitHub"
                title="Open GitHub repository in new tab"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Gradient Border Shimmer effect - must not block clicks */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${
                accentColor === 'cyber-accent'
                  ? '#06b6d4'
                  : accentColor === 'cyber-accent-tertiary'
                    ? '#3b82f6'
                    : '#a855f7'
              } 0%, transparent 50%)`,
              filter: 'blur(20px)',
            }}
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section py-16 md:py-24 relative px-4 md:px-0">
      {/* Subtle background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyber-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <AnimatedSection animation="slide-up">
        <div className="text-center mb-2 md:mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Featured Projects
          </h2>

          <p className="text-gray-400 max-w-md mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-6">
            A collection of cybersecurity, software development, and research-focused
            projects demonstrating practical problem-solving, innovation, and technical expertise.
          </p>

          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full mx-auto"></div>
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}