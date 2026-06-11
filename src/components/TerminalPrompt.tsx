import React from 'react';

export function TerminalPrompt({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-sm md:text-base mb-6 text-slate-300 mt-12 first:mt-0">
      <span className="text-[#4ade80] font-semibold text-glow">vinish@portfolio</span>
      <span className="text-slate-400">:</span>
      <span className="text-[#38bdf8] font-semibold text-glow">~$</span>
      <span className="text-slate-100 font-medium">{command}</span>
    </div>
  );
}
