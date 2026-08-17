import React, { useState } from 'react';

export function ChaoticOptions() {
  const [checkboxes, setCheckboxes] = useState(Array(50).fill(false));
  const [radio, setRadio] = useState(0);
  
  const toggleCheckbox = (index: number) => {
    const newCb = [...checkboxes];
    // Randomly toggle other checkboxes too for chaos
    newCb[index] = !newCb[index];
    if (Math.random() > 0.5) {
      const randIdx = Math.floor(Math.random() * 50);
      newCb[randIdx] = !newCb[randIdx];
    }
    setCheckboxes(newCb);
  };

  return (
    <div className="text-white">
      <h2 className="text-5xl font-black text-center mb-8 text-pink-500 uppercase tracking-widest animate-bounce">
        Options You Don't Need
      </h2>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 bg-green-900 border-8 border-pink-500 p-4">
          <h3 className="text-3xl font-bold mb-4 text-yellow-300">Select Everything:</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {checkboxes.map((checked, i) => (
              <input 
                key={i}
                type="checkbox" 
                checked={checked}
                onChange={() => toggleCheckbox(i)}
                className="w-6 h-6 accent-pink-500 cursor-help"
                style={{ transform: `rotate(${Math.random() * 360}deg)` }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 bg-purple-900 border-8 border-yellow-500 p-4 flex flex-col items-center justify-center">
          <h3 className="text-3xl font-bold mb-4 text-cyan-300">Choose One (Or None):</h3>
          <div className="flex flex-col gap-4 w-full">
            {['I am a fridge', 'I am corn', 'I am blues metal', 'I am nothing'].map((opt, i) => (
              <label 
                key={i} 
                className={`flex items-center gap-4 p-4 text-xl font-black cursor-crosshair border-4 transition-all ${radio === i ? 'bg-red-600 border-white scale-110' : 'bg-black border-gray-600 hover:bg-gray-800'}`}
                onMouseEnter={() => {
                  if (Math.random() > 0.7) setRadio(i); // Randomly select on hover sometimes
                }}
              >
                <input 
                  type="radio" 
                  name="identity" 
                  checked={radio === i}
                  onChange={() => setRadio(i)}
                  className="w-8 h-8 accent-red-600"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <select 
          className="bg-red-500 text-yellow-300 text-4xl font-black p-4 border-8 border-blue-500 outline-none animate-shake appearance-none text-center"
          onChange={(e) => alert(`YOU SELECTED: ${e.target.value}. THIS CHANGES NOTHING.`)}
        >
          <option>CHOOSE YOUR DOOM</option>
          <option>FREEZER BURN</option>
          <option>CORN SYRUP OVERDOSE</option>
          <option>TETANUS FROM RUSTY STRINGS</option>
          <option>ALL OF THE ABOVE</option>
        </select>
      </div>
    </div>
  );
}
