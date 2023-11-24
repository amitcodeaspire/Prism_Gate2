import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken()
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

export function notifcationListner(navigate) {
  
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigate("Noti")
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
          navigate('Noti',remoteMessage.data)
        }
      });
  });
}

export default requestUserPermission;
