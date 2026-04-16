import { Link, useNavigate } from "react-router-dom";
import { Flame, LogOut, Medal } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-surface-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          DSA <span className="text-brand-600">Master</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium md:gap-4">
          <Link to="/" className="rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-600">
            Problems
          </Link>
          <Link to="/analytics" className="rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-600">
            Analytics
          </Link>
          <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>
          <span className="hidden items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-orange-700 border border-orange-100 md:inline-flex">
            <Flame size={14} fill="currentColor" /> {user?.currentStreak || 0}
          </span>
          {user?.has20DayBadge && (
            <span className="hidden items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-brand-700 border border-brand-100 md:inline-flex">
              <Medal size={14} /> 20-Day Badge
            </span>
          )}
          <div className="hidden items-center gap-2 rounded-xl bg-surface-50 border border-surface-200 px-3 py-1.5 md:flex">
            <div className="h-7 w-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-[10px] font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-slate-900 font-semibold">{user?.name}</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/landing");
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
