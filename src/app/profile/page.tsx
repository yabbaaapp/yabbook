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
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center px-5 py-5">
        <h1 className="text-[22px] font-bold text-[#F8FAFC]">Profil</h1>
      </div>

      <div className="w-full max-w-md px-5 flex flex-col pb-20">
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-8 h-8 border-4 border-[#38BDF8]/30 border-t-[#38BDF8] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col items-center mt-2 mb-7">
            <div className="w-24 h-24 rounded-full border-[3px] border-[#6366F1] p-1 mb-4 flex items-center justify-center">
              <Image 
                src={profile?.avatar_url || 'https://i.pravatar.cc/150?u=default'} 
                alt="Profile Avatar" 
                width={88} 
                height={88} 
                className="rounded-full w-full h-full object-cover"
                unoptimized
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{profile?.name || 'Kullanıcı'}</h2>
            <p className="text-[13px] font-medium text-[#38BDF8] mb-2.5">
              {profile?.username || '@kullanici'}
            </p>
            <p className="text-[13px] text-[#94A3B8] text-center max-w-[280px]">
              Yabbok Web kullanıcısı. Kripto işlemlerine ve sohbetlere hazır.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="flex justify-center gap-9 mb-7 pb-7 border-b border-[#1E293B]/50">
          {[
            { value: '1.2k', label: 'Takipçi' }, 
            { value: '845', label: 'Takip' }, 
            { value: '14', label: 'Odalar' }
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-xl font-bold text-white mb-0.5">{stat.value}</span>
              <span className="text-[11px] text-[#64748B]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              className="flex items-center justify-between p-4 bg-[#1E293B]/20 hover:bg-[#1E293B]/40 transition-colors rounded-2xl"
            >
              <div className="flex items-center gap-3.5">
                <item.icon className="w-[18px] h-[18px] text-[#CBD5E1]" />
                <span className="font-medium text-[15px] text-[#CBD5E1]">{item.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#475569]" />
            </button>
          ))}
        </div>

        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3.5 p-4 bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 transition-colors rounded-2xl mt-4 mb-10"
        >
          <LogOut className="w-[18px] h-[18px] text-[#F43F5E]" />
          <span className="font-medium text-[15px] text-[#F43F5E]">Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
}
