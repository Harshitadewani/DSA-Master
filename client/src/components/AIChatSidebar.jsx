import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import apiClient from "../api/apiClient";
import { Send, Trash2, Bot } from "lucide-react";

function AIChatSidebar({ slug, code }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I'm your AI Mentor. How can I help you optimize your solution?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const askAssistant = async () => {
    if (!prompt.trim()) return;
    
    const userMsg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const { data } = await apiClient.post("/ai/ask", {
        slug,
        userCode: code,
        prompt: prompt,
      });
      
      const assistantMsg = { role: "assistant", content: data.data.reply };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error connecting to Intelligence: " + (error?.response?.data?.message || "Service unavailable") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 bg-white p-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-brand-400 shadow-xl shadow-slate-200">
             <Bot size={22} />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.1em] text-slate-800 italic">AI Coding Mentor</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Now
            </div>
          </div>
        </div>
        <button onClick={() => setMessages([messages[0]])} className="text-slate-300 hover:text-rose-500 transition-colors">
           <Trash2 size={16} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[100%] rounded-[1.5rem] p-5 text-[13px] leading-relaxed font-medium shadow-sm border ${
              msg.role === "user" 
                ? "bg-slate-900 text-white border-slate-800" 
                : "bg-slate-50 text-slate-600 border-slate-100 prose prose-sm prose-slate prose-pre:bg-slate-900 prose-pre:text-brand-400 prose-code:text-rose-600 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest"
            }`}>
              {msg.role === "assistant" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="rounded-[1.2rem] bg-indigo-50 border border-indigo-100 p-4 shadow-sm">
                <div className="flex gap-1">
                   <div className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-bounce [animation-delay:-0.3s]" />
                   <div className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-bounce [animation-delay:-0.15s]" />
                   <div className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-bounce" />
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 p-4 shrink-0">
        <div className="relative flex flex-col gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), askAssistant())}
            placeholder="Ask a question..."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-3 pr-12 text-[13px] font-medium leading-relaxed text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:shadow-xl focus:shadow-brand-50/30"
            rows={2}
          />
          <button
            onClick={askAssistant}
            disabled={loading}
            className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95 disabled:bg-slate-400"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="mt-2 text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest leading-none italic">
           Powered by Gemini Intelligence
        </p>
      </div>
    </div>
  );
}

export default AIChatSidebar;
