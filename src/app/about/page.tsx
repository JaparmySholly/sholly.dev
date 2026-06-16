'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import PageWrapper from "@/components/PageWrapper";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import ProfileImage from "@/components/ProfileImage";
import { 
  Shield, 
  Code2, 
  Search, 
  Trophy, 
  Cpu, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <BackgroundOrbs className="fixed top-0 left-0 w-full h-full pointer-events-none" />
      <Navbar />
      <PageWrapper>
        <main className="text-white min-h-screen relative z-10 pt-4 md:pt-8 pb-16 px-4 md:px-0 max-w-7xl mx-auto">
          
          {/* SECTION 1 — HERO */}
          <section className="py-12 md:py-20 lg:py-24 border-b border-white/5 flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full max-w-5xl mx-auto">
              {/* Left Column: Text Content */}
              <AnimatedSection animation="fade-in" className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  About <span className="gradient-text">Me</span>
                </h1>
                <p className="text-xl md:text-2xl text-cyber-accent font-semibold mb-6">
                  Cybersecurity Engineer | Researcher | Developer
                </p>
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">               I design and develop intelligent security solutions—from AI-powered malware detection systems to IoT threat monitoring platforms—while exploring the intersection of cybersecurity, automation, and software engineering.
                </p>
                <div className="flex flex-wrap gap-5 justify-center">
                  <a href="/#projects">
                    <Button variant="primary" size="lg">View Projects</Button>
                  </a>
                  <a href="/#contact">
                    <Button variant="outline" size="lg">Hire Me</Button>
                  </a>
                </div>
              </AnimatedSection>

              {/* Right Column: Profile Image (Large) */}
              <div className="flex justify-center items-center">
                <ProfileImage size="lg" className="mb-0 md:mb-0" />
              </div>
            </div>
          </section>

          {/* SECTION 2 — MY JOURNEY */}
          <section className="py-16 md:py-20">
            <AnimatedSection animation="slide-up">
              <div className="max-w-4xl mx-auto px-4 md:px-0">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <span className="text-cyber-accent"></span> My Journey
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    I am a First-Class Cybersecurity graduate and engineer dedicated to building, breaking, and securing digital systems. With over three years of hands-on experience spanning vulnerability assessment, penetration testing, and secure software development, I sit at the intersection of robust defense and intelligent automation.
                  </p>
                  <p>
                   My technical DNA is built on practical problem-solving. I’ve engineered custom, AI-driven security systems—including a hybrid malware detection engine with 97.5% accuracy—and built real-time network intrusion prevention tools from scratch. Whether configuring secure APIs with Python, hunting for vulnerabilities using Burp Suite, or designing identity protection architectures, I focus on creating resilient enterprise environments.
                  </p>
                  <p>
                    Driven by continuous learning, I rank in the top 1% on TryHackMe and hold certifications as a Network and Application Security Practitioner (CNSP/CASP). I thrive on turning complex security challenges into clean, uncompromised reality.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* SECTION 3 — WHAT I DO */}
          <section className="py-12 md:py-16">
            <AnimatedSection animation="slide-up">
              <h2 className="text-3xl font-bold mb-10 text-center">Core Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* CARD 1 */}
                <Card className="flex flex-col h-full border border-cyber-accent/20">
                  <div className="p-3 w-fit rounded-lg bg-cyber-accent/10 mb-6">
                    <Shield className="text-cyber-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Cybersecurity</h3>
                  <ul className="space-y-3 text-gray-400 mt-auto">
                    {['Threat Detection', 'DFIR', 'Threat Hunting', 'SOC Operations', 'Cloud Security'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-accent"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* CARD 2 */}
                <Card className="flex flex-col h-full border border-cyber-accent-tertiary/20">
                  <div className="p-3 w-fit rounded-lg bg-cyber-accent-tertiary/10 mb-6">
                    <Code2 className="text-cyber-accent-tertiary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Software Development</h3>
                  <ul className="space-y-3 text-gray-400 mt-auto">
                    {['Next.js', 'TypeScript', 'Python', 'Node.js', 'API Development'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-accent-tertiary"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* CARD 3 */}
                <Card className="flex flex-col h-full border border-cyber-accent-secondary/20">
                  <div className="p-3 w-fit rounded-lg bg-cyber-accent-secondary/10 mb-6">
                    <Search className="text-cyber-accent-secondary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Research</h3>
                  <ul className="space-y-3 text-gray-400 mt-auto">
                    {['AI Security', 'Cyber Threat Intelligence', 'Malware Analysis', 'IoT Security', 'Security Automation'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-accent-secondary"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </AnimatedSection>
          </section>

          {/* SECTION 4 — FEATURED ACHIEVEMENTS */}
          <section className="py-12 md:py-16">
            <AnimatedSection animation="slide-up">
              <h2 className="text-3xl font-bold mb-10 text-center">Featured Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-cyber-accent/20 flex flex-col items-center text-center p-8">
                  <div className="mb-4 text-cyber-accent">
                    <Trophy size={40} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Malware Detection System</h3>
                  <p className="text-gray-400 text-sm">97.5% detection accuracy using machine learning techniques.</p>
                </Card>
                <Card className="border border-cyber-accent-tertiary/20 flex flex-col items-center text-center p-8">
                  <div className="mb-4 text-cyber-accent-tertiary">
                    <Cpu size={40} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">IoT Botnet Detection Platform</h3>
                  <p className="text-gray-400 text-sm">Behavioral detection and incident response platform inspired by Mirai botnets.</p>
                </Card>
                <Card className="border border-cyber-accent-secondary/20 flex flex-col items-center text-center p-8">
                  <div className="mb-4 text-cyber-accent-secondary">
                    <Search size={40} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Security Research</h3>
                  <p className="text-gray-400 text-sm">Focused on practical applications of AI and cybersecurity.</p>
                </Card>
              </div>
            </AnimatedSection>
          </section>

          {/* SECTION 5 — TECHNOLOGIES */}
          <section className="py-12 md:py-16">
            <AnimatedSection animation="slide-up">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Technologies</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full mx-auto"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {[
                  'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 
                  'Node.js', 'Supabase', 'PostgreSQL', 'Linux', 'Git', 
                  'Docker', 'TailwindCSS'
                ].map((tech) => (
                  <Badge key={tech} variant="primary" className="text-base py-2 px-6">
                    {tech}
                  </Badge>
                ))}
              </div>
            </AnimatedSection>
          </section>

          {/* SECTION 6 — CURRENT FOCUS */}
          <section className="py-12 md:py-16">
            <AnimatedSection animation="slide-up">
              <h2 className="text-3xl font-bold mb-10 text-center">Currently Exploring</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  'AI-Powered Threat Detection',
                  'Cyber Threat Intelligence',
                  'IoT Security Monitoring',
                  'Digital Forensics & Incident Response',
                  'Security Automation'
                ].map((item) => (
                  <div key={item} className="p-4 rounded-xl border border-white/5 bg-white/5 text-center text-sm font-medium hover:border-cyber-accent/30 transition-colors">
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </section>

          {/* SECTION 7 — CALL TO ACTION */}
          <section className="py-12 md:py-24">
            <AnimatedSection animation="slide-up">
              <Card className="max-w-4xl mx-auto border border-cyber-accent/30 bg-gradient-to-br from-cyber-card to-cyber-accent/5 p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Interested in collaborating, discussing cybersecurity research, or working on innovative projects?
                </p>
                <a href="/#contact">
                  <Button variant="primary" size="lg" className="group">
                    Contact Me
                  </Button>
                </a>
              </Card>
            </AnimatedSection>
          </section>

        </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
