import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { notifyTransfer } from '../../utils/notifications';

const CONTACTS = [
  { id: '1', name: 'Sarah Jenkins', username: '@sarahj', avatar: 'https://i.pravatar.cc/100?u=sarah' },
  { id: '2', name: 'Mike Ross', username: '@mikeross', avatar: 'https://i.pravatar.cc/100?u=mike' },
  { id: '3', name: 'Elena Gilbert', username: '@elenag', avatar: 'https://i.pravatar.cc/100?u=elena' },
  { id: '4', name: 'Alex Chen', username: '@alexc', avatar: 'https://i.pravatar.cc/100?u=speaker1' },
];

export default function SendScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'select' | 'amount' | 'confirm'>('select');
  const [selectedContact, setSelectedContact] = useState<typeof CONTACTS[0] | null>(null);
  const [amount, setAmount] = useState('');

  const handleSend = async () => {
    // Trigger push notification
    try { await notifyTransfer(selectedContact?.name || '', amount); } catch {}
    Alert.alert('✅ Başarılı', `${amount} SCT ${selectedContact?.name} adresine gönderildi!`, [
      { text: 'Tamam', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableOpacity onPress={() => step === 'select' ? router.back() : setStep(step === 'confirm' ? 'amount' : 'select')} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="arrow-back" size={18} color="#CBD5E1" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#F8FAFC' }}>Token Gönder</Text>
      </View>

      {/* Step Indicator */}
      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 20 }}>
        {['Kişi Seç', 'Miktar', 'Onayla'].map((label, i) => {
          const stepIndex = ['select', 'amount', 'confirm'].indexOf(step);
          const isActive = i <= stepIndex;
          return (
            <View key={label} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
              <View style={{ height: 3, width: '100%', borderRadius: 2, backgroundColor: isActive ? '#0EA5E9' : '#1E293B' }} />
              <Text style={{ fontSize: 10, fontWeight: '500', color: isActive ? '#38BDF8' : '#475569' }}>{label}</Text>
            </View>
          );
        })}
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        {step === 'select' && (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30,41,59,0.5)', borderRadius: 14, paddingHorizontal: 14, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(51,65,85,0.4)' }}>
              <Ionicons name="search" size={16} color="#64748B" />
              <TextInput placeholder="Kullanıcı adı veya isim ara..." placeholderTextColor="#64748B" style={{ flex: 1, paddingVertical: 14, paddingLeft: 10, color: '#FFF', fontSize: 13 }} />
            </View>
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748B', marginBottom: 12, paddingLeft: 4 }}>Son Kişiler</Text>
            {CONTACTS.map((c) => (
              <TouchableOpacity key={c.id} onPress={() => { setSelectedContact(c); setStep('amount'); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 4 }}>
                <Image source={{ uri: c.avatar }} style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#334155' }} />
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFF' }}>{c.name}</Text>
                  <Text style={{ fontSize: 12, color: '#64748B' }}>{c.username}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 'amount' && selectedContact && (
          <View style={{ alignItems: 'center', paddingTop: 16 }}>
            <Image source={{ uri: selectedContact.avatar }} style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#334155', marginBottom: 8 }} />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFF', marginBottom: 4 }}>{selectedContact.name}</Text>
            <Text style={{ fontSize: 13, color: '#64748B', marginBottom: 32 }}>{selectedContact.username}</Text>
            <View style={{ backgroundColor: 'rgba(30,41,59,0.3)', borderWidth: 1, borderColor: 'rgba(51,65,85,0.4)', borderRadius: 20, padding: 24, marginBottom: 16, width: '100%', maxWidth: 280, alignItems: 'center' }}>
              <TextInput value={amount} onChangeText={setAmount} placeholder="0" placeholderTextColor="#334155" keyboardType="numeric" style={{ fontSize: 48, fontWeight: '700', color: '#FFF', textAlign: 'center', width: '100%' }} />
              <Text style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>SCT</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 28 }}>
              {[100, 500, 1000, 5000].map((v) => (
                <TouchableOpacity key={v} onPress={() => setAmount(v.toString())} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1E293B', borderWidth: 1, borderColor: 'rgba(51,65,85,0.4)' }}>
                  <Text style={{ fontSize: 13, color: '#CBD5E1', fontWeight: '500' }}>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => amount && parseFloat(amount) > 0 && setStep('confirm')} style={{ width: '100%', maxWidth: 280, paddingVertical: 14, borderRadius: 16, backgroundColor: '#0EA5E9', alignItems: 'center', opacity: amount && parseFloat(amount) > 0 ? 1 : 0.4 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFF' }}>Devam</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'confirm' && selectedContact && (
          <View style={{ alignItems: 'center', paddingTop: 16 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(14,165,233,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Ionicons name="paper-plane" size={24} color="#38BDF8" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFF', marginBottom: 20 }}>Transfer Onayı</Text>
            <View style={{ width: '100%', backgroundColor: 'rgba(30,41,59,0.3)', borderWidth: 1, borderColor: 'rgba(51,65,85,0.4)', borderRadius: 16, padding: 20, marginBottom: 24, gap: 16 }}>
              {[{ label: 'Alıcı', value: selectedContact.name }, { label: 'Miktar', value: `${amount} SCT`, bold: true }, { label: 'İşlem Ücreti', value: '0.50 SCT' }].map((row, i) => (
                <View key={i}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13, color: '#94A3B8' }}>{row.label}</Text>
                    <Text style={{ fontSize: row.bold ? 18 : 13, fontWeight: row.bold ? '700' : '500', color: '#FFF' }}>{row.value}</Text>
                  </View>
                  {i < 2 && <View style={{ height: 1, backgroundColor: 'rgba(51,65,85,0.3)', marginTop: 16 }} />}
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <TouchableOpacity onPress={() => setStep('amount')} style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#1E293B', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#CBD5E1' }}>Geri</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSend} style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#0EA5E9', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFF' }}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
