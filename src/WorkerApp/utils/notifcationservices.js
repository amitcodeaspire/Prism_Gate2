import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(error);
    }
    // messaging.getToken().then((token)=>console.log('Jai Shree Ram')).catch((e)=>console.log('Jai MAta di'))
  }
}

async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('FcmToken');
  console.log(fcmToken, ' oldToken');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'New Token');
        await AsyncStorage.setItem('FcmToken', fcmToken);
      }
    } catch (e) {
      console.error(e, 'error raised in fcmtoken');
    }
  }
}

export function notifcationListner() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // foreground

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  });
}

export default requestUserPermission;
