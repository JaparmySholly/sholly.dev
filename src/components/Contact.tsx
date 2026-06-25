'use client';

import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import AnimatedSection from './AnimatedSection';
import posthog from 'posthog-js';


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      posthog.capture('contact_form_submitted', {
        source: 'portfolio_contact_form',
      });

      setSubmitStatus('success');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error(error);

      setSubmitStatus('error');

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section py-16 md:py-24 px-4 md:px-0">
      <AnimatedSection animation="slide-up">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
            Secure Communications
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full"></div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
            Have a project in mind or just want to say hello? I'd love to hear from you. Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Block: Crypto & PGP info */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 border border-cyber-accent/20 bg-cyber-card flex flex-col gap-4">
              
              {/* Header connection status */}
              <div className="flex items-center gap-2.5 font-mono text-xs text-cyber-accent border-b border-cyber-accent/15 pb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-accent animate-pulse"></div>
                <span>STATUS: TLS_1.3_SECURE_TUNNEL</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">PGP Cryptography</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  To transmit zero-day disclosures, sensitive audit reports, or private research files, please encrypt your payload utilizing the public key fingerprint below.
                </p>
              </div>

              {/* Fingerprint block */}
              <div className="bg-cyber-darker border border-white/5 rounded-xl p-3.5 font-mono text-[10px] sm:text-xs text-gray-300">
                <span className="text-[10px] text-cyber-accent-secondary uppercase font-semibold block mb-2 tracking-wider">
                  [ Public Key Fingerprint ]
                </span>
                <code className="block select-all leading-normal text-cyber-accent/90 break-all font-mono">
                  9F7A C03E 15D4 9110 B4A9<br />
                  6B3D E99B F124 A0C5 38D1
                </code>
              </div>

              {/* Download PGP key button */}
              <a 
                href="/resume.pdf"
                download
                className="w-full text-center py-2.5 rounded-xl text-xs font-mono font-bold border border-white/10 hover:border-cyber-accent-secondary/50 text-gray-300 hover:text-white bg-white/5 hover:bg-cyber-accent-secondary/5 transition-all cursor-pointer"
              >
                Download Public Key (.asc)
              </a>

            </Card>
            
            {/* Quick security notice */}
            <div className="rounded-xl border border-white/5 p-4 bg-cyber-dark/30 font-mono text-[11px] text-gray-400 space-y-1.5">
              <span className="text-white font-bold block mb-1 font-sans">Console Notice:</span>
              <p>• Connection requests automatically filtered.</p>
              <p>• Data streams are sanitized dynamically.</p>
            </div>
          </div>

          {/* Right Block: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-2.5 sm:py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-accent transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-2.5 sm:py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-accent transition-all text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 sm:py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-accent transition-all resize-none text-sm sm:text-base"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs sm:text-sm">
                    ✓ Payload transmitted successfully! Links active.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
                    ✗ Transmission failure. Check routing and retry.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full text-xs sm:text-sm py-2.5 sm:py-3 hover-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>

        </div>

      </AnimatedSection>
    </section>
  );
}