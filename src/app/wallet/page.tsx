'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ChevronDown, 
  MoreVertical, 
  Fingerprint, 
  Globe, 
  CircleDollarSign, 
  BadgeCheck,
  CreditCard,
  Crown,
  MessageCircle,
  HelpCircle,
  Lightbulb,
  ChevronRight
} from 'lucide-react';

export default function WalletSettings() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 flex items-center justify-between bg-[#0B0F19] border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="text-slate-300">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Wallet</h1>
            <BadgeCheck className="w-5 h-5 text-sky-400 fill-sky-400/10" />
            <ChevronDown className="w-5 h-5 text-slate-500 ml-1" />
          </div>
        </div>
        <button className="text-slate-300">
          <MoreVertical className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Basic Settings */}
        <div className="mt-4 mb-6">
          <ListItem 
            icon={<Fingerprint className="w-6 h-6 text-slate-400" />} 
            label="Passcode & Fingerprint" 
            status="On" 
          />
          <ListItem 
            icon={<Globe className="w-6 h-6 text-slate-400" />} 
            label="Language" 
            status="English" 
          />
          <ListItem 
            icon={<CircleDollarSign className="w-6 h-6 text-slate-400" />} 
            label="Default Currency" 
            status="TRY" 
          />
        </div>

        {/* Crypto Section */}
        <div className="px-5 mb-4 mt-6">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-bold text-white bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">Crypto</span>
            <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">TON</span>
            <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[10px] font-bold">!</div>
          </div>
        </div>

        <div className="mb-6">
          <ListItem 
            icon={<CreditCard className="w-6 h-6 text-indigo-400" />} 
            label="Identification Level" 
            status="Basic" 
          />
          <ListItem 
            icon={<Crown className="w-6 h-6 text-emerald-400" />} 
            label="Tiers" 
            status="Base" 
          />
          <p className="px-5 py-3 text-[13px] text-slate-500 leading-relaxed font-medium">
            Identification is not applicable to TON Wallet account.
          </p>
        </div>

        {/* Support Section */}
        <div className="mb-8">
          <ListItem 
            icon={<div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white"><MessageCircle className="w-5 h-5" /></div>} 
            label="Contact Support" 
          />
          <ListItem 
            icon={<div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white"><HelpCircle className="w-5 h-5" /></div>} 
            label="Crypto Wallet FAQ" 
          />
          <ListItem 
            icon={<div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-white"><Lightbulb className="w-5 h-5" /></div>} 
            label="Crypto Wallet News" 
          />
        </div>

        {/* Legal Links */}
        <div className="px-5 space-y-4 mb-10">
          <button className="block text-[15px] font-medium text-slate-300 hover:text-white transition-colors">User Agreement</button>
          <div className="h-[1px] bg-white/5" />
          <button className="block text-[15px] font-medium text-slate-300 hover:text-white transition-colors">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}

function ListItem({ icon, label, status }: { icon: React.ReactNode, label: string, status?: string }) {
  return (
    <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors active:bg-white/10">
      <div className="flex items-center gap-5">
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[15.5px] font-medium text-white">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {status && <span className="text-[15px] font-medium text-sky-400">{status}</span>}
        {!status && <ChevronRight className="w-4 h-4 text-slate-600" />}
      </div>
    </button>
  );
}
