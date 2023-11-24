import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import BackButton from "../../components/BackButton";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "../SignUpAndSignIn/EmailDetails";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";

const AddHelp = ({ navigation, route }) => {
  const [title, settitle] = useState({});
  const [isFocus, setIsFocus] = useState(false);
  const [Personal, setPersonal] = useState(true);
  const [desc, setdesc] = useState("");
  const authCtx = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [Community, setCommunity] = useState(false);
  const titleDrop = [
    { label: "Plumbing", value: "Plumbing" },
    { label: "Electricity", value: "Electricity" },
    { label: "Parking", value: "Parking" },
    { label: "Security", value: "Security" },
    { label: "other", value: "other" },
  ];
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", { month: "long" });
  }
  async function onSumbit() {
    // console.log(route.params)
    var date = new Date();
    var month = getMonthName(date.getMonth());
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    time = hours + ":" + minutes + ":" + seconds;
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    date =
      date.getDate() + " " + month + "," + hours + ":" + minutes + " " + am_pm;
    // console.log(date)
    if (title.value && desc) {
      setloading(true);
      try {
        const data = {
          title: title.value,
          desc: desc,
          date: date,
          resolved: false,
          by: route.params.Name,
          type: Personal ? "Personal" : "Community",
          flatno: route.params.flatno,   Society:authCtx.Society,
          uid:authCtx.uid,
          rejected:false
        };
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Issues.json?auth=${authCtx.token}`;
        const response = await axios.post(url, data);
        setloading(false);
        navigation.goBack();
      } catch (error) {
        Alert.alert("Something Went Wrong", "Please Try after Some Time");
        console.log(error);
      }
      setloading(false);
    } else {
      Alert.alert("Incomplete Details", "Please Fill The Details");
    }
    // setloading(false)
  }

  if (loading) {
    return <LoadingOverlay>Please Wait...</LoadingOverlay>;
  }
  return (
    <View
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <BackButton goBack={() => navigation.goBack()} />
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
        Raise Complaint
      </Text>
      <KeyboardAwareScrollView
        style={{
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins-SemiBold",
            color: "gray",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Select Complaint Type
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={titleDrop}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Complaint Type" : "..."}
          searchPlaceholder="Search..."
          value={title}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            settitle(item);
            setIsFocus(false);
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setCommunity(!Community);
              setPersonal(!Personal);
            }}
            style={[
              {
                flexDirection: "row",
                borderWidth: 1,
                width: "40%",
                padding: 5,
                marginTop: 10,
                paddingVertical: 8,
                borderRadius: 10,
                paddingBottom: 2,
              },
              Personal && {
                backgroundColor: "black",
              },
            ]}
          >
            <Icon
              name="person"
              size={24}
              color={Personal ? "white" : "black"}
            />
            <Text
              style={[
                { fontSize: 16, fontFamily: "Poppins-Medium", marginLeft: 5 },
                Personal ? { color: "white" } : { color: "black" },
              ]}
            >
              Personal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCommunity(!Community);
              setPersonal(!Personal);
            }}
            style={[
              {
                flexDirection: "row",
                borderWidth: 1,
                width: "40%",
                padding: 5,
                marginTop: 10,
                paddingVertical: 8,
                borderRadius: 10,
                paddingBottom: 2,
              },
              Community && {
                backgroundColor: "black",
              },
            ]}
          >
            <Icon
              name="person"
              size={24}
              color={Community ? "white" : "black"}
            />
            <Text
              style={[
                { fontSize: 16, fontFamily: "Poppins-Medium", marginLeft: 5 },
                Community ? { color: "white" } : { color: "black" },
              ]}
            >
              Community
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          maxLength={500}
          value={desc}
          onChangeText={(f) => setdesc(f)}
          multiline
          placeholder="Brief Your Complaint"
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
            borderBottomWidth: 1,
            marginTop: 30,
          }}
        />
      </KeyboardAwareScrollView>
      <TouchableOpacity
        onPress={onSumbit}
        style={{
          marginTop: 40,
          marginBottom: 10,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "black",
          borderRadius: 10,
          marginHorizontal: 15,
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
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddHelp;
