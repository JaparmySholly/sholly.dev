'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Github, X, Shield, Cpu, Layers, CheckCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

interface StrideThreat {
  category: string;
  threat: string;
  mitigation: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  architecture: string;
  strideThreats: StrideThreat[];
  highlights: string[];
}

const projects: Project[] = [
  {
    id: 'malware-detection',
    title: 'AI Malware Detection System',
    description: 'Advanced machine learning-based malware scanner with real-time threat analysis and binary behaviour heuristics.',
    tags: ['Python', 'ML', 'Cybersecurity', 'FastAPI'],
    link: 'https://github.com/JaparmySholly',
    github: 'https://github.com/JaparmySholly',
    architecture: 'A localized client agent collects file indicators and system call logs, sending them to a central ML pipeline (built in Python/FastAPI) that classifies static features (PE header structures, entropy, import tables) and dynamic sequences in an isolated Docker sandbox.',
    strideThreats: [
      {
        category: 'Tampering',
        threat: 'Malicious actors altering the local signature database or model weights to bypass detection.',
        mitigation: 'All model weights and threat signature indices are hashed (SHA256) and verified before runtime. Updates are signed with asymmetric keys.'
      },
      {
        category: 'Denial of Service',
        threat: 'Attackers submitting infinite large files or loops to freeze classification servers.',
        mitigation: 'Implemented Redis-backed rate-limiting (Token Bucket) on classification endpoints and configured container execution time-limits.'
      },
      {
        category: 'Information Disclosure',
        threat: 'Vulnerability scanner reports revealing sensitive system configurations or internal paths.',
        mitigation: 'All threat reports are sanitized, stripping specific username directories and host variables before log storage.'
      }
    ],
    highlights: [
      'Developed feature extraction script parsing 50+ PE header variables & assembly instruction statistics.',
      'Achieved a 97.4% classification accuracy rating using an ensemble Random Forest classifier.',
      'Designed containerized micro-analyzers running dynamically to isolate file execution risks.'
    ]
  },
  {
    id: 'phishing-detection',
    title: 'Phishing Detection Platform',
    description: 'Real-time email analysis engine with link parsing, header verification, and threat intelligence checks.',
    tags: ['React', 'Node.js', 'Security', 'APIs'],
    link: 'https://github.com/JaparmySholly',
    github: 'https://github.com/JaparmySholly',
    architecture: 'Ingests email feeds using secure SMTP listeners and IMAP protocols. Parses header signatures, analyzes email body keywords for social engineering indicators, and cross-references link URLs with active threat intel blocklists (APWG & URLhaus). Outputs insights to a Next.js console.',
    strideThreats: [
      {
        category: 'Spoofing',
        threat: 'Attackers spoofing corporate domains or trusted identities to bypass local classification rules.',
        mitigation: 'Enforced rigorous SPF, DKIM, and DMARC alignments checking. Domains failing validation are flagged immediately as untrusted.'
      },
      {
        category: 'Information Disclosure',
        threat: 'Parsed confidential emails leaking customer data stored inside analytics pipelines.',
        mitigation: 'Enforced column-level AES-GCM database encryption for all stored message bodies and restricted backend audit scopes.'
      },
      {
        category: 'Repudiation',
        threat: 'Analysts deleting or altering threat classifications to hide user negligence.',
        mitigation: 'System logs are pushed directly to an immutable log buffer, preventing modifications by single users.'
      }
    ],
    highlights: [
      'Built custom Node.js parser processing heavy MIME messages with high throughput.',
      'Implemented typosquatting heuristic checks using Levenshtein distance calculations.',
      'Designed responsive dashboard mapping visual analytics of incoming attacks by origin IP.'
    ]
  },
  {
    id: 'soc-dashboard',
    title: 'IoT Threat Response Platform (SOC)',
    description: 'Prototype security operations center (SOC) for monitoring, investigating, and automatically isolating IoT botnets.',
    tags: ['Python', 'Network Security', 'DFIR', 'WebSockets'],
    link: 'https://github.com/JaparmySholly',
    github: 'https://github.com/JaparmySholly',
    architecture: 'Monitors subnet traffic at the router layer using lightweight network taps. Feeds packet lengths, TCP flags, and protocol frequencies into a local anomaly filter. Automatically invokes iptables firewall isolation rules if traffic signatures match Mirai or Gafgyt botnets.',
    strideThreats: [
      {
        category: 'Elevation of Privilege',
        threat: 'Intruders exploiting a vulnerability in the daemon to gain root access on the network router.',
        mitigation: 'Telemetry collection agent is decoupled from execution and runs as a minimal unprivileged user inside a restricted Linux chroot.'
      },
      {
        category: 'Denial of Service',
        threat: 'DDoS attacks saturating the detection engine queues to prevent active alerts from reaching the analyst.',
        mitigation: 'Configured high-performance ring buffers (PF_RING) allowing rapid dropping of spoofed packets at the hardware layer.'
      },
      {
        category: 'Spoofing',
        threat: 'Rogue endpoints broadcasting mock alerts to force key corporate assets offline.',
        mitigation: 'Telemetry messages require HMAC signatures matching shared keys unique to each monitored physical switch port.'
      }
    ],
    highlights: [
      'Developed telemetry capture scripts analyzing raw TCP/UDP packet distributions.',
      'Created incident response playbooks isolating infected subnets within 1.2 seconds of detection.',
      'Constructed a real-time WebSocket communication pipeline showing live traffic flows on maps.'
    ]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'stride'>('overview');

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="projects" className="section py-16 md:py-24 relative px-4 md:px-0">
      {/* Subtle background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyber-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <AnimatedSection animation="slide-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
            Featured Security Projects
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-6">
            A showcase of full-stack software development combined with threat-informed security design.
            Click on any card to explore system architectures and STRIDE threat models.
          </p>

          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full mx-auto"></div>
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => {
          const accentColors = ['text-cyber-accent', 'text-cyber-accent-tertiary', 'text-cyber-accent-secondary'];
          const borderColors = ['border-cyber-accent/30', 'border-cyber-accent-tertiary/30', 'border-cyber-accent-secondary/30'];
          const glowColors = ['hover:shadow-glow-cyan', 'hover:shadow-glow-blue', 'hover:shadow-glow-purple'];
          const badgeColors = [
            'bg-cyber-accent/5 text-cyber-accent border-cyber-accent/20',
            'bg-cyber-accent-tertiary/5 text-cyber-accent-tertiary border-cyber-accent-tertiary/20',
            'bg-cyber-accent-secondary/5 text-cyber-accent-secondary border-cyber-accent-secondary/20'
          ];

          const colorIdx = index % 3;

          return (
            <AnimatedSection key={project.id} animation="slide-up" delay={index * 100}>
              <div 
                onClick={() => { setSelectedProject(project); setActiveTab('overview'); }}
                className={`group cursor-pointer relative h-full p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 ease-smooth ${borderColors[colorIdx]} ${glowColors[colorIdx]} bg-cyber-card hover:bg-cyber-card-lg flex flex-col justify-between`}
              >
                <div>
                  {/* Category Indicator */}
                  <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${accentColors[colorIdx]}`}>
                    [ Secure Engineering ]
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mt-2 mb-3 text-white group-hover:text-cyber-accent transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2.5 py-1 rounded-full font-mono border ${badgeColors[colorIdx]}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] px-2 py-1 rounded-full font-mono bg-white/5 border border-white/10 text-gray-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer link trigger visual */}
                  <div className="flex items-center justify-between text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                    <span>Inspect Threat Model</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Accent border glow layer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${
                      colorIdx === 0 ? '#06b6d4' : colorIdx === 1 ? '#3b82f6' : '#a855f7'
                    } 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                ></div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-cyber-darker/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl bg-cyber-dark border border-cyber-accent/30 rounded-2xl overflow-hidden shadow-glow-cyan/20 z-10 flex flex-col max-h-[85vh]"
            >
              
              {/* Modal Window Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-cyber-darker border-b border-cyber-accent/15">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-cyber-accent" />
                  <span className="text-sm font-mono text-gray-400">audit_logs_explorer.exe</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Core Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Title */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-sm text-gray-400">{selectedProject.description}</p>
                </div>

                {/* Tab Triggers */}
                <div className="flex border-b border-white/10 font-mono text-xs sm:text-sm">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
                      activeTab === 'overview' 
                        ? 'border-cyber-accent text-cyber-accent font-semibold' 
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle size={14} />
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('architecture')}
                    className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
                      activeTab === 'architecture' 
                        ? 'border-cyber-accent text-cyber-accent font-semibold' 
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <Layers size={14} />
                    Architecture
                  </button>
                  <button 
                    onClick={() => setActiveTab('stride')}
                    className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
                      activeTab === 'stride' 
                        ? 'border-cyber-accent text-cyber-accent font-semibold' 
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <Cpu size={14} />
                    STRIDE Modeling
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="py-2">
                  
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-mono font-semibold uppercase text-cyber-accent tracking-wider">
                        [ Implementation Highlights ]
                      </h4>
                      <ul className="space-y-3">
                        {selectedProject.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-cyber-accent mt-1 flex-shrink-0">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-mono font-semibold uppercase text-cyber-accent tracking-wider">
                        [ System Topology ]
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed font-sans bg-white/5 p-4 rounded-xl border border-white/5">
                        {selectedProject.architecture}
                      </p>
                    </div>
                  )}

                  {activeTab === 'stride' && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-mono font-semibold uppercase text-cyber-accent tracking-wider mb-2">
                        [ Threat & Mitigation Registry ]
                      </h4>
                      <div className="space-y-3.5">
                        {selectedProject.strideThreats.map((threat, idx) => (
                          <div 
                            key={idx} 
                            className="p-4 rounded-xl bg-cyber-darker border border-red-500/15 flex flex-col gap-1.5"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                {threat.category.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 font-sans">
                              <strong className="text-gray-300">Threat:</strong> {threat.threat}
                            </p>
                            <p className="text-xs text-cyber-accent font-sans">
                              <strong className="text-cyber-accent-secondary">Mitigation:</strong> {threat.mitigation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Modal Action Buttons */}
              <div className="flex gap-3 px-6 py-4 bg-cyber-darker border-t border-cyber-accent/15 z-20">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border border-cyber-accent/20 text-cyber-accent bg-cyber-accent/5 hover:bg-cyber-accent/15 hover:shadow-glow-cyan/10 transition-all active:translate-y-[1px]"
                >
                  <Github size={16} />
                  <span>Inspect Codebase</span>
                </a>
                
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border border-cyber-accent-secondary/20 text-cyber-accent-secondary bg-cyber-accent-secondary/5 hover:bg-cyber-accent-secondary/15 hover:shadow-glow-purple/10 transition-all active:translate-y-[1px]"
                >
                  <ExternalLink size={16} />
                  <span>Interactive Demo</span>
                </a>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}