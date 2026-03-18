import Header from '@/components/layout/Header';
import Image from 'next/image';

export default function Spaces() {
  const spaces = [
    { id: 1, name: 'Frontend Devs', members: '12.4k', icon: 'fa-code' },
    { id: 2, name: 'Design System', members: '8.2k', icon: 'fa-pen-nib' },
    { id: 3, name: 'Crypto Alpha', members: '45.1k', icon: 'fa-bitcoin', solid: false, brand: true },
  ];

  return (
    <>
      <Header title="Spaces" showSearch={true} showAdd={true} />
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 py-6">
         {/* Featured Space */}
         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 mb-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
           <div className="absolute -right-4 -bottom-4 opacity-10">
             <i className="fa-solid fa-rocket text-8xl"></i>
           </div>
           <h3 className="font-bold text-xl mb-1 relative z-10">Web3 Builders</h3>
           <p className="text-sm text-indigo-100 mb-4 relative z-10">Join the discussion on the future of decentralization.</p>
           <button className="bg-white text-indigo-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm relative z-10">
             Join Space
           </button>
         </div>

         <h3 className="text-base font-semibold text-slate-300 mb-3 px-1">Discover</h3>
         <div className="flex flex-col gap-3">
           {spaces.map(space => (
             <div key={space.id} className="flex items-center gap-4 bg-slate-800/40 p-3 rounded-xl hover:bg-slate-800/60 transition cursor-pointer border border-slate-700/50">
               <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-sky-400">
                 <i className={`${space.brand ? 'fa-brands' : (space.solid === false ? 'fa-regular' : 'fa-solid')} ${space.icon} text-xl`}></i>
               </div>
               <div className="flex-1">
                 <h4 className="font-semibold text-slate-200">{space.name}</h4>
                 <p className="text-xs text-slate-400">{space.members} members</p>
               </div>
               <button className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition">
                 <i className="fa-solid fa-plus text-xs"></i>
               </button>
             </div>
           ))}
         </div>
      </main>
    </>
  );
}
