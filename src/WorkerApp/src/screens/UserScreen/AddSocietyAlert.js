import {
  View,
  Alert,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";

export default function SocietyAlert({ route }) {

  
  const [Description, setDescription] = React.useState();
  const [DescriptionTitle, setDescriptionTitle] = React.useState();
  const [loading, setloading] = React.useState(false);
  const [fromTime, setfromTime] = React.useState(new Date());
  const [toTime, settoTime] = React.useState(new Date());
  const [FromopenDate, setFromopenDate] = React.useState(false);
  const [ToopenDate, settoopenDate] = React.useState(false);
  const navigation = useNavigation();
  const authCtx = React.useContext(AuthContext);

  async function submit() {
    if (Description && DescriptionTitle ) {
      if (fromTime.getTime() != toTime.getTime()){
        setloading(true);
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/SocietyAlerts.json?auth=${authCtx.token}`;
        const data = {
          DescriptionTitle: DescriptionTitle,
          Description: Description,
          fromTime: fromTime,
          toTime: toTime,
          accepted:false,
          rejected:false
        };
        try {
          const resp = await axios.post(url, data);
          // Alert.alert('Done', 'Data has Been saved');
          navigation.goBack();
        } catch (error) {
          console.log(error);
          Alert.alert(
            "Error",
            "Please Try After Some Time or Log Out and then login"
          );
        }
        setloading(false);
      }
     else {
      Alert.alert("Invaild Date","Dates Cant Be Same")
     }
    } else {
      Alert.alert("Fill The Details", "Incomplete Details");
    }
  }
  if (loading) {
    return <LoadingOverlay>Please Wait....</LoadingOverlay>;
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
      <Text
        style={{
          color: "white",
          marginBottom: 30,
          fontSize: 21,
          fontFamily: "Poppins-Medium",
          marginTop:20
        }}
      >
        Add Society Alert
      </Text>
      <View
        style={{
          backgroundColor: "white",
          width: "80%",
          // height: '50%',
          borderRadius: 10,
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Image
            source={require("../../../../PrismApp/assets/x.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <View style={{}}>
          <TextInput
            maxLength={20}
            multiline
            placeholder="Title"
            placeholderTextColor="gray"

            value={DescriptionTitle}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              fontFamily: "Poppins-Medium",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={(e) => setDescriptionTitle(e)}
          />
          <TextInput
            maxLength={250}
            placeholder="Description"
            placeholderTextColor="gray"
            multiline
            value={Description}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              fontFamily: "Poppins-Medium",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={(e) => setDescription(e)}
          />
        </View>
        <Text
          onPress={() => setFromopenDate(true)}
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
            marginTop: 15,
            marginBottom: 15,
            borderBottomWidth: 0.5,
          }}
        >
          {"From : " + fromTime.getDate()} - {fromTime.getMonth()} -{" "}
          {fromTime.getFullYear()} {fromTime.getHours()} :{" "}
          {fromTime.getMinutes()} : {fromTime.getHours() >= 12 ? "pm" : "am"}
        </Text>
        <Text
          onPress={() => settoopenDate(true)}
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
            marginTop: 15,
            marginBottom: 15,
            borderBottomWidth: 0.5,
          }}
        >
          {" To :   " + toTime.getDate()} - {toTime.getMonth()} -{" "}
          {toTime.getFullYear()} {toTime.getHours()} : {toTime.getMinutes()} :{" "}
          {toTime.getHours() >= 12 ? "pm" : "am"}
        </Text>
        <DatePicker
          modal
          minimumDate={new Date()}
          mode="datetime"
          open={FromopenDate}
          date={fromTime}
          onConfirm={(value) => {
            setFromopenDate(false);
            setfromTime(value);
          }}
          onCancel={() => setFromopenDate(false)}
        />
        <DatePicker
        minimumDate={new Date()}
          modal
          mode="datetime"
          open={ToopenDate}
          date={toTime}
          onConfirm={(value) => {
            settoopenDate(false);
            settoTime(value);
          }}
          onCancel={() => settoopenDate(false)}
        />
        <TouchableOpacity
          onPress={submit}
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
