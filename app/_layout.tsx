import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AuthGate from '../components/ui/AuthGate';
import SessionGate from '../components/ui/SessionGate';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <StatusBar style="light" />
        <SessionGate>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0B0F19' },
              animation: 'slide_from_right',
            }}
          />
        </SessionGate>
      </AuthGate>
    </AuthProvider>
  );
}
