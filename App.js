import {
  Text,
  Image,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Prsim from './Prsim';
import Worker from './Worker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './src/PrismApp/components/Background';
import Logo from './src/PrismApp/components/Logo';
import Button from './src/PrismApp/components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppisReadyRef, Appnavigate, AppnavigationRef} from './App-Navigation';
import {
  askForMultiplyPermission,
  askForPermisson,
} from './src/Permissions/AppPermissions';
import {PERMISSIONS} from 'react-native-permissions';
import {createUser} from './src/PrismApp/util/auth';
import axios from 'axios';

const Stack = createStackNavigator();
function Main() {
  return (
    <Background>
      <Logo sty={{width: 200, height: 200, marginTop: -150}} />

      <Text
        style={{
          fontSize: 16,
          marginVertical: 20,
          marginTop: 0,
          color: 'black',
          fontFamily: 'Poppins-SemiBold',
        }}>
        Please Select One Of Them To Continue To Your Amazing App
      </Text>
      <TouchableOpacity
        onPress={() => Appnavigate('Aprism')}
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: 'black',
          borderRadius: 10,
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontFamily: 'Poppins-Medium',
            textAlignVertical: 'center',
            textAlign: 'center',
          }}>
          Owner of Flat
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Appnavigate('Aworker')}
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          width: '100%',
          borderColor: 'black',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontFamily: 'Poppins-Medium',
            textAlignVertical: 'center',
            textAlign: 'center',
          }}>
          Worker
        </Text>
      </TouchableOpacity>

    </Background>
  );
}
function Stacks() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Aprism"
        component={Prsim}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Aworker"
        component={Worker}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  async function get() {
    const uid = await AsyncStorage.getItem('Prism_UID');
    const token = await AsyncStorage.getItem('Prism_token');
    if (uid && token) {
      console.log(uid, token);
      Appnavigate('Aprism');
    }
    const Wtoken = await AsyncStorage.getItem('Worker_token');
    const Wuid = await AsyncStorage.getItem('Worker_UID');
    if (Wuid && Wtoken) {
      Appnavigate('Aworker');
    }
  }
  useEffect(() => {
    get();
    if (Platform.OS == 'android') {
      const perm = [
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ];
      askForMultiplyPermission(perm);
    }
  }, []);
  return (
    <NavigationContainer
      ref={AppnavigationRef}
      onReady={() => {
        AppisReadyRef.current = true;
      }}>
      <Stacks></Stacks>
    </NavigationContainer>
  );
}
