import React, { useState, useEffect } from 'react';
import { FridgeSection } from './components/FridgeSection';
import { CornZone } from './components/CornZone';
import { BluesMetalShop } from './components/BluesMetalShop';
import { ChaoticOptions } from './components/ChaoticOptions';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState('#ff00ff');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ mixBlendMode: 'difference' }}>
      {/* Crazy Cursor Follower */}
      <div 
        className="fixed w-32 h-32 pointer-events-none z-[9999] animate-spin-fast mix-blend-exclusion"
        style={{ 
          left: mousePos.x - 64, 
          top: mousePos.y - 64,
          background: `radial-gradient(circle, ${bgColor} 0%, transparent 70%)`
        }}
      >
        <img src="/fridge-person.png" alt="cursor" className="w-full h-full rounded-full opacity-50" />
      </div>

      {/* Header Marquee */}
      <header className="fixed top-0 w-full z-50 bg-red-600 border-b-8 border-yellow-400 animate-rainbow">
        <div className="marquee-container py-2">
          <h1 className="marquee-content-fast text-6xl font-black uppercase tracking-tighter">
            WELCOME TO THE ABYSS OF CORN AND REFRIGERATION!!! BUY BLUES METAL GEAR NOW!!! LOCK YOURSELF IN!!! 🌽🥶🎸
          </h1>
        </div>
      </header>

      <main className="pt-32 pb-32 px-4 space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2 transform rotate-2 animate-shake">
            <FridgeSection />
          </div>
          <div className="col-span-1 transform -rotate-3 animate-wobble">
            <CornZone />
          </div>
        </div>

        <div className="w-full transform rotate-1">
          <BluesMetalShop />
        </div>

        <div className="w-full bg-black border-16 border-white p-8 animate-pulse-fast">
          <ChaoticOptions />
        </div>
      </main>

      <footer className="fixed bottom-0 w-full z-50 bg-blue-600 border-t-8 border-green-400 animate-rainbow">
        <div className="marquee-container py-2">
          <h1 className="marquee-content text-4xl font-black uppercase tracking-tighter mix-blend-color-burn">
            DO NOT EAT THE FRIDGE CORN! THE BLUES METAL WILL MELT YOUR SOUL! 🌽🥶🎸 DO NOT EAT THE FRIDGE CORN!
          </h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
