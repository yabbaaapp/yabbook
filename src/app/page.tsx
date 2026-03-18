'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import LiveCallBanner from '@/components/chat/LiveCallBanner';
import FilterTabs from '@/components/ui/FilterTabs';
import ChatList from '@/components/chat/ChatList';
import Sidebar from '@/components/layout/Sidebar';
import { Plus } from 'lucide-react';
import { supabase } from '@/utils/supabase';

export default function Home() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'YABBAA YABBOOK',
    username: '@YabbaaToken',
    avatar_url: 'https://i.pravatar.cc/150?u=myprofile'
  });

  const createNewChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newChatName.trim()) {
      await supabase.from('chats').insert([{ name: newChatName.trim() }]);
      setShowPrompt(false);
      setNewChatName('');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        userProfile={userProfile}
      />
      <Header 
        onAddPress={() => setShowPrompt(true)} 
        onMenuPress={() => setIsSidebarOpen(true)}
      />
      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <LiveCallBanner />
        <FilterTabs />
        <ChatList />
        {/* Spacer for bottom nav */}
        <div className="h-6"></div>
      </main>

      {/* New Chat Modal */}
      {showPrompt && (
        <div className="absolute inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">
          <div className="bg-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Yeni Sohbet Oluştur</h3>
            <form onSubmit={createNewChat}>
              <input 
                type="text" 
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Odanın adını girin..." 
                autoFocus
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-sky-500 mb-6"
              />
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowPrompt(false)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  disabled={!newChatName.trim()}
                  className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
