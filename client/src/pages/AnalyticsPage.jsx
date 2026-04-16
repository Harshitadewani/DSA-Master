import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Trophy, Target, TrendingUp, Award, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import apiClient from "../api/apiClient";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const { data } = await apiClient.get("/analytics");
        setAnalytics(data.data);
      } catch (err) {
        console.error("Failed to load analytics");
      }
    };
    loadAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  const barData = [
    { difficulty: "Easy", solved: analytics.difficultyStats.Easy },
    { difficulty: "Medium", solved: analytics.difficultyStats.Medium },
    { difficulty: "Hard", solved: analytics.difficultyStats.Hard },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-10">
          <Link to="/dashboard" className="flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-brand-600 transition-colors mb-4">
            <ChevronLeft size={16} /> Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">
            Performance <span className="text-brand-600">Intelligence</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Data-driven insights into your algorithmic journey.</p>
        </div>

        <section className="grid gap-6 md:grid-cols-4 mb-10">
          {[
            { label: "Total Solved", value: analytics.solvedCount, icon: Trophy, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Available", value: analytics.totalProblems, icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Mastery Level", value: `${analytics.progressPercentage}%`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Global Rank", value: "Top 15%", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-[2rem] p-6 border border-white shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 mt-1 italic uppercase tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="glass-card rounded-[2.5rem] p-8 border border-white shadow-sm bg-white/50">
            <h3 className="text-xl font-black text-slate-900 mb-8 italic uppercase tracking-tight">Difficulty Matrix</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="difficulty" stroke="#94a3b8" fontSize={12} fontStyle="italic" fontWeight="700" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} fontWeight="700" tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '16px' }}
                  />
                  <Bar dataKey="solved" fill="#4f46e5" radius={[12, 12, 12, 12]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 border border-white shadow-sm bg-white/50">
            <h3 className="text-xl font-black text-slate-900 mb-8 italic uppercase tracking-tight">Distribution</h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={barData} 
                    dataKey="solved" 
                    nameKey="difficulty" 
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                  >
                    {barData.map((entry, index) => (
                      <Cell key={entry.difficulty} fill={COLORS[index]} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
               {barData.map((entry, index) => (
                 <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-xs font-bold text-slate-500">{entry.difficulty}</span>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AnalyticsPage;
