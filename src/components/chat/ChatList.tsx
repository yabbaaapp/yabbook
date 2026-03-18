'use client';

import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import { supabase } from '@/utils/supabase';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Chat {
  id: string;
  name: string;
  last_message: string;
  updated_at: string;
  is_group: boolean;
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchChats();

    const chatSub = supabase
      .channel('public:chats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, () => {
        fetchChats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(chatSub);
    };
  }, []);

  const fetchChats = async () => {
    const { data } = await supabase
      .from('chats')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (data) setChats(data);
    setLoading(false);
  };



  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-2 relative min-h-[50vh]">
      {chats.length === 0 ? (
        <div className="flex flex-col items-center mt-12 text-slate-500">
          <p className="text-sm">Henüz bir sohbet yok.</p>
        </div>
      ) : (
        chats.map((chat) => (
          <div key={chat.id} onClick={() => router.push(`/chat/${chat.id}`)}>
            <ChatItem 
              id={chat.id}
              type={chat.is_group ? 'group' : 'direct'}
              title={chat.name}
              time={new Date(chat.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              lastMessage={chat.last_message || 'Henüz mesaj yok...'}
              avatars={[`https://i.pravatar.cc/150?u=${chat.id}`]}
            />
          </div>
        ))
      )}


    </div>
  );
}
