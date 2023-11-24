import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/AntDesign"
import { useFocusEffect } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";

const BookAmenities = ({ navigation, route }) => {
  const [MyAmenities, setMyAmenities] = useState([]);
  const authCtx = React.useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", { month: "long" });
  }
  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        setloading(true);
        try {
          const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Amenities.json?auth=${authCtx.token}`;
          const response = await axios.get(url);
          const temp = [];
          for (key in response.data) {
            const obj = {
              Amenity: response.data[key].Amenity,
              Fromdate: response.data[key].Fromdate,
              Fromtime: response.data[key].Fromtime,
              Todate: response.data[key].Todate,
              Totime: response.data[key].Totime,
              accepted: response.data[key].accepted,
              key: key,
              rejected: response.data[key].rejected,
            };
            temp.push(obj);
          }
          setMyAmenities(temp.reverse());
        } catch (error) {
          console.log(error);
          Alert.alert("Something Went Wrong", "Please Try after Some Time");
        }
        setloading(false);
      }
      getData();
    }, [])
  );
  async function Refersh() {
    setrefreshing(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Amenities.json?auth=${authCtx.token}`;
      const response = await axios.get(url);
      const temp = [];
      for (key in response.data) {
        const obj = {
          Amenity: response.data[key].Amenity,
          Fromdate: response.data[key].Fromdate,
          Fromtime: response.data[key].Fromtime,
          Todate: response.data[key].Todate,
          Totime: response.data[key].Totime,
          accepted: response.data[key].accepted,
          key: key,
          rejected: response.data[key].rejected,
        };
        temp.push(obj);
      }
      setMyAmenities(temp.reverse());
    } catch (error) {
      console.log(error);
      Alert.alert("Something Went Wrong", "Please Try after Some Time");
    }
    setrefreshing(false);
  }
  if (loading) {
    return <LoadingOverlay>Please Wait...</LoadingOverlay>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Icon3 name="arrowleft" color="black" size={24} style={{top:11,left:2}} onPress={()=>navigation.goBack()}/>
      <RefreshControl 
      refreshing={refreshing}
      onRefresh={Refersh}
      style={{

      }}
      >
        <View style={{ marginLeft: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins-SemiBold",
                color: "black",
                marginTop: 50,
                marginLeft: 10,
                paddingBottom: 10,
              }}
            >
              Book Amenities
            </Text>

            <Icon2
              onPress={({}) => {
                navigation.navigate("AddAmenities", route.params);
              }}
              name="add"
              size={34}
              color={"black"}
              style={{ marginTop: 50, paddingBottom: 10, left: -10 }}
            />
          </View>
        </View>
        </RefreshControl>
          {MyAmenities.length === 0 && (
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins-Medium",
                color: "black",
                marginTop: "70%",
                // marginLeft: 10,
                paddingBottom: 10,
                textAlign: "center",
              }}
            >
              No Amenity Requested if requried then Request
            </Text>
          )}
          <FlatList
            data={MyAmenities}
            renderItem={({ item }) => {
              const Todate = new Date(item.Todate);
              const Fromdate = new Date(item.Fromdate);
              const Totime = new Date(item.Totime);
              const Fromtime = new Date(item.Fromtime);
              return (
                <View
                  style={[
                    {
                      marginHorizontal: 10,
                      // borderWidth: 0.7,
                      borderRadius: 10,
                      borderColor: "gray",
                      elevation: 3,
                      marginBottom: 15,
                    },
                  ]}
                >
                  <View
                    style={{
                      backgroundColor: "#f2faff",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderBottomWidth: 0.2,
                      borderBottomColor: "gray",
                      borderTopWidth: 0.2,
                      borderTopColor: "gray",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        // padding: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: "Poppins-SemiBold",
                          color: "black",
                        }}
                      >
                        {item.Amenity}
                      </Text>
                      <Text
                        style={[
                          {
                            fontSize: 14,
                            fontFamily: "Poppins-SemiBold",
                            color: "white",

                            paddingTop: 5,
                            // borderRadius:10,
                            paddingBottom: 0,
                            right: -15,
                            top: -10,
                            borderBottomLeftRadius: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                          },
                          item.accepted && {
                            backgroundColor: "green",
                          },
                          !item.accepted && {
                            backgroundColor: "orange",
                          },
                          item.rejected && {
                            backgroundColor: "red",
                          },
                        ]}
                      >
                        {item.accepted && "CONFIRMED"}
                        {item.rejected && "REJECTED"}
                        {!item.rejected && !item.accepted && "PENDING"}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Poppins-Medium",
                        color: "black",
                        marginTop: 5,
                        marginLeft: 0,
                      }}
                    >
                      {Fromdate.getDate()} {getMonthName(Fromdate.getMonth())}
                      {","}
                      {Fromdate.getFullYear()} - {Todate.getDate()}{" "}
                      {getMonthName(Todate.getMonth())},{Todate.getFullYear()} |{" "}
                      {Fromtime.getHours() < 10
                        ? "0" + Fromtime.getHours()
                        : Fromtime.getHours()}
                      {":"}
                      {Fromtime.getMinutes() < 10
                        ? "0" + Fromtime.getMinutes()
                        : Fromtime.getMinutes()}{" "}
                      {Fromtime.getHours() >= 12 ? "pm" : "am"} -{" "}
                      {Totime.getHours() < 10
                        ? "0" + Totime.getHours()
                        : Totime.getHours()}
                      {":"}
                      {Totime.getMinutes() < 10
                        ? "0" + Totime.getMinutes()
                        : Totime.getMinutes()}{" "}
                      {Totime.getHours() >= 12 ? "pm" : "am"}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        backgroundColor: "white",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderBottomColor: "gray",
                      },
                      item.accepted ? {} : { justifyContent: "space-around" },
                    ]}
                  >
                    {item.accepted && (
                      <>
                        <Icon
                          name="thumbs-up"
                          // type="Feather"
                          size={24}
                          style={{
                            marginTop: 5,
                            marginLeft: "7%",
                          }}
                          color={"green"}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins-Medium",
                            color: "green",
                            marginTop: 5,
                            marginLeft: "10%",
                          }}
                        >
                          Accepted By Admin
                        </Text>
                      </>
                    )}

                    {item.rejected && (
                      <>
                        <Icon
                          name="thumbs-up"
                          // type="Feather"
                          size={24}
                          style={{
                            marginTop: 5,
                            marginLeft: "7%",
                          }}
                          color={"red"}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins-Medium",
                            color: "red",
                            marginTop: 5,
                            marginLeft: "10%",
                          }}
                        >
                          Rejected By Admin
                        </Text>
                      </>
                    )}
                    {!item.rejected && !item.accepted && (
                      <>
                        <Icon
                          name="thumbs-up"
                          // type="Feather"
                          size={24}
                          style={{
                            marginTop: 5,
                            marginLeft: "7%",
                          }}
                          color={"orange"}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins-Medium",
                            color: "orange",
                            marginTop: 5,
                            marginLeft: "5%",
                          }}
                        >
                          Not Seen By Admin
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              );
            }}
          />
        
     
    </View>
  );
};

export default BookAmenities;
