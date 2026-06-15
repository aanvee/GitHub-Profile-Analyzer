import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, AlertCircle, Info, TrendingUp, Target, Sparkles, Box } from 'lucide-react';
import { AIOrb } from '../components/AIOrb';
import { ScoreCircle } from '../components/ScoreCircle';
import { ContributionChart } from '../components/ContributionChart';

interface AnalysisData {
  username: string;
  gitScore: number;
  confidence: number;
  breakdown: {
    repos: number;
    followers: number;
    activity: number;
    impact: number;
  };
  suggestions: Array<{ message: string; category: string; priority: string }>;
  topFeatures: string[];
}

export const Analysis: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`http://localhost:8080/api/analyze/${username}`);
      if (!response.ok) throw new Error('Analysis failed. Please check the username.');
      
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Intelligence Evaluation</h2>
        <p className="text-on-surface-variant mt-1">Real-time profile diagnostic powered by explainable AI.</p>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Enter GitHub username (e.g. torvalds)"
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-slate-600 font-body"
          />
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="intelligence-gradient text-slate-950 px-8 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'Processing...' : 'Run Analysis'}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[60vh] flex items-center justify-center flex-col gap-8"
          >
            <AIOrb state="thinking" />
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center gap-4 text-red-400"
          >
            <AlertCircle className="w-6 h-6" />
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        {data && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Score Section */}
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-white/5 rim-light flex flex-col items-center">
              <ScoreCircle score={data.gitScore} confidence={data.confidence} />
              <div className="mt-8 space-y-4 w-full">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Top Contributors</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.topFeatures.map(feature => (
                      <span key={feature} className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded-md text-slate-400">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-white/5 rim-light">
              <ContributionChart breakdown={data.breakdown} />
              
              <div className="mt-12 space-y-4">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">System Insights</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <InsightCard icon={TrendingUp} label="Growth Potential" value="High" />
                    <InsightCard icon={Target} label="Market Fit" value="Strong" />
                 </div>
              </div>
            </div>

            {/* Suggestions Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold px-2 flex items-center gap-2">
                <Box className="w-5 h-5 text-cyan-400" />
                Growth Strategy
              </h3>
              {data.suggestions.map((s, idx) => (
                <SuggestionCard key={idx} suggestion={s} />
              ))}
            </div>
          </motion.div>
        )}

        {!data && !loading && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 border-2 border-dashed border-white/5 rounded-[2rem] h-96 flex flex-col items-center justify-center text-slate-600"
          >
            <Terminal className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-headline uppercase tracking-widest text-xs font-bold">Waiting for sequence input...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InsightCard = ({ icon: Icon, label, value }: any) => (
  <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
    <Icon className="w-5 h-5 text-indigo-400 mb-2" />
    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</div>
    <div className="font-bold text-on-surface">{value}</div>
  </div>
);

const SuggestionCard = ({ suggestion: s }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-surface-container-low p-5 rounded-2xl border border-white/5 rim-light hover:bg-white/5 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className={`mt-1 w-2 h-2 rounded-full ${s.priority === 'high' ? 'bg-red-400 animate-pulse' : s.priority === 'medium' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
      <div className="space-y-1">
        <p className="text-sm text-on-surface leading-normal">{s.message}</p>
        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{s.category} strategy</span>
      </div>
    </div>
  </motion.div>
);
