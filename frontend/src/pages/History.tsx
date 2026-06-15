import React, { useEffect, useState } from 'react';
import { History as HistoryIcon, Search, Filter, Download, Terminal, AlertCircle } from 'lucide-react';
import { apiClient } from '../lib/api';

interface HistoryItem {
  username: string;
  gitScore: number;
  confidence: number;
  breakdown: any;
}

export const History: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await apiClient.fetchHistory();
      setHistoryItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-600">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mb-4" />
           <p className="text-xs font-bold uppercase tracking-widest">Accessing records...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-400 flex items-center gap-4">
           <AlertCircle className="w-6 h-6" />
           <p>{error}</p>
        </div>
      ) : historyItems.length === 0 ? (
        <div className="h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-600">
           <Terminal className="w-10 h-10 mb-4 opacity-20" />
           <p className="text-xs font-bold uppercase tracking-widest">No intelligence logs found</p>
        </div>
      ) : (
        <div className="bg-surface-container-low rounded-3xl border border-white/5 overflow-hidden rim-light">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Target</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Type</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Confidence</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Score</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {historyItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-sm group-hover:text-cyan-400 transition-colors">@{item.username}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500">Profile Audit</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500">{Math.round(item.confidence * 100)}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary-container">{Math.round(item.gitScore)}</span>
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
      )}
    </div>
  );
};
