import React from 'react';

const products = [
  { name: "Rust-Bucket Distortion Pedal", price: "$666.66", desc: "Adds 100% more rust to your tone.", image: "/blues-metal-guitar.png" },
  { name: "Plasma Slide", price: "$42.00", desc: "Burns your finger off, sounds great.", image: "/blues-metal-guitar.png" },
  { name: "Fridge-Cooled Amp", price: "$9,999", desc: "Keep your blues cold, your metal hot.", image: "/fridge-person.png" },
  { name: "Corn-Cob Pick", price: "$0.99", desc: "Breaks immediately. Buy 100.", image: "/corn-fractal.png" }
];

export function BluesMetalShop() {
  return (
    <div className="bg-blue-900 border-[20px] border-x-red-600 border-y-black p-8">
      <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-400 to-red-600 mb-8 text-center uppercase animate-pulse-fast tracking-widest">
        Blues Metal Emporium
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p, i) => (
          <div key={i} className="bg-black border-4 border-blue-500 p-4 transform hover:rotate-6 hover:scale-110 transition-all duration-300 group">
            <div className="h-48 overflow-hidden border-2 border-red-500 mb-4 relative">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover animate-spin-reverse group-hover:animate-spin-fast" style={{ animationDuration: `${(i+1)*2}s` }} />
              <div className="absolute inset-0 bg-blue-500/30 mix-blend-color"></div>
            </div>
            <h3 className="text-2xl font-bold text-blue-300 mb-2 font-serif italic">{p.name}</h3>
            <p className="text-red-400 mb-4 font-mono text-sm">{p.desc}</p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-black text-yellow-400 animate-blink">{p.price}</span>
              <button className="bg-red-700 text-white font-black py-2 px-4 border-b-4 border-red-900 active:border-0 hover:bg-red-600">
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 p-6 border-l-8 border-blue-500 animate-shake flex justify-between items-center">
        <div className="text-white text-xl font-mono">
          CURRENTLY PLAYING: <span className="text-red-500 font-bold animate-pulse">"FROZEN CORN BLUES IN E MINOR"</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-black font-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white">▶</button>
          <button className="bg-white text-black font-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white">⏸</button>
        </div>
      </div>
    </div>
  );
}
