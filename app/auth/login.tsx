import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleMode = () => setIsRegistering(!isRegistering);

  async function handleAuth() {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    setLoading(true);
    let error;

    if (isRegistering) {
      const { error: signUpErr, data } = await supabase.auth.signUp({
        email,
        password,
      });
      error = signUpErr;

      // Create initial profile record if signup was successful
      if (!error && data?.user?.id) {
        await supabase.from('users').insert([
          { 
            id: data.user.id, 
            email: email,
            name: email.split('@')[0],
            username: `@${email.split('@')[0]}`,
            avatar_url: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
          }
        ]);
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = signInError;
    }

    if (error) {
      Alert.alert('Giriş Başarısız', error.message);
    } else if (isRegistering) {
      Alert.alert(
        'Kayıt Başarılı', 
        'Hesabınız oluşturuldu.'
      );
      setIsRegistering(false);
    } else {
      // Login successful
      router.replace('/(tabs)');
    }
    
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#0B0F19' }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(56,189,248,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Ionicons name="chatbubbles" size={40} color="#38BDF8" />
          </View>
          <Text style={{ fontSize: 32, fontWeight: '700', color: '#FFF', marginBottom: 8 }}>
            Yabbook
          </Text>
          <Text style={{ fontSize: 16, color: '#94A3B8', textAlign: 'center' }}>
            {isRegistering ? 'Aramıza katılın ve mesajlaşmaya başlayın' : 'Giriş yapın ve sohbete kaldığınız yerden devam edin'}
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ color: '#94A3B8', fontSize: 13, fontWeight: '500', marginBottom: 8, marginLeft: 4 }}>E-posta</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', borderRadius: 14, paddingHorizontal: 16, borderWidth: 1, borderColor: '#334155' }}>
              <Ionicons name="mail-outline" size={20} color="#64748B" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="ornek@email.com"
                placeholderTextColor="#64748B"
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
                style={{ flex: 1, paddingVertical: 16, paddingLeft: 12, color: '#FFF', fontSize: 15 }}
              />
            </View>
          </View>

          <View>
            <Text style={{ color: '#94A3B8', fontSize: 13, fontWeight: '500', marginBottom: 8, marginLeft: 4 }}>Şifre</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', borderRadius: 14, paddingHorizontal: 16, borderWidth: 1, borderColor: '#334155' }}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="******"
                placeholderTextColor="#64748B"
                secureTextEntry
                editable={!loading}
                style={{ flex: 1, paddingVertical: 16, paddingLeft: 12, color: '#FFF', fontSize: 15 }}
              />
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleAuth} 
            disabled={loading}
            style={{ 
              backgroundColor: loading ? '#475569' : '#38BDF8', 
              paddingVertical: 16, 
              borderRadius: 14, 
              alignItems: 'center', 
              marginTop: 12 
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
              {loading ? 'Bekleniyor...' : (isRegistering ? 'Hesap Oluştur' : 'Giriş Yap')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32 }}>
          <Text style={{ color: '#94A3B8', fontSize: 14 }}>
            {isRegistering ? 'Zaten hesabınız var mı? ' : 'Hesabınız yok mu? '}
          </Text>
          <TouchableOpacity onPress={toggleMode} disabled={loading}>
            <Text style={{ color: '#38BDF8', fontSize: 14, fontWeight: '700' }}>
              {isRegistering ? 'Giriş Yap' : 'Kayıt Ol'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
