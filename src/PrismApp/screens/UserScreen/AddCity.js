import { View, Text, StatusBar, PermissionsAndroid, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function AddCity({ navigation, route }) {
  const [CabNumber, setCabNumber] = useState("");
  const [CabCompany, setCabCompany] = useState("");
  const [loading, setloading] = useState(false);
  const authCtx = useContext(AuthContext);
  async function onSubmit() {
    if (CabNumber.length === 4 && CabCompany) {
      setloading(true);
      try {
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Cabs.json?auth=${authCtx.token}`;
        const response = await axios.post(url, {
          CabNumber: CabNumber,
          CabCompany: CabCompany,
          Name:route.params.Name,
          flatno:route.params.flatno,
          Society:authCtx.Society
        });
        navigation.navigate("Dashboard");
      } catch (error) {
        console.log(error);
        Alert.alert("Something Went Wrong", "Please Try after Some Time");
      }
      setloading(false);
    } else {
      Alert.alert("Incomplete", "Please Fill it");
    }
  }
  if (loading) {
    return <LoadingOverlay>Please Wait..</LoadingOverlay>;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "80%",
          // height: '50%',
          borderRadius: 10,
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/x.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "black",
              marginTop: 15,
            }}
          >
            Add City
          </Text>

          <Image
            source={require("../../assets/allow/allow_cab.png")}
            style={{
              width: 90,
              height: 90,
              // borderRadius: 90 / 2,
              resizeMode: "contain",
              marginTop: -10,
            }}
          />
        </View>
        <View style={{}}>
          <TextInput
            placeholder="Cab Last 4 Number"
            placeholderTextColor="gray"
            maxLength={4}
            value={CabNumber}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              fontFamily: "Poppins-Medium",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={(e) => setCabNumber(e)}
          />
          <TextInput
            placeholder="Cab Company"
            placeholderTextColor="gray"
            maxLength={20}
            value={CabCompany}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              fontFamily: "Poppins-Medium",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={(e) => setCabCompany(e)}
          />
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            backgroundColor: "black",
            borderRadius: 30,
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Bold",
              color: "white",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
