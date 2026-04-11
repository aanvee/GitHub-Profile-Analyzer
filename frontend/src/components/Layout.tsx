import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  History, 
  Lightbulb, 
  Settings, 
  HelpCircle,
  Bell,
  Zap,
  Search,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart2, label: 'Analyze Profile', path: '/analyze' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Lightbulb, label: 'Suggestions', path: '/suggestions' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-slate-950/70 backdrop-blur-xl z-50 flex flex-col font-headline tracking-tight">
        <div className="p-6">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            GitScore AI
          </span>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg group",
                isActive 
                  ? "text-cyan-400 border-r-2 border-cyan-400 bg-cyan-400/10" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">

          <div className="space-y-1">
            <button className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 text-xs transition-all w-full text-left">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 text-xs transition-all w-full text-left">
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Topbar */}
        <header className="fixed top-0 right-0 left-64 flex justify-between items-center px-8 h-16 border-b border-white/5 bg-slate-950/50 backdrop-blur-md z-40">
          <div className="flex items-center w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-slate-600 pl-10" 
                placeholder="Search repositories..." 
                type="text"
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-outline-variant/20"></div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-6">
            </nav>
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <button className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Zap className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 ml-2">
                <button className="px-4 py-1.5 border border-cyan-400/30 rounded-full text-[10px] uppercase tracking-wider font-bold text-cyan-400 hover:bg-cyan-400/5 transition-all active:scale-95 duration-150">
                  Connect GitHub
                </button>
                <img 
                  alt="User Avatar" 
                  className="w-8 h-8 rounded-full border border-white/10 object-cover" 
                  src="https://picsum.photos/seed/alex/100/100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="pt-16 min-h-screen relative overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
