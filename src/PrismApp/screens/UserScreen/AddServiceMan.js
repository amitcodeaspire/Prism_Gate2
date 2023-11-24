import React, { useState, useContext, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";

export default AddServiceMan = ({ navigation, route }) => {
  var currTime = new Date();
  currTime.setDate(currTime.getDate() + 1);
  const authctx = React.useContext(AuthContext);
  const [ServiceName, setServiceName] = useState();
  const [openDate, setopenDate] = useState(false);
  const [openTime, setopenTime] = useState(false);
  const [time, settime] = useState(new Date());
  const [date, setdate] = useState(currTime);
  const [phone, setphone] = useState("");

  const [loading, setloading] = useState(false);
  if (loading) {
    return <LoadingOverlay>Please Wait...</LoadingOverlay>;
  }
  async function onSubmit() {
    if (phone.length === 10 && ServiceName) {
      setloading(true);
      try {
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authctx.uid}/ServiceMans.json?auth=${authctx.token}`;
        const data = {
          ServiceName: ServiceName,
          time: time,
          date: date,
          phone: phone,
          by: route.params.Name,
          accepted: false,
          flatno: route.params.flatno,
          Society: authctx.Society,
          uid: authctx.uid,
          rejected: false,
        };
        await axios.post(url, data);
        navigation.goBack();
      } catch (error) {
        Alert.alert("Something Went Wrong", "Please Try Again Later");
        console.log(error);
      }
      setloading(false);
    } else {
      Alert.alert("Incomplete Details", "Please Fill The Details");
    }
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
            Request ServiceMan
          </Text>

          <Image
            source={require("../../assets/allow/allow_serviceman.png")}
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
            placeholder="Service Name/Company Name"
            placeholderTextColor="gray"
            sty
            value={ServiceName}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              fontFamily: "Poppins-Medium",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={(e) => setServiceName(e)}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={phone}
            maxLength={10}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              fontFamily: "Poppins-Medium",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={(e) => setphone(e)}
          />
          <Text
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              fontFamily: "Poppins-Medium",
              color: "gray",
              marginTop: 10,
            }}
          >
            Date & Time
          </Text>
          <Text
            onPress={() => setopenDate(true)}
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: "black",
              marginTop: 15,
              marginBottom: 15,
              borderBottomWidth: 0.5,
            }}
          >
            {date.getDate()} - {date.getMonth()} - {date.getFullYear()}
          </Text>
          <Text
            onPress={() => setopenTime(true)}
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "black",
              marginTop: 15,
              marginBottom: 15,
              borderBottomWidth: 0.5,
            }}
          >
            {time.getHours()} : {time.getMinutes()} :{" "}
            {time.getHours() >= 12 ? "pm" : "am"}
          </Text>
        </View>
        <DatePicker
          modal
          mode="date"
          open={openDate}
          date={date}
          minimumDate={currTime}
          onConfirm={(value) => {
            setopenDate(false);
            setdate(value);
          }}
          onCancel={() => setopenDate(false)}
        />
        <DatePicker
          modal
          mode="time"
          open={openTime}
          date={time}
          onConfirm={(value) => {
            setopenTime(false);
            settime(value);
          }}
          onCancel={() => setopenTime(false)}
        />
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
};
