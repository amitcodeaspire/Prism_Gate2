import React, { useContext, useEffect } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/PrismApp/core/theme";
import Dashboard from "./src/PrismApp/screens/UserScreen/Dashboard";
import AuthContextProvider, {
  AuthContext,
} from "./src/PrismApp/store/auth-context";
import PhoneDetails from "./src/PrismApp/screens/SignUpAndSignIn/PhoneDetails";
import EditProfile from "./src/PrismApp/screens/UserScreen/EditProfile";

import {
  Alert,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Modal,
  StatusBar,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activity from "./src/PrismApp/screens/UserScreen/Activity";
import Services from "./src/PrismApp/screens/UserScreen/Services";
import Profile from "./src/PrismApp/screens/UserScreen/Profile";
import requestUserPermission from "./src/PrismApp/util/notifcationservices";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPhone from "./src/PrismApp/screens/SignUpAndSignIn/LoginPhone";
import NotificationResponse from "./src/PrismApp/screens/UserScreen/NotificationResponse";

import {
  navigationRef,
  isReadyRef,
  navigate,
} from "././src/PrismApp/util/RootNavigation";
import Vistors from "./src/PrismApp/screens/UserScreen/Vistors";
import Feather from "react-native-vector-icons/Feather";
import { Icon } from "react-native-elements";
import AddVistors from "./src/PrismApp/screens/UserScreen/AddVistors";
import ManageHouseHold from "./src/PrismApp/screens/UserScreen/ManageHouseHold";
import AddFlat from "./src/PrismApp/screens/UserScreen/AddFlat";
import AddGuest from "./src/PrismApp/screens/UserScreen/AddGuest";
import DailyHelperDetail from "./src/PrismApp/screens/UserScreen/DailyHelperDetail";
import Attendance from "./src/PrismApp/screens/UserScreen/Attendance";
import AttendanceMonth from "./src/PrismApp/screens/UserScreen/AttendanceMonth";
import AttendanceYear from "./src/PrismApp/screens/UserScreen/AttendanceYear";
import AddDailyHelper from "./src/PrismApp/screens/UserScreen/AddDailyHelper";
import Add from "./src/PrismApp/screens/UserScreen/Add";
import AddVehicles from "./src/PrismApp/screens/UserScreen/AddVehicles";
import SignUpPhone from "./src/PrismApp/screens/SignUpAndSignIn/SignUpPhone";
import LoginEmail from "./src/PrismApp/screens/SignUpAndSignIn/LoginEmail";
import SignUpEmail from "./src/PrismApp/screens/SignUpAndSignIn/SignUpEmail";
import EmailDetails from "./src/PrismApp/screens/SignUpAndSignIn/EmailDetails";
import { ResetPasswordScreen } from "./src/PrismApp/screens/SignUpAndSignIn";
import AttendanceCalendar from "./src/PrismApp/screens/UserScreen/AttendanceCalendar";
import Test from "./src/PrismApp/screens/UserScreen/Test";
import LoadingOverlay from "./src/PrismApp/components/LoadingOverlay";
import AllSocietyAlert from "./src/PrismApp/screens/UserScreen/AllAlerts";
import BookAmenities from "./src/PrismApp/screens/UserScreen/BookAmenities";
// import SocietyPayment from "./src/PrismApp/screens/UserScreen/SocietyPayment";
import HelpDesk from "./src/PrismApp/screens/UserScreen/HelpDesk";
import AddHelp from "./src/PrismApp/screens/UserScreen/AddHelp";
import AddServiceMan from "./src/PrismApp/screens/UserScreen/AddServiceMan";
import AddCab from "./src/PrismApp/screens/UserScreen/AddCab";
import PaySocietyCharges from "./src/PrismApp/screens/UserScreen/PaySocietyCharges";
import RentPay from "./src/PrismApp/screens/UserScreen/RentPay";
import AddAmenities from "./src/PrismApp/screens/UserScreen/AddAmenities";
import ConfirmAmenities from "./src/PrismApp/screens/UserScreen/ConfirmAmenities";
import AllServiceMan from "./src/PrismApp/screens/UserScreen/AllServiceMan";
import axios from "axios";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function TabBarNavigation() {
  const CustomTabBarButton = ({ children, onPress }) => {
    const ModalPoup = ({ visible, children }) => {
      const [showModal, setShowModal] = React.useState(visible);
      const scaleValue = React.useRef(new Animated.Value(0)).current;
      React.useEffect(() => {
        toggleModal();
      }, [visible]);
      const toggleModal = () => {
        if (visible) {
          setShowModal(true);
          Animated.spring(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          setTimeout(() => setShowModal(false), 200);
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      };
      return (
        <Modal transparent visible={showModal}>
          <View style={styles.modalBackGround}>
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              {children}
            </Animated.View>
          </View>
        </Modal>
      );
    };
    const [visible, setVisible] = React.useState(false);
    return (
      <TouchableOpacity
        style={{
          top: -10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setVisible(true);
        }}
      >
        <View style={{ width: 70, height: 70, borderRadius: 35 }}>
          {children}
          <ModalPoup visible={visible}>
            <View
              style={{
                width: 200,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    marginLeft: 10,
                  }}
                >
                  Securtiy Alerts
                </Text>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require("./src/PrismApp/assets/x.png")}
                    style={{ height: 25, width: 25, marginLeft: 70 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "This feature is under developement",
                      "Under Developing Phase soon it will come"
                    )
                  }
                  style={{
                    backgroundColor: "#f2faff",
                    padding: 5,
                    marginLeft: 10,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    Fire
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                      marginTop: -5,
                    }}
                  >
                    Alert
                  </Text>
                  <Image
                    source={require("./src/PrismApp/assets/more_options/security_fire.png")}
                    style={{
                      width: 60,
                      height: 50,
                      marginLeft: 40,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "This feature is under developement",
                      "Under Developing Phase soon it will come"
                    )
                  }
                  style={{
                    backgroundColor: "#f2faff",
                    padding: 5,
                    marginLeft: 8,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    Stuck in
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                      marginTop: -5,
                    }}
                  >
                    Lift
                  </Text>
                  <Image
                    source={require("./src/PrismApp/assets/more_options/security_lift.png")}
                    style={{
                      width: 60,
                      height: 50,
                      marginLeft: 40,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "This feature is under developement",
                      "Under Developing Phase soon it will come"
                    )
                  }
                  style={{
                    backgroundColor: "#f2faff",
                    padding: 5,
                    marginLeft: 10,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    Animal
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                      marginTop: -5,
                    }}
                  >
                    Threat
                  </Text>
                  <Image
                    source={require("./src/PrismApp/assets/more_options/security_snake.png")}
                    style={{
                      width: 60,
                      height: 50,
                      marginLeft: 40,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "This feature is under developement",
                      "Under Developing Phase soon it will come"
                    )
                  }
                  style={{
                    backgroundColor: "#f2faff",
                    padding: 5,
                    marginLeft: 8,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    Vistors
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                      marginTop: -5,
                    }}
                  >
                    Threat
                  </Text>
                  <Image
                    source={require("./src/PrismApp/assets/more_options/security_admin.png")}
                    style={{
                      width: 60,
                      height: 50,
                      marginLeft: 40,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ModalPoup>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 1 }}
            >
              <Feather
                name="align-justify"
                color={color}
                size={24}
                style={{ marginRight: 2, marginTop: 5 }}
              />
              <Text style={{ color: "white", fontFamily: "Poppins-Bold" }}>
                Home
              </Text>
            </View>
          ),
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Activity"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 1 }}
            >
              <Feather
                name="clipboard"
                color={color}
                size={24}
                style={{ marginRight: 2, marginTop: 5 }}
              />
              <Text style={{ color: "white", fontFamily: "Poppins-Bold" }}>
                Activity
              </Text>
            </View>
          ),
        }}
        component={Activity}
      />
      <Tab.Screen
        name="Services"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 1 }}
            >
              <Feather
                name="tool"
                color={color}
                size={24}
                style={{ marginRight: 2, marginTop: 5 }}
              />
              <Text style={{ color: "white", fontFamily: "Poppins-Bold" }}>
                Service
              </Text>
            </View>
          ),
        }}
        component={Services}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./src/PrismApp/assets/add.png")}
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                // tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, headerStyle: {} }}
      />
      <Stack.Screen
        name="AddVehicles"
        component={AddVehicles}
        options={{ headerShown: false, headerStyle: {} }}
      />
      <Stack.Screen
        name="Noti"
        component={NotificationResponse}
        options={{ title: "Responsing To Notification" }}
      />
      <Stack.Screen
        name="AddVistors"
        component={AddVistors}
        options={{ title: "Add Vistors", headerShown: false }}
      />
      <Stack.Screen
        name="Vistors"
        component={Vistors}
        options={({ navigation }) => ({
          title: "Vistors",
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: "row", marginRight: 5 }}>
              <Icon
                name="add-circle"
                type="ionicon"
                size={30}
                onPress={() => navigation.replace("AddVistors")}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddFlat"
        component={AddFlat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddGuest"
        component={AddGuest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDailyHelper"
        component={AddDailyHelper}
        options={{
          title: "Add Daily Helper ",
          headerTitleStyle: { color: "gray", fontSize: 18, fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="DailyDetails"
        component={DailyHelperDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttendanceYear"
        component={AttendanceYear}
        options={{ headerTitle: "Year" }}
      />
      <Stack.Screen
        name="AttendanceMonth"
        component={AttendanceMonth}
        options={{ headerTitle: "Month" }}
      />
      <Stack.Screen
        name="AttCal"
        component={AttendanceCalendar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{
          title: "Attendance Dates",
          headerTitleAlign: "center",
          headerTitleStyle: {
            textAlign: "center",
            fontSize: 20,
            color: "black",

            fontFamily: "Poppins-Bold",
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "blacks",
          },
        }}
      />
      <Stack.Screen
        name="AllAlerts"
        component={AllSocietyAlert}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookAmenities"
        component={BookAmenities}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaySocietyCharges"
        component={PaySocietyCharges}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HelpDesk"
        component={HelpDesk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddHelp"
        component={AddHelp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddServiceMan"
        options={{ headerShown: false }}
        component={AddServiceMan}
      />
      <Stack.Screen
        name="AddCab"
        options={{ headerShown: false }}
        component={AddCab}
      />
      <Stack.Screen
        name="RentPay"
        options={{ headerShown: false }}
        component={RentPay}
      />
      <Stack.Screen
        name="AddAmenities"
        component={AddAmenities}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="ConfirmAmenities"
      component={ConfirmAmenities}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name="AllServiceMan"
      component={AllServiceMan}
      options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator  initialRouteName="LoginEmail">
      <Stack.Screen
        name="LoginPhone"
        component={LoginPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpPhone"
        component={SignUpPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneDetails"
        component={PhoneDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpEmail"
        component={SignUpEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailDetails"
        component={EmailDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="StartScreen"
    //     component={StartScreen}
    //     options={{headerShown: false}}
    //   />
    //   <Stack.Screen
    //     name="LoginScreen"
    //     component={LoginScreen}
    //     options={{headerShown: false}}
    //   />
    //   <Stack.Screen
    //     name="RegisterScreen"
    //     component={RegisterScreen}
    //     options={{headerShown: false}}
    //   />
    //   <Stack.Screen
    //     name="ResetPasswordScreen"
    //     component={ResetPasswordScreen}
    //     options={{headerShown: false}}
    //   />
    //   <Stack.Screen
    //     name="Phone"
    //     component={PhoneNumber}
    //     options={{headerShown: false}}
    //   />
    //   <Stack.Screen
    //     name="Information"
    //     component={UserDetails}
    //     options={{headerShown: false}}
    //   />
    //   <Stack.Screen
    //     name="Infor"
    //     component={PhoneDetails}
    //     options={{headerShown: false}}
    //   />
    //   <Stack.Screen
    //     name="PhoneLogin"
    //     component={LoginPhone}
    //     options={{headerShown: false}}
    //   />
    // </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedScreen />}
    </>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = React.useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("Prism_token");
      const storedUID = await AsyncStorage.getItem("Prism_UID");
      const fcmToken = await AsyncStorage.getItem("FcmToken");
      if (storedToken && storedUID) {
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${storedUID}/Details.json?auth=${storedToken}`;
        const response = await axios.patch(url, {
          FcmToken: fcmToken
        });
        authCtx.authenticate(storedToken);
        authCtx.setuid(storedUID);
      }

     
      } catch (error) {
      alert("Something went wrong")
      console.log(error)
      } setIsTryingLogin(false);
      
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay>Please Wait... l</LoadingOverlay>;
  }

  return <Navigation />;
}

export default function Prsim() {
  useEffect(() => {
    requestUserPermission();
    messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      Alert.alert(
        JSON.stringify(remoteMessage.notification.title),
        JSON.stringify(remoteMessage.notification.body)
      );
      console.log(remoteMessage.data);
      navigate("Noti", remoteMessage.data);
      return ToastAndroid.SHORT("Notification Received");
    });
    messaging().getInitialNotification(async (remoteMessage) => {
      if (remoteMessage) {
        const data = remoteMessage.data;
        return Alert.alert(
          "Notification Received ",
          "Please Tap Ok To Give Response 😎",
          [{ title: "Next", onPress: () => navigate("Noti", data) }]
        );
      }
    });
    messaging().setBackgroundMessageHandler(async (remotemessage) => {
      const data = remotemessage.data;
      return Alert.alert(
        "Notification Received ",
        "Please Tap Ok To Give Response 😎",
        [{ title: "Next", onPress: () => navigate("Noti", data) }]
      );
    });
  }, []);
  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  // if (remoteMessage) {
  //   const data = remoteMessage.data;
  //   return Alert.alert(
  //     'Notification Received ',
  //     'Please Tap Ok To Give Response 😎',
  //     [{title: 'Next', onPress: () => navigate('Noti', data)}],
  //   );
  // }
  //   });
  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!', remoteMessage);
  // navigate('Noti', remoteMessage.data);
  // });

  // notifcationListner(navigate);
  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage.notification,
  //   );
  //   navigate('Noti', remoteMessage.data);
  //     });

  // }, [requestUserPermission, notifcationListner]);
  return (
    <>
      <StatusBar backgroundColor="black" />
      <AuthContextProvider>
        <Provider theme={theme}>
          <NavigationContainer
            independent={true}
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
            }}
          >
            <Root />
          </NavigationContainer>
        </Provider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
