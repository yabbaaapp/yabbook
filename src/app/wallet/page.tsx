import Header from '@/components/layout/Header';
import BalanceCard from '@/components/wallet/BalanceCard';
import TransactionItem from '@/components/wallet/TransactionItem';
import Link from 'next/link';

const MOCK_TRANSACTIONS = [
  { type: 'receive' as const, title: 'Sarah Jenkins', subtitle: 'Token alımı', amount: '250', time: '10:42', positive: true },
  { type: 'payment' as const, title: 'Market A101', subtitle: 'QR ile ödeme', amount: '89.90', time: 'Dün' },
  { type: 'send' as const, title: 'Mike Ross', subtitle: 'Token gönderimi', amount: '500', time: 'Dün' },
  { type: 'receive' as const, title: 'Elena Gilbert', subtitle: 'Token alımı', amount: '1,200', time: 'Pazartesi', positive: true },
  { type: 'payment' as const, title: 'Starbucks', subtitle: 'QR ile ödeme', amount: '45.00', time: 'Pazar' },
];

export default function Wallet() {
  const quickActions = [
    { name: 'Gönder', icon: 'fa-paper-plane', href: '/wallet/send', gradient: 'from-sky-500 to-blue-600', shadow: 'shadow-sky-500/20' },
    { name: 'Al', icon: 'fa-qrcode', href: '/wallet/receive', gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20' },
    { name: 'QR Öde', icon: 'fa-camera', href: '/wallet/pay', gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20' },
  ];

  return (
    <>
      <Header title="Wallet" showAdd={false} />
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 py-4">
        {/* Balance Card */}
        <BalanceCard />

        {/* Quick Actions */}
        <div className="flex justify-center gap-5 mt-6 mb-8">
          {quickActions.map((action) => (
            <Link key={action.name} href={action.href} className="flex flex-col items-center gap-2 group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} shadow-lg ${action.shadow} flex items-center justify-center text-white text-lg group-hover:scale-105 transition-transform`}>
                <i className={`fa-solid ${action.icon}`}></i>
              </div>
              <span className="text-xs text-slate-400 font-medium group-hover:text-white transition">{action.name}</span>
            </Link>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-white">Son İşlemler</h3>
            <button className="text-xs text-sky-400 font-medium hover:text-sky-300 transition">Tümünü Gör</button>
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-3 border border-slate-700/40">
            {MOCK_TRANSACTIONS.map((tx, i) => (
              <div key={i}>
                <TransactionItem {...tx} />
                {i < MOCK_TRANSACTIONS.length - 1 && (
                  <div className="border-b border-slate-700/30 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
