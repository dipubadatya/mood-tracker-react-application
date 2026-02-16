import { useMood } from '../context/MoodContext';
import { useMoodAnalytics } from '../hooks/useMoodAnalytics';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Activity, Heart, CloudRain, Smile, Frown, Meh } from 'lucide-react';

// Unified Color Logic: Consistent across the whole app
const MOOD_CONFIG = {
  'Great': { color: '#000000', icon: <Heart size={14} /> },
  'Good':  { color: '#525252', icon: <Smile size={14} /> },
  'Okay':  { color: '#A3A3A3', icon: <Meh size={14} /> },
  'Down':  { color: '#D4D4D4', icon: <Frown size={14} /> },
  'Awful': { color: '#E5E5E5', icon: <CloudRain size={14} /> },
};

export default function Dashboard() {
  const { entries } = useMood();
  const { weeklyTrend, streak } = useMoodAnalytics(entries);

  // LOGIC: Calculate Mood Distribution dynamically from entries
  const moodDistribution = entries.reduce((acc, entry) => {
    const existing = acc.find(item => item.name === entry.mood);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: entry.mood, value: 1 });
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value); // Show most frequent first

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <Activity size={48} className="text-neutral-200 mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-neutral-900">No data stories yet.</h2>
        <p className="text-neutral-400">Your emotional journey will visualize here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-10">
      {/* Header & Metric Cards */}
      <header className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-6xl font-black tracking-tighter">Your Flow</h1>
          <p className="text-neutral-400 text-lg mt-2 font-medium">Deep insights into your emotional patterns.</p>
        </div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-neutral-900 p-6 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-neutral-200"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Current Streak</p>
            <p className="text-4xl font-black">{streak} Days</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <Zap size={24} className="text-yellow-400 fill-yellow-400" />
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* 1. WEEKLY INTENSITY (Area Chart) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-8 md:p-10 rounded-[3rem] border border-neutral-100 shadow-2xl shadow-neutral-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">7-Day Mood Wave</h3>
            <div className="px-3 py-1 bg-neutral-50 rounded-full text-[10px] font-bold text-neutral-500 border border-neutral-100">
              Score 1.0 — 5.0
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#D4D4D4', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis domain={[0, 5]} hide />
                <Tooltip 
                  cursor={{ stroke: '#F5F5F5', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '15px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#000000" 
                  strokeWidth={4} 
                  fill="url(#chartGradient)"
                  dot={{ r: 6, fill: '#000000', strokeWidth: 3, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. MOOD DISTRIBUTION (Pie/Donut Chart) */}
        <div className="col-span-12 lg:col-span-4 bg-white p-8 md:p-10 rounded-[3rem] border border-neutral-100 shadow-2xl shadow-neutral-100 flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-8">Dominant Vibes</h3>
          
          <div className="relative h-[250px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodDistribution}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {moodDistribution.map((entry) => (
                    <Cell 
                      key={entry.name} 
                      fill={MOOD_CONFIG[entry.name]?.color || '#000'} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black">{entries.length}</span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Logs</span>
            </div>
          </div>

          {/* Dynamic Legend */}
          <div className="space-y-3">
            {moodDistribution.slice(0, 4).map((m) => (
              <div key={m.name} className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: MOOD_CONFIG[m.name]?.color }} 
                  />
                  <span className="text-sm font-bold text-neutral-700">{m.name}</span>
                </div>
                <span className="text-xs font-black bg-white px-2 py-1 rounded-lg border border-neutral-100">
                  {Math.round((m.value / entries.length) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}