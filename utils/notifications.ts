import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotifications() {
  if (Platform.OS === 'web') {
    console.log('Push notifications desteklenmiyor (web)');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Bildirim izni reddedildi');
    return null;
  }

  // Get push token (for production you'd send this to your server)
  const tokenData = await Notifications.getExpoPushTokenAsync({
    projectId: 'yabbook',
  });

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Varsayılan',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#38BDF8',
    });
  }

  return tokenData.data;
}

// Schedule a local notification (useful for testing and transaction alerts)
export async function sendLocalNotification(title: string, body: string, data?: Record<string, string>) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: data || {},
      sound: true,
    },
    trigger: null, // immediate
  });
}

// Example: Transaction notification
export async function notifyTransfer(recipientName: string, amount: string) {
  await sendLocalNotification(
    '💸 Transfer Başarılı',
    `${amount} SCT ${recipientName} adresine gönderildi.`,
    { type: 'transfer', recipient: recipientName, amount }
  );
}

// Example: Payment notification
export async function notifyPayment(merchantName: string, amount: string) {
  await sendLocalNotification(
    '🛒 Ödeme Tamamlandı',
    `${amount} SCT ${merchantName} ödemeniz gerçekleşti.`,
    { type: 'payment', merchant: merchantName, amount }
  );
}

// Example: Incoming token notification
export async function notifyIncoming(senderName: string, amount: string) {
  await sendLocalNotification(
    '📥 Token Alındı',
    `${senderName} size ${amount} SCT gönderdi!`,
    { type: 'incoming', sender: senderName, amount }
  );
}
