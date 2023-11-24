import {
  View,
  Text,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

export default function AllSocietyAlert({ navigation }) {
  const authCtx = React.useContext(AuthContext);
  const [Allalerts, setAllalerts] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [imageUri, setimageuri] = React.useState();
  async function get() {
    setloading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/SocietyAlerts.json?auth=${authCtx.token}`;
      const response = await axios.get(
        "https://prism-worker-gate-default-rtdb.firebaseio.com/" +
          "Users/" +
          authCtx.uid +
          "/Details.json" +
          "?auth=" +
          authCtx.token
      );

      setimageuri(response.data.Imageuri);
      // setimageuri(response.data.Image);
      const resp = await axios.get(url);
      const newArr = [];
      console.log(url);
      for (var i in resp.data) {
        if (resp.data[i].accepted) {
          var objtemp = {
            key: i,
            title: resp.data[i].DescriptionTitle,
            desc: resp.data[i].Description,
            fromTime: resp.data[i].fromTime,
            toTime: resp.data[i].toTime,
          };
          newArr.push(objtemp);
        }
      }
      // console.log(newArr)
      setAllalerts(newArr);
    } catch (error) {
      Alert.alert("Something went wrong", "Please Try agin later");
    }
    setloading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      // alert("Enter");
      get();
      return () => {};
    }, [])
  );

  function renderAlerts(item) {
    var item = item.item;
    // console.log(item);
    var fromTime = new Date(item.fromTime);
    var toTime = new Date(item.toTime);
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#DBF0FE",
          marginTop: 10,
          marginHorizontal: 15,
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "red",
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {item.title}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
            marginTop: 15,
            marginBottom: 1,
            // borderBottomWidth: 0.5,
          }}
        >
          {"From : " + fromTime.getDate()} - {fromTime.getMonth()} -{" "}
          {fromTime.getFullYear()} {fromTime.getHours()} :{" "}
          {fromTime.getMinutes()} : {fromTime.getHours() >= 12 ? "pm" : "am"}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
            marginTop: 15,
            marginBottom: 15,
            // borderBottomWidth: 0.5,
          }}
        >
          {"To :   " + toTime.getDate()} - {toTime.getMonth()} -{" "}
          {toTime.getFullYear()} {toTime.getHours()} : {toTime.getMinutes()} :{" "}
          {toTime.getHours() >= 12 ? "pm" : "am"}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "black",
            fontFamily: "Poppins-Medium",
          }}
        >
          {item.desc}
        </Text>
      </View>
    );
  }
  if (loading) {
    return <LoadingOverlay>Please wait....</LoadingOverlay>;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 5,
        }}
      >
        {imageUri ? (
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
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
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
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
        <Text
          style={{
            fontSize: 18,
            // marginTop: 13,

            fontFamily: "Poppins-SemiBold",
            // fontWeight:"bold",
            color: "black",
            textAlignVertical: "center",
          }}
        >
          All Society Alerts & Notice
        </Text>
        <Ionicons
          name="add"
          size={0}
          color="gray"
          style={{
            marginRight: 10,
            marginTop: 5,
          }}
          // onPress={() => navigation.navigate('AddAlert')}
          // style={{marginHorizontal: 18, marginTop: 15}}
        />
      </View>
      {Allalerts.length > 0 ? (
        <FlatList data={Allalerts} renderItem={renderAlerts} />
      ) : (
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            marginTop: 200,
            fontSize: 30,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          No Alerts & Notice
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
