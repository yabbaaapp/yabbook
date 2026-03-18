import Image from 'next/image';

interface ChatItemProps {
  id: string;
  type: 'group' | 'direct';
  title: string;
  time: string;
  lastMessage: string;
  avatars: string[];
  unreadCount?: number;
  isTyping?: boolean;
  isMuted?: boolean;
  statusIcon?: {
    icon: string;
    colorClass: string;
  };
  highlightPrefix?: {
    text: string;
    colorClass: string;
  };
  customIcon?: {
    icon: string;
    bgColorClass: string;
  };
}

export default function ChatItem({
  type,
  title,
  time,
  lastMessage,
  avatars,
  unreadCount,
  isTyping,
  isMuted,
  statusIcon,
  highlightPrefix,
  customIcon,
}: ChatItemProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-800/30 transition cursor-pointer relative ${isMuted ? 'opacity-75' : ''}`}>
      
      {/* Avatar Section */}
      {customIcon ? (
        <div className={`w-14 h-14 rounded-2xl overflow-hidden ${customIcon.bgColorClass} flex-shrink-0 relative flex items-center justify-center border border-slate-700`}>
          <i className={`${customIcon.icon} text-2xl text-slate-400`}></i>
        </div>
      ) : type === 'group' ? (
        <div className="w-14 h-14 rounded-2xl overflow-hidden grid grid-cols-2 gap-[2px] bg-slate-800 flex-shrink-0">
          {avatars.slice(0, 3).map((avatar, i) => (
            <Image key={i} src={avatar} alt="Group member" width={28} height={28} className="w-full h-full object-cover" />
          ))}
          {avatars.length > 3 ? (
            <div className="w-full h-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              +{avatars.length - 3}
            </div>
          ) : avatars.length === 4 ? (
            <Image src={avatars[3]} alt="Group member" width={28} height={28} className="w-full h-full object-cover" />
          ) : null}
        </div>
      ) : (
        <div className="relative flex-shrink-0">
          <Image src={avatars[0]} alt={title} width={56} height={56} className="w-14 h-14 rounded-full object-cover border border-slate-700" />
          {isTyping && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0B0F19] rounded-full"></div>
          )}
        </div>
      )}
      
      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className={`font-semibold text-base truncate flex items-center gap-1 ${unreadCount ? 'text-white' : 'text-slate-200'} ${isMuted ? 'text-slate-300' : ''}`}>
            {title}
            {type === 'group' && !customIcon && <i className="fa-solid fa-user-group text-[10px] text-slate-500 ml-1"></i>}
            {isMuted && <i className="fa-solid fa-bell-slash text-[10px] text-slate-600 ml-1"></i>}
          </h4>
          <span className={`text-xs font-medium ${unreadCount ? 'text-sky-400' : 'text-slate-500'} ${isMuted ? 'text-slate-600' : ''}`}>
            {time}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 min-w-0">
             {statusIcon && <i className={`${statusIcon.icon} text-xs ${statusIcon.colorClass}`}></i>}
             {isTyping ? (
               <p className="text-sm text-emerald-400 font-medium italic truncate">typing...</p>
             ) : (
               <p className={`text-sm truncate ${unreadCount ? 'text-slate-300 font-medium' : 'text-slate-400'} ${isMuted ? 'text-slate-500' : ''}`}>
                 {highlightPrefix && <span className={highlightPrefix.colorClass}>{highlightPrefix.text} </span>}
                 {lastMessage}
               </p>
             )}
          </div>
          
          {unreadCount ? (
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ml-2 flex-shrink-0 ${isMuted ? 'bg-slate-700 text-slate-300' : 'bg-sky-500 shadow-lg shadow-sky-500/30'}`}>
              {unreadCount}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
