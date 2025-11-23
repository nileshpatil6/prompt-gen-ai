import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Code2, Download } from 'lucide-react';

interface ResultSectionProps {
  originalInput: string;
  result: string;
  onReset: () => void;
}

// Simple internal Markdown renderer to avoid external deps
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const processLine = (line: string, index: number) => {
    // Headers
    if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold text-neon-cyan mt-6 mb-3">{line.replace('### ', '')}</h3>;
    if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-neon-purple mt-8 mb-4 border-b border-white/10 pb-2">{line.replace('## ', '')}</h2>;
    if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-6">{line.replace('# ', '')}</h1>;
    
    // List items
    if (line.trim().startsWith('- ')) return <li key={index} className="ml-4 pl-2 border-l border-neon-cyan/30 text-gray-300 mb-1">{line.replace('- ', '')}</li>;
    if (line.match(/^\d+\. /)) return <div key={index} className="ml-4 mb-2 text-gray-300"><span className="text-neon-purple font-mono mr-2">{line.split('.')[0]}.</span>{line.substring(line.indexOf('.') + 1)}</div>;

    // Bold text (simple regex replacement for display)
    const boldParts = line.split(/(\*\*.*?\*\*)/g);
    
    // Empty lines
    if (!line.trim()) return <div key={index} className="h-4"></div>;

    return (
        <p key={index} className="text-gray-300 leading-relaxed mb-2">
            {boldParts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </p>
    );
  };

  return <div className="font-mono text-sm">{content.split('\n').map(processLine)}</div>;
};

export const ResultSection: React.FC<ResultSectionProps> = ({ originalInput, result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "prompt_alchemy_output.md";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-1">Original Concept</h3>
          <p className="text-lg text-white font-medium line-clamp-1 italic opacity-80">"{originalInput}"</p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-mono text-gray-400 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          START OVER
        </button>
      </div>

      <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <span className="ml-3 text-xs font-mono text-gray-500">PROMPT_OUTPUT.md</span>
          </div>
          <div className="flex gap-2">
             <button 
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Download Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={handleCopy}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all
                ${copied ? 'bg-green-500/20 text-green-400' : 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30'}
              `}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'COPIED' : 'COPY RAW'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-10 max-h-[70vh] overflow-y-auto">
          <SimpleMarkdown content={result} />
        </div>
        
        {/* Decorative footer glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple opacity-50"></div>
      </div>
    </div>
  );
};