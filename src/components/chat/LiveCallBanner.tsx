import Image from 'next/image';

export default function LiveCallBanner() {
  return (
    <section className="px-4 mt-4 mb-2">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-4 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-[pulse-ring_2s_infinite]"></div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Live Audio</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            <i className="fa-solid fa-headphones text-[10px] mr-1"></i> 128 listening
          </span>
        </div>
        
        <h3 className="font-bold text-lg mb-1 text-white">Design System Sync 🎨</h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-1">Discussing the new component library updates.</p>
        
        <div className="flex justify-between items-center relative z-10">
          {/* Overlapping Avatars */}
          <div className="flex -space-x-3">
            <Image src="https://i.pravatar.cc/150?u=speaker1" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-slate-800 relative z-30" alt="Speaker" />
            <Image src="https://i.pravatar.cc/150?u=speaker2" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-slate-800 relative z-20" alt="Speaker" />
            <Image src="https://i.pravatar.cc/150?u=speaker3" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-slate-800 relative z-10" alt="Speaker" />
            <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[10px] font-bold relative z-0 text-white">+5</div>
          </div>
          
          <button className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-slate-200 transition active:scale-95">
            Join Call
          </button>
        </div>
      </div>
    </section>
  );
}
