'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, QrCode, Check, Share2 } from 'lucide-react';

export default function ReceiveScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x7a3F8b2Ed1A5c7B9eF3d4C9e2Fd';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center gap-3 px-5 py-4 border-b border-[#1E293B]">
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 rounded-full bg-[#1E293B]/50 flex items-center justify-center hover:bg-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#CBD5E1]" />
        </button>
        <h1 className="text-xl font-bold text-[#F8FAFC]">Token Al</h1>
      </div>

      <div className="w-full max-w-md flex flex-col items-center px-4 pt-8 pb-10">
        <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4">
          <QrCode className="w-7 h-7 text-[#34D399]" />
        </div>
        
        <h2 className="text-lg font-semibold text-white mb-1">QR Kodunu Paylaş</h2>
        <p className="text-[13px] text-[#94A3B8] text-center max-w-[280px] mb-8 leading-5">
          Diğer kullanıcılar bu QR kodu tarayarak sana token gönderebilir.
        </p>

        {/* Dummy QR placeholder */}
        <div className="bg-white p-4 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
          <QrCode className="w-48 h-48 text-[#1E1B4B]" />
        </div>

        {/* Address Card */}
        <div className="w-full bg-[#1E293B] border border-[#334155]/40 rounded-2xl p-4 mb-5">
          <p className="text-[11px] text-[#94A3B8] mb-2 uppercase tracking-wide">Cüzdan Adresi</p>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-white font-mono break-all pr-2">
              0x7a3F8b2E...d4C9e2Fd
            </span>
            <button 
              onClick={handleCopy} 
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                copied ? 'bg-[#10B981]/20' : 'bg-[#334155] hover:bg-[#475569]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span className="text-[11px] font-semibold text-[#34D399]">Kopyalandı</span>
                </>
              ) : (
                <span className="text-[11px] font-semibold text-[#CBD5E1]">Kopyala</span>
              )}
            </button>
          </div>
        </div>

        {/* Share Button */}
        <button className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 mt-2 bg-[#10B981] hover:bg-[#059669] transition-colors text-white text-sm font-bold shadow-lg shadow-[#10B981]/20">
          <Share2 className="w-4 h-4" />
          Adresi Paylaş
        </button>
      </div>
    </div>
  );
}
