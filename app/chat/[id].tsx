import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';

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

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [chat, setChat] = useState<ChatDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    
    fetchChatDetails(id);
    fetchMessages(id);

    // Subscribe to new messages
    const messageSub = supabase
      .channel(`chat_${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${id}` },
        (payload) => {
          // Fetch the new message with sender details
          fetchSingleMessage(payload.new.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSub);
    };
  }, [id]);

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
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const fetchSingleMessage = async (msgId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*, sender:users(name, avatar_url)')
      .eq('id', msgId)
      .single();
      
    if (data) {
      setMessages((prev) => {
        // Prevent duplicates
        if (prev.find(m => m.id === data.id)) return prev;
        return [...prev, data];
      });
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !user || !id || typeof id !== 'string') return;

    const textToSend = inputText.trim();
    setInputText(''); // Optimistic clear

    const { error } = await supabase.from('messages').insert([
      { chat_id: id, sender_id: user.id, text: textToSend }
    ]);

    if (!error) {
      // Update chat last_message and updated_at
      await supabase
        .from('chats')
        .update({ last_message: textToSend, updated_at: new Date().toISOString() })
        .eq('id', id);
    } else {
      console.error('Mesaj gönderilemedi:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(51,65,85,0.3)', backgroundColor: 'rgba(15,23,42,0.95)', zIndex: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginLeft: -8 }}>
            <Ionicons name="arrow-back" size={24} color="#38BDF8" />
          </TouchableOpacity>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18 }}>{chat?.name?.charAt(0).toUpperCase() || '#'}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF' }}>{chat?.name || 'Yükleniyor...'}</Text>
            <Text style={{ fontSize: 11, color: '#10B981' }}>Aktif</Text>
          </View>
        </View>
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="information-circle-outline" size={24} color="#CBD5E1" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={{ flex: 1, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingVertical: 20 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#38BDF8" />
          ) : messages.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: '#64748B', fontSize: 13, textAlign: 'center' }}>
                Burası çok sessiz.{"\n"}İlk mesajı göndererek sohbeti başlatın.
              </Text>
            </View>
          ) : (
            messages.map((msg, index) => {
              const isMe = msg.sender_id === user?.id;
              const showAvatar = !isMe && (index === 0 || messages[index - 1].sender_id !== msg.sender_id);
              
              return (
                <View key={msg.id} style={{ 
                  flexDirection: isMe ? 'row-reverse' : 'row', 
                  alignItems: 'flex-end',
                  marginBottom: 12,
                  gap: 8
                }}>
                  {!isMe && (
                    <View style={{ width: 28, height: 28 }}>
                      {showAvatar && msg.sender?.avatar_url && (
                        <Image 
                          source={{ uri: msg.sender.avatar_url }} 
                          style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#334155' }} 
                        />
                      )}
                    </View>
                  )}
                  
                  <View style={{ maxWidth: '75%' }}>
                    {!isMe && showAvatar && (
                      <Text style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4, marginLeft: 4 }}>
                        {msg.sender?.name || 'Kullanıcı'}
                      </Text>
                    )}
                    <View style={{ 
                      backgroundColor: isMe ? '#38BDF8' : '#1E293B', 
                      paddingHorizontal: 16, 
                      paddingVertical: 10, 
                      borderRadius: 20,
                      borderBottomRightRadius: isMe ? 4 : 20,
                      borderBottomLeftRadius: !isMe ? 4 : 20,
                    }}>
                      <Text style={{ color: isMe ? '#000' : '#FFF', fontSize: 15 }}>{msg.text}</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: '#64748B', marginTop: 4, alignSelf: isMe ? 'flex-end' : 'flex-start', marginHorizontal: 4 }}>
                      {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#0B0F19', borderTopWidth: 1, borderTopColor: 'rgba(51,65,85,0.4)', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="add" size={24} color="#64748B" />
          </TouchableOpacity>
          
          <View style={{ flex: 1, backgroundColor: '#1E293B', borderRadius: 20, paddingHorizontal: 16, paddingVertical: Platform.OS === 'ios' ? 10 : 8, maxHeight: 100 }}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Mesaj yazın..."
              placeholderTextColor="#64748B"
              multiline
              style={{ color: '#FFF', fontSize: 15, maxHeight: 80 }}
            />
          </View>
          
          {inputText.trim() ? (
            <TouchableOpacity onPress={sendMessage} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#38BDF8', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="send" size={18} color="#0B0F19" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="mic" size={20} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
