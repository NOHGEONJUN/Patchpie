import React from 'react';
import { Recycle } from 'lucide-react'; // Changed icon to be more relevant if available, or keep Library

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {/* Using text-amber-600 to match the theme */}
          <span className="font-serif text-xl font-bold tracking-wider text-slate-900 flex items-center gap-2">
            <span className="text-amber-600 text-2xl">P</span>atchPie
          </span>
        </div>
        <div className="hidden md:block">
          <button className="rounded-full border border-slate-300 px-6 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white">
            View Collection
          </button>
        </div>
      </div>
    </nav>
  );
};