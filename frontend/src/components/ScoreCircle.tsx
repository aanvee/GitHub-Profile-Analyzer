import React from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  confidence: number;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, confidence }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center w-64 h-64">
      {/* Background Circle */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="12"
          className="text-slate-800"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="url(#score-gradient)"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 2, ease: "easeOut" }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Score Text */}
      <div className="z-10 text-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl font-black font-headline tracking-tighter intelligence-text-gradient"
        >
          {Math.round(score)}
        </motion.span>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">GitScore</span>
          <div className="mt-2 text-[10px] text-emerald-400 font-mono bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            CONFIDENCE: {Math.round(confidence * 100)}%
          </div>
        </div>
      </div>

      {/* Inner Glow */}
      <div className="absolute inset-0 rounded-full intelligence-gradient opacity-10 blur-3xl animate-pulse" />
    </div>
  );
};
