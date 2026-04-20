import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { getDoubts, getStats } from '../store';
import { Doubt, UserStats } from '../types';
import { Clock, CheckCircle, ChevronRight, Trophy, Zap, HelpCircle, Video, Search, MessageCircle, BarChart3, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function DashboardPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [stats, setStats] = useState<UserStats>({ confidenceScore: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setDoubts(getDoubts());
    setStats(getStats());
  }, []);

  const quickActions = [
    { title: "Ask Doubt", icon: HelpCircle, color: "text-blue-600", bg: "bg-blue-50", link: "/ask", desc: "Get help from experts" },
    { title: "Search", icon: Search, color: "text-indigo-600", bg: "bg-indigo-50", link: "/search", desc: "Browse 10k+ solutions" },
    { title: "Live Class", icon: Video, color: "text-purple-600", bg: "bg-purple-50", link: "/live", desc: "Join ongoing session" },
    { title: "Support", icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-50", link: "/chat", desc: "AI Assistant Sparky" },
  ];

  const solvedCount = doubts.filter(d => d.status === 'Answered').length;

  return (
    <PageLayout title="Student Dashboard">
      <div className="space-y-12">
        {/* Welcome & Stats Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-10 bg-slate-900 border-slate-800 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-indigo-500 rounded-full text-[10px] font-black uppercase tracking-widest">Active Learner</span>
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-400 text-amber-400" /> 4 Day Streak
                </span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Keep up the spark, Learner!</h2>
                <p className="text-white/60 font-medium">You have solved {solvedCount} doubts this week. Ready for more?</p>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                   <span className="text-2xl font-black">{doubts.length}</span>
                   <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Doubts Asked</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-2xl font-black text-emerald-400">{solvedCount}</span>
                   <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Doubts Solved</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-2xl font-black text-indigo-400">{stats.confidenceScore}%</span>
                   <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Mastery Level</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group overflow-hidden">
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Trophy className="w-8 h-8 text-amber-500" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Leaderboard</span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Rank #42</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">You are in the top 5% of active students in Physics!</p>
                </div>
             </div>
             <div className="pt-8 space-y-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "75%" }}
                     className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                   />
                </div>
                <p className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                   <span>Next Badge: Explorer</span>
                   <span>750 / 1000 XP</span>
                </p>
             </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" /> Student Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.link)}
                className="glass-card glass-card-hover p-6 text-left group"
              >
                <div className={`w-10 h-10 rounded-xl ${action.bg} ${action.color} flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <h4 className="font-black text-slate-800 text-sm">{action.title}</h4>
                <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-tight">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Ongoing Live Class Highlight */}
        <div className="p-1 glass-card border-emerald-100 shadow-emerald-100/20">
           <div className="bg-gradient-to-r from-emerald-500/5 to-blue-500/5 p-6 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                 <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                       <Video className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest rounded-lg animate-pulse border-2 border-white">Live</div>
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-slate-800 tracking-tight">Quantum Mechanics: Part II</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Ongoing now • Dr. Sarah Spark</p>
                 </div>
              </div>
              <button 
                onClick={() => navigate('/live')}
                className="btn-primary py-3 px-8 text-xs font-black uppercase tracking-widest bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700"
              >
                Join Now Room
              </button>
           </div>
        </div>

        {/* Recent Doubts List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
               <History className="w-5 h-5 text-indigo-600" /> Recent Doubts List
            </h3>
            <button 
              onClick={() => navigate('/ask')}
              className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline active:scale-95 transition-all"
            >
              Ask New Doubt
            </button>
          </div>

          <div className="space-y-4">
            {doubts.length === 0 ? (
              <div className="text-center py-20 p-8 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No doubts found yet. Your journey to mastery starts here!</p>
              </div>
            ) : (
              doubts.slice(0, 5).map((doubt) => (
                <button
                  key={doubt.id}
                  onClick={() => navigate(`/doubt/${doubt.id}`)}
                  className="w-full text-left glass-card p-6 flex items-center justify-between group hover:border-indigo-200 transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center gap-6 overflow-hidden">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      doubt.status === 'Answered' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {doubt.status === 'Answered' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-slate-800 truncate pr-4">{doubt.question}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          doubt.status === 'Answered' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {doubt.status}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {new Date(doubt.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))
            )}
            {doubts.length > 5 && (
               <button className="w-full py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] hover:text-indigo-600 transition-colors">
                  View All History ({doubts.length})
               </button>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
