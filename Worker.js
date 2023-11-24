import React, {useContext, useEffect, useState} from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from './src/WorkerApp/src/core/theme';
import Dashboard from './src/WorkerApp/src/screens/UserScreen/Dashboard';
import AuthContextProvider, {
  AuthContext,
} from './src/WorkerApp/store/auth-context';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {StatusBar} from 'react-native/Libraries/Components/StatusBar/StatusBar';
import messaging from '@react-native-firebase/messaging';
import requestUserPermission, {
  notifcationListner,
} from './src/WorkerApp/utils/notifcationservices';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SendNoti from './src/WorkerApp/src/screens/UserScreen/SendNoti';
import AddDaily from './src/WorkerApp/src/screens/UserScreen/AddDaily';
import AllDaily from './src/WorkerApp/src/screens/UserScreen/AllDaily';
import EditAll from './src/WorkerApp/src/screens/UserScreen/EditAll';
import Attendance from './src/WorkerApp/src/screens/UserScreen/Attendance';
import Check from './src/WorkerApp/src/screens/UserScreen/Check';
import SocietyAlert from './src/WorkerApp/src/screens/UserScreen/AddSocietyAlert';
import AllSocietyAlert from './src/WorkerApp/src/screens/UserScreen/AllSocietyAlert';
import LoginPhone from './src/WorkerApp/src/screens/SignUpAndSignIn/LoginPhone';
import SignUpPhone from './src/WorkerApp/src/screens/SignUpAndSignIn/SignUpPhone';
import LoginEmail from './src/WorkerApp/src/screens/SignUpAndSignIn/LoginEmail';
import SignUpEmail from './src/WorkerApp/src/screens/SignUpAndSignIn/SignUpEmail';
import Feather from 'react-native-vector-icons/Feather';
import ResetPasswordScreen from './src/WorkerApp/src/screens/SignUpAndSignIn/ResetPasswordScreen';
import EmailDetails from './src/WorkerApp/src/screens/SignUpAndSignIn/EmailDetails';
import PhoneDetails from './src/WorkerApp/src/screens/SignUpAndSignIn/PhoneDetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EditProfile from './src/WorkerApp/src/screens/UserScreen/EditProfile';
import Background from './src/PrismApp/components/Background';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function TabBarNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Attendance"
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Feather
                name="check-circle"
                color={color}
                size={24}
                style={{marginRight: 2, marginTop: 5}}
              />
              <Text style={{color: 'white', fontFamily: 'Poppins-Bold'}}>
                Attendance
              </Text>
            </View>
          ),
        }}
        component={Attendance}
      />
      <Tab.Screen
        name="Notification"
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Feather
                name="bell"
                color={color}
                size={24}
                style={{marginRight: 2, marginTop: 5}}
              />
              <Text style={{color: 'white', fontFamily: 'Poppins-Bold'}}>
                Notification
              </Text>
            </View>
          ),
        }}
        component={SendNoti}
      />
      <Tab.Screen
        name="AllDaliy"
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Feather
                name="users"
                color={color}
                size={24}
                style={{marginRight: 2, marginTop: 5}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 12,
                }}>
                Daily Helpers
              </Text>
            </View>
          ),
        }}
        component={AllDaily}
      />
      <Tab.Screen
        name="AllSocietyAlert"
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Feather
                name="users"
                color={color}
                size={24}
                style={{marginRight: 2, marginTop: 5}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 12,
                }}>
                Alerts & Notice
              </Text>
            </View>
          ),
        }}
        component={AllSocietyAlert}
      />
      {/* <Tab.Screen
        name="Services"
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Feather
                name="tool"
                color={color}
                size={24}
                style={{marginRight: 2, marginTop: 5}}
              />
              <Text style={{color: 'white', fontFamily: 'Poppins-Bold'}}>
                Alerts & Notice
              </Text>
            </View>
          ),
        }}
        component={Services}
      /> */}
      {/* <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./src/PrismApp/assets/add.png')}
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                // tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      /> */}
    </Tab.Navigator>
  );
}
function AuthenticatedScreen() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={TabBarNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Check"
        component={Check}
        options={{
          title: 'Mark Attendance',
        }}
      />
      <Stack.Screen
        name="AddAlert"
        component={SocietyAlert}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditAll"
        component={EditAll}
        options={{
          title: 'Edit',
        }}
      />
      <Stack.Screen name="AddDaily" component={AddDaily} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='LoginEmail'>
      {/* <Stack.Screen
        component={LoginPhone}
        name="LoginPhone"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpPhone"
        component={SignUpPhone}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpEmail"
        component={SignUpEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmailDetails"
        component={EmailDetails}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="PhoneDetails"
        component={PhoneDetails}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <Provider theme={theme}>
      <NavigationContainer independent={true}>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedScreen />}
      </NavigationContainer>
    </Provider>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = React.useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('Worker_token');
      const storedUID = await AsyncStorage.getItem('Worker_UID');
      if (storedToken && storedUID) {
        authCtx.authenticate(storedToken);
        authCtx.setuid(storedUID);
      }

      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return (
      <Background>
        <Image
          source={require('./src/WorkerApp/src/assets/loading.gif')}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
        <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
          Loading Please wait
        </Text>
      </Background>
    );
  }

  return <Navigation />;
}

export default function Prsim() {
  useEffect(() => {
    requestUserPermission();
  }, []);
  useEffect(() => {
    requestUserPermission();
    notifcationListner();
    messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert(
        JSON.stringify(remoteMessage.notification.title),
        JSON.stringify(remoteMessage.notification.body),
      );
    });
  }, [requestUserPermission, notifcationListner]);

  return (
    <>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
