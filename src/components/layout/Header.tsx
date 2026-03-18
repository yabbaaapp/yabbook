import Image from 'next/image';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showAdd?: boolean;
  onAddPress?: () => void;
}

export default function Header({ title = 'Chats', showSearch = true, showAdd = true, onAddPress }: HeaderProps) {
  return (
    <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image 
            src="https://i.pravatar.cc/150?u=myprofile" 
            alt="Profile" 
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#1E293B]"
            unoptimized
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0B0F19] rounded-full"></div>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#F8FAFC]">{title}</h1>
      </div>
      <div className="flex items-center gap-3 text-slate-300">
        {showSearch && (
          <button className="w-9 h-9 rounded-full bg-[#1E293B]/60 flex items-center justify-center hover:bg-[#1E293B] transition shadow-inner">
            <i className="fa-solid fa-magnifying-glass text-xs text-[#CBD5E1]"></i>
          </button>
        )}
        {showAdd && (
          <button 
            onClick={onAddPress}
            className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center text-white shadow-lg shadow-[#6366F1]/20 hover:bg-[#4F46E5] transition"
          >
            <i className="fa-solid fa-plus text-sm"></i>
          </button>
        )}
      </div>
    </header>
  );
}
