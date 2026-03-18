import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import Svg, { Rect } from 'react-native-svg';

function QRCodeDisplay({ value = '0x7a3F8b2Ed1A5c7B9eF3d4C9e2Fd', size = 200 }: { value?: string; size?: number }) {
  const cells = 21;
  const cellSize = size / cells;
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed += value.charCodeAt(i);

  const getCell = (row: number, col: number): boolean => {
    const isFinderTL = row < 7 && col < 7;
    const isFinderTR = row < 7 && col >= cells - 7;
    const isFinderBL = row >= cells - 7 && col < 7;
    if (isFinderTL || isFinderTR || isFinderBL) {
      const localR = isFinderTL ? row : isFinderTR ? row : row - (cells - 7);
      const localC = isFinderTL ? col : isFinderTR ? col - (cells - 7) : col;
      const isEdge = localR === 0 || localR === 6 || localC === 0 || localC === 6;
      const isCenter = localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4;
      const isInner = localR === 1 || localR === 5 || localC === 1 || localC === 5;
      return (isEdge || isCenter) && !isInner;
    }
    return (((row * 31 + col * 17 + seed) * 2654435761) >>> 0) % 3 !== 0;
  };

  const rects: { x: number; y: number }[] = [];
  for (let r = 0; r < cells; r++)
    for (let c = 0; c < cells; c++)
      if (getCell(r, c)) rects.push({ x: c * cellSize, y: r * cellSize });

  return (
    <View style={{ backgroundColor: '#FFF', borderRadius: 16, padding: 16, alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rects.map((r, i) => (
          <Rect key={i} x={r.x} y={r.y} width={cellSize} height={cellSize} rx={cellSize * 0.15} fill="#1E1B4B" />
        ))}
      </Svg>
    </View>
  );
}

export default function ReceiveScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x7a3F8b2E...d4C9e2Fd';

  const handleCopy = async () => {
    await Clipboard.setStringAsync('0x7a3F8b2Ed1A5c7B9eF3d4C9e2Fd');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="arrow-back" size={18} color="#CBD5E1" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#F8FAFC' }}>Token Al</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 16, paddingTop: 20 }} showsVerticalScrollIndicator={false}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(16,185,129,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Ionicons name="qr-code" size={26} color="#34D399" />
        </View>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFF', marginBottom: 4 }}>QR Kodunu Paylaş</Text>
        <Text style={{ fontSize: 13, color: '#94A3B8', textAlign: 'center', maxWidth: 280, marginBottom: 28, lineHeight: 20 }}>
          Diğer kullanıcılar bu QR kodu tarayarak sana token gönderebilir.
        </Text>

        <QRCodeDisplay />

        <View style={{ width: '100%', backgroundColor: 'rgba(30,41,59,0.3)', borderWidth: 1, borderColor: 'rgba(51,65,85,0.4)', borderRadius: 16, padding: 16, marginTop: 28 }}>
          <Text style={{ fontSize: 11, color: '#94A3B8', marginBottom: 8 }}>Cüzdan Adresi</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: '#FFF', fontFamily: 'monospace' }}>{walletAddress}</Text>
            <TouchableOpacity onPress={handleCopy} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: copied ? 'rgba(16,185,129,0.2)' : '#334155' }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: copied ? '#34D399' : '#CBD5E1' }}>
                {copied ? '✓ Kopyalandı' : 'Kopyala'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={{ width: '100%', paddingVertical: 14, borderRadius: 16, backgroundColor: '#10B981', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFF' }}>
            <Ionicons name="share-social" size={14} color="#FFF" /> Adresi Paylaş
          </Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
