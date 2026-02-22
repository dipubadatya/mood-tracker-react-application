

import { Link, useLocation } from "react-router-dom";
import { BarChart3, PenLine, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion"; // Highly recommended for award-winning feel

const NAV_ITEMS = [
  { path: "/", label: "Home", icon: <Sparkles size={18} /> },
  { path: "/log", label: "Log", icon: <PenLine size={18} /> },
  { path: "/dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
  { path: "/history", label: "History", icon: <Clock size={18} /> },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="flex items-center gap-1 p-2 bg-white/70 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] pointer-events-auto transition-all duration-300">
        
        {/* Brand Logo - Minimalist approach */}
        <Link 
          to="/" 
          className="px-4 py-2 mr-2 flex items-center gap-2 group border-r border-neutral-100"
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <Sparkles size={16} fill="currentColor" />
          </div>
          <span className="font-bold tracking-tight text-neutral-900 hidden lg:block">
            mood<span className="text-neutral-400 font-medium">flow</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group
                  ${isActive 
                    ? "text-black" 
                    : "text-neutral-500 hover:text-black hover:bg-neutral-100/50"
                  }`}
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-neutral-100 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </span>
                
                <span className="hidden sm:inline-block relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
