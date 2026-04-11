import React from 'react';
import { History as HistoryIcon, Search, Filter, Download } from 'lucide-react';

export const History: React.FC = () => {
  const historyItems = [
    { id: 1, target: 'vercel/next.js', type: 'Repo Analysis', date: '2026-04-09', score: '942' },
    { id: 2, target: 'gaearon', type: 'Profile Audit', date: '2026-04-08', score: '985' },
    { id: 3, target: 'microsoft/typescript', type: 'Repo Analysis', date: '2026-04-05', score: '912' },
    { id: 4, target: 'shadcn', type: 'Profile Audit', date: '2026-04-02', score: '968' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold font-headline tracking-tight">Intelligence History</h2>
          <p className="text-on-surface-variant mt-1">Review your past analyses and generated reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-surface-container-high rounded-lg border border-white/5 text-slate-400 hover:text-on-surface transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 bg-surface-container-high rounded-lg border border-white/5 text-slate-400 hover:text-on-surface transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-3xl border border-white/5 overflow-hidden rim-light">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Target</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Type</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Date</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Score</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {historyItems.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <span className="font-bold text-sm group-hover:text-cyan-400 transition-colors">{item.target}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-500">{item.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-500">{item.date}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-primary-container">{item.score}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-on-surface transition-colors">
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
