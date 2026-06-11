"use client";
import React from 'react';
import { NavBar } from './NavBar';

export function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0f19] p-2 md:p-8 flex items-center justify-center font-mono">
      <div className="w-full max-w-6xl h-[95vh] md:h-[90vh] bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-900/10 flex flex-col relative z-10">
        
        {/* Terminal Header */}
        <div className="h-10 bg-[#1e293b] border-b border-slate-800 flex items-center px-4 shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
          </div>
          <div className="flex-1 text-center text-xs text-slate-400 select-none flex items-center justify-center gap-2">
            vinish@portfolio: ~
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          <NavBar />
          <div className="flex-1 overflow-y-auto terminal-scrollbar p-6 md:p-10 scroll-smooth relative" id="terminal-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
