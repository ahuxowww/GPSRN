import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

async function GetFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);

  if (!fcmToken) {
    try {
      const fcmToken1 = await messaging().getToken();
      if (fcmToken1) {
        console.log(fcmToken1, 'new Token');
        await AsyncStorage.setItem('fcmToken', fcmToken1);
      }
    } catch (err) {
      console.log(err, 'error get fcm token');
    }
  }
}

export const NotificationListener = () => {
  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage.notification,
  //   );
  // });

  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from quit state:',
  //         remoteMessage.notification,
  //       );
  //     }
  //   });

  // messaging().onMessage(async remoteMessage => {
  //   console.log('notification in foreground', remoteMessage);
  // });
};
