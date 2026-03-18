import { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [biometricType, setBiometricType] = useState<string>('Biyometrik');
  const [error, setError] = useState('');

  // Animations
  const logoScale = useState(new Animated.Value(0.3))[0];
  const logoOpacity = useState(new Animated.Value(0))[0];
  const contentOpacity = useState(new Animated.Value(0))[0];
  const splashOpacity = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Splash animation
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.delay(800),
      Animated.timing(contentOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    checkBiometric();
  }, []);

  const checkBiometric = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        setBiometricType('Face ID');
      } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometricType('Parmak İzi');
      }

      await SplashScreen.hideAsync();

      if (hasHardware && isEnrolled) {
        // Auto-attempt on load
        setTimeout(() => authenticate(), 1500);
      }
    } catch {
      await SplashScreen.hideAsync();
    }
  };

  const authenticate = async () => {
    setError('');
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Yabbook\'a giriş yap',
        cancelLabel: 'İptal',
        fallbackLabel: 'Şifre Kullan',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAuthenticated(true);
        // Fade out splash
        Animated.timing(splashOpacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
          setShowSplash(false);
        });
      } else {
        setError('Kimlik doğrulanamadı. Tekrar deneyin.');
      }
    } catch {
      // On web or unsupported — skip auth
      setIsAuthenticated(true);
      Animated.timing(splashOpacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
        setShowSplash(false);
      });
    }
  };

  const skipAuth = () => {
    setIsAuthenticated(true);
    Animated.timing(splashOpacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
      setShowSplash(false);
    });
  };

  if (!showSplash && isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Animated.View style={{ flex: 1, backgroundColor: '#7B6CB5', opacity: splashOpacity, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, alignItems: 'center', justifyContent: 'center' }}>
      {/* Logo */}
      <Animated.View style={{ alignItems: 'center', transform: [{ scale: logoScale }], opacity: logoOpacity }}>
        <View style={{ width: 100, height: 100, marginBottom: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 52, color: '#E8453C' }}>🦊</Text>
        </View>
        <Text style={{ fontSize: 36, fontWeight: '700', color: '#FFF', fontFamily: 'serif', letterSpacing: 1 }}>Yabbook</Text>
        <Text style={{ fontSize: 22, color: '#E8453C', fontFamily: 'serif', marginTop: -4 }}>y</Text>
      </Animated.View>

      {/* Auth UI */}
      <Animated.View style={{ position: 'absolute', bottom: 100, alignItems: 'center', opacity: contentOpacity, width: '100%', paddingHorizontal: 32 }}>
        <TouchableOpacity
          onPress={authenticate}
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            borderWidth: 2,
            borderColor: 'rgba(255,255,255,0.3)',
          }}
        >
          <Ionicons name={biometricType === 'Face ID' ? 'scan' : 'finger-print'} size={32} color="#FFF" />
        </TouchableOpacity>

        <Text style={{ fontSize: 15, fontWeight: '600', color: '#FFF', marginBottom: 4 }}>
          {biometricType} ile Giriş Yap
        </Text>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 8 }}>
          Güvenli giriş için dokunun
        </Text>

        {error ? (
          <Text style={{ fontSize: 12, color: '#FEE2E2', textAlign: 'center', marginBottom: 16 }}>{error}</Text>
        ) : null}

        <TouchableOpacity onPress={skipAuth} style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: '500' }}>Şimdilik Geç</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}
