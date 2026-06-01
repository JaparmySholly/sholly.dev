'use client';

import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import AnimatedSection from './AnimatedSection';
import { supabase } from '@/lib/supabase';

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
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (error) {
        throw error;
      }

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
    <section id="contact" className="section px-4 md:px-0">
      <AnimatedSection animation="slide-up">
        <div className="max-w-2xl mx-auto w-full">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">Get In Touch</h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary rounded-full"></div>
            <p className="text-gray-400 mt-4 md:mt-6 text-sm md:text-base">
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Feel free to reach out!
            </p>
          </div>

          <Card className="p-6 sm:p-8 md:p-12">
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
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
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
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
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
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm sm:text-base"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs sm:text-sm">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
                  ✗ Something went wrong. Please try again.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-sm sm:text-base py-3 sm:py-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </AnimatedSection>
    </section>
  );
}