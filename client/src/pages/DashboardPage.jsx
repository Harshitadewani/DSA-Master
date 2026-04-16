import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Database, LayoutGrid, ChevronRight, Trophy, Flame, Globe, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

function badgeColor(difficulty) {
  if (difficulty === "Easy") return "bg-emerald-50 text-emerald-600 border border-emerald-100";
  if (difficulty === "Medium") return "bg-amber-50 text-amber-600 border border-amber-100";
  return "bg-rose-50 text-rose-600 border border-rose-100";
}

function DashboardPage() {
  const { user, setUser } = useAuth();
  const [library, setLibrary] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileResponse, libraryResponse] = await Promise.all([
          apiClient.get("/profile"),
          apiClient.get("/problems/library/all"),
        ]);
        setUser(profileResponse.data.data);
        setLibrary(libraryResponse.data.data);
      } catch (err) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setUser]);

  useEffect(() => {
    const activeTopic = library.find((item) => item.topic === selectedTopic);
    if (!activeTopic) return;
    setProblems(activeTopic.problems || []);
  }, [library, selectedTopic]);

  const handleToggleStatus = async (e, problemId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data } = await apiClient.post("/progress/toggle", { problemId });
      // Update local state
      setProblems(prev => prev.map(p => 
        p._id === problemId ? { ...p, userStatus: data.data.status } : p
      ));
      setLibrary(prev => prev.map(item => ({
        ...item,
        problems: item.problems.map(p => 
          p._id === problemId ? { ...p, userStatus: data.data.status } : p
        )
      })));
    } catch (err) {
      console.error("Failed to toggle status");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        {!selectedTopic ? (
          <>
            {/* Problem of the Day Section */}
            {library.length > 0 && library[0].problems && library[0].problems.length > 0 && (
              <div className="mb-16">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                       <Flame className="text-orange-500" size={28} /> Problem of the Day
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">Keep your daily streak alive by solving today's handpicked challenge.</p>
                  </div>
                  <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-bold border border-orange-100 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Daily Streak: {user?.currentStreak || 0}
                  </div>
                </div>
                <div className="glass-card bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-[2rem] text-white overflow-hidden relative shadow-xl shadow-brand-500/10">
                  {/* Background decoration */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/10 text-brand-300 text-xs font-black uppercase tracking-widest rounded-lg mb-4 backdrop-blur-md border border-white/10">
                         {library[0].problems[0].difficulty} • {library[0].topic}
                      </span>
                      <h3 className="text-3xl font-black mb-2">{library[0].problems[0].title}</h3>
                      <p className="text-indigo-200 max-w-xl">
                        Challenge yourself with today's problem. 78% of people who solve the POTD get interview callbacks faster.
                      </p>
                    </div>
                    <Link
                      to={`/problems/${library[0].problems[0].slug}`}
                      className="bg-brand-500 hover:bg-brand-400 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] whitespace-nowrap"
                    >
                      Solve Now <ChevronRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-14 mt-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-600 mb-2">Academy Library</p>
              <h1 className="text-5xl font-black tracking-tighter text-slate-900">
                Master the <span className="text-brand-600 italic">Fundamentals</span>
              </h1>
              <p className="mt-4 text-lg text-slate-400 font-medium max-w-xl leading-relaxed">
                Choose a domain to access curated challenges designed to take you from absolute zero to technical mastery.
              </p>
            </div>
            
            <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {library.map((item) => {
                const solvedCount = item.problems?.filter(p => p.userStatus === 'Solved').length || 0;
                return (
                  <button
                    key={item.topic}
                    onClick={() => setSelectedTopic(item.topic)}
                    className="group relative flex flex-col items-start rounded-[2.5rem] bg-white border border-slate-100 p-8 text-left transition-all hover:border-brand-200 hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] active:scale-95"
                  >
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-slate-50 text-slate-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                      <Database size={32} />
                    </div>
                    <div className="flex w-full items-center justify-between mb-2">
                       <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.topic}</h3>
                       <span className="text-[10px] font-black text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">{solvedCount}/{item.problems?.length || 10}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400 font-semibold leading-relaxed">
                      Explore precision-engineered problems.
                    </p>
                    <div className="mt-8 flex w-full items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-600">Start Domain</span>
                      <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform group-hover:text-brand-600" />
                    </div>
                  </button>
                );
              })}
            </section>
          </>
        ) : (
          <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <button 
              onClick={() => setSelectedTopic(null)}
              className="mb-10 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-600 transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Academy
            </button>

            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="mb-10 flex items-end justify-between border-b border-slate-100 pb-10">
                   <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-brand-600">Learning Path</p>
                      <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">{selectedTopic}</h2>
                      <p className="mt-4 text-sm font-bold text-slate-400">
                        Progress: <span className="text-brand-600 font-black">{problems.filter(p => p.userStatus === 'Solved').length} / {problems.length}</span> Challenges Mastered
                      </p>
                   </div>
                   <div className="flex -space-x-4">
                      {problems.map((p, i) => (
                        <div key={i} className={`h-12 w-12 rounded-full border-4 border-[#fafbfc] flex items-center justify-center text-[10px] font-black shadow-sm transition-all ${p.userStatus === 'Solved' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {i + 1}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-3">
                  {!loading && problems.map((problem) => (
                    <Link
                      key={problem._id}
                      to={`/problems/${problem.slug}`}
                      className="group flex items-center justify-between rounded-[2.5rem] bg-white border border-slate-100 p-6 transition-all hover:border-brand-300 hover:shadow-2xl active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-6">
                        <div 
                          onClick={(e) => handleToggleStatus(e, problem._id)}
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 cursor-pointer ${problem.userStatus === 'Solved' ? 'bg-brand-600 border-brand-600 text-white scale-110 shadow-lg shadow-brand-200' : 'bg-transparent border-slate-200 text-transparent group-hover:border-brand-200 hover:scale-110'}`}
                        >
                           <CheckCircle2 size={24} strokeWidth={3} />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-brand-700 uppercase transition-colors italic leading-none">
                            {problem.title}
                          </h4>
                          <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${problem.userStatus === 'Solved' ? 'text-brand-600 font-black' : 'text-slate-300 font-bold'}`}>
                             {problem.userStatus === 'Solved' ? '✓ Dominance Achieved' : '○ Pending Mastery'}
                          </p>
                        </div>
                      </div>
                      <span className={`rounded-2xl px-5 py-2.5 text-[10px] font-black uppercase tracking-widest border-2 ${badgeColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-12 space-y-6">
                  <div className="rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 mb-6 italic underline">Performance Metrics</p>
                    <div className="space-y-8">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-brand-400">
                                <Trophy size={18} />
                             </div>
                             <span className="text-sm font-bold opacity-70">Problems Solved</span>
                          </div>
                          <span className="text-2xl font-black">{user?.problemsSolved ?? 0}</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400">
                                <Flame size={18} />
                             </div>
                             <span className="text-sm font-bold opacity-70">Day Streak</span>
                          </div>
                          <span className="text-2xl font-black">{user?.currentStreak ?? 0}</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
                                <Globe size={18} />
                             </div>
                             <span className="text-sm font-bold opacity-70">Global Rank</span>
                          </div>
                          <span className="text-xl font-black tracking-tight">Top 15%</span>
                       </div>
                    </div>
                  </div>

                  <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 text-center bg-white/50">
                     <p className="text-xs font-bold text-slate-400 mb-2 italic uppercase">Upcoming Challenge</p>
                     <p className="text-sm font-black text-slate-900 leading-tight">Dynamic Programming Weekly Contest</p>
                     <button className="mt-6 w-full rounded-2xl bg-white border border-slate-200 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                        Register Now
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
