import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="p-2 bg-gradient-to-tr from-neon-purple to-neon-cyan rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Terminal className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-wider font-mono">
          PROMPT<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">ALCHEMY</span>
        </h1>
      </div>
      
      <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
        <Sparkles className="w-3 h-3 text-neon-cyan" />
        Gemini 3 Integration Active
      </div>
    </header>
  );
};