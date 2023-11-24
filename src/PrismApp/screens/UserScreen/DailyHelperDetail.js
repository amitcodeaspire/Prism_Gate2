import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

import { Icon } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Share from "react-native-share";
import axios from "axios";
import Background from "../../components/Background";
import { AuthContext } from "../../store/auth-context";
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getDates } from "../../util/auth";
import { useNavigation } from "@react-navigation/native";

export default function DailyHelperDetail({ route }) {
  const [loading, setloading] = React.useState(false);
  const authCtx = React.useContext(AuthContext);
  const [Dates, setDates] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    async function get() {
      setloading(true);
      try {
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/DailyHelper/${route.params.item.oldkey}/Attendance.json?auth=${authCtx.token}`;
        const response = await axios.get(url);
        console.log(response.data);
        const datesItem = {};
        for (var i in response.data) {
          datesItem[response.data[i].date] = {
            customStyles: {
              container: {
                backgroundColor: "green",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 5,
              },
              text: {
                color: "white",
                fontFamily: "Poppins-SemiBold",
                textAlign: "center",
              },
            },
          };
        }
        setDates(datesItem);
      } catch (error) {
        console.log(error);
        Alert.alert("Something Went Wrong", "Please Try after Some Time");
      }

      setloading(false);
    }
    get();
  }, []);

  async function shareDetails() {
    var item = route.params.item;
    const shareoptions = {
      message:
        item.Name +
        " " +
        "(" +
        item.Type +
        ")" +
        "\nMobile Number :- " +
        item.Mobile.toString(),
    };
    try {
      const shareResponse = await Share.open(shareoptions);
    } catch (e) {
      console.log(e);
    }
  }
  async function dailyHelpDelete(id, arr) {
    setloading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/DailyHelp/${id}.json?auth=${authCtx.token}`;
      console.log(url);
      await axios.delete(url);
      function del(obj) {
        if (obj.key != id) {
          return obj;
        }
        // return id != obj.key
      }
      const neData = arr.filter(del);
      // console.log(neData);
      navigation.goBack();
    } catch (e) {
      console.log(e);
      Alert.alert("Something Went Wrong", "Please Try Again Later");
      setloading(false);
    }
  }

  if (loading) {
    return (
      <Background>
        <Image
          source={require("../../assets/loading.gif")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 20 }}>
          Loading Please wait...
        </Text>
      </Background>
    );
  }
  var item = route.params.item;
  var datesItem = {
    "2023-05-08": {
      customStyles: {
        container: { backgroundColor: "green" },
        text: { color: "white" },
      },
    },
  };
  return (
    <View
      contentContainerStyle={{}}
      style={{
        backgroundColor: "white",
        flex: 1,
        // paddingTop: 100,
        // paddingBottom: 20,
        justifyContent: "center",
        // alignItems:'center'
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: "black",
            marginBottom: 20,
            borderBottomWidth: 0.8,
            borderBottomColor: "black",
            marginHorizontal: 20,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          {item.Name} Details
        </Text>
        <Image
          source={{ uri: item.image }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            alignSelf: "center",
            borderColor: "black",
            borderWidth: 1,
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 20,
          borderWidth: 0.5,
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 10,
          backgroundColor: "#f2faff",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "black",
            fontFamily: "Poppins-Medium",
            borderBottomWidth: 0.7,
            marginBottom: 20,
          }}
        >
          Name :- {item.Name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "black",
            fontFamily: "Poppins-Medium",
            marginTop: 10,
            borderBottomWidth: 0.7,
          }}
        >
          Type :- {item.Type}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            marginTop: 20,
            marginBottom: -15,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Call on Given Number", item.Mobile.toString());
            }}
            style={{ marginTop: 3 }}
          >
            <Icon name="call" size={24} color="green" type="MaterialIcons" />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareDetails} style={{ marginTop: 3 }}>
            <Icon name="share" size={22} color="green" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 3 }}>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color="red"
              onPress={() => {
                const title = "Delete " + item.Name + " from Daily Help";
                Alert.alert(title, "If Yes Please Press Ok", [
                  {
                    text: "Ok",
                    onPress: () => {
                      dailyHelpDelete(item.key, route.params.all);
                    },
                  },
                  {
                    text: "Cancel",
                  },
                ]);
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AttCal", { Dates: Dates, item: item })
          }
          style={{
            marginTop: 35,
            // marginBottom: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            width: "100%",
            borderColor: "black",
            backgroundColor: "black",
            // marginHorizontal:20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "Poppins-Medium",
              textAlignVertical: "center",
              textAlign: "center",
            }}
          >
            Attendance
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>navigation.navigate("AttendanceYear",item)}
          style={{
            marginTop: 35,
            // marginBottom: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            width: '100%',
            borderColor: 'black',
            backgroundColor: 'black',
            // marginHorizontal:20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'Poppins-Medium',
              textAlignVertical: 'center',
              textAlign: 'center',
            }}>
            Attendance
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
