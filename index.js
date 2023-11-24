/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {navigate} from './src/PrismApp/util/RootNavigation';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // Update a users messages list using AsyncStorage
  const currentMessages = await AsyncStorage.getItem('messages');
  const messageArray = JSON.parse(currentMessages);
  messageArray.push(remoteMessage.data);
  await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
});
messaging().getInitialNotification(async remoteMessage => {
  console.log('YOooo');
  if (remoteMessage) {
    console.log('Hii');
    const data = remoteMessage.data;
    return Alert.alert(
      'Notification Received ',
      'Please Tap Ok To Give Response 😎',
      [{title: 'Next', onPress: () => navigate('Noti', data)}],
    );
  }
});
AppRegistry.registerComponent(appName, () => App);
