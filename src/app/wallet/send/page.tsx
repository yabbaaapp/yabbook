'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const CONTACTS = [
  { id: '1', name: 'Sarah Jenkins', username: '@sarahj', avatar: 'https://i.pravatar.cc/100?u=sarah' },
  { id: '2', name: 'Mike Ross', username: '@mikeross', avatar: 'https://i.pravatar.cc/100?u=mike' },
  { id: '3', name: 'Elena Gilbert', username: '@elenag', avatar: 'https://i.pravatar.cc/100?u=elena' },
  { id: '4', name: 'Alex Chen', username: '@alexc', avatar: 'https://i.pravatar.cc/100?u=speaker1' },
];

export default function SendScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'select' | 'amount' | 'confirm'>('select');
  const [selectedContact, setSelectedContact] = useState<typeof CONTACTS[0] | null>(null);
  const [amount, setAmount] = useState('');

  const handleSend = async () => {
    alert(`✅ Başarılı: ${amount} SCT ${selectedContact?.name} adresine gönderildi!`);
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center gap-3 px-5 py-4 border-b border-[#1E293B]">
        <button 
          onClick={() => step === 'select' ? router.back() : setStep(step === 'confirm' ? 'amount' : 'select')} 
          className="w-10 h-10 rounded-full bg-[#1E293B]/50 flex items-center justify-center hover:bg-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#CBD5E1]" />
        </button>
        <h1 className="text-xl font-bold text-[#F8FAFC]">Token Gönder</h1>
      </div>

      {/* Step Indicator */}
      <div className="w-full max-w-md flex justify-between px-5 py-4 mb-2">
        {['Kişi Seç', 'Miktar', 'Onayla'].map((label, i) => {
          const stepIndex = ['select', 'amount', 'confirm'].indexOf(step);
          const isActive = i <= stepIndex;
          return (
            <div key={label} className="flex-1 flex flex-col items-center gap-2">
              <div className={`h-1 w-full rounded-full ${isActive ? 'bg-[#0EA5E9]' : 'bg-[#1E293B]'}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-[#38BDF8]' : 'text-[#475569]'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md px-4 pb-10 flex-1 flex flex-col">
        {step === 'select' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center bg-[#1E293B]/50 border border-[#334155]/40 rounded-xl px-3 py-3">
              <Search className="w-5 h-5 text-[#64748B]" />
              <input 
                type="text" 
                placeholder="Kullanıcı adı veya isim ara..." 
                className="bg-transparent text-white placeholder-[#64748B] text-sm outline-none px-3 w-full"
              />
            </div>

            <h3 className="text-[13px] font-semibold text-[#64748B] pl-1 mt-2 mb-2">Son Kişiler</h3>
            
            <div className="flex flex-col gap-2">
              {CONTACTS.map((c) => (
                <button 
                  key={c.id} 
                  onClick={() => { setSelectedContact(c); setStep('amount'); }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1E293B]/40 transition-colors text-left"
                >
                  <Image src={c.avatar} alt={c.name} width={44} height={44} className="rounded-full border border-[#334155]" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{c.name}</span>
                    <span className="text-xs text-[#64748B]">{c.username}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'amount' && selectedContact && (
          <div className="flex flex-col items-center pt-4">
            <Image src={selectedContact.avatar} alt={selectedContact.name} width={64} height={64} className="rounded-full border-2 border-[#334155] mb-2" />
            <h2 className="text-lg font-semibold text-white mb-1">{selectedContact.name}</h2>
            <p className="text-[13px] text-[#64748B] mb-8">{selectedContact.username}</p>

            <div className="bg-[#1E293B]/30 border border-[#334155]/40 rounded-2xl w-full max-w-[280px] p-6 mb-6 flex flex-col items-center">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent text-center text-5xl font-bold text-white outline-none placeholder-[#334155]"
              />
              <span className="text-[13px] text-[#64748B] mt-2">SCT</span>
            </div>

            <div className="flex gap-2 mb-8 flex-wrap justify-center">
              {[100, 500, 1000, 5000].map((v) => (
                <button 
                  key={v} 
                  onClick={() => setAmount(v.toString())}
                  className="px-4 py-2 rounded-full bg-[#1E293B] border border-[#334155]/40 text-[#CBD5E1] text-[13px] font-medium hover:bg-[#334155] transition-colors"
                >
                  {v}
                </button>
              ))}
            </div>

            <button 
              onClick={() => amount && parseFloat(amount) > 0 && setStep('confirm')}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full max-w-[280px] py-3.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] disabled:opacity-40 transition-colors text-white font-bold text-sm"
            >
              Devam
            </button>
          </div>
        )}

        {step === 'confirm' && selectedContact && (
          <div className="flex flex-col items-center pt-4 w-full">
            <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center mb-5">
              <Send className="w-8 h-8 text-[#38BDF8] ml-1" />
            </div>
            
            <h2 className="text-lg font-semibold text-white mb-6">Transfer Onayı</h2>

            <div className="w-full bg-[#1E293B]/30 border border-[#334155]/40 rounded-2xl p-5 mb-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#94A3B8]">Alıcı</span>
                <span className="text-[13px] font-medium text-white">{selectedContact.name}</span>
              </div>
              <div className="h-[1px] bg-[#334155]/30 w-full" />
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#94A3B8]">Miktar</span>
                <span className="text-lg font-bold text-white">{amount} SCT</span>
              </div>
              <div className="h-[1px] bg-[#334155]/30 w-full" />
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#94A3B8]">İşlem Ücreti</span>
                <span className="text-[13px] font-medium text-white">0.50 SCT</span>
              </div>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <button 
                onClick={() => setStep('amount')}
                className="flex-1 py-3.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] transition-colors text-[#CBD5E1] font-bold text-sm"
              >
                Geri
              </button>
              <button 
                onClick={handleSend}
                className="flex-1 py-3.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] transition-colors text-white font-bold text-sm shadow-lg shadow-[#0EA5E9]/20"
              >
                Gönder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
