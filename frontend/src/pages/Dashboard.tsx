import React from 'react';
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
  Award
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

const activityData = [
  { name: 'Mon', score: 720 },
  { name: 'Tue', score: 735 },
  { name: 'Wed', score: 742 },
  { name: 'Thu', score: 768 },
  { name: 'Fri', score: 785 },
  { name: 'Sat', score: 792 },
  { name: 'Sun', score: 812 },
];

const langData = [
  { name: 'TypeScript', value: 45, color: '#3178c6' },
  { name: 'React', value: 30, color: '#61dafb' },
  { name: 'Node.js', value: 15, color: '#339933' },
  { name: 'Python', value: 10, color: '#3776ab' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Hero Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold font-headline tracking-tight">Welcome back, Alex</h2>
          <p className="text-on-surface-variant mt-1">Your profile intelligence is up 12% this week.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-high border border-white/5 rounded-lg text-xs font-bold tracking-wider uppercase hover:bg-surface-container-highest transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 intelligence-gradient text-slate-950 rounded-lg text-xs font-bold tracking-wider uppercase hover:scale-[1.02] transition-transform">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Award} 
          label="GitScore" 
          value="812" 
          trend="+42" 
          color="text-cyan-400" 
          bg="bg-cyan-400/10"
        />
        <StatCard 
          icon={Star} 
          label="Total Stars" 
          value="1.2k" 
          trend="+12" 
          color="text-purple-400" 
          bg="bg-purple-400/10"
        />
        <StatCard 
          icon={GitFork} 
          label="Forks" 
          value="428" 
          trend="+5" 
          color="text-blue-400" 
          bg="bg-blue-400/10"
        />
        <StatCard 
          icon={Users} 
          label="Followers" 
          value="892" 
          trend="+18" 
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
              <button className="px-3 py-1 bg-surface-container-highest rounded-md text-[10px] font-bold uppercase tracking-widest">7D</button>
              <button className="px-3 py-1 text-slate-500 rounded-md text-[10px] font-bold uppercase tracking-widest">30D</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
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
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  hide 
                  domain={['dataMin - 50', 'dataMax + 50']}
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
          </div>
        </div>

        {/* Language Distribution */}
        <div className="bg-surface-container-low rounded-3xl p-8 border border-white/5 rim-light">
          <h3 className="font-headline font-bold text-lg mb-8">Language Stack</h3>
          <div className="h-[200px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={langData} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {langData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {langData.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
                <span className="text-sm text-slate-500">{lang.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-low rounded-3xl p-8 border border-white/5 rim-light">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-lg">Recent Repositories</h3>
            <button className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <RepoItem name="ai-orb-assistant" stars={124} forks={32} lang="TypeScript" />
            <RepoItem name="gitscore-engine" stars={89} forks={12} lang="Rust" />
            <RepoItem name="premium-ui-kit" stars={256} forks={45} lang="React" />
          </div>
        </div>

        <div className="bg-surface-container-low rounded-3xl p-8 border border-white/5 rim-light">
          <h3 className="font-headline font-bold text-lg mb-6">Intelligence Feed</h3>
          <div className="space-y-6">
            <FeedItem 
              icon={TrendingUp} 
              title="Score Milestone" 
              desc="Your GitScore reached 800+ for the first time." 
              time="2h ago"
              color="text-emerald-400"
            />
            <FeedItem 
              icon={Code2} 
              title="New Skill Detected" 
              desc="Advanced Rust patterns identified in recent commits." 
              time="5h ago"
              color="text-cyan-400"
            />
            <FeedItem 
              icon={Calendar} 
              title="Consistency Streak" 
              desc="You've committed for 14 consecutive days." 
              time="1d ago"
              color="text-purple-400"
            />
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

const RepoItem = ({ name, stars, forks, lang }: any) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/10">
        <Code2 className="w-5 h-5 text-slate-400" />
      </div>
      <div>
        <h4 className="font-bold text-sm group-hover:text-cyan-400 transition-colors">{name}</h4>
        <p className="text-xs text-slate-500">{lang}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 text-xs text-slate-400">
        <Star className="w-3.5 h-3.5" />
        {stars}
      </div>
      <div className="flex items-center gap-1 text-xs text-slate-400">
        <GitFork className="w-3.5 h-3.5" />
        {forks}
      </div>
      <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
    </div>
  </div>
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
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);
