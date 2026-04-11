import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface AIOrbProps {
  state?: 'idle' | 'focused' | 'privacy' | 'thinking' | 'success' | 'error';
  className?: string;
}

export const AIOrb: React.FC<AIOrbProps> = ({ state = 'idle', className }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const orbRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      // Inertia effect: move currentPos towards mousePos
      const dx = mousePos.x - currentPos.current.x;
      const dy = mousePos.y - currentPos.current.y;
      
      currentPos.current.x += dx * 0.08;
      currentPos.current.y += dy * 0.08;

      if (orbRef.current) {
        // We want the orb to be centered around the cursor, but also have its own base position
        // For the login page, it's centered above the card.
        // So we'll apply a transform based on the delta from center.
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2 - 150; // Base position above card
        
        const tx = (currentPos.current.x - centerX) * 0.1;
        const ty = (currentPos.current.y - centerY) * 0.1;
        
        orbRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos]);

  const getOrbColors = () => {
    switch (state) {
      case 'focused': return 'from-cyan-400 via-blue-500 to-purple-600';
      case 'privacy': return 'from-slate-700 via-slate-800 to-slate-900 opacity-50 blur-sm';
      case 'thinking': return 'from-cyan-300 via-blue-400 to-purple-500 animate-pulse';
      case 'success': return 'from-emerald-400 via-cyan-400 to-blue-500';
      case 'error': return 'from-red-500 via-purple-600 to-red-700';
      default: return 'from-cyan-400 via-blue-500 to-purple-600';
    }
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.div
        ref={orbRef}
        className="relative w-32 h-32"
        animate={{
          scale: state === 'thinking' ? 1.2 : state === 'focused' ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Outer Glow */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-2xl transition-all duration-500",
          state === 'error' ? 'bg-red-500/40' : 'bg-cyan-500/30',
          state === 'thinking' && 'animate-pulse scale-150'
        )} />

        {/* The Orb Body */}
        <div className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br shadow-2xl border border-white/20 backdrop-blur-md transition-all duration-500",
          getOrbColors()
        )}>
          {/* Inner Light Effect */}
          <div className="absolute inset-2 rounded-full bg-white/10 blur-sm" />
          
          {/* Core Pulse */}
          <AnimatePresence>
            {state === 'thinking' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Particles / Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [0, (i % 2 === 0 ? 1 : -1) * 40, 0],
                y: [0, (i < 3 ? 1 : -1) * 40, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Thinking Status Text */}
      <AnimatePresence>
        {state === 'thinking' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-40 text-center w-64"
          >
            <motion.p
              key="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-cyan-400 font-headline text-sm tracking-widest uppercase"
            >
              <ThinkingText />
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ThinkingText = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Connecting to GitHub...",
    "Analyzing repositories...",
    "Generating insights...",
    "Finalizing profile score..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <span>{steps[step]}</span>;
};
