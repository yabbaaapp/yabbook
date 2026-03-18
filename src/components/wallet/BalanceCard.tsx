'use client';

import { useState } from 'react';

export default function BalanceCard() {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 shadow-2xl shadow-purple-500/25">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-white/70 font-medium mb-1">Toplam Bakiye</p>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                {isHidden ? '••••••' : '12,450.00'}
              </h2>
              <span className="text-lg font-semibold text-white/80">SCT</span>
            </div>
            <p className="text-sm text-emerald-300 font-medium mt-1">
              <i className="fa-solid fa-arrow-trend-up text-xs mr-1"></i>
              +5.2% bugün
            </p>
          </div>
          <button
            onClick={() => setIsHidden(!isHidden)}
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition"
          >
            <i className={`fa-solid ${isHidden ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 w-fit">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <span className="text-xs text-white/80 font-medium tracking-wide">0x7a3F...9C2d</span>
          <button className="text-white/50 hover:text-white transition ml-1">
            <i className="fa-regular fa-copy text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
