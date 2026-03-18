interface TransactionItemProps {
  type: 'send' | 'receive' | 'payment';
  title: string;
  subtitle: string;
  amount: string;
  time: string;
  positive?: boolean;
}

export default function TransactionItem({ type, title, subtitle, amount, time, positive }: TransactionItemProps) {
  const iconMap = {
    send: { icon: 'fa-arrow-up-right', bg: 'bg-rose-500/10', color: 'text-rose-400' },
    receive: { icon: 'fa-arrow-down-left', bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
    payment: { icon: 'fa-store', bg: 'bg-amber-500/10', color: 'text-amber-400' },
  };

  const config = iconMap[type];

  return (
    <div className="flex items-center gap-3 py-3 px-1 hover:bg-slate-800/20 rounded-xl transition cursor-pointer">
      <div className={`w-11 h-11 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <i className={`fa-solid ${config.icon} ${config.color}`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
        <p className="text-xs text-slate-400 truncate">{subtitle}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-bold ${positive ? 'text-emerald-400' : 'text-white'}`}>
          {positive ? '+' : '-'}{amount} SCT
        </p>
        <p className="text-[10px] text-slate-500">{time}</p>
      </div>
    </div>
  );
}
