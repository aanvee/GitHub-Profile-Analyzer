import React from 'react';
import { Lightbulb, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

export const Suggestions: React.FC = () => {
  const suggestions = [
    {
      title: 'Enhance Documentation',
      desc: 'Your top 3 repositories are missing comprehensive README files. Adding them could increase your score by 15 points.',
      impact: 'High',
      category: 'Visibility'
    },
    {
      title: 'Diversify Tech Stack',
      desc: 'You have a strong focus on React. Exploring backend frameworks like Go or Rust would improve your versatility rating.',
      impact: 'Medium',
      category: 'Skills'
    },
    {
      title: 'Increase Contribution Frequency',
      desc: 'Your commit activity has dipped by 20% this month. Aim for at least 3 commits per week to maintain consistency.',
      impact: 'Medium',
      category: 'Activity'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold font-headline tracking-tight">AI Suggestions</h2>
        <p className="text-on-surface-variant mt-1">Personalized recommendations to boost your developer profile.</p>
      </div>

      <div className="max-w-3xl">
        <div className="space-y-6">
          {suggestions.map((s, i) => (
            <div key={i} className="bg-surface-container-low p-8 rounded-[2rem] border border-white/5 rim-light relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Lightbulb className="w-24 h-24" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {s.category}
                  </span>
                  <span className={`px-3 py-1 ${s.impact === 'High' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-blue-400/10 text-blue-400'} text-[10px] font-bold uppercase tracking-widest rounded-full`}>
                    Impact: {s.impact}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <button className="flex items-center gap-2 text-primary-container font-bold text-sm hover:gap-3 transition-all">
                  Learn how to improve <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
