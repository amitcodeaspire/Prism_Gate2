import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  Image,
  FlatList,
  Alert,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Animated,
  Linking,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";
import axios from "axios";
import Icon3 from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDaily, getFlats } from "../../util/auth";
import { ScrollView } from "react-native-virtualized-view";
import Background from "../../components/Background";
import Share from "react-native-share";
import BackButton from "../../components/BackButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
export default Profile = ({}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const [details, setdetails] = useState({
    State: "",
    City: "",
    Society: "",
    flatno: "",
    Name: "",
    Email: "",
  });

  const [Imageuri, setImageuri] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [DailyHelp, setDailyHelp] = useState();
  const [Vehicles, setVehicles] = useState([
    {
      key: 1,
      VehicleColor: "Black & Green",
      VehicleModel: "Kawaski H2R",
      VehicleNumber: "UP327AQ001",
      imageuri: require("../../assets/h2r.jpg"),
    },
  ]);
  const [Cabs, setCabs] = useState();
  const [allDailyHelp, setallDailyHelp] = useState();
  const [Flats, setFlats] = useState();
  const authCtx = useContext(AuthContext);
  const [HouseHold, setHouseHold] = useState(true);
  const [Settings, setSettings] = useState(false);

  // const [show,setshow] =useState(false)
  async function shareDetails() {
    const shareoptions = {
      message: details.flatno + ", " + details.Society,
    };
    try {
      const shareResponse = await Share.open(shareoptions);
    } catch (e) {
      console.log(e);
    }
  }
  async function getData() {
    setisLoading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com//Users/${authCtx.uid}/Details.json?auth=${authCtx.token}`;

      const response = await axios.get(url);
      const url2 =
        "https://prism-worker-gate-default-rtdb.firebaseio.com/Users/" +
        authCtx.uid +
        "/DailyHelp.json" +
        "?auth=" +
        authCtx.token;
      const url3 =
        "https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/" +
        authCtx.Society +
        "/DailyHelper.json?auth=" +
        authCtx.token;
      const url4 = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Cabs.json?auth=${authCtx.token}`;
      const respCab = await axios.get(url4);
      var tempCab = [];
      for (key in respCab.data) {
        var obj = {
          CabNumber: respCab.data[key].CabNumber,
          CabCompany: respCab.data[key].CabCompany,
          key: key,
        };
        tempCab.push(obj);
      }
      setCabs(tempCab);
      const imageuri = await response.data.Imageuri;
      setImageuri(imageuri);
      const res2 = await getDaily(url2);
      let res3 = await getDaily(url3);
      setDailyHelp(res2);
      setallDailyHelp(res3);

      setdetails({
        State: response.data.State,
        City: response.data.City,
        Society: response.data.Society,
        flatno: response.data.flatno,
        Name: response.data.Name,
        Email: response.data.Email,
        MobileNumber: response.data.MobileNumber,
        Imageuri: response.data.Imageuri,
      });

      const flats = await getFlats(authCtx.uid, authCtx.token);
      setFlats(flats);
    } catch (e) {
      Alert.alert(
        "Please Try Again Later",
        "Failed To Load Please Try Again Later"
      );
      console.log(e);
    }
    setisLoading(false);
  }

  // useEffect(() => {
  //   getData();
  // }, [authCtx]);
  useFocusEffect(
    React.useCallback(() => {
      // alert("Enter");
      getData();
      return () => {};
      // return () => {
      //   if (authCtx.reload) {
      //     navigation.navigate("Dashboard")
      //     authCtx.setreload(false)
      //   }

      // };
    }, [])
  );

  if (isLoading) {
    return (
      <Background>
        <Image
          source={require("../../assets/loading.gif")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
          Loading Please wait...
        </Text>
      </Background>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* <Text onPress={()=>{authCtx.logout()}}>Log out</Text> */}
      <View style={{ marginBottom: 60, marginHorizontal: 10, marginTop: 10 }}>
        <BackButton goBack={() => navigation.goBack()} />
      </View>
      <View
        style={{
          borderWidth: 0.3,
          borderColor: "gray",
          marginHorizontal: 15,
          borderRadius: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={{
            flexDirection: "row",
            // borderWidth:1,
            backgroundColor: "#f2faff",
            paddingHorizontal: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: "gray",
            paddingVertical: 10,
          }}
        >
          {details.Imageuri ? (
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 70 / 2,
                resizeMode: "contain",
              }}
              source={{ uri: details.Imageuri }}
            />
          ) : (
            <Image
              source={require("../../assets/Profile-icon.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 25,
                resizeMode: "contain",
              }}
            />
          )}
          <View style={{ marginLeft: 20, marginTop: 4 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Bold",
                color: "black",
                marginTop: 5,
              }}
            >
              {details.Name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: -4,
                fontFamily: "Poppins-Medium",
              }}
            >
              View Profile
            </Text>
          </View>
          {/* <Image
            source={require('../../assets/icons/ic_qrCode.png')}
            style={{
              alignSelf: 'flex-end',
              width: 25,
              height: 25,
              resizeMode: 'contain',
              marginLeft:100
            }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 10,
            marginLeft: 5,
            justifyContent: "space-around",
          }}
        >
          <Ionicons name="business-outline" color="gray" size={24} style={{}} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: "black",
            }}
          >
            {details.flatno}, {details.Society}
          </Text>
          <TouchableOpacity onPress={shareDetails}>
            <Ionicons name="share-social" size={24} color="gray" style={{}} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 25,
          marginHorizontal: 20,
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setHouseHold(true);
            setSettings(false);
          }}
        >
          <Text
            style={[
              {
                fontSize: 18,
                fontFamily: "Poppins-SemiBold",

                letterSpacing: 1,
              },
              HouseHold ? { color: "black" } : { color: "gray" },
            ]}
          >
            HouseHold
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSettings(true);
            setHouseHold(false);
          }}
        >
          <Text
            style={[
              {
                fontSize: 18,
                fontFamily: "Poppins-SemiBold",
                color: "black",
                letterSpacing: 1,
              },
              Settings ? { color: "black" } : { color: "gray" },
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      {/* HouseHold work */}
      {HouseHold && (
        <ScrollView>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              padding: 10,
              marginTop: 20,
              borderWidth: 0.2,
              borderRadius: 4,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // alignItems: 'center',
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontFamily: "Poppins-SemiBold",
                  color: "black",
                }}
              >
                Daily Help
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddDailyHelper", allDailyHelp);
                }}
                style={{
                  backgroundColor: "black",
                  padding: 5,
                  borderBottomLeftRadius: 15,
                  paddingHorizontal: 10,
                  paddingBottom: 1,
                  marginBottom: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  + Add
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Medium",
                color: "gray",
              }}
            >
              Add maid, laundry, helper for quick entries
            </Text>
            {DailyHelp && (
              <FlatList
                data={DailyHelp}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 10,
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("DailyDetails", {
                          item: item,
                          all: allDailyHelp,
                          date: {
                            "2023-05-07": {
                              customStyles: {
                                container: { backgroundColor: "green" },
                                text: { color: "white" },
                              },
                            },
                            "2023-05-05": {
                              customStyles: {
                                container: { backgroundColor: "green" },
                                text: { color: "white" },
                              },
                            },
                          },
                        })
                      }
                      style={{
                        backgroundColor: "#f2faff",
                        padding: 20,
                        borderRadius: 10,
                        marginRight: 8,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            width: 55,
                            height: 55,
                            borderRadius: 55 / 2,
                            marginLeft: -5,
                            paddingBottom: 5,
                            marginBottom: 10,
                            marginRight: 5,
                          }}
                        />
                        <Image
                          source={require("../../assets/icons/ic_qrCode.png")}
                          style={{
                            // alignSelf: 'flex-end',
                            marginLeft: 15,
                            width: 20,
                            height: 20,
                            resizeMode: "contain",
                            marginTop: 10,
                          }}
                        />
                      </View>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins-Medium",
                            color: "black",
                          }}
                        >
                          {item.Name.length < 9
                            ? item.Name
                            : item.Name.substring(0, 9) + "..."}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins-Medium",
                            marginTop: -5,
                          }}
                        >
                          {item.Type}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              padding: 10,
              marginTop: 20,
              borderWidth: 0.2,
              borderRadius: 4,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // alignItems: 'center',
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontFamily: "Poppins-SemiBold",
                  color: "black",
                }}
              >
                My Vehicles
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("AddVehicles")}
                style={{
                  backgroundColor: "black",
                  padding: 5,
                  borderBottomLeftRadius: 15,
                  paddingHorizontal: 10,
                  paddingBottom: 1,
                  marginBottom: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  + Add
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Medium",
                color: "gray",
              }}
            >
              Add your vehicles for quick entries
            </Text>
            {Vehicles ? (
              <FlatList
                data={Vehicles}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 10,
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#f2faff",
                        padding: 20,
                        borderRadius: 10,
                        marginRight: 8,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={item.imageuri}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 70 / 2,
                            marginLeft: -5,
                            paddingBottom: 5,
                            marginBottom: 10,
                            marginRight: 5,
                          }}
                        />
                        <Image
                          source={require("../../assets/icons/ic_qrCode.png")}
                          style={{
                            // alignSelf: 'flex-end',
                            marginLeft: 15,
                            width: 20,
                            height: 20,
                            resizeMode: "contain",
                            marginTop: 10,
                          }}
                        />
                      </View>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins-Medium",
                            color: "black",
                          }}
                        >
                          {item.VehicleNumber}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins-Medium",
                            marginTop: -5,
                          }}
                        >
                          {item.VehicleModel}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins-Medium",
                            marginTop: -5,
                            fontSize: 10,
                          }}
                        >
                          {item.VehicleColor}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              padding: 10,
              marginTop: 20,
              borderWidth: 0.2,
              borderRadius: 4,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // alignItems: 'center',
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontFamily: "Poppins-SemiBold",
                  color: "black",
                }}
              >
                Booked Cabs
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddCab", {
                    Name: details.Name,
                    flatno: details.flatno,
                  })
                }
                style={{
                  backgroundColor: "black",
                  padding: 5,
                  borderBottomLeftRadius: 15,
                  paddingHorizontal: 10,
                  paddingBottom: 1,
                  marginBottom: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  + Add
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Medium",
                color: "gray",
              }}
            >
              Cabs That You Have Booked
            </Text>
            {Cabs ? (
              <FlatList
                data={Cabs}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 10,
                }}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        backgroundColor: "#f2faff",
                        padding: 20,
                        borderRadius: 10,
                        marginRight: 8,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={require("../../assets/icons/taxi.png")}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 70 / 2,
                            marginLeft: -5,
                            paddingBottom: 5,
                            marginBottom: 10,
                            marginRight: 5,
                            resizeMode: "contain",
                          }}
                        />
                        <TouchableOpacity
                          onPress={async () => {
                            setisLoading(true);
                            function del(obj) {
                              setisLoading(false);
                              return item.key != obj.key;
                            }
                            try {
                              const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Cabs/${item.key}.json?auth=${authCtx.token}`;
                              const resp = await axios.delete(url);

                              const newCab = Cabs.filter(del);
                              setCabs(newCab);
                            } catch (e) {
                              console.log(e, "dfsfjldsnkjfbdkjfbdskfshb");
                              Alert.alert(
                                "Something Went Wrong",
                                "Please Try Again Later"
                              );
                              setisLoading(false);
                            }
                          }}
                        >
                          <Icon3
                            name="trash"
                            // type="Feather"
                            size={24}
                            style={{
                              // alignSelf: 'flex-end',
                              marginLeft: 15,

                              marginTop: 10,
                            }}
                            color={"red"}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins-Medium",
                            color: "black",
                          }}
                        >
                          {item.CabNumber}
                        </Text>
                        <View>
                          <Text
                            style={{
                              fontFamily: "Poppins-Medium",
                              marginTop: -5,
                            }}
                          >
                            {item.CabCompany.length < 8
                              ? item.CabCompany
                              : item.CabCompany.substring(0, 8) + ".."}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      )}
      {/*9452945201 raj*/}
      {Settings && (
        <ScrollView
          style={{
            marginHorizontal: 16,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#EFF8FC",
              paddingLeft: 15,
              paddingVertical: 10,
              borderWidth: 0.2,
              borderColor: "gray",
              borderRadius: 4,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddFlat");
              }}
              style={{
                backgroundColor: "black",
                padding: 5,
                borderBottomLeftRadius: 15,
                paddingHorizontal: 10,
                paddingBottom: 1,
                marginBottom: 3,
                alignSelf: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                + Add
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins-Medium",
                color: "gray",
                marginBottom: 2,
                marginTop: -15,
              }}
            >
              My Flat or Villa
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <Image
                source={require("../../assets/icons/home.png")}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Poppins-Medium",
                  color: "black",
                  marginLeft: 30,
                }}
              >
                {details.flatno}, {details.Society}
              </Text>
            </View>
            {Flats && (
              <FlatList
                style={{
                  marginTop: 3,
                }}
                data={Flats}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/home.png")}
                        style={{
                          width: 40,
                          height: 40,
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: "Poppins-Medium",
                          color: "black",
                          marginLeft: 30,
                        }}
                      >
                        {item.flatno}, {item.Society}
                      </Text>
                    </View>
                  );
                }}
              />
            )}
          </View>
          <View
            style={{
              backgroundColor: "#EFF8FC",
              paddingLeft: 15,
              paddingVertical: 5,
              borderWidth: 0.2,
              borderColor: "gray",
              borderRadius: 4,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 20,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/mail.png")}
                style={{
                  resizeMode: "contain",
                  width: 40,
                  height: 40,
                  marginRight: 15,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
              >
                Contact & Support
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await Linking.openURL(
                  "https://raw.githubusercontent.com/Vimal1464/TermsAndConditons/master/Terms%20And%20Conditions.txt"
                );
              }}
              style={{
                paddingVertical: 10,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/clipboard.png")}
                style={{
                  resizeMode: "contain",
                  width: 40,
                  height: 40,
                  marginRight: 15,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                authCtx.logout();
              }}
              style={{
                paddingVertical: 10,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/logout.png")}
                style={{
                  resizeMode: "contain",
                  width: 40,
                  height: 40,
                  marginRight: 18,
                  marginTop: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
              >
                LogOut
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
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
