import React, { useState } from 'react';
import { Wand2, AlertCircle, ArrowRight } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (input: string) => void;
  error: string | null;
}

export const InputSection: React.FC<InputSectionProps> = ({ onSubmit, error }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
          Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">Better</span>.
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
          Enter a rough idea, a project title, or a loose thought. We will use the reasoning capabilities of Gemini 3 to architect the perfect system prompt for your next build.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
        <div className="relative bg-black rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., A minimalist kanban board for personal productivity with dark mode and local storage..."
            className="w-full h-48 sm:h-64 bg-transparent p-6 sm:p-8 text-lg sm:text-xl font-mono text-gray-200 placeholder-gray-700 resize-none focus:outline-none"
            spellCheck={false}
          />
          
          <div className="absolute bottom-4 right-4 flex items-center gap-4">
             <span className="text-xs text-gray-600 font-mono hidden sm:block">CMD + ENTER to generate</span>
             <button
              onClick={handleSubmit}
              disabled={!value.trim()}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold tracking-wide transition-all duration-300
                ${value.trim() 
                  ? 'bg-white text-black hover:bg-neon-cyan hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]' 
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'}
              `}
            >
              <Wand2 className="w-5 h-5" />
              <span>TRANSMUTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-center gap-2 text-red-400 bg-red-950/30 p-3 rounded-lg border border-red-900/50">
          <AlertCircle className="w-5 h-5" />
          <span className="font-mono text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};