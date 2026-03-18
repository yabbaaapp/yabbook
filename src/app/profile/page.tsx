'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Bell, Palette, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import { supabase } from '@/utils/supabase';

interface UserProfile {
  name: string;
  username: string;
  avatar_url: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('users')
        .select('name, username, avatar_url')
        .eq('id', user.id)
        .single();
        
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    }
    
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  const menuItems = [
    { name: 'Hesap detayları', icon: User },
    { name: 'Bildirimler', icon: Bell },
    { name: 'Görünüm', icon: Palette },
    { name: 'Gizlilik & Güvenlik', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="px-4 pt-10 pb-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
            <i className="fa-solid fa-pencil text-sm text-slate-300"></i>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
            <i className="fa-solid fa-ellipsis-vertical text-lg text-slate-300"></i>
          </button>
        </div>
      </header>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pt-24 pb-10 px-4">
        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="w-8 h-8 border-4 border-[#38BDF8]/30 border-t-[#38BDF8] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-2xl relative">
                <Image 
                  src={profile?.avatar_url || 'https://i.pravatar.cc/150?u=myprofile'} 
                  alt="Avatar" 
                  width={112} 
                  height={112} 
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <h2 className="text-xl font-bold mb-1 uppercase tracking-wider">{profile?.name || 'YABBAA YABBOOK'}</h2>
              <span className="text-[13px] text-slate-400 font-medium">online</span>
            </div>

            {/* Info Section */}
            <div className="bg-[#17212B] rounded-2xl overflow-hidden mb-6 border border-white/5 shadow-lg">
              <div className="px-5 py-3.5 border-b border-white/5">
                <h3 className="text-[13.5px] font-bold text-[#38BDF8] uppercase tracking-widest">Bilgi</h3>
              </div>
              
              <div className="flex flex-col">
                <InfoItem 
                  label="+90 (505) 973 90 41" 
                  subLabel="Mobil" 
                />
                <div className="h-[1px] bg-white/5 mx-5" />
                <InfoItem 
                  label={profile?.username || '@YabbaaToken'} 
                  subLabel="Kullanıcı adı" 
                  icon={<i className="fa-solid fa-qrcode text-slate-400 text-lg"></i>}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 mb-6">
              <button className="flex-1 py-3.5 text-sm font-bold text-[#38BDF8] border-b-2 border-[#38BDF8]">
                Gönderiler
              </button>
              <button className="flex-1 py-3.5 text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors">
                Arşivlenmiş
              </button>
            </div>

            {/* Posts Placeholder */}
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-[#94A3B8] text-[15px] font-medium mb-6">Henüz gönderi yok...</p>
              
              <button className="w-full max-w-[280px] bg-[#38BDF8] hover:bg-[#0EA5E9] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-lg shadow-sky-500/20">
                <i className="fa-solid fa-camera-retro text-lg"></i>
                Bir gönderi ekle
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, subLabel, icon }: { label: string, subLabel: string, icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer">
      <div className="flex flex-col">
        <span className="text-[15.5px] font-medium text-white">{label}</span>
        <span className="text-xs text-[#94A3B8] mt-0.5">{subLabel}</span>
      </div>
      {icon && <div>{icon}</div>}
    </div>
  );
}
