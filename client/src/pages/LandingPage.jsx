import { Link } from "react-router-dom";
import { Brain, Code2, Trophy, Sparkles, ChevronRight, Zap, Target, BarChart, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-200">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg">
              <Code2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">DSA Master Hub</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary py-2 px-5 text-sm flex items-center gap-1">
                Go to Dashboard <ChevronRight size={16} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary py-2 px-5 text-sm flex items-center gap-1">
                  Start Coding <ChevronRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
        <div className="absolute top-40 left-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 text-brand-700 px-4 py-1.5 text-sm font-bold shadow-sm mb-6 border border-brand-200">
              <Sparkles size={16} className="text-brand-500 animate-pulse" /> V2.0 Now Live
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
              Master DSA with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                AI Precision.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Accelerate your interview prep with our multi-language editor, real-time AI guidance, and curated problem tracks. Stop struggling alone.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary text-lg flex items-center gap-2">
                  Go to Dashboard <Zap size={20} />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-lg flex items-center gap-2">
                    Start For Free <Zap size={20} />
                  </Link>
                  <Link to="/login" className="btn-secondary text-lg">
                    View Problems
                  </Link>
                </>
              )}
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400">
                    U{i}
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ developers</p>
            </div>
          </div>

          {/* Decorative Code Window */}
          <div className={`relative transition-all duration-1000 delay-300 transform ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white/50 backdrop-blur-xl">
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-2 text-xs font-mono text-slate-400">solution.js</span>
              </div>
              <div className="p-6 bg-[#0f172a] text-slate-300 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                <pre>
                  <code className="block text-green-400 mb-2">// Find target with O(n) complexity</code>
                  <code className="block"><span className="text-purple-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) {'{'}</code>
                  <code className="block pl-4"><span className="text-purple-400">const</span> map <span className="text-brand-400">=</span> <span className="text-purple-400">new</span> <span className="text-yellow-200">Map</span>();</code>
                  <code className="block pl-4"><span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i <span className="text-brand-400">=</span> 0; i <span className="text-brand-400">&lt;</span> nums.length; i<span className="text-brand-400">++</span>) {'{'}</code>
                  <code className="block pl-8"><span className="text-purple-400">const</span> complement <span className="text-brand-400">=</span> target <span className="text-brand-400">-</span> nums[i];</code>
                  <code className="block pl-8"><span className="text-purple-400">if</span> (map.<span className="text-blue-300">has</span>(complement)) {'{'}</code>
                  <code className="block pl-12"><span className="text-purple-400">return</span> [map.<span className="text-blue-300">get</span>(complement), i];</code>
                  <code className="block pl-8">{'}'}</code>
                  <code className="block pl-8">map.<span className="text-blue-300">set</span>(nums[i], i);</code>
                  <code className="block pl-4">{'}'}</code>
                  <code className="block">{'}'}</code>
                </pre>
              </div>
            </div>
            
            {/* Floating AI Notification */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-start gap-4 animate-[bounce_3s_ease-in-out_infinite]">
              <div className="bg-brand-100 p-2 rounded-full">
                <Brain className="text-brand-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">AI Tutor says:</p>
                <p className="text-xs text-slate-600 font-medium">Great job! Your solution is O(n).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 px-6 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">Why choose DSA Master Hub?</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Everything you need to conquer data structures and algorithms in one seamlessly integrated platform.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time AI Assistance", icon: Brain, desc: "Stuck on a bug? Get instant hints and time-complexity analysis from our context-aware AI tutor.", color: "bg-purple-100 text-purple-600" },
              { title: "Multi-Language Support", icon: Code2, desc: "Write solutions in JavaScript, Python, C++, or Java. Switch easily with instant compilation.", color: "bg-blue-100 text-blue-600" },
              { title: "Structured Curriculum", icon: Target, desc: "Follow our curated tracks from Array basics to Dynamic Programming mastery.", color: "bg-green-100 text-green-600" },
              { title: "Streaks & Gamification", icon: Trophy, desc: "Build consistency with daily streaks, earn badges, and compete on the global leaderboard.", color: "bg-yellow-100 text-yellow-600" },
              { title: "Detailed Analytics", icon: BarChart, desc: "Track your problem-solving speed, language proficiency, and knowledge gaps over time.", color: "bg-rose-100 text-rose-600" },
              { title: "Global Community", icon: Globe, desc: "Discuss solutions, share approaches, and learn from other passionate developers worldwide.", color: "bg-teal-100 text-teal-600" },
            ].map((feature, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-indigo-600/20 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to crack your next interview?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of developers leveling up their algorithmic problem-solving skills today.</p>
          <Link to="/register" className="btn-primary text-lg px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white shadow-brand-500/30">
            Create Free Account Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-16 pb-8 px-6 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2">
            <Code2 className="text-brand-500 w-6 h-6" />
            <span className="text-xl font-bold text-white">DSA Master Hub</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-brand-400 transition-colors">Problems</a>
            <a href="#" className="hover:text-brand-400 transition-colors">Leaderboard</a>
            <a href="#" className="hover:text-brand-400 transition-colors">Discuss</a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
        <div className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} DSA Master Hub. All rights reserved. Premium Coding Experience.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
