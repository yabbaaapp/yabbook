'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Store, CheckCircle } from 'lucide-react';

const MOCK_MERCHANTS = [
  { merchant: 'Market A101', amount: '89.90', category: 'Market' },
  { merchant: 'Starbucks', amount: '45.00', category: 'Kafe' },
  { merchant: 'Migros', amount: '234.50', category: 'Market' },
];

export default function PayScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'scan' | 'confirm' | 'success'>('scan');
  const [paymentInfo, setPaymentInfo] = useState<typeof MOCK_MERCHANTS[0] | null>(null);

  const simulateScan = () => {
    const random = MOCK_MERCHANTS[Math.floor(Math.random() * MOCK_MERCHANTS.length)];
    setPaymentInfo(random);
    setStep('confirm');
  };

  const handleReset = () => {
    setStep('scan');
    setPaymentInfo(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center gap-3 px-5 py-4 border-b border-[#1E293B]">
        <button 
          onClick={() => step === 'scan' ? router.back() : handleReset()} 
          className="w-10 h-10 rounded-full bg-[#1E293B]/50 flex items-center justify-center hover:bg-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#CBD5E1]" />
        </button>
        <h1 className="text-xl font-bold text-[#F8FAFC]">QR ile Öde</h1>
      </div>

      <div className="w-full max-w-md px-4 flex flex-col flex-1 items-center pb-10">
        {step === 'scan' && (
          <>
            {/* Camera View Placeholder for Web */}
            <div className="w-full aspect-square max-w-[300px] rounded-3xl bg-[#0F172A] border-2 border-[#334155]/40 flex flex-col items-center justify-center mt-8 mb-6 relative overflow-hidden">
              <div className="w-[192px] h-[192px] border-2 border-[#F59E0B]/50 rounded-2xl flex items-center justify-center relative">
                {/* Corner Accents */}
                <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-4 border-l-4 border-[#F59E0B] rounded-tl-lg" />
                <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-4 border-r-4 border-[#F59E0B] rounded-tr-lg" />
                <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-4 border-l-4 border-[#F59E0B] rounded-bl-lg" />
                <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-4 border-r-4 border-[#F59E0B] rounded-br-lg" />
                
                <Camera className="w-12 h-12 text-[#334155]" />
              </div>
              <span className="absolute bottom-4 text-[11px] text-[#64748B] font-medium bg-black/50 px-3 py-1.5 rounded-lg">
                Web'de kamera simüle edilir
              </span>
            </div>

            <button 
              onClick={simulateScan} 
              className="w-full max-w-[300px] py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] transition-colors text-white text-sm font-bold shadow-lg shadow-[#F59E0B]/20"
            >
              Taramayı Simüle Et
            </button>
            <p className="text-[11px] text-[#475569] text-center mt-3 max-w-[260px]">
              Web sürümünde QR taraması simülasyon ile çalışır. Telefondan girildiğinde gerçek kamera kullanılır.
            </p>
          </>
        )}

        {step === 'confirm' && paymentInfo && (
          <div className="flex flex-col items-center pt-8 w-full">
            <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mb-5">
              <Store className="w-7 h-7 text-[#FBBF24]" />
            </div>
            
            <h2 className="text-lg font-semibold text-white mb-2">Ödeme Onayı</h2>
            <p className="text-[13px] text-[#94A3B8] mb-8">Aşağıdaki ödemeyi onaylıyor musunuz?</p>

            <div className="w-full bg-[#1E293B]/30 border border-[#334155]/40 rounded-2xl p-5 mb-8 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#94A3B8]">Mağaza</span>
                <span className="text-[13px] font-medium text-white">{paymentInfo.merchant}</span>
              </div>
              <div className="h-[1px] bg-[#334155]/30 w-full" />
              
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#94A3B8]">Kategori</span>
                <span className="text-[11px] font-medium text-[#FBBF24] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full">
                  {paymentInfo.category}
                </span>
              </div>
              <div className="h-[1px] bg-[#334155]/30 w-full" />

              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#94A3B8]">Tutar</span>
                <span className="text-[22px] font-bold text-white">{paymentInfo.amount} SCT</span>
              </div>
              <div className="h-[1px] bg-[#334155]/30 w-full" />

              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#94A3B8]">İşlem Ücreti</span>
                <span className="text-[13px] font-medium text-white">0.25 SCT</span>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] transition-colors text-[#CBD5E1] font-bold text-sm"
              >
                İptal
              </button>
              <button 
                onClick={() => setStep('success')}
                className="flex-1 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] transition-colors text-white font-bold text-sm shadow-lg shadow-[#F59E0B]/20"
              >
                Öde
              </button>
            </div>
          </div>
        )}

        {step === 'success' && paymentInfo && (
          <div className="flex flex-col items-center pt-14 w-full">
            <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-[#34D399]" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Ödeme Başarılı!</h2>
            <p className="text-[13px] text-[#94A3B8] mb-3">{paymentInfo.merchant}</p>
            <span className="text-[32px] font-bold text-[#34D399] mb-10">{paymentInfo.amount} SCT</span>

            <button 
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] transition-colors text-white font-bold text-sm mb-4"
            >
              Yeni Ödeme Yap
            </button>
            <button 
              onClick={() => router.back()}
              className="text-[13px] font-medium text-[#38BDF8] hover:underline"
            >
              Cüzdana Dön
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
