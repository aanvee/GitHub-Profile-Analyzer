import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  GitFork, 
  Star, 
  Code2, 
  Calendar,
  ExternalLink,
  ChevronRight,
  Award,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { apiClient } from '../lib/api';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, historyData] = await Promise.all([
        apiClient.fetchDashboardStats(),
        apiClient.fetchHistory()
      ]);
      setStats(statsData);
      setHistory(historyData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
    </div>
  );

  if (error) return (
    <div className="p-8">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-400 flex items-center gap-4">
        <AlertCircle className="w-6 h-6" />
        <p>{error}</p>
      </div>
    </div>
  );

  const activityData = history.slice(0, 7).reverse().map((item, idx) => ({
    name: `A-${history.length - idx}`,
    score: item.gitScore
  }));

  return (
    <div className="p-8 space-y-8">
      {/* Hero Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold font-headline tracking-tight">Intelligence Overview</h2>
          <p className="text-on-surface-variant mt-1">
            {stats.totalAnalyses > 0 
              ? `You have processed ${stats.totalAnalyses} profile evaluations.` 
              : "Welcome! Run your first analysis to see dashboard insights."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-high border border-white/5 rounded-lg text-xs font-bold tracking-wider uppercase hover:bg-surface-container-highest transition-colors">
            Export Report
          </button>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 intelligence-gradient text-slate-950 rounded-lg text-xs font-bold tracking-wider uppercase hover:scale-[1.02] transition-transform"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Award} 
          label="Current GitScore" 
          value={stats.currentScore || "---"} 
          trend={stats.trend >= 0 ? `+${stats.trend}` : stats.trend} 
          color="text-cyan-400" 
          bg="bg-cyan-400/10"
        />
        <StatCard 
          icon={Star} 
          label="Avg Confidence" 
          value={`${stats.avgConfidence}%`} 
          trend="0" 
          color="text-purple-400" 
          bg="bg-purple-400/10"
        />
        <StatCard 
          icon={GitFork} 
          label="Target Count" 
          value={stats.totalAnalyses} 
          trend="Log" 
          color="text-blue-400" 
          bg="bg-blue-400/10"
        />
        <StatCard 
          icon={Users} 
          label="Systems" 
          value="Online" 
          trend="LIVE" 
          color="text-emerald-400" 
          bg="bg-emerald-400/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-3xl p-8 border border-white/5 rim-light">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline font-bold text-lg">Score Progression</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-surface-container-highest rounded-md text-[10px] font-bold uppercase tracking-widest">REAL-TIME</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {activityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    dy={10}
                  />
                  <YAxis 
                    hide 
                    domain={['dataMin - 10', 'dataMax + 10']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1c2026', 
                      border: '1px solid #ffffff10',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#00f0ff" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-slate-700 text-sm italic">
                    Run analyses to see progression data
                </div>
            )}
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="bg-surface-container-low rounded-3xl p-8 border border-white/5 rim-light overflow-y-auto max-h-[420px]">
          <h3 className="font-headline font-bold text-lg mb-6">Recent Evaluations</h3>
          <div className="space-y-6">
            {history.slice(0, 5).map((item, idx) => (
                <FeedItem 
                    key={idx}
                    icon={Code2} 
                    title={`@${item.username}`} 
                    desc={`Evaluated with a GitScore of ${Math.round(item.gitScore)}.`} 
                    time={`${idx + 1}m ago`}
                    color="text-cyan-400"
                />
            ))}
            {history.length === 0 && (
                <p className="text-slate-600 text-sm italic">No recent activity detected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, color, bg }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-surface-container-low rounded-3xl p-6 border border-white/5 rim-light"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-2 rounded-xl", bg)}>
        <Icon className={cn("w-5 h-5", color)} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
        <TrendingUp className="w-3 h-3" />
        {trend}
      </div>
    </div>
    <p className="text-slate-500 text-xs font-headline uppercase tracking-widest font-bold">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </motion.div>
);

const FeedItem = ({ icon: Icon, title, desc, time, color }: any) => (
  <div className="flex gap-4">
    <div className={cn("mt-1", color)}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-sm">{title}</h4>
        <span className="text-[10px] text-slate-600 uppercase font-bold">{time}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  </div>
);
