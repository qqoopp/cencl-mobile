import messaging from '@react-native-firebase/messaging';

export const getDeviceToken = async (): Promise<string> => {
  return requestUserPermission();
};

const requestUserPermission = async (): Promise<string> => {
  const authStatus = await messaging().requestPermission({
    providesAppNotificationSettings: true,
  });
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    return getToken();
  } else {
    return '';
  }
};

const getToken = async (): Promise<string> => {
  const fcmToken = await messaging().getToken();

  return fcmToken;
};
