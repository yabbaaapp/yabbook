import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const spaces = [
  { id: 1, name: 'Frontend Devs', members: '12.4k', icon: 'code-slash' },
  { id: 2, name: 'Design System', members: '8.2k', icon: 'brush' },
  { id: 3, name: 'Crypto Alpha', members: '45.1k', icon: 'logo-bitcoin' },
];

export default function SpacesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#F8FAFC' }}>Spaces</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Featured */}
        <View style={{ backgroundColor: '#6D28D9', borderRadius: 16, padding: 20, marginBottom: 24, overflow: 'hidden' }}>
          <View style={{ position: 'absolute', right: -16, bottom: -16, opacity: 0.1 }}>
            <Ionicons name="rocket" size={80} color="#FFF" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFF', marginBottom: 4 }}>Web3 Builders</Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Join the discussion on the future of decentralization.</Text>
          <TouchableOpacity style={{ backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#4C1D95' }}>Join Space</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 14, fontWeight: '600', color: '#94A3B8', marginBottom: 12 }}>Discover</Text>
        {spaces.map(space => (
          <TouchableOpacity key={space.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: 'rgba(30,41,59,0.3)', padding: 12, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(51,65,85,0.3)' }}>
            <View style={{ width: 48, height: 48, backgroundColor: '#1E293B', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={space.icon as any} size={20} color="#38BDF8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#E2E8F0' }}>{space.name}</Text>
              <Text style={{ fontSize: 11, color: '#64748B' }}>{space.members} members</Text>
            </View>
            <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="add" size={16} color="#CBD5E1" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
