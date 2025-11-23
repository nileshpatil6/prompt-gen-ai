import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-void pointer-events-none z-0">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Radial Gradient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-neon-cyan rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient-vignette"></div>
    </div>
  );
};