import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  PermissionsAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import { launchCamera } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { AuthContext } from "../../../store/auth-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Background from "../../components/Background";
const AddDaily = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [Imageuri, setImageuri] = useState("");
  const [Name, setName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Type, setType] = useState("");
  const authCtx = useContext(AuthContext);

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

  const openCamera = async () => {
    console.log("HIi");
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera({ quality: 0.5 });
        setImageuri(result.assets[0].uri);
      } catch (e) {
        Alert.alert("Cant Upload", "Please Try after some time");
      }
    } else {
      Alert.alert(
        "Denied",
        "This Permission is Important Please Allow Prism Gate For Camera"
      );
    }
  };
  const handleSubmit = async () => {
    if (Name && Type && Imageuri && Mobile.length === 10) {
      setloading(true);
      try {
        const uploadUri = Imageuri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const extension = filename.split(".").pop();
        const fname = filename.split(".").slice(0, -1).join(".");
        filename = fname + Date.now() + "." + extension;
        const uid = authCtx.uid;
        const task = await storage()
          .ref("DailyHelper/" + filename)
          .putFile(uploadUri);
        const url1 = await storage()
          .ref("DailyHelper/" + filename)
          .getDownloadURL();
       
        const url =
          "https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/" +
          authCtx.Society +
          "/DailyHelper.json?auth=" +
          authCtx.token;
        const data = {
          image: url1,
          Name: Name,
          Type: Type,
          Mobile: Mobile,
        };
        const reesonse = await axios.post(url, data);
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
      return;
    } else {
      Alert.alert("Fill The Details", "Incomplete Details");
      return;
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Text style={{ marginBottom: 60 }}></Text>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {!Imageuri && (
            <Image
              source={require("../../../../PrismApp/assets/Profile-icon.png")}
              style={styles.avatar}
            />
          )}
          {Imageuri && (
            <Image source={{ uri: Imageuri }} style={styles.avatar} />
          )}

          <TouchableOpacity
            style={styles.changeAvatarButton}
            onPress={openCamera}
          >
            <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            maxLength={20}
            style={styles.input}
            placeholder="Enter Name"
            value={Name}
            onChangeText={(n) => setName(n)}
          />
          <Text style={styles.label}>Type</Text>
          <TextInput
            maxLength={20}
            style={styles.input}
            placeholder="Enter Type"
            value={Type}
            onChangeText={(n) => setType(n)}
          />
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            maxLength={10}
            keyboardType="number-pad"
            style={styles.input}
            placeholder="Enter Mobile Number"
            value={Mobile}
            onChangeText={(n) => setMobile(n)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    marginTop: 50,
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#1E90FF",
    fontSize: 18,
  },
  container: {
    flex: 1,

    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -52,
  },
});

export default AddDaily;
