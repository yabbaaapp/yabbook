'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  Wallet, 
  Users, 
  Settings, 
  HelpCircle, 
  Moon, 
  LogOut, 
  X,
  Phone,
  Bookmark
} from 'lucide-react';
import { supabase } from '@/utils/supabase';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: {
    name: string;
    username: string;
    avatar_url: string;
  };
}

export default function Sidebar({ isOpen, onClose, userProfile }: SidebarProps) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth/login';
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <div 
        className={`fixed top-0 left-[max(0px,calc(50%-195px))] w-[280px] h-full bg-[#17212B] z-[110] transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header/Profile Section */}
        <div className="bg-[#242F3D] px-6 pt-10 pb-5">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-500/20">
              <Image 
                src={userProfile?.avatar_url || 'https://i.pravatar.cc/150?u=myprofile'} 
                alt="Profile" 
                width={64} 
                height={64} 
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <button className="text-white/50 hover:text-white transition-colors">
              <Moon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-base leading-tight">
              {userProfile?.name || 'YABBAA YABBOOK'}
            </h3>
            <span className="text-[#38BDF8] text-[13px] mt-0.5">
              +90 (505) 973 90 41
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2 overflow-y-auto h-[calc(100%-180px)] no-scrollbar">
          <SidebarItem icon={User} label="Profilim" href="/profile" onClick={onClose} />
          <SidebarItem icon={Wallet} label="Cüzdan" href="/wallet/receive" onClick={onClose} />
          <div className="h-[1px] bg-black/20 my-2 mx-4" />
          <SidebarItem icon={Users} label="Yeni Grup" href="#" onClick={onClose} />
          <SidebarItem icon={User} label="Kişiler" href="#" onClick={onClose} />
          <SidebarItem icon={Phone} label="Aramalar" href="#" onClick={onClose} />
          <SidebarItem icon={Bookmark} label="Kaydedilenler" href="#" onClick={onClose} />
          <SidebarItem icon={Settings} label="Ayarlar" href="#" onClick={onClose} />
          <div className="h-[1px] bg-black/20 my-2 mx-4" />
          <SidebarItem icon={LogOut} label="Çıkış Yap" href="#" onClick={handleSignOut} isDestructive />
        </div>
      </div>
    </>
  );
}

function SidebarItem({ icon: Icon, label, href, onClick, isDestructive }: { 
  icon: any, 
  label: string, 
  href: string, 
  onClick: () => void,
  isDestructive?: boolean
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-6 px-6 py-3.5 hover:bg-black/10 transition-colors ${
        isDestructive ? 'text-rose-500' : 'text-[#F8FAFC]/90'
      }`}
    >
      <Icon className={`w-6 h-6 ${isDestructive ? 'text-rose-500' : 'text-slate-400'}`} />
      <span className="text-[14.5px] font-medium">{label}</span>
    </Link>
  );
}
