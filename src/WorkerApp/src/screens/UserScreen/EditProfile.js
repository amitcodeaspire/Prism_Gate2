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
  Modal,
  Dimensions
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import BackButton from "../../components/BackButton";
const EditProfile = ({ navigation }) => {
  const {width,height} = Dimensions.get("window")
  const [details, setdetails] = useState({
    Name: "",
    Email: "",
    MobileNumber: "",
    Imageuri: "",
  });
  const [loading, setloading] = useState(false);
  const [Imageuri, setImageuri] = useState("");
  const authCtx = useContext(AuthContext);
  const [Visable, setVisable] = useState(false);
  useEffect(() => {
    async function get() {
      setloading(true);
      try {
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Worker/${authCtx.uid}/Details.json?auth=${authCtx.token}`;
        const response = await axios.get(url);
        setdetails({...response.data});
        setImageuri(response.data.Imageuri);
        console.log(details.Imageuri, "details");
      } catch (error) {
        Alert.alert(
          "Failed",
          "Please Try Again later or Logout and then login again"
        );
        console.log(error);
      }
      setloading(false);
    }
    get();
  }, []);
  if (loading) {
    return <LoadingOverlay>Please Wait...</LoadingOverlay>;
  }

  const openCamera = async () => {
    console.log("HIi");
    setVisable(false);
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera({});
        setdetails({ ...details, Imageuri: result.assets[0].uri });
        // const uploadUri = result.assets[0].uri;
        // let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // const extension = filename.split('.').pop();
        // const fname = filename.split('.').slice(0, -1).join('.');
        // filename = fname + Date.now() + '.' + extension;
        // const uid = authCtx.uid;
        // const task = await storage()
        //   .ref('User/' + uid + '/ProfilePicture/' + filename)
        //   .putFile(uploadUri);
        // const url = await storage()
        //   .ref('User/' + uid + '/ProfilePicture/' + filename)
        //   .getDownloadURL();
        // setdetails({...details, Imageuri: url});
        // setImageuri(url);
        // setloading(false);
      } catch (e) {}
      setloading(false);
      // setloading(false);
    } else {
      Alert.alert(
        "Denied",
        "This Permission is Important Please Allow Prism Gate For Camera"
      );
    }
  };
  const openGallery = async () => {
    setVisable(false);
    try {
      const result = await launchImageLibrary({ quality: 0.5 });
      console.log(result.assets[0].uri);
      // setiImageuri(result.assets[0].uri);
      setdetails({ ...details, Imageuri: result.assets[0].uri });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    setloading(true);
    if (details.Name) {
      if (details.Imageuri) {
        try {
          const uploadUri = details.Imageuri;
          let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
          const extension = filename.split(".").pop();
          const fname = filename.split(".").slice(0, -1).join(".");
          filename = fname + Date.now() + "." + extension;
          const uid = authCtx.uid;
          const task = await storage()
            .ref("User/" + uid + "/ProfilePicture/" + filename)
            .putFile(uploadUri);
          const url = await storage()
            .ref("User/" + uid + "/ProfilePicture/" + filename)
            .getDownloadURL();
          setdetails({ ...details, Imageuri: url });
        } catch (error) {
          console.log(error);
          return Alert.alert("Something Went Worng", "Please Try Again later");
        }
      }

      try {
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Worker/${authCtx.uid}/Details.json?auth=${authCtx.token}`;
        const response = await axios.put(url, details);
        console.log(response.data);
        navigation.replace("Dashboard");
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Error",
          "Please Try After Some Time or Log Out and then login"
        );
      }
    } else {
      Alert.alert("Incomplete", "Empty Name Can't Allowed");
    }
    setloading(false);
  };

  console.log(!details.Imageuri);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          marginHorizontal: 15,
        }}
      >
        <BackButton
          goBack={() => navigation.navigate("Dashboard")}
          style={{ marginLeft: -5 }}
        />
        <Text
          style={{
            fontSize: 24,
            marginTop: 60,
            color: "black",
            fontFamily: "Poppins-SemiBold",
          }}
        >
          Profile
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
          }}
        >
          Everthing about you
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => setVisable(true)}
          style={{
            marginTop: 30,
          }}
        >
          {details.Imageuri ? (
            <Image
              source={{ uri: details.Imageuri }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 90 / 2,
                marginLeft: -2,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/Profile-icon.png")}
              style={{ width: 90, height: 90, marginLeft: -2 }}
            />
          )}
        </TouchableOpacity>
        <Modal visible={Visable} transparent={true} animationType="fade">
          <View
            style={{
              backgroundColor: "rgba(0,0,0,.9)",
              width: width,
              height: height,
              position: "absolute",
              
            }}
          >
            <View
              style={{
                // width:"50%",.
                // height:200,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 50,
                  paddingVertical: 30,
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setVisable(false)}
                  style={{
                    left: -40,
                    top: -20,
                  }}
                >
                  <Image
                    source={require("../../../../PrismApp/assets/x.png")}
                    // resizeMethod='resize'
                    resizeMode="contain"
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openGallery}
                  style={{
                    marginBottom: 20,
                    backgroundColor: "black",
                    borderRadius: 60,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      fontSize: 18,
                      color: "white",
                      paddingHorizontal: 10,
                      textAlign: "center",
                    }}
                  >
                    Open Gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openCamera} style={{}}>
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      fontSize: 18,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Open Camera
                  </Text>
                </TouchableOpacity>
                {details.Imageuri && (
                  <TouchableOpacity
                    onPress={() => {
                      setVisable(false);
                      setdetails({ ...details, Imageuri: false });
                    }}
                    style={{
                      // marginBottom: 20,
                      backgroundColor: "black",
                      borderRadius: 60,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 16,
                        color: "white",
                        textAlign: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      Remove Profile Photo
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins-SemiBold",
            color: "gray",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Name
        </Text>
        <TextInput
          value={details.Name}
          onChangeText={(c) => setdetails({ ...details, Name: c })}
          placeholder="Eg. Vimal Pandey"
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
            borderBottomWidth: 1,
          }}
        />
        {details.Email && (
          <Text
            style={{
              fontSize: 18,
              color: "gray",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginTop: 60,
              fontFamily: "Poppins-Medium",
            }}
          >
            {details.Email}
          </Text>
        )}
        {details.MobileNumber && (
          <Text
            onPress={() =>
              Alert.alert(
                "You Cant Change This Field",
                "Only Developers Can Change This"
              )
            }
            style={{
              fontSize: 18,
              color: "gray",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginTop: 60,
              fontFamily: "Poppins-Medium",
            }}
          >
            {details.MobileNumber}
          </Text>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={handleSubmit}
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
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;
