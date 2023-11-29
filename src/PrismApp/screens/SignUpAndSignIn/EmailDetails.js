import React, { useContext, useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import BackButton from "../../components/BackButton";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../../components/Background";
import { createUser } from "../../util/auth";
export default function EmailDetails({ navigation, route }) {
  const [City, setCity] = useState({});
  const [State, setState] = useState({});
  const [Society, setSociety] = useState({});
  const [flatno, setflatno] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [Name, SetName] = useState("");
  const [Blocks, setBlocks] = useState({});
  const [Loading, SetLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const data = [
    // {label: 'Meghalaya', value: 'Meghalaya'},
    // {label: 'Haryana', value: 'Haryana'},
    // {label: 'Maharashtra', value: 'Maharashtra'},
    // {label: 'Goa', value: 'Goa'},
    // {label: 'Manipur', value: 'Manipur'},
    // {label: 'Puducherry', value: 'Puducherry'},
    // {label: 'Telangana', value: 'Telangana'},
    // {label: 'Odisha', value: 'Odisha'},
    // {label: 'Rajasthan', value: 'Rajasthan'},
    // {label: 'Punjab', value: 'Punjab'},
    // {label: 'Uttarakhand', value: 'Uttarakhand'},
    // {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    // {label: 'Nagaland', value: 'Nagaland'},
    // {label: 'Lakshadweep', value: 'Lakshadweep'},
    // {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
    // {label: 'Delhi', value: 'Delhi'},
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    // {
    //   label: 'Andaman and Nicobar Islands',
    //   value: 'Andaman and Nicobar Islands',
    // },
    // {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    // {label: 'Jharkhand', value: 'Jharkhand'},
    // {label: 'Karnataka', value: 'Karnataka'},
    // {label: 'Assam', value: 'Assam'},
    // {label: 'Kerala', value: 'Kerala'},
    // {label: 'Jammu and Kashmir', value: 'Jammu and Kashmir'},
    // {label: 'Gujarat', value: 'Gujarat'},
    // {label: 'Chandigarh', value: 'Chandigarh'},
    // {
    //   label: 'Dadra and Nagar Haveli and Daman and Diu',
    //   value: 'Dadra and Nagar Haveli and Daman and Diu',
    // },
    // {label: 'Sikkim', value: 'Sikkim'},
    // {label: 'Tamil Nadu', value: 'Tamil Nadu'},
    // {label: 'Mizoram', value: 'Mizoram'},
    // {label: 'Bihar', value: 'Bihar'},
    // {label: 'Tripura', value: 'Tripura'},
    // {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
    // {label: 'Chhattisgarh', value: 'Chhattisgarh'},
    // {label: 'Ladakh', value: 'Ladakh'},
    // {label: 'West Bengal', value: 'West Bengal'},
  ];
  const AllSociety = [
    {
      label: "Krishna Society",
      value: "Krishna Society",
    },
    {
      label: "Ansal API",
      value: "Ansal API",
    },
  ];
  const AllBlocks = [
    { label: "Blocks A", value: "Blocks A" },
    { label: "Blocks B", value: "Blocks B" },
    { label: "Blocks C", value: "Blocks C" },
    { label: "Blocks D", value: "Blocks D" },
  ];
  const ALlCity = [
    { label: "Lucknow", value: "Lucknow" },

  ];
  function goBack() {
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  }

  async function onSubmit() {
    if (
      !State.value ||
      //!Society.value ||
      //!flatno ||
      !City.value ||
      !Blocks.value ||
      !Name
    ) {
      return Alert.alert("Incomplete Field", "Please Fill The Form Firstly");
    }

    SetLoading(true);
    try {
      // console.log(route)
      const fcmToken = await AsyncStorage.getItem("FcmToken");
      const respone = await createUser(route.email, route.password);
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${respone.uid}/Details.json?auth=${respone.token}`;
      const response1 = await axios.put(url, {
        Name: Name,
        Email: route.email,
        MobileNumber: false,
        Imageuri: false,
        flatno: flatno,
        Society: Society.value,
        City: City.value,
        State: State.value,
        Blocks: Blocks.value,
        FcmToken: fcmToken,
      });
      // const response3 = await axios.post(
      //   url + '/FlatDetails.json?auth=' + route.params.token,
      //   {flatno: flatno, Society: Society, City: City},
      // );
      authCtx.setuid(respone.uid);
      authCtx.authenticate(respone.token);
      navigation.navigate("Dashboard");
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Email already register",
        " Please Login or Please Try Again Later"
      );
    }
    SetLoading(false);
  }

  if (Loading) {
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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        style={{
          marginHorizontal: 15,
        }}
      >
        <BackButton
          goBack={() => navigation.navigate("SignUpPhone")}
          style={{ marginLeft: -7 }}
        />
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Poppins-SemiBold",
            color: "black",
            marginTop: 50,
          }}
        >
          Onboard Society
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-SemiBold",
            color: "gray",
          }}
        >
          Search and Select Your Society listed on {"\n"}PrismGate
        </Text>
        <>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins-SemiBold",
            color: "gray",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Select State
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select State" : "..."}
          searchPlaceholder="Search..."
          value={State}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setState(item);
            setIsFocus(false);
          }}
        />
        </>
        
        {State.value && (
          <>
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
                color: "gray",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Select Your City
            </Text>
           
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={ALlCity}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select City" : "..."}
              searchPlaceholder="Search..."
              value={City}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setCity(item);
                setIsFocus(false);
              }}
            />
          </>
        )}
       
          <>
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
                color: "gray",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Society Name
            </Text>
            <TextInput
              value={Name}
              onChangeText={(f) => SetName(f)}
              placeholder="Eg. Z-squre"
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                color: "black",
                borderBottomWidth: 1,
              }}
            />
          
          
          <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
                color: "gray",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Enter Address
            </Text>
            <TextInput
              value={Name}
              onChangeText={(f) => SetName(f)}
              placeholder="Eg. Address"
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                color: "black",
                borderBottomWidth: 1,
              }}
            />
            
          
            
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
                color: "gray",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Enter Block Name
            </Text>
            <TextInput
              value={Name}
              onChangeText={(f) => SetName(f)}
              placeholder="Eg. A or B"
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                color: "black",
                borderBottomWidth: 1,
              }}
            />
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
                color: "gray",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Enter Gate No.
            </Text>
            <TextInput
              value={Name}
              onChangeText={(f) => SetName(f)}
              placeholder="Eg. 1 or 2"
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                color: "black",
                borderBottomWidth: 1,
              }}
            />
          
        
          
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
                color: "gray",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Enter Your Name
            </Text>
            <TextInput
              value={Name}
              onChangeText={(f) => SetName(f)}
              placeholder="Eg. Vimal Pandey"
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                color: "black",
                borderBottomWidth: 1,
              }}
            />
          </>
        
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            marginTop: 40,
            marginBottom: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "black",
            borderRadius: 10,
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
      </ScrollView>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
