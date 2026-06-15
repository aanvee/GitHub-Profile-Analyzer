import React from 'react';
import { motion } from 'framer-motion';

interface ContributionChartProps {
  breakdown: {
    repos: number;
    followers: number;
    activity: number;
    impact: number;
  };
}

export const ContributionChart: React.FC<ContributionChartProps> = ({ breakdown }) => {
  const data = [
    { label: 'Cloud Repos', value: breakdown.repos, color: 'bg-cyan-500' },
    { label: 'Follower Base', value: breakdown.followers, color: 'bg-blue-500' },
    { label: 'Commit Activity', value: breakdown.activity, color: 'bg-indigo-500' },
    { label: 'Overall Impact', value: breakdown.impact, color: 'bg-purple-500' },
  ];

  return (
    <div className="w-full space-y-6">
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Feature Contribution</h4>
      {data.map((item, index) => (
        <div key={item.label} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant font-medium">{item.label}</span>
            <span className="text-cyan-400 font-mono">{item.value}%</span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
              className={`h-full ${item.color} shadow-[0_0_15px_rgba(34,211,238,0.3)]`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
