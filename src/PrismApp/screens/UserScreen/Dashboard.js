import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  RefreshControl
} from "react-native";
// import Fontisto from "react-native-vector-icons/Fontisto";

import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import { ScrollView } from "react-native-virtualized-view";

// import { StatusBar } from "react-native";
import { Alert } from "react-native";
// import { getVistors, postData } from "../../util/auth";
// import LoadingOverlay from "../../components/LoadingOverlay";
import Background from "../../components/Background";
import { useFocusEffect } from "@react-navigation/native";
export default function Dashboard({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const authCtx = useContext(AuthContext);
  const [flatno, setflatno] = useState("Loading..");
  const [Name, setName] = useState("Loading..");
  const [Society, setSociety] = useState();
  const [loading, setloading] = useState(true);
  const [Visable, setVisable] = useState(false);
  const [imageUri, setimageUri] = useState();
  const [lenAlerts, setlenAlerts] = useState(0);
  const [refershing,setrefershing] = useState(false)
  async function getData() {
    setloading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Details.json?auth=${authCtx.token}`;
      // console.log(url);
      const response = await axios.get(url);
      console.log();
      const url1 = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${response.data.Society}/SocietyAlerts.json?auth=${authCtx.token}`;
      
      const resp = await axios.get(url1);
    
      var count = 0
      for (var i in resp.data){ 
        if (resp.data[i].accepted){
          count+=1
        }
      }
      setlenAlerts(count);
      setflatno(response.data.flatno);
      setName(response.data.Name);
      setSociety(response.data.Society);
      setimageUri(response.data.Imageuri);
      authCtx.setSociety(response.data.Society);
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Cant Load",
        "Please Try again after some time with better network or logout then login !"
      );
    }
    setloading(false);
  }
  async function Refersh() {
    setrefershing(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Details.json?auth=${authCtx.token}`;
      // console.log(url);
      const response = await axios.get(url);
      console.log();
      const url1 = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${response.data.Society}/SocietyAlerts.json?auth=${authCtx.token}`;
      
      const resp = await axios.get(url1);
    
      var count = 0
      for (var i in resp.data){ 
        if (resp.data[i].accepted){
          count+=1
        }
      }
      setlenAlerts(count);
      setflatno(response.data.flatno);
      setName(response.data.Name);
      setSociety(response.data.Society);
      setimageUri(response.data.Imageuri);
      authCtx.setSociety(response.data.Society);
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Cant Load",
        "Please Try again after some time with better network or logout then login !"
      );
    }
    setrefershing(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      // alert("Enter");
      getData();
      return () => {};
    }, [])
  );
  const AllowServices = [
    {
      key: 1,
      image: require('../../assets/allow/allow_guest.png'),
      Firsttitle: 'Add',
      Lasttitle: 'City',
      onPress: () => {
        navigation.navigate("AddCity");
      },
      
    },
    {
      key: 2,
      image: require("../../assets/allow/allow_deliveryman.png"),
      Firsttitle: "Add",
      Lasttitle: "Vistor",
      onPress: () => {
        navigation.navigate("AddVistors");
      },
    },
   
    {
      key: 3,
      image: require("../../assets/allow/allow_serviceman.png"),
      Firsttitle: "Request",
      Lasttitle: "Service Man",
      onPress: () => {
        navigation.navigate("AddServiceMan", {
          Name: Name,
          flatno: flatno,
        });
      },
    },
    {
      key: 4,
      image: require("../../assets/allow/allow_cab.png"),
      Firsttitle: "Add",
      Lasttitle: "Cab",
      onPress: () => {
        navigation.navigate("AddCab", {
          Name: Name,
          flatno: flatno,
        });
      },
    },
  ];
  if (loading) {
    return (
      <Background>
        <Image
          source={require("../../assets/loading.gif")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
          Loading Please wait
        </Text>
      </Background>
    );
  }

  const Community = [
    {
      key: 1,
      title: "Help Desk                                         ",
      desc: "Complaint & Suggestion",
      image: require("../../assets/community/community1.png"),
      onPress: () => {
        navigation.navigate("HelpDesk", {
          Name: Name,
          Society: Society,
          flatno: flatno,
        });
      },
    },
    {
      key: 2,
      title: lenAlerts === 0?"Notice Board                                  ":"Notice Board                            ",
      desc: "Society Announcement & Alerts",
      image: require("../../assets/community/community2.png"),
      onPress: () => {
        navigation.navigate("AllAlerts");
      },
    },
    // var data = JSON.stringify();
    {
      key: 3,
      title: "Do Society Payment                   ",
      desc: "Direct Payment of Society dues",
      image: require("../../assets/community/community3.png"),
      onPress: () => {
        setVisable(true);
      },
    },
    {
      key: 4,
      title: "Book Amenities                            ",
      desc: "Pre Book Society ammenites",
      image: require("../../assets/community/community4.png"),
      onPress: () => {
        navigation.navigate("BookAmenities", {
          Name: Name,
          // Society: Society,
          flatno: flatno,
        });
      },
    },
    {
      key: 5,
      title: "Service Man                               ",
      desc: "Service Man That You Have Requested",
      image: require("../../assets/allow/allow_serviceman.png"),
      onPress: () => {
        navigation.navigate("AllServiceMan", {
          Name: Name,
          // Society: Society,
          flatno: flatno,
        });
      },
    },
  ];
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        {/* <Fontisto
          name="bell-alt"
          size={24}
          color="gray"
          style={{
            marginRight: 10,
            marginTop: 5,
          }}
          // style={{marginHorizontal: 18, marginTop: 15}}
        /> */}
        <Text
          style={{
            fontSize: 20,
            marginTop: 5,
            fontFamily: "Poppins-SemiBold",
            color: "black",
          }}
        >
          {flatno}
        </Text>
        <Text
          style={{
            fontSize: 26,
            // marginTop: 13,

            fontFamily: "Poppins-Medium",
            // fontWeight:"bold",
            color: "black",
          }}
        >
          Prism Gate
        </Text>
        {imageUri ? (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                // marginLeft: windowWidth / 6,
                // marginTop: 8,
                borderWidth: 1,
                borderColor: "black",
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../../assets/Profile-icon.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                // marginLeft: windowWidth / 6,
                // marginTop: 8,
                marginLeft: 10,
                borderWidth: 1,
                borderColor: "black",
                // alignItems: 'flex-end',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <RefreshControl
      refreshing={refershing}
      onRefresh={Refersh}
      style={{
        flex:1
      }}
      >
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >

      
        <View style={{ marginHorizontal: 15, marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: "black",
              fontSize: 20,
            }}
          >
            Pre Approve Vistors
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Poppins-Light",
            }}
          >
            Add Vistors details for quick entries
          </Text>
        </View>
        <View>
          <FlatList
            horizontal
            style={{ marginTop: 20, marginLeft: 5 }}
            data={AllowServices}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={item.onPress}
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
                    {item.Firsttitle}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                      marginTop: -5,
                    }}
                  >
                    {item.Lasttitle}
                  </Text>
                  <Image
                    source={item.image}
                    style={{
                      width: 90,
                      height: 75,
                      marginLeft: 40,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
          <Modal visible={Visable} transparent={true} animationType="fade">
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.5)",
                width: width,
                height: height,
                position: "absolute",
                // top: 10,
              }}
            >
              <View
                style={{
                  // width:"50%",.
                  // height:200,
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 50,
                    paddingVertical: 30,
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setVisable(false)}
                    style={{
                      left: -40,
                      top: -20,
                    }}
                  >
                    <Image
                      source={require("../../assets/x.png")}
                      // resizeMethod='resize'
                      resizeMode="contain"
                      style={{ height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVisable(false);
                      navigation.navigate("PaySocietyCharges");
                    }}
                    style={{
                      marginBottom: 20,
                      backgroundColor: "black",
                      borderRadius: 60,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 16,
                        color: "white",
                        paddingHorizontal: 15,
                        textAlign: "center",
                      }}
                    >
                      Society Maintenace
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVisable(false);
                      navigation.navigate("RentPay");
                    }}
                    style={{}}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 18,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Bills
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ marginTop: 20, marginLeft: 15, marginRight: 15 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-SemiBold",
              color: "black",
            }}
          >
            Community
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              fontFamily: "Poppins-Light",
            }}
          >
            Everthing about society management
          </Text>
          <FlatList
            style={{ marginTop: 1 }}
            data={Community}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#f2faff",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 15,
                    marginBottom: 10,
                    flex: 1,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                        color: "black",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      {item.desc}
                    </Text>
                  </View>
                  {index === 1 && lenAlerts != 0 && (
                    <View
                      style={{
                        // backgroundColor:"red",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                        color: "white",
                        top: "5%",
                        left: "-30%",
                        width: 30,
                        height: 30,
                        borderRadius: 30 / 2,
                        backgroundColor: "red",

                        // padding:5
                      }}
                    >
                      <Text
                        style={{
                          // backgroundColor:"red",
                          fontSize: 14,
                          fontFamily: "Poppins-SemiBold",
                          color: "white",
                          textAlign: "center",
                          padding: 5,
                        }}
                      >
                        {lenAlerts < 9 ? lenAlerts : "9+"}
                      </Text>
                    </View>
                  )}
                  <Image
                    source={item.image}
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 28,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
          </RefreshControl>
    </>
  );
}
