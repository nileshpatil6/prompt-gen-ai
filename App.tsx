import React, { useState } from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultSection } from './components/ResultSection';
import { enhancePrompt } from './services/gemini';
import { AppState, ViewState } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: ViewState.LANDING,
    input: '',
    result: null,
    error: null,
  });

  const handleEnhance = async (input: string) => {
    if (!input.trim()) return;

    setState(prev => ({ ...prev, view: ViewState.GENERATING, input }));

    try {
      const enhanced = await enhancePrompt(input);
      setState(prev => ({ 
        ...prev, 
        view: ViewState.RESULT, 
        result: enhanced,
        error: null 
      }));
    } catch (err: any) {
      console.error("Enhancement failed:", err);
      setState(prev => ({ 
        ...prev, 
        view: ViewState.LANDING, 
        error: err.message || "Failed to connect to the ether. Try again." 
      }));
    }
  };

  const handleReset = () => {
    setState({
      view: ViewState.LANDING,
      input: '',
      result: null,
      error: null,
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-sans selection:bg-neon-purple selection:text-white">
      <Background />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col items-center justify-center p-6 sm:p-12">
          {state.view === ViewState.LANDING && (
            <div className="w-full max-w-4xl animate-slide-up">
              <InputSection 
                onSubmit={handleEnhance} 
                error={state.error} 
              />
            </div>
          )}

          {state.view === ViewState.GENERATING && (
            <div className="flex flex-col items-center justify-center space-y-8 animate-pulse-slow">
              <div className="relative">
                <div className="absolute inset-0 bg-neon-cyan blur-3xl opacity-20 rounded-full"></div>
                <Loader2 className="w-24 h-24 text-neon-cyan animate-spin" />
              </div>
              <h2 className="text-3xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                TRANSMUTING IDEAS
              </h2>
              <p className="text-gray-400 font-mono text-sm">Accessing Gemini 3 Neural Pathways...</p>
            </div>
          )}

          {state.view === ViewState.RESULT && state.result && (
            <div className="w-full max-w-5xl animate-slide-up">
              <ResultSection 
                originalInput={state.input}
                result={state.result}
                onReset={handleReset}
              />
            </div>
          )}
        </main>
        
        <footer className="p-6 text-center text-xs text-gray-600 font-mono">
          POWERED BY GEMINI 3 PRO PREVIEW
        </footer>
      </div>
    </div>
  );
};

export default App;