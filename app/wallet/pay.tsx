import { View, Text, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

const MOCK_MERCHANTS = [
  { merchant: 'Market A101', amount: '89.90', category: 'Market' },
  { merchant: 'Starbucks', amount: '45.00', category: 'Kafe' },
  { merchant: 'Migros', amount: '234.50', category: 'Market' },
];

export default function PayScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'scan' | 'confirm' | 'success'>('scan');
  const [paymentInfo, setPaymentInfo] = useState<typeof MOCK_MERCHANTS[0] | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const isWeb = Platform.OS === 'web';

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    // Parse QR data or use mock
    const random = MOCK_MERCHANTS[Math.floor(Math.random() * MOCK_MERCHANTS.length)];
    setPaymentInfo(random);
    setStep('confirm');
  };

  const simulateScan = () => {
    const random = MOCK_MERCHANTS[Math.floor(Math.random() * MOCK_MERCHANTS.length)];
    setPaymentInfo(random);
    setStep('confirm');
  };

  const handleReset = () => {
    setStep('scan');
    setPaymentInfo(null);
    setScanned(false);
  };

  const renderCamera = () => {
    if (isWeb) {
      // Fallback for web
      return (
        <View style={{ width: '100%', aspectRatio: 1, maxWidth: 300, borderRadius: 24, backgroundColor: '#0F172A', borderWidth: 2, borderColor: 'rgba(51,65,85,0.4)', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 24, overflow: 'hidden' }}>
          <View style={{ width: 192, height: 192, borderWidth: 2, borderColor: 'rgba(245,158,11,0.5)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: -2, left: -2, width: 24, height: 24, borderTopWidth: 3, borderLeftWidth: 3, borderColor: '#F59E0B', borderTopLeftRadius: 8 }} />
            <View style={{ position: 'absolute', top: -2, right: -2, width: 24, height: 24, borderTopWidth: 3, borderRightWidth: 3, borderColor: '#F59E0B', borderTopRightRadius: 8 }} />
            <View style={{ position: 'absolute', bottom: -2, left: -2, width: 24, height: 24, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: '#F59E0B', borderBottomLeftRadius: 8 }} />
            <View style={{ position: 'absolute', bottom: -2, right: -2, width: 24, height: 24, borderBottomWidth: 3, borderRightWidth: 3, borderColor: '#F59E0B', borderBottomRightRadius: 8 }} />
            <Ionicons name="camera" size={40} color="#334155" />
          </View>
          <Text style={{ position: 'absolute', bottom: 16, fontSize: 11, color: '#64748B', fontWeight: '500' }}>Web'de kamera desteklenmez</Text>
        </View>
      );
    }

    if (!permission?.granted) {
      return (
        <View style={{ width: '100%', aspectRatio: 1, maxWidth: 300, borderRadius: 24, backgroundColor: '#0F172A', borderWidth: 2, borderColor: 'rgba(51,65,85,0.4)', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 24 }}>
          <Ionicons name="camera-outline" size={48} color="#475569" />
          <Text style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', marginTop: 12, paddingHorizontal: 32 }}>Kamera izni gerekli</Text>
          <TouchableOpacity onPress={requestPermission} style={{ marginTop: 16, backgroundColor: '#F59E0B', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 }}>
            <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 13 }}>İzin Ver</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ width: '100%', aspectRatio: 1, maxWidth: 300, borderRadius: 24, overflow: 'hidden', marginTop: 16, marginBottom: 24 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        {/* Overlay */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 192, height: 192, borderWidth: 2, borderColor: 'rgba(245,158,11,0.6)', borderRadius: 16 }}>
            <View style={{ position: 'absolute', top: -2, left: -2, width: 24, height: 24, borderTopWidth: 3, borderLeftWidth: 3, borderColor: '#F59E0B', borderTopLeftRadius: 8 }} />
            <View style={{ position: 'absolute', top: -2, right: -2, width: 24, height: 24, borderTopWidth: 3, borderRightWidth: 3, borderColor: '#F59E0B', borderTopRightRadius: 8 }} />
            <View style={{ position: 'absolute', bottom: -2, left: -2, width: 24, height: 24, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: '#F59E0B', borderBottomLeftRadius: 8 }} />
            <View style={{ position: 'absolute', bottom: -2, right: -2, width: 24, height: 24, borderBottomWidth: 3, borderRightWidth: 3, borderColor: '#F59E0B', borderBottomRightRadius: 8 }} />
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 16, left: 0, right: 0, alignItems: 'center' }}>
          <Text style={{ fontSize: 11, color: '#FFF', fontWeight: '500', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 }}>QR kodu kare içine hizalayın</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableOpacity onPress={() => step === 'scan' ? router.back() : handleReset()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="arrow-back" size={18} color="#CBD5E1" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#F8FAFC' }}>QR ile Öde</Text>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        {step === 'scan' && (
          <>
            {renderCamera()}
            {/* Simulate button (for web and testing) */}
            <TouchableOpacity onPress={simulateScan} style={{ width: '100%', maxWidth: 300, paddingVertical: 14, borderRadius: 16, backgroundColor: '#F59E0B', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFF' }}>
                Taramayı Simüle Et
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 11, color: '#475569', textAlign: 'center', marginTop: 12, maxWidth: 260 }}>
              {isWeb ? 'Web\'de QR taraması simülasyon ile çalışır. Mobilde gerçek kamera kullanılır.' : 'Anlaşmalı marketteki QR kodu kameranızla taratınız.'}
            </Text>
          </>
        )}

        {step === 'confirm' && paymentInfo && (
          <View style={{ width: '100%', alignItems: 'center', paddingTop: 16 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(245,158,11,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Ionicons name="storefront" size={26} color="#FBBF24" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFF', marginBottom: 4 }}>Ödeme Onayı</Text>
            <Text style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Aşağıdaki ödemeyi onaylıyor musunuz?</Text>

            <View style={{ width: '100%', backgroundColor: 'rgba(30,41,59,0.3)', borderWidth: 1, borderColor: 'rgba(51,65,85,0.4)', borderRadius: 16, padding: 20, marginBottom: 24, gap: 16 }}>
              {[
                { label: 'Mağaza', value: paymentInfo.merchant },
                { label: 'Kategori', value: paymentInfo.category, badge: true },
                { label: 'Tutar', value: `${paymentInfo.amount} SCT`, big: true },
                { label: 'İşlem Ücreti', value: '0.25 SCT' },
              ].map((row, i) => (
                <View key={i}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#94A3B8' }}>{row.label}</Text>
                    {row.badge ? (
                      <View style={{ backgroundColor: 'rgba(245,158,11,0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
                        <Text style={{ fontSize: 11, color: '#FBBF24', fontWeight: '500' }}>{row.value}</Text>
                      </View>
                    ) : (
                      <Text style={{ fontSize: row.big ? 22 : 13, fontWeight: row.big ? '700' : '500', color: '#FFF' }}>{row.value}</Text>
                    )}
                  </View>
                  {i < 3 && <View style={{ height: 1, backgroundColor: 'rgba(51,65,85,0.3)', marginTop: 16 }} />}
                </View>
              ))}
            </View>

            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <TouchableOpacity onPress={handleReset} style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#1E293B', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#CBD5E1' }}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep('success')} style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#F59E0B', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFF' }}>Öde</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 'success' && paymentInfo && (
          <View style={{ width: '100%', alignItems: 'center', paddingTop: 48 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(16,185,129,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Ionicons name="checkmark" size={36} color="#34D399" />
            </View>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 8 }}>Ödeme Başarılı!</Text>
            <Text style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>{paymentInfo.merchant}</Text>
            <Text style={{ fontSize: 32, fontWeight: '700', color: '#34D399', marginBottom: 32 }}>{paymentInfo.amount} SCT</Text>

            <TouchableOpacity onPress={handleReset} style={{ width: '100%', paddingVertical: 14, borderRadius: 16, backgroundColor: '#1E293B', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFF' }}>Yeni Ödeme Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 13, color: '#38BDF8', fontWeight: '500' }}>Cüzdana Dön</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
