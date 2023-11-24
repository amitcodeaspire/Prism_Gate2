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
import Feather from "react-native-vector-icons/Feather";
import Background from "../../components/Background";
import { fetchAuthUsers } from "../../../util/auth";
import { useFocusEffect } from "@react-navigation/native";
export default function Attendance({ navigation }) {
  const [dataAll, setdataAll] = useState([]);
  const [loading, setloading] = useState(false);
  // const [Name,setName] = useState("")
  const [imageUri, setimageuri] = useState();
  const authCtx = useContext(AuthContext);
  async function getData() {
    try {
      setloading(true);
     const response = await axios.get(`https://prism-worker-gate-default-rtdb.firebaseio.com/Worker/${authCtx.uid}/Details.json?auth=${authCtx.token}`)
     authCtx.setSociety(response.data.Society)     
     
     setimageuri(response.data.Imageuri);
     //DFD
      const resp = await fetchAuthUsers(authCtx.token,await response.data.Society);
      if (Array.isArray(resp.drop)) {
        authCtx.setuserArray(resp.drop);
      }
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${response.data.Society}/DailyHelper.json?auth=${authCtx.token}`
      const res = await getDaily(url);

      setdataAll(res);

    } 
    catch (error) {
      Alert.alert(
        "Cant Login",
        "Please logout and then login cause your validation token has expire"
      );
      // authCtx.logout();
      console.log(error);
      setloading(false);
    }
    setloading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      // alert("Enter");
      getData();
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
        <Feather
          name="log-out"
          size={34}
          color="gray"
          style={{
            marginRight: 10,
            marginTop: 5,
          }}
          onPress={() => authCtx.logout()}
          // style={{marginHorizontal: 18, marginTop: 15}}
        />
      </View>
      {dataAll.length > 0 && (
        <FlatList
          data={dataAll}
          style={{
            marginTop: 10,
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Check", item)}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#DBF0FE",
                  elevation: 5,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginBottom: 15,
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
                <View
                  style={{
                    marginLeft: 20,
                    // alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: "Poppins-SemiBold",
                      color: "black",
                    }}
                  >
                    {item.Name.length>15 ?item.Name.substring(0,15)+"...":item.Name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "gray",
                      fontFamily: "Poppins-Medium",
                      // marginTop: -5,
                      // marginLeft:-5
                    }}
                  >
                  {item.Type.length>9 ?item.Type.substring(0,9)+"...":item.Type}
                  </Text>
                </View>
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
          No Daily Helper for attendance if requried please add them
        </Text>
      )}
    </View>
  );
}
