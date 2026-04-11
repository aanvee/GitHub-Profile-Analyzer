import React from 'react';
import { motion } from 'framer-motion';
import { Search, GitBranch, Terminal, Shield, Cpu, Zap } from 'lucide-react';

export const Analysis: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Deep Profile Analysis</h2>
        <p className="text-on-surface-variant mt-1">Run an advanced diagnostic on any GitHub profile or repository.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl relative group">
        <div className="absolute -inset-1 intelligence-gradient rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
        <div className="relative bg-surface-container-low rounded-2xl p-2 flex items-center gap-2 border border-white/10">
          <div className="pl-4">
            <Search className="w-5 h-5 text-slate-500" />
          </div>
          <input 
            type="text" 
            placeholder="Enter GitHub username or repo URL (e.g. facebook/react)"
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-slate-600 font-body"
          />
          <button className="intelligence-gradient text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
            Analyze
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <AnalysisFeature 
          icon={Shield} 
          title="Security Audit" 
          desc="Identify potential vulnerabilities and secret leaks in public code."
        />
        <AnalysisFeature 
          icon={Cpu} 
          title="Architecture Review" 
          desc="AI-driven assessment of design patterns and code structure."
        />
        <AnalysisFeature 
          icon={Zap} 
          title="Performance Metrics" 
          desc="Benchmark repository efficiency and runtime complexity."
        />
      </div>

      {/* Placeholder for results */}
      <div className="mt-12 border-2 border-dashed border-white/5 rounded-[2rem] h-96 flex flex-col items-center justify-center text-slate-600">
        <Terminal className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-headline uppercase tracking-widest text-xs font-bold">Waiting for input signal...</p>
      </div>
    </div>
  );
};

const AnalysisFeature = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 rim-light hover:bg-white/5 transition-colors group">
    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/10 mb-6 group-hover:border-cyan-400/50 transition-colors">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);
