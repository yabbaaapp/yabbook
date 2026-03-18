import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#F8FAFC' }}>Feed</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(30,41,59,0.4)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Ionicons name="home" size={28} color="#334155" />
        </View>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#CBD5E1', marginBottom: 8 }}>Your Feed</Text>
        <Text style={{ fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20 }}>
          Follow friends and communities to see their latest updates here.
        </Text>
        <TouchableOpacity style={{ marginTop: 20, paddingHorizontal: 24, paddingVertical: 10, backgroundColor: '#1E293B', borderRadius: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#FFF' }}>Find Creators</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
