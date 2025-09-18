import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';
import {deviceDB} from '@/utils/deviceDB';
import {loginFetch} from '@/api/user';
import DeviceInfo from 'react-native-device-info';

interface message {
  collapseKey: 'com.cenman.app';
  data: {Msg: string; date: string; isincoming: string; type: string};
  from: string;
  messageId: string;
  notification: {android: {sound: string}; title: string};
  sentTime: number;
  ttl: number;
}

export const useFcm = () => {
  useEffect(() => {
    const setupFcm = async () => {
      const isEmulator = await DeviceInfo.isEmulator();
      if (isEmulator) {
        console.log('FCM setup skipped on emulator.');
        return;
      }

      try {
        // On iOS, ensure the device is registered for remote notifications.
        // The AppDelegate now handles the APNs token delivery.
        if (Platform.OS === 'ios') {
          await messaging().registerDeviceForRemoteMessages();
        }

        // Get user credentials
        const id = await deviceDB('id', 'get');
        const pw = await deviceDB('pw', 'get');

        if (typeof id !== 'string' || typeof pw !== 'string') {
          return; // Not logged in
        }

        // Get the initial token and update server
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('Initial FCM Token:', fcmToken);
          loginFetch({mem_id: id, mem_pass: pw, token: fcmToken, alarm_device_none_check: '0'}).catch(() => {
            console.error('Failed to update initial FCM token.');
          });
        }

        // Listen for token refreshes
        messaging().onTokenRefresh(newFcmToken => {
          console.log('Refreshed FCM Token:', newFcmToken);
          loginFetch({mem_id: id, mem_pass: pw, token: newFcmToken, alarm_device_none_check: '0'}).catch(() => {
            console.error('Failed to update refreshed FCM token.');
          });
        });
      } catch (error) {
        console.error('Error in FCM setup:', error);
      }
    };

    setupFcm();

    // Set up foreground message listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        displayNotification(remoteMessage as any);
      }
    });

    return unsubscribe;
  }, []);

  const displayNotification = async (message: message) => {
    console.log('message :', message);
    const channelAnoucement = await notifee.createChannel({
      id: 'default',
      name: '센클 푸시알림',
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title: message.notification.title,
      android: {
        channelId: channelAnoucement,
        smallIcon: 'ic_launcher',
      },
    });
  };
};
