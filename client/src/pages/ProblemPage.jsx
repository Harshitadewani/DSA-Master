import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import apiClient from "../api/apiClient";
import AIChatSidebar from "../components/AIChatSidebar";
import { useAuth } from "../context/AuthContext";
import { CheckCircle2, Trophy, Clock, Zap, Layers, AlertCircle } from "lucide-react";

const languageMap = {
  javascript: "javascript",
  cpp: "cpp",
  java: "java",
  python: "python",
};

const templates = {
  javascript: `function solve(input) {\n  const { nums, target } = input;\n  // Your logic here\n  return 0;\n}`,
  cpp: `#include <iostream>\n#include <vector>\n\nclass Solution {\npublic:\n    int solve(std::vector<int>& nums, int target) {\n        // implementation\n        return 0;\n    }\n};`,
  java: `import java.util.*;\n\npublic class Solution {\n    public int solve(int[] nums, int target) {\n        // implementation\n        return 0;\n    }\n}`,
  python: `class Solution:\n    def solve(self, nums, target):\n        # implementation\n        return 0`,
};

function ProblemPage() {
  const { slug } = useParams();
  const { user, setUser } = useAuth();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [terminal, setTerminal] = useState("Ready for execution...");
  const [terminalHeight, setTerminalHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [terminalTab, setTerminalTab] = useState("output");
  const [customInput, setCustomInput] = useState("");
  const [stats, setStats] = useState({
    status: "-",
    executionTimeMs: 0,
    memoryUsageKb: 0,
    complexity: "-",
    peopleBeatenPercent: 0,
  });

  useEffect(() => {
    const loadProblem = async () => {
      try {
        const { data } = await apiClient.get(`/problems/${slug}`);
        setProblem(data.data);
        // Use problem's specific starter code
        setCode(data.data.starterCode?.[language] || "");
      } catch (err) {
        setTerminal("Failed to load problem description.");
      }
    };
    loadProblem();
  }, [slug, language]);

  const execute = async (type) => {
    setTerminalTab("output");
    setTerminal(`> Executing ${type}...\n`);
    try {
      const { data } = await apiClient.post(`/execution/${type}`, {
        slug: slug,
        language,
        code,
        customInput: customInput || undefined
      });
      const payload = data.data;
      setStats(payload);
      
      // Real-time Update for Auth Context
      if (payload.user) {
        const updatedUser = { ...user, ...payload.user };
        setUser(updatedUser);
        localStorage.setItem("dsa_user", JSON.stringify(updatedUser));
      }

      if (payload.status === "Error") {
        setTerminal(`RUNTIME ERROR:\n${payload.stderr}\n\nTraceback focused above.`);
      } else {
        setTerminal(
          `[${payload.status}] Execution Successful.\n\nSTDOUT:\n${payload.stdout || "No output"}\n\nComplexity: ${payload.complexity}\nRuntime: ${payload.executionTimeMs}ms\nMemory: ${payload.memoryUsageKb}KB`
        );
      }
    } catch (error) {
      setTerminal(`> SYSTEM ERROR: ${error?.response?.data?.message || "Internal Execution Error"}`);
    }
  };

  const handleMouseDown = () => setIsResizing(true);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 100 && newHeight < 600) setTerminalHeight(newHeight);
    };
    const handleMouseUp = () => setIsResizing(false);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  if (!problem) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex animate-pulse items-center gap-3 font-black text-brand-600 italic tracking-tighter text-2xl uppercase">
          <Zap size={32} /> Loading Intelligence...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-white overflow-hidden">
      <Navbar />
      
      <main className="flex-1 grid grid-cols-1 overflow-hidden lg:grid-cols-12">
        {/* PANEL 1: DESCRIPTION & LOGIC */}
        <section className="relative flex flex-col border-r border-slate-100 bg-slate-50/30 lg:col-span-3 min-h-0">
          <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 p-6 backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-2">
                <span className="rounded bg-brand-600 px-2 py-0.5 text-[10px] font-black uppercase text-white tracking-widest leading-none flex items-center h-4">
                  {problem.track}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {problem.difficulty}
                </span>
             </div>
             <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase italic leading-tight">
                {problem.title}
             </h1>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
             <div className="prose prose-slate max-w-none">
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-600 mb-2">Problem Statement</h3>
                <p className="text-[13px] leading-6 font-medium text-slate-600 whitespace-pre-wrap">
                  {problem.description}
                </p>

                <div className="mt-8 space-y-6">
                   <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                        <Layers size={14} /> Example Cases
                      </h3>
                      <div className="space-y-3">
                         {problem.sampleTestCases.map((tc, i) => (
                           <div key={i} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                              <div className="flex items-baseline gap-2 mb-2">
                                 <span className="text-[10px] font-black text-brand-600 uppercase w-12 shrink-0">Input:</span>
                                 <code className="text-xs font-mono font-bold text-slate-900 bg-slate-50 px-1.5 py-0.5 rounded">{tc.input}</code>
                              </div>
                              <div className="flex items-baseline gap-2">
                                 <span className="text-[10px] font-black text-brand-600 uppercase w-12 shrink-0">Output:</span>
                                 <code className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{tc.expectedOutput}</code>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="rounded-2xl bg-indigo-50/50 p-5 border border-indigo-100">
                      <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2 flex items-center gap-2">
                        💡 Logic Hint
                      </h3>
                      <p className="text-[12px] font-medium leading-5 text-indigo-700 italic">
                         Focus on achieving O(N) time complexity by using a hash table or two-pointer approach if applicable.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* PANEL 2: CODE EDITOR & TERMINAL */}
        <section className="relative flex flex-col lg:col-span-6 bg-white overflow-hidden min-h-0">
          {/* REWARD MODAL OVERLAY */}
          {stats.status === "Accepted" && (
            <div className="absolute inset-x-0 top-0 z-50 h-full flex items-center justify-center bg-white/90 backdrop-blur-xl animate-in zoom-in duration-500">
               <div className="w-full max-w-lg p-12 text-center">
                  <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-600 text-white shadow-2xl shadow-brand-200">
                     <Trophy size={48} />
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 italic uppercase tracking-tighter leading-none mb-2">Dominance achieved!</h2>
                  <p className="text-slate-500 font-bold italic mb-10">You've successfully conquered this problem.</p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-12">
                     <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Efficiency Level</p>
                        <p className="text-3xl font-black text-brand-600 italic uppercase tracking-tighter">Elite {100 - stats.peopleBeatenPercent}%</p>
                     </div>
                     <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Complexity</p>
                        <p className="text-3xl font-black text-slate-900 italic tracking-tighter">{stats.complexity}</p>
                     </div>
                  </div>

                  <button 
                    onClick={() => setStats({ ...stats, status: "-" })}
                    className="w-full rounded-2xl bg-slate-900 py-5 text-xs font-black uppercase text-white shadow-2xl hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Continue Researching
                  </button>
               </div>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
             <div className="flex gap-2">
                {Object.keys(templates).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all ${
                      language === lang 
                        ? 'bg-slate-900 text-white shadow-lg' 
                        : 'bg-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
             </div>
             
             <div className="flex items-center gap-3">
                <button
                  onClick={() => execute("run")}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-[11px] font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50"
                >
                  Run
                </button>
                <button
                  onClick={() => execute("submit")}
                  className="rounded-xl bg-brand-600 px-6 py-2 text-[11px] font-black uppercase tracking-wider text-white shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all active:scale-95"
                >
                  Confirm Submission
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-hidden min-h-0">
             <Editor
               height="100%"
               language={languageMap[language]}
               value={code}
               onChange={(value) => setCode(value || "")}
               options={{ 
                 minimap: { enabled: false }, 
                 fontSize: 16,
                 lineHeight: 26,
                 fontFamily: "'Inter', monospace",
                 fontWeight: '500',
                 padding: { top: 30, left: 20 },
                 backgroundColor: '#ffffff',
                 automaticLayout: true
               }}
             />
          </div>

          {/* DOCKED RESIZEABLE TERMINAL */}
          <div 
            style={{ height: `${terminalHeight}px`, minHeight: '150px' }}
            className={`relative border-t border-slate-200 flex flex-col bg-white transition-shadow z-30 ${isResizing ? 'shadow-2xl shadow-brand-500/20' : ''}`}
          >
             {/* RESIZE HANDLE */}
             <div 
               onMouseDown={handleMouseDown}
               className="absolute -top-1.5 left-0 right-0 h-3 cursor-row-resize bg-transparent hover:bg-brand-500/10 transition-colors z-20"
             />

             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
                <div className="flex gap-6">
                  <button 
                    onClick={() => setTerminalTab("output")} 
                    className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest italic transition-colors ${terminalTab === "output" ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'}`}>
                    <Zap size={14} className={stats.status === "Error" ? "text-rose-500" : (terminalTab === "output" ? "text-brand-600" : "text-slate-400")} /> 
                    {stats.status === "Error" ? "Diagnostics" : "Output Terminal"}
                  </button>
                  <button 
                    onClick={() => setTerminalTab("testcases")} 
                    className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest italic transition-colors ${terminalTab === "testcases" ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'}`}>
                    <Layers size={14} /> 
                    Custom Testcases
                  </button>
                </div>
                <div className="flex gap-5">
                   {stats.status !== "Error" && terminalTab === "output" && (
                     <>
                       <div className="flex items-center gap-1.5 font-bold text-[10px] text-slate-400">
                          <Clock size={12} /> <span className="text-slate-900 tracking-tighter">{stats.executionTimeMs}ms</span>
                       </div>
                       <div className="flex items-center gap-1.5 font-bold text-[10px] text-slate-400">
                          <Zap size={12} /> <span className="text-slate-900 tracking-tighter">{stats.memoryUsageKb}KB</span>
                       </div>
                     </>
                   )}
                   {stats.status === "Error" && terminalTab === "output" && (
                     <div className="flex items-center gap-1.5 font-bold text-[10px] text-rose-500 uppercase tracking-widest">
                        <AlertCircle size={12} /> Compilation Failed
                     </div>
                   )}
                </div>
             </div>
             
             {terminalTab === "output" ? (
               <pre className={`flex-1 overflow-auto p-8 text-[15px] font-mono leading-relaxed transition-colors tracking-tight ${
                  stats.status === "Error" ? "bg-rose-50 text-rose-600 font-bold" : "bg-slate-950 text-emerald-400 shadow-inner"
               }`}>
                  {terminal}
               </pre>
             ) : (
               <div className="flex-1 overflow-auto p-6 bg-slate-50 flex flex-col min-h-0">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                     Define input payload
                  </label>
                  <textarea 
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder='Provide input testcases. Example:\n{"nums": [2, 7, 11, 15], "target": 9}'
                    className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-6 font-mono text-sm text-slate-700 resize-none outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all shadow-sm"
                  />
               </div>
             )}
          </div>
        </section>

        {/* PANEL 3: AI ASSISTANT CHATBOT */}
        <section className="flex flex-col border-l border-slate-100 bg-white lg:col-span-3 overflow-hidden shadow-2xl min-h-0">
           <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent)] opacity-50" />
           <AIChatSidebar slug={slug} code={code} />
        </section>
      </main>
    </div>
  );
}

export default ProblemPage;
