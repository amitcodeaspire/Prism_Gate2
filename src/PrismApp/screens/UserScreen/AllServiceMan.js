import { View, Text, Alert, FlatList, RefreshControl } from "react-native";
import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import BackButton from "../../components/BackButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Feather";
const AllServiceMan = ({ navigation, route }) => {
  const [loading, setloading] = useState(false);
  const [ServiceMans, setServiceMans] = useState([]);
  const [refershing, setrefershing] = useState(false);
  const authctx = useContext(AuthContext);
  async function get() {
    setloading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authctx.uid}/ServiceMans.json?auth=${authctx.token}`;
      const response = await axios.get(url);
      var temp = [];
      for (key in response.data) {
        var obj = {
          ServiceName: response.data[key].ServiceName,
          date: response.data[key].date,
          time: response.data[key].time,
          accepted: response.data[key].accepted,
          key: key,
          rejected: response.data[key].rejected,
        };
        temp.push(obj);
      }
      setServiceMans(temp.reverse());
    } catch (error) {
      console.log(error);
      Alert.alert("Something Went Wrong", "Please Try Again Later");
    }
    setloading(false);
  }
  async function Refersh() {
    setrefershing(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authctx.uid}/ServiceMans.json?auth=${authctx.token}`;
      const response = await axios.get(url);
      var temp = [];
      for (key in response.data) {
        var obj = {
          ServiceName: response.data[key].ServiceName,
          date: response.data[key].date,
          time: response.data[key].time,
          accepted: response.data[key].accepted,
          key: key,
          rejected: response.data[key].rejected,
        };
        temp.push(obj);
      }
      setServiceMans(temp.reverse());
    } catch (error) {
      console.log(error);
      Alert.alert("Something Went Wrong", "Please Try Again Later");
    }
    setrefershing(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      get();
    }, [])
  );
  if (loading) {
    return <LoadingOverlay>Please Wait...</LoadingOverlay>;
  }
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", { month: "long" });
  }
  async function deleteService(id, items) {
    setloading(true);
    function del(obj) {
      setloading(false);
      return id != obj.key;
    }
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authctx.uid}/ServiceMans/${id}.json?auth=${authctx.token}`;
      const resp = await axios.delete(url);
      const newService = items.filter(del);
      setServiceMans(newService);
    } catch (e) {
      console.log(e);
      Alert.alert("Something Went Wrong", "Please Try Again Later");
      setloading(false);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <BackButton goBack={() => navigation.goBack()} />
      <RefreshControl
      style={{marginTop: 50,
        marginLeft: 10,
        paddingBottom: 10,}}
      refreshing={refershing}
      onRefresh={Refersh}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Poppins-SemiBold",
            color: "black",
            
          }}
        >
          Service Mans
        </Text>
        <Text></Text>
      </RefreshControl>
      {ServiceMans.length === 0 && (
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
          No Service Mans Requested if requried then Request
        </Text>
      )}
      <FlatList
        data={ServiceMans}
        renderItem={({ item }) => {
          const date = new Date(item.date);
          const time = new Date(item.time);
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
                    {item.ServiceName}
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
                  {date.getDate()} {getMonthName(date.getMonth())}
                  {",  "}
                  {date.getFullYear()} -{" "}
                  {date.getHours() < 10
                    ? "0" + date.getHours()
                    : date.getHours()}
                  {":"}
                  {time.getMinutes() < 10
                    ? "0" + time.getMinutes()
                    : time.getMinutes()}{" "}
                  {time.getHours() >= 12 ? "pm" : "am"}
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
                  item.accepted
                    ? { justifyContent: "space-around" }
                    : { justifyContent: "space-around" },
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
                      name="thumbs-down"
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
                        marginLeft: "10%",
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

export default AllServiceMan;
