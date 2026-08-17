import React, { useState } from 'react';

export function FridgeSection() {
  const [locked, setLocked] = useState(false);
  const [temp, setTemp] = useState(32);

  return (
    <div className="bg-cyan-300 border-[12px] border-pink-500 p-6 shadow-[20px_20px_0px_#000]">
      <h2 className="text-5xl font-extrabold text-red-600 mb-6 drop-shadow-[4px_4px_0px_#fff] animate-blink">
        FRIDGE LOCKER 3000
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 border-8 border-black bg-gray-200 overflow-hidden group">
          <img 
            src="/fridge-person.png" 
            alt="Person in fridge" 
            className={`w-full h-full object-cover transition-all duration-1000 ${locked ? 'scale-150 blur-sm' : 'scale-100 group-hover:rotate-180'}`}
          />
          {locked && (
            <div className="absolute inset-0 bg-blue-900/50 flex items-center justify-center animate-shake">
              <span className="text-6xl text-white font-black rotate-[-15deg] bg-red-600 p-4 border-4 border-yellow-400">
                LOCKED IN FOREVER!
              </span>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <button 
            onClick={() => setLocked(!locked)}
            className="w-full py-8 text-4xl font-black uppercase bg-yellow-400 border-8 border-red-600 hover:bg-red-600 hover:text-yellow-400 transition-colors animate-pulse"
          >
            {locked ? 'UNLOCK (IMPOSSIBLE)' : 'LOCK ME IN!'}
          </button>

          <div className="bg-black text-green-500 p-4 border-4 border-green-500 font-mono text-2xl">
            <p>INTERNAL TEMP: {temp}°F</p>
            <input 
              type="range" 
              min="-100" 
              max="100" 
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full mt-2 accent-pink-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {['FREEZE', 'THAW', 'CRUSH', 'CRY'].map(action => (
              <button 
                key={action}
                className="bg-purple-600 text-white font-bold py-4 border-b-4 border-purple-900 active:border-b-0 active:mt-4 hover:bg-purple-500 animate-shake"
                style={{ animationDelay: `${Math.random()}s` }}
                onClick={() => alert(`INITIATING ${action} PROTOCOL... ERROR: TOO MUCH CORN`)}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
