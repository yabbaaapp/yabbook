import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';

interface Chat {
  id: string;
  name: string;
  last_message: string;
  updated_at: string;
  is_group: boolean;
}

export default function ChatsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

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

  const createNewChat = () => {
    Alert.prompt(
      'Yeni Sohbet Oluştur',
      'Odanın adını girin:',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Oluştur', 
          onPress: (text?: string) => {
            if (text) {
              supabase.from('chats').insert([{ name: text }]).then(() => {
                fetchChats();
              });
            }
          } 
        }
      ],
      'plain-text'
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View>
            <Image source={{ uri: 'https://i.pravatar.cc/100?u=myprofile' }} style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#1E293B' }} />
            <View style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, backgroundColor: '#10B981', borderRadius: 6, borderWidth: 2, borderColor: '#0B0F19' }} />
          </View>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#F8FAFC' }}>Sohbetler</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="search" size={18} color="#CBD5E1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={createNewChat} style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6366F1' }}>
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          {['Tümü', 'Gruplar', 'Okunmamış', 'Aramalar'].map((tab, i) => (
            <TouchableOpacity key={tab} style={{ paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, marginRight: 8, backgroundColor: i === 0 ? '#1E293B' : 'transparent', borderWidth: 1, borderColor: i === 0 ? '#334155' : 'transparent' }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: i === 0 ? '#FFF' : '#94A3B8' }}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 40 }} />
        ) : chats.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="chatbubbles-outline" size={48} color="#334155" />
            <Text style={{ color: '#94A3B8', marginTop: 16 }}>Henüz bir sohbet yok.</Text>
            <TouchableOpacity onPress={createNewChat} style={{ marginTop: 12 }}>
              <Text style={{ color: '#38BDF8', fontWeight: '500' }}>İlk odayı sen oluştur!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          chats.map((chat) => (
            <TouchableOpacity 
              key={chat.id} 
              onPress={() => router.push(`/chat/${chat.id}`)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 }}
            >
              <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' }}>
                <Text style={{ fontSize: 20 }}>{chat.name.charAt(0).toUpperCase()}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#FFF' }} numberOfLines={1}>{chat.name}</Text>
                  <Text style={{ fontSize: 11, color: '#64748B', fontWeight: '500' }}>
                    {new Date(chat.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </Text>
                </View>
                <Text style={{ fontSize: 13, color: '#94A3B8' }} numberOfLines={1}>
                  {chat.last_message || 'Henüz mesaj yok...'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
