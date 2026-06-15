import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Mascot } from '@/src/components/Mascot';
import { Background } from '@/src/components/Background';
import { cn } from '@/src/lib/utils';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<'idle' | 'focused' | 'privacy' | 'typing' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Hi 👋 Ready to analyze your GitHub?');

  // Parallax effect for the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (email.length > 0 && state === 'focused') {
      setMessage('Enter your username 🚀');
    } else if (state === 'privacy') {
      setMessage('I won\'t look, I promise! 🙈');
    } else if (state === 'idle') {
      setMessage('Hi 👋 Ready to analyze your GitHub?');
    }
  }, [email, state]);

  const [role, setRole] = useState<'developer' | 'recruiter'>('developer');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setState('typing');
    setMessage(`Connecting ${role} to the GitHub matrix...`);
    
    // Simulate GitHub connection
    setTimeout(() => {
      setState('success');
      setMessage('Access granted! Welcome back. 😄');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 4000);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <Background />
      
      {/* Blurred Mascot in Background for Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] blur-[100px] pointer-events-none scale-[3]">
        <Mascot state="idle" />
      </div>

      <main 
        className="relative z-10 w-full max-w-5xl px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mascot Section - Floating near card */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Mascot state={state} message={message} className="scale-110 lg:scale-125" />
          </motion.div>
          {/* Shadow below mascot */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 blur-xl rounded-full" />
        </div>

        {/* Login Card Section */}
        <div className="w-full max-w-md order-1 lg:order-2">
          <div className="text-center lg:text-left mb-8">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary-container to-secondary-container bg-clip-text text-transparent">
              GitScore AI
            </h1>
          </div>

          <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel w-full rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border border-white/10 cyan-glow-shadow"
          >
            {/* Role Selector */}
            <div className="flex p-1 bg-surface-container-low rounded-full mb-8 border border-outline-variant/10">
              <button 
                type="button"
                onClick={() => setRole('developer')}
                className={cn(
                  "flex-1 py-2 px-4 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300",
                  role === 'developer' 
                    ? "bg-surface-container-high text-primary-fixed-dim shadow-sm" 
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Developer
              </button>
              <button 
                type="button"
                onClick={() => setRole('recruiter')}
                className={cn(
                  "flex-1 py-2 px-4 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300",
                  role === 'recruiter' 
                    ? "bg-surface-container-high text-primary-fixed-dim shadow-sm" 
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Recruiter
              </button>
            </div>

            <form onSubmit={handleConnect} className="space-y-6">
              <div className="group relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 ml-1">
                  Identity
                </label>
                <div className={cn(
                  "relative transition-all duration-300 rounded-xl px-4 py-1 border",
                  state === 'focused' ? "border-primary-container bg-primary-container/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]" : "border-outline-variant/20 bg-transparent"
                )}>
                  <Mail className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                    state === 'focused' ? "text-primary-container" : "text-outline-variant"
                  )} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state !== 'typing') setState('typing');
                      setTimeout(() => setState('focused'), 500);
                    }}
                    onFocus={() => setState('focused')}
                    onBlur={() => setState('idle')}
                    className="w-full bg-transparent border-none py-3 pl-8 text-on-surface placeholder:text-outline/40 focus:outline-none focus:ring-0 transition-all font-body text-sm"
                    placeholder="GitHub Username"
                    required
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 ml-1">
                  Access Key
                </label>
                <div className={cn(
                  "relative transition-all duration-300 rounded-xl px-4 py-1 border",
                  state === 'privacy' ? "border-primary-container bg-primary-container/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]" : "border-outline-variant/20 bg-transparent"
                )}>
                  <Lock className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                    state === 'privacy' ? "text-primary-container" : "text-outline-variant"
                  )} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (state !== 'typing') setState('typing');
                      setTimeout(() => setState('privacy'), 500);
                    }}
                    onFocus={() => setState('privacy')}
                    onBlur={() => setState('idle')}
                    className="w-full bg-transparent border-none py-3 pl-8 text-on-surface placeholder:text-outline/40 focus:outline-none focus:ring-0 transition-all font-body text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary-fixed-dim transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-container rounded-sm opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                  </div>
                  <input type="checkbox" className="hidden" />
                  <span className="text-[11px] text-on-surface-variant group-hover:text-on-surface transition-colors">Remember Node</span>
                </label>
                <a href="#" className="text-[11px] text-primary-fixed-dim hover:text-primary transition-colors font-medium">Reset Protocol?</a>
              </div>

              <button
                type="submit"
                disabled={state === 'typing'}
                className="intelligence-gradient w-full py-4 rounded-2xl font-headline font-bold tracking-tight text-slate-950 flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Connect GitHub</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Footer Detail - Absolute bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center gap-8 opacity-40">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-bold">API Operational</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold">Node: V_0.82</span>
        </div>
      </div>
    </div>
  );
};

