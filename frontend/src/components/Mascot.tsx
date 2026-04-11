import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface MascotProps {
  state?: 'idle' | 'focused' | 'privacy' | 'typing' | 'success' | 'error';
  className?: string;
  message?: string;
}

export const Mascot: React.FC<MascotProps> = ({ 
  state = 'idle', 
  className,
  message 
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Springs for smooth tracking
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize mouse position relative to center (-1 to 1)
      const nx = (e.clientX - centerX) / (window.innerWidth / 2);
      const ny = (e.clientY - centerY) / (window.innerHeight / 2);
      
      mouseX.set(nx);
      mouseY.set(ny);
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Head tilt and eye movement transforms
  const headRotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const headRotateY = useTransform(mouseX, [-1, 1], [-20, 20]);
  const eyeX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const eyeY = useTransform(mouseY, [-1, 1], [-8, 8]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative flex flex-col items-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chat Bubble */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-16 z-20 bg-surface-container-highest/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-2xl rim-light"
          >
            <p className="text-xs font-headline font-bold text-primary-container whitespace-nowrap flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              {message}
            </p>
            {/* Bubble Tail */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-container-highest/90 border-r border-b border-white/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot SVG Container */}
      <motion.div
        style={{ 
          rotateX: headRotateX, 
          rotateY: headRotateY,
          perspective: 1000 
        }}
        animate={{
          y: state === 'idle' ? [0, -8, 0] : [0, -4, 0],
          scaleX: isHovered || state === 'success' ? [1, 1.05, 0.95, 1] : 1,
          scaleY: isHovered || state === 'success' ? [1, 0.95, 1.05, 1] : 1,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          y: { 
            duration: state === 'idle' ? 5 : 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          },
          scaleX: { duration: 0.6, ease: "easeInOut" },
          scaleY: { duration: 0.6, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 300, damping: 15 }
        }}
        className="relative w-56 h-56 cursor-pointer"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          {/* Robotic Cat Ears - Even Softer/Rounded */}
          <g className="ears">
            <motion.path
              d="M65,65 C55,40 75,35 90,55"
              fill="none"
              stroke="url(#mascotGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              animate={state === 'typing' ? { rotate: [-5, 5, -5] } : { rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.path
              d="M135,65 C145,40 125,35 110,55"
              fill="none"
              stroke="url(#mascotGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              animate={state === 'typing' ? { rotate: [5, -5, 5] } : { rotate: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </g>

          {/* Head Shell - Softer Circle */}
          <circle cx="100" cy="95" r="58" fill="#1c2026" stroke="url(#mascotGradient)" strokeWidth="3" />
          
          {/* Robotic Face Plate - More Rounded */}
          <rect x="60" y="75" width="80" height="50" rx="25" fill="#10141a" />

          {/* Tentacles / Arms */}
          <g className="tentacles">
            {/* Left Arm */}
            <motion.path
              animate={
                state === 'privacy' ? { d: "M55,115 Q25,105 70,90" } : 
                isHovered ? { d: "M55,115 Q15,90 40,70" } :
                { d: "M55,115 Q15,135 25,165" }
              }
              fill="none"
              stroke="url(#mascotGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
            {/* Right Arm */}
            <motion.path
              animate={state === 'privacy' ? { d: "M145,115 Q175,105 130,90" } : { d: "M145,115 Q185,135 175,165" }}
              fill="none"
              stroke="url(#mascotGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
            {/* Bottom Tentacles - Wavy */}
            {[70, 90, 110, 130].map((x, i) => (
              <motion.path
                key={i}
                d={`M${x},145 Q${x + 5},175 ${x},195`}
                fill="none"
                stroke="url(#mascotGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.7"
                animate={{ 
                  d: [
                    `M${x},145 Q${x + 8},175 ${x},195`, 
                    `M${x},145 Q${x - 8},175 ${x},195`, 
                    `M${x},145 Q${x + 8},175 ${x},195`
                  ] 
                }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" }}
              />
            ))}
          </g>

          {/* Face Group */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            {/* Blush - Cute addition */}
            <motion.g
              animate={{ opacity: state === 'success' || isHovered ? 0.6 : 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx="70" cy="115" r="5" fill="#ff0080" filter="blur(4px)" />
              <circle cx="130" cy="115" r="5" fill="#ff0080" filter="blur(4px)" />
            </motion.g>

            {/* Eyes - Larger and Expressive */}
            <g className="eyes">
              <motion.g animate={state === 'privacy' ? { opacity: 0, scale: 0.3 } : { opacity: 1, scale: 1 }}>
                {/* Left Eye */}
                <circle cx="80" cy="100" r="15" fill="#1c2026" />
                {state === 'success' ? (
                  <motion.path
                    d="M72,100 Q80,110 88,100 Q80,90 72,100"
                    fill="#ff0080"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                ) : (
                  <>
                    <motion.circle 
                      cx="80" cy="100" 
                      r={state === 'focused' ? 10 : 8} 
                      fill="#00f0ff" 
                      animate={{ scaleY: [1, 1, 0, 1, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 6, 
                        times: [0, 0.8, 0.85, 0.9, 1],
                        ease: "easeInOut"
                      }}
                    />
                    {/* Eye Highlights */}
                    <circle cx="76" cy="96" r="3.5" fill="white" opacity="0.9" />
                    <circle cx="82" cy="102" r="1.5" fill="white" opacity="0.4" />
                  </>
                )}
                
                {/* Right Eye */}
                <circle cx="120" cy="100" r="15" fill="#1c2026" />
                {state === 'success' ? (
                  <motion.path
                    d="M112,100 Q120,110 128,100 Q120,90 112,100"
                    fill="#ff0080"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                ) : (
                  <>
                    <motion.circle 
                      cx="120" cy="100" 
                      r={state === 'focused' ? 10 : 8} 
                      fill="#00f0ff" 
                      animate={{ scaleY: [1, 1, 0, 1, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 6, 
                        times: [0, 0.8, 0.85, 0.9, 1],
                        ease: "easeInOut"
                      }}
                    />
                    {/* Eye Highlights */}
                    <circle cx="116" cy="96" r="3.5" fill="white" opacity="0.9" />
                    <circle cx="122" cy="102" r="1.5" fill="white" opacity="0.4" />
                  </>
                )}
              </motion.g>
            </g>

            {/* Mouth */}
            <motion.path
              animate={
                state === 'success' ? { d: "M85,118 Q100,135 115,118" } :
                state === 'error' ? { d: "M85,128 Q100,115 115,128" } :
                state === 'focused' ? { d: "M90,122 Q100,128 110,122" } :
                { d: "M92,124 Q100,124 108,124" }
              }
              fill="none"
              stroke={state === 'success' ? "#ff0080" : "#00f0ff"}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="1"
            />
          </motion.g>

          {/* Core Light */}
          <circle cx="100" cy="145" r="10" fill="#00f0ff" opacity="0.1" className="animate-pulse" />
          <circle cx="100" cy="145" r="4" fill="#00f0ff" />

          {/* Gradients & Filters */}
          <defs>
            <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#6f00be" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Aura */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-[40px] -z-10 transition-all duration-700",
          state === 'error' ? 'bg-red-500/30' : 'bg-cyan-500/20',
          state === 'typing' && 'animate-pulse scale-110'
        )} />
      </motion.div>

      {/* Status Indicator */}
      <AnimatePresence>
        {state === 'typing' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.5)]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
