import React from 'react';

export function CornZone() {
  return (
    <div className="bg-yellow-300 border-[16px] border-dotted border-green-600 p-4 relative overflow-hidden h-full">
      <div className="absolute inset-0 opacity-50">
        <img src="/corn-fractal.png" alt="Corn Fractal" className="w-full h-full object-cover animate-spin-reverse" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-6xl font-black text-green-800 drop-shadow-[-4px_4px_0px_#ff0] mb-8 rotate-[-5deg]">
          CORN ZONE
        </h2>
        
        <div className="grid grid-cols-3 gap-4 w-full mb-8">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className="bg-orange-500 text-yellow-200 font-bold p-2 text-xl border-4 border-yellow-800 animate-wobble cursor-pointer hover:bg-red-500"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={(e) => {
                e.currentTarget.style.transform = `scale(${Math.random() * 3}) rotate(${Math.random() * 360}deg)`;
              }}
            >
              CORN {i + 1}
            </div>
          ))}
        </div>

        <div className="bg-white/80 p-4 border-8 border-double border-red-500 animate-rainbow w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-3xl font-black text-black">
            CONSUME THE COB! CONSUME THE COB! CONSUME THE COB! CONSUME THE COB! CONSUME THE COB!
          </div>
        </div>

        <button className="mt-8 bg-green-600 text-yellow-300 text-4xl font-black py-6 px-12 rounded-full border-8 border-yellow-400 animate-bounce hover:scale-125 transition-transform">
          WORSHIP CORN
        </button>
      </div>
    </div>
  );
}
