'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Send, Info, Plus, Mic } from 'lucide-react';
import { supabase } from '@/utils/supabase';

interface Message {
  id: string;
  text: string;
  sender_id: string;
  created_at: string;
  sender?: {
    name: string;
    avatar_url: string;
  };
}

interface ChatDetails {
  id: string;
  name: string;
  is_group: boolean;
}

export default function ChatRoomScreen({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  
  const [user, setUser] = useState<any>(null);
  const [chat, setChat] = useState<ChatDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    }
    getUser();
  }, []);

  useEffect(() => {
    if (!id) return;
    
    fetchChatDetails(id);
    fetchMessages(id);

    const messageSub = supabase
      .channel(`chat_${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${id}` },
        (payload) => {
          fetchSingleMessage(payload.new.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSub);
    };
  }, [id]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChatDetails = async (chatId: string) => {
    const { data } = await supabase
      .from('chats')
      .select('*')
      .eq('id', chatId)
      .single();
    if (data) setChat(data);
  };

  const fetchMessages = async (chatId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*, sender:users(name, avatar_url)')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });
      
    if (data) setMessages(data);
    setLoading(false);
  };

  const fetchSingleMessage = async (msgId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*, sender:users(name, avatar_url)')
      .eq('id', msgId)
      .single();
      
    if (data) {
      setMessages((prev) => {
        if (prev.find(m => m.id === data.id)) return prev;
        return [...prev, data];
      });
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !user || !id) return;

    const textToSend = inputText.trim();
    setInputText(''); // Optimistic clear

    const { error } = await supabase.from('messages').insert([
      { chat_id: id, sender_id: user.id, text: textToSend }
    ]);

    if (!error) {
      await supabase
        .from('chats')
        .update({ last_message: textToSend, updated_at: new Date().toISOString() })
        .eq('id', id);
    } else {
      console.error('Mesaj gönderilemedi:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0B0F19] text-white">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-[#1E293B]/60 bg-[#0F172A]/95 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-[#1E293B]/50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#38BDF8]" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center text-lg shadow-inner">
            {chat?.name?.charAt(0).toUpperCase() || '#'}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px]">{chat?.name || 'Yükleniyor...'}</span>
            <span className="text-[11px] text-[#10B981] font-medium">Aktif</span>
          </div>
        </div>
        <button className="p-2 hover:bg-[#1E293B]/50 rounded-full transition-colors">
          <Info className="w-6 h-6 text-[#CBD5E1]" />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-[#38BDF8]/30 border-t-[#38BDF8] rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center mt-10">
            <span className="text-[#64748B] text-sm text-center">
              Burası çok sessiz.<br />İlk mesajı göndererek sohbeti başlatın.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg, index) => {
              const isMe = msg.sender_id === user?.id;
              const showAvatar = !isMe && (index === 0 || messages[index - 1].sender_id !== msg.sender_id);

              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar Placeholder for other users */}
                  {!isMe && (
                    <div className="w-7 h-7 flex-shrink-0">
                      {showAvatar && msg.sender?.avatar_url && (
                        <Image 
                          src={msg.sender.avatar_url} 
                          alt="avatar" 
                          width={28} 
                          height={28} 
                          className="rounded-full bg-[#334155] object-cover"
                          unoptimized
                        />
                      )}
                    </div>
                  )}

                  <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    {!isMe && showAvatar && (
                      <span className="text-[11px] text-[#94A3B8] mb-1 ml-1 font-medium">
                        {msg.sender?.name || 'Kullanıcı'}
                      </span>
                    )}
                    <div 
                      className={`px-4 py-2.5 rounded-2xl ${
                        isMe 
                          ? 'bg-[#38BDF8] text-black rounded-br-sm' 
                          : 'bg-[#1E293B] text-white rounded-bl-sm border border-[#334155]/30'
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-[#64748B] mt-1 mx-1">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="bg-[#0B0F19] border-t border-[#334155]/40 px-3 py-3 w-full flex-shrink-0">
        <form onSubmit={sendMessage} className="flex items-end gap-2 max-w-lg mx-auto w-full">
          <button type="button" className="w-10 h-10 flex-shrink-0 rounded-full bg-[#1E293B] hover:bg-[#334155] flex items-center justify-center transition-colors pb-0.5">
            <Plus className="w-6 h-6 text-[#64748B]" />
          </button>
          
          <div className="flex-1 bg-[#1E293B] border border-[#334155]/40 rounded-3xl px-4 py-2.5 min-h-[44px] max-h-[120px] flex items-center">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Mesaj yazın..."
              className="bg-transparent text-[#FFF] text-[15px] w-full outline-none placeholder-[#64748B] resize-none overflow-hidden leading-tight flex flex-col justify-center"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e as any);
                }
              }}
              style={{
                height: `${Math.min(100, Math.max(24, inputText.split('\n').length * 20))}px`
              }}
            />
          </div>

          <button 
            type={inputText.trim() ? "submit" : "button"}
            disabled={!inputText.trim()}
            className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
              inputText.trim() 
                ? 'bg-[#38BDF8] text-black shadow-lg shadow-[#38BDF8]/20' 
                : 'bg-[#1E293B] text-[#64748B]'
            }`}
          >
            {inputText.trim() ? (
              <Send className="w-5 h-5 ml-1" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
