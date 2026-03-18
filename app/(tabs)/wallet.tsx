import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';


const MOCK_TRANSACTIONS = [
  { type: 'receive', title: 'Sarah Jenkins', subtitle: 'Token alımı', amount: '250', time: '10:42', positive: true },
  { type: 'payment', title: 'Market A101', subtitle: 'QR ile ödeme', amount: '89.90', time: 'Dün', positive: false },
  { type: 'send', title: 'Mike Ross', subtitle: 'Token gönderimi', amount: '500', time: 'Dün', positive: false },
  { type: 'receive', title: 'Elena Gilbert', subtitle: 'Token alımı', amount: '1,200', time: 'Pazartesi', positive: true },
  { type: 'payment', title: 'Starbucks', subtitle: 'QR ile ödeme', amount: '45.00', time: 'Pazar', positive: false },
];

const iconMap: Record<string, { icon: string; bg: string; color: string }> = {
  send: { icon: 'arrow-up', bg: 'rgba(244,63,94,0.1)', color: '#FB7185' },
  receive: { icon: 'arrow-down', bg: 'rgba(16,185,129,0.1)', color: '#34D399' },
  payment: { icon: 'storefront-outline', bg: 'rgba(251,191,36,0.1)', color: '#FBBF24' },
};

export default function WalletScreen() {
  const router = useRouter();
  const [balanceHidden, setBalanceHidden] = useState(false);

  const quickActions = [
    { name: 'Gönder', icon: 'paper-plane', route: '/wallet/send', colors: ['#0EA5E9', '#2563EB'] },
    { name: 'Al', icon: 'qr-code', route: '/wallet/receive', colors: ['#10B981', '#0D9488'] },
    { name: 'QR Öde', icon: 'camera', route: '/wallet/pay', colors: ['#F59E0B', '#EA580C'] },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#F8FAFC' }}>Wallet</Text>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="search" size={18} color="#CBD5E1" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Balance Card */}
        <View style={{ borderRadius: 24, padding: 24, overflow: 'hidden', backgroundColor: '#6D28D9', marginBottom: 8 }}>
          <View style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <View style={{ position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.05)' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <View>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginBottom: 4 }}>Toplam Bakiye</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                <Text style={{ fontSize: 36, fontWeight: '700', color: '#FFF' }}>{balanceHidden ? '••••••' : '12,450.00'}</Text>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>SCT</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <Ionicons name="trending-up" size={14} color="#34D399" />
                <Text style={{ fontSize: 12, color: '#34D399', fontWeight: '500' }}>+5.2% bugün</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setBalanceHidden(!balanceHidden)} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={balanceHidden ? 'eye-off' : 'eye'} size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34D399' }} />
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '500' }}>0x7a3F...9C2d</Text>
            <Ionicons name="copy-outline" size={12} color="rgba(255,255,255,0.5)" />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 20, marginBottom: 28 }}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.name} onPress={() => router.push(action.route as any)} style={{ alignItems: 'center', gap: 8 }}>
              <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: action.colors[0], alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={action.icon as any} size={22} color="#FFF" />
              </View>
              <Text style={{ fontSize: 11, color: '#94A3B8', fontWeight: '500' }}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#FFF' }}>Son İşlemler</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: '#38BDF8', fontWeight: '500' }}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: 'rgba(30,41,59,0.3)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: 'rgba(51,65,85,0.3)', marginBottom: 20 }}>
          {MOCK_TRANSACTIONS.map((tx, i) => {
            const config = iconMap[tx.type];
            return (
              <View key={i}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 4 }}>
                  <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: config.bg, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={config.icon as any} size={18} color={config.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#FFF' }}>{tx.title}</Text>
                    <Text style={{ fontSize: 11, color: '#64748B' }}>{tx.subtitle}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: tx.positive ? '#34D399' : '#FFF' }}>{tx.positive ? '+' : '-'}{tx.amount} SCT</Text>
                    <Text style={{ fontSize: 9, color: '#475569' }}>{tx.time}</Text>
                  </View>
                </View>
                {i < MOCK_TRANSACTIONS.length - 1 && <View style={{ height: 1, backgroundColor: 'rgba(51,65,85,0.3)', marginHorizontal: 8 }} />}
              </View>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
