'use client';

import { Award, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  verificationLink?: string;
  icon: any;
  color: 'cyan' | 'blue' | 'purple' | 'emerald';
}

const credentials: Credential[] = [
  {
    id: 'sec-plus',
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'Verified',
    description: 'Core cybersecurity skills including threat management, cryptography, security architectures, network defense, and compliance guidelines.',
    icon: ShieldCheck,
    color: 'cyan',
  },
  {
    id: 'aws-cloud',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Verified',
    description: 'Fundamentals of AWS secure cloud infrastructure, Shared Responsibility model, IAM policies, VPC security controls, and resource monitoring.',
    icon: Award,
    color: 'blue',
  },
  {
    id: 'google-cyber',
    title: 'Google Cybersecurity Professional',
    issuer: 'Google',
    date: 'Verified',
    description: 'Hands-on practice using SIEM logs (Chronicle/Splunk), writing Python scripts for threat mitigation, executing vulnerability scans, and Linux shell.',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    id: 'academic-reviewer',
    title: 'Academic Peer Reviewer',
    issuer: 'International Research Journals',
    date: '50+ Papers Reviewed',
    description: 'Serving as a scholarly auditor checking research methodologies, threat analyses, and APA references to uphold peer-reviewed engineering standards.',
    icon: Award,
    color: 'emerald',
  }
];

export default function Certifications() {
  const colorMap = {
    cyan: {
      border: 'border-cyber-accent/30',
      textAccent: 'text-cyber-accent',
      hover: 'hover:border-cyber-accent/60 hover:shadow-glow-cyan/25',
      iconBg: 'bg-cyber-accent/10',
    },
    blue: {
      border: 'border-cyber-accent-tertiary/30',
      textAccent: 'text-cyber-accent-tertiary',
      hover: 'hover:border-cyber-accent-tertiary/60 hover:shadow-glow-blue/25',
      iconBg: 'bg-cyber-accent-tertiary/10',
    },
    purple: {
      border: 'border-cyber-accent-secondary/30',
      textAccent: 'text-cyber-accent-secondary',
      hover: 'hover:border-cyber-accent-secondary/60 hover:shadow-glow-purple/25',
      iconBg: 'bg-cyber-accent-secondary/10',
    },
    emerald: {
      border: 'border-emerald-500/30',
      textAccent: 'text-emerald-400',
      hover: 'hover:border-emerald-500/60 hover:shadow-glow-emerald',
      iconBg: 'bg-emerald-500/10',
    }
  };

  return (
    <section id="certifications" className="section py-16 md:py-24 relative px-4 md:px-0">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <AnimatedSection animation="slide-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
            Certifications & Impact
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyber-accent to-emerald-400 rounded-full"></div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
            Verified academic credentials and technical certifications establishing core competencies in security, cloud operations, and scholarly review.
          </p>
        </div>
      </AnimatedSection>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {credentials.map((cred, index) => {
          const config = colorMap[cred.color];
          const Icon = cred.icon;

          return (
            <AnimatedSection key={cred.id} animation="slide-up" delay={index * 100}>
              <div 
                className={`group h-full relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 ease-smooth bg-cyber-card hover:bg-cyber-card-lg ${config.border} ${config.hover}`}
              >
                {/* Visual Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${config.iconBg}`}>
                    <Icon size={20} className={config.textAccent} />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 font-semibold tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {cred.date}
                  </span>
                </div>

                {/* Body Content */}
                <div className="mb-2">
                  <h3 className="text-base font-bold text-white group-hover:text-white transition-colors leading-snug">
                    {cred.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    {cred.issuer}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mt-3 group-hover:text-gray-300 transition-colors">
                  {cred.description}
                </p>

                {/* Secure overlay shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${
                      cred.color === 'cyan' ? '#06b6d4' : cred.color === 'blue' ? '#3b82f6' : cred.color === 'purple' ? '#a855f7' : '#10b981'
                    } 0%, transparent 50%)`,
                  }}
                  aria-hidden="true"
                ></div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
