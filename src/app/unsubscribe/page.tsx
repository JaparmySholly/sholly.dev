import { supabase } from '@/lib/supabase';
import { CheckCircle, AlertCircle, ShieldAlert, Home, BookOpen } from 'lucide-react';
import Link from 'next/link';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface UnsubscribePageProps {
  searchParams: Promise<{ id?: string }> | { id?: string };
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const resolvedParams = await searchParams;
  const id = resolvedParams.id;

  let status: 'success' | 'error' = 'error';
  let message = 'Invalid or missing subscription identifier.';

  if (id) {
    try {
      // Execute the database update to unsubscribe this user (set active = false)
      const { data, error } = await supabase
        .from('subscribers')
        .update({ active: false })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating subscriber record:', error);
        status = 'error';
        message = 'Could not process unsubscribe request. Please try again later.';
      } else if (!data || data.length === 0) {
        status = 'error';
        message = 'Subscription record could not be found or has already been removed.';
      } else {
        status = 'success';
        message = 'You have been unsubscribed successfully. We\'re sorry to see you go.';
      }
    } catch (err) {
      console.error('Unexpected server-side unsubscribe error:', err);
      status = 'error';
      message = 'An unexpected error occurred. Please try again later.';
    }
  }

  return (
    <>
      <BackgroundOrbs className="fixed top-0 left-0 w-full h-full pointer-events-none" />
      <Navbar />
      
      <main className="min-h-screen flex items-center justify-center px-4 relative z-10 pt-20">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="glass rounded-2xl p-8 border border-cyber-accent/20 bg-cyber-card relative overflow-hidden shadow-glow-cyan/5">
            {/* Background decorative glow */}
            <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-gradient-radial-cyan rounded-full blur-[60px] pointer-events-none opacity-20" />
            <div className="absolute -left-24 -top-24 w-48 h-48 bg-gradient-radial-purple rounded-full blur-[60px] pointer-events-none opacity-10" />

            {/* Connection Status Indicator */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyber-accent mb-6 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse" />
              <span>SYSTEM: SECURE_UNSUBSCRIBE_RESOLVER</span>
            </div>

            <div className="text-center space-y-6">
              {status === 'success' ? (
                <>
                  <div className="flex justify-center">
                    <div className="p-3.5 bg-green-500/10 rounded-full border border-green-500/30 text-green-400">
                      <CheckCircle className="h-10 w-10 animate-pulse-glow" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Unsubscribed</h1>
                    <p className="text-gray-300 text-sm leading-relaxed px-2">
                      {message}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div className="p-3.5 bg-red-500/10 rounded-full border border-red-500/30 text-red-400">
                      <ShieldAlert className="h-10 w-10 text-red-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Unsubscribe Failed</h1>
                    <p className="text-gray-400 text-sm leading-relaxed px-2">
                      {message}
                    </p>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-cyber-accent-secondary/50 text-gray-300 hover:text-white bg-white/5 hover:bg-cyber-accent-secondary/5 transition-all text-xs font-mono"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-accent to-cyber-accent-secondary text-white hover:scale-[1.02] active:scale-[0.98] transition-all text-xs font-mono"
                >
                  <BookOpen className="h-4 w-4" />
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
