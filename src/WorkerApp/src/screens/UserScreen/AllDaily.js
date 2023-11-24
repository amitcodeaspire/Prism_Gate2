import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";
import { getDaily } from "../../../../PrismApp/util/auth";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getActionFromState, useFocusEffect } from "@react-navigation/native";
import Background from "../../components/Background";

export default function AllDaily({ navigation }) {
  const [dataAll, setdataAll] = useState([]);
  const [loading, setloading] = useState(false);
  const [imageUri, setimageuri] = useState();
  const authCtx = useContext(AuthContext);
  async function get() {
    setloading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/DailyHelper.json?auth=${authCtx.token}`;
      console.log(url);
      const res = await getDaily(url);
      const response = await axios.get(
        "https://prism-worker-gate-default-rtdb.firebaseio.com/" +
          "Worker/" +
          authCtx.uid +
          "/Details.json" +
          "?auth=" +
          authCtx.token
      );

      setimageuri(response.data.Imageuri);
      if (res === 0) {
        setloading(false);
        return Alert.alert(
          "Error",
          "Cant load at this moment please try again later"
        );
      }
      setdataAll(res);
    } catch (error) {
      Alert.alert(
        "Something Went Wrong",
        "Please Try again later of logout and then login"
      );
      setloading(false);
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
  var a = "";

  async function deleteDailyHelper(id, data) {
    setloading(true);
    // console.log(id + data);
    function del(obj) {
      setloading(false);
      return id != obj.key;
    }
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/DailyHelper/${id}.json?auth=${authCtx.token}`;
      const resp = await axios.delete(url);
      const newALl = data.filter(del);
      setdataAll(newALl);
      get();
    } catch (e) {
      console.log(e);
      Alert.alert("Something Went Wrong", "Please Try Again Later");
      setloading(false);
    }
    setloading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: 10,
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
            fontSize: 20,
            // marginTop: 13,

            fontFamily: "Poppins-Medium",
            // fontWeight:"bold",
            color: "black",
            textAlignVertical: "center",
          }}
        >
          Worker Gate
        </Text>
        <Ionicons
          name="add"
          size={34}
          color="red"
          style={{
            marginRight: 10,
            marginTop: 5,
          }}
          onPress={() => navigation.navigate("AddDaily")}
          // style={{marginHorizontal: 18, marginTop: 15}}
        />
      </View>
      {dataAll.length > 0 && (
        <FlatList
          style={{ marginTop: 10 }}
          data={dataAll}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("EditAll", item)}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#DBF0FE",
                  elevation: 5,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginBottom: 15,
                  width:"95%"
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                  }}
                />
              
                  <View style={{ marginLeft: 20, marginTop: 2 }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: "Poppins-SemiBold",
                        color: "black",
                      }}
                    >
                      {item.Name.length > 9
                        ? item.Name.substring(0, 9) + "..."
                        : item.Name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "gray",
                        fontFamily: "Poppins-Medium",
                        marginTop: -5,
                      }}
                    >
                      {item.Type}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "gray",
                        fontFamily: "Poppins-Medium",
                        marginTop: -5,
                      }}
                    >
                      {item.Mobile}
                    </Text>
                  </View>

                  <Ionicons
                    name="ios-trash-bin-outline"
                    color="red"
                    size={24}
                    style={{
                      marginLeft:"40%"
                    }}
                    onPress={() => {
                      deleteDailyHelper(item.key, dataAll);
                    }}
                  />
       
              </TouchableOpacity>
            );
          }}
        />
      )}
      {dataAll.length === 0 && (
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            marginTop: 200,
            fontSize: 30,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          No Daily Helper if requried please add them
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
