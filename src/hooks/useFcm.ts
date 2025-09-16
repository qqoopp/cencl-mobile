import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

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
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        displayNotification(remoteMessage);
      }
    });
    return () => {
      unsubscribe();
    };
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
        smallIcon: 'ic_launcher', //
      },
    });
  };
};
