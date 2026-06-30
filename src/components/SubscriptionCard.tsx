'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function SubscriptionCard() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'duplicate' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (val: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(val.trim());
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear status and message
    setStatus('idle');
    setMessage('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus('error');
      setMessage('Email address is required.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Submit request to the backend subscription API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe.');
      }

      if (data.status === 'active') {
        setStatus('duplicate');
        setMessage(data.message || "You're already subscribed. You'll automatically receive future Insights in your inbox.");
        setLoading(false);
        return;
      }

      // Success (New signup or Reactivated)
      setStatus('success');
      setMessage(data.message || "Thanks! You'll be notified whenever I publish a new article.");
      setEmail('');
    } catch (err: any) {
      console.error('Subscription error:', err);
      setStatus('error');
      setMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass rounded-2xl p-6 md:p-8 border border-cyber-accent/20 bg-cyber-card relative overflow-hidden shadow-glow-cyan/5"
    >
      {/* Background glow orb */}
      <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-gradient-radial-cyan rounded-full blur-[80px] pointer-events-none opacity-20" />
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-gradient-radial-purple rounded-full blur-[80px] pointer-events-none opacity-10" />

      {/* Cyber Security Status Badge */}
      <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-mono text-cyber-accent mb-4 tracking-wider">
        <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
        <span>STATUS: SECURE_SUBSCRIBE_CHANNEL_ACTIVE</span>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-center">
        {/* Texts */}
        <div className="md:col-span-7 space-y-3 text-center sm:text-left">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
            Receive future cybersecurity articles, engineering projects, AI research, and technical write-ups directly in your inbox.
          </p>
        </div>

        {/* Form Input & Button */}
        <div className="md:col-span-5 w-full">
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="h-4 w-4 text-cyber-accent/70" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                      setMessage('');
                    }
                  }}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 font-semibold rounded-xl bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary text-white hover:scale-[1.02] hover:shadow-glow-cyan/50 hover:shadow-md active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shrink-0 font-mono tracking-wide"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Notify Me'
                )}
              </button>
            </div>

            <p className="text-[10px] text-gray-500 text-center sm:text-left">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>

      {/* Messages block */}
      <AnimatePresence mode="wait">
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {status === 'success' && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs sm:text-sm font-sans">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            {status === 'duplicate' && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-sans">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-sans">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
