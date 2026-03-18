import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';

interface UserProfile {
  name: string;
  username: string;
  avatar_url: string;
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
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
  }, [user]);
  const menuItems = [
    { name: 'Account details', icon: 'person' },
    { name: 'Notifications', icon: 'notifications' },
    { name: 'Appearance', icon: 'color-palette' },
    { name: 'Privacy & Security', icon: 'shield-checkmark' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#F8FAFC' }}>Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 40 }} />
        ) : (
          <View style={{ alignItems: 'center', marginBottom: 28, marginTop: 8 }}>
            <View style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#6366F1', padding: 3, marginBottom: 16 }}>
              <Image source={{ uri: profile?.avatar_url || 'https://i.pravatar.cc/150?u=default' }} style={{ width: '100%', height: '100%', borderRadius: 44 }} />
            </View>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 4 }}>{profile?.name || 'Kullanıcı'}</Text>
            <Text style={{ fontSize: 13, color: '#38BDF8', fontWeight: '500', marginBottom: 10 }}>{profile?.username || '@kullanici'}</Text>
            <Text style={{ fontSize: 13, color: '#94A3B8', textAlign: 'center', maxWidth: 280 }}>
              Yabbook kullanıcısı. Kripto işlemlerine ve sohbetlere hazır.
            </Text>
          </View>
        )}

        {/* Stats */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 36, marginBottom: 28, paddingBottom: 28, borderBottomWidth: 1, borderBottomColor: 'rgba(30,41,59,0.5)' }}>
          {[{ value: '1.2k', label: 'Followers' }, { value: '845', label: 'Following' }, { value: '14', label: 'Spaces' }].map((stat) => (
            <View key={stat.label} style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFF' }}>{stat.value}</Text>
              <Text style={{ fontSize: 11, color: '#64748B' }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        {menuItems.map((item) => (
          <TouchableOpacity key={item.name} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: 'rgba(30,41,59,0.2)', borderRadius: 14, marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <Ionicons name={item.icon as any} size={18} color="#CBD5E1" />
              <Text style={{ fontWeight: '500', color: '#CBD5E1' }}>{item.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color="#475569" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, backgroundColor: 'rgba(244,63,94,0.1)', borderRadius: 14, marginTop: 16, marginBottom: 40 }}>
          <Ionicons name="log-out-outline" size={18} color="#F43F5E" />
          <Text style={{ fontWeight: '500', color: '#F43F5E' }}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
