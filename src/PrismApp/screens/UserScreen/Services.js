import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import Background from "../../components/Background";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import { ScrollView } from "react-native-virtualized-view";

export default function Services({ navigation }) {
  const [Name, setName] = useState("Loading..");
  const [loading, setloading] = useState(true);
  const authCtx = useContext(AuthContext);
  const [flatno, setflatno] = useState("Loading..");
  const [imageUri, setimageUri] = useState();
  useEffect(() => {
    async function getData() {
      setloading(true);
      try {
        const url1 = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Details.json?auth=${authCtx.token}`;

        const response1 = await axios.get(url1);
        setflatno(response1.data.flatno);
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Details.json?auth=${authCtx.token}`;
        const response = await axios.get(url);
        setName(response.data.Name);
        setimageUri(response.data.Imageuri);
      } catch (e) {
        console.log(e, "Hi");
        Alert.alert(
          "Cant Load",
          "Please Try again after some time with better network or logout then login !"
        );
      }
      setloading(false);
    }
    getData();
  }, []);
  const services = [
    {
      key: 1,
      icon: require("../../assets/service/service1.png"),
      ftext: "Home",
      ltext: "Cleaning",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 2,
      icon: require("../../assets/service/service2.png"),
      ftext: "Appliances",
      ltext: "Repair",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 3,
      icon: require("../../assets/service/service3.png"),
      ftext: "Carpender",
      ltext: "Service",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 4,
      icon: require("../../assets/service/service4.png"),
      ftext: "Home",
      ltext: "Painting",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 5,
      icon: require("../../assets/service/service5.png"),
      ftext: "Plumbing",
      ltext: "Service",
      onPress: () => {
       // https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/Krishna%20Society/AllAmenities
        const databaseURL =
          "https://prism-worker-gate-default-rtdb.firebaseio.com/";
        const path = "Societies/Krishna%20Society/AllAmenities";
        const limit = 5;
        const apiKey = "AIzaSyCCG4gkyhr0crG0738BaICZOeJsgbhBRsg";
        const url = `${databaseURL}/${path}.json?orderBy="$key"&limitToFirst=${limit}&apiKey=${apiKey}`;
        console.log(url)
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Process the retrieved data
            console.log(data);
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
      },
    },
    {
      key: 6,
      icon: require("../../assets/service/service6.png"),
      ftext: "Packers &",
      ltext: "Mover",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 7,
      icon: require("../../assets/service/service7.png"),
      ftext: "Home",
      ltext: "Senitize",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 8,
      icon: require("../../assets/service/service8.png"),
      ftext: "Hair",
      ltext: "Beauty",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 9,
      icon: require("../../assets/service/service1.png"),
      ftext: "Home",
      ltext: "Cleaning",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 10,
      icon: require("../../assets/service/service2.png"),
      ftext: "Appliances",
      ltext: "Repair",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 11,
      icon: require("../../assets/service/service3.png"),
      ftext: "Carpender",
      ltext: "Service",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 12,
      icon: require("../../assets/service/service4.png"),
      ftext: "Home",
      ltext: "Painting",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 13,
      icon: require("../../assets/service/service5.png"),
      ftext: "Plumbing",
      ltext: "Service",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 14,
      icon: require("../../assets/service/service6.png"),
      ftext: "Packers &",
      ltext: "Mover",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 15,
      icon: require("../../assets/service/service7.png"),
      ftext: "Home",
      ltext: "Senitize",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
    {
      key: 16,
      icon: require("../../assets/service/service8.png"),
      ftext: "Hair",
      ltext: "Beauty",
      onPress: () =>
        Alert.alert(
          "This feature is under developement",
          "Under Developing Phase soon it will come"
        ),
    },
  ];
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
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        {/* <Fontisto
          name="bell-alt"
          size={24}
          color="gray"
          style={{
            marginRight: 10,
            marginTop: 5,
          }}
          // style={{marginHorizontal: 18, marginTop: 15}}
        /> */}
        <Text
          style={{
            fontSize: 20,
            marginTop: 5,
            fontFamily: "Poppins-SemiBold",
            color: "black",
          }}
        >
          {flatno}
        </Text>
        <Text
          style={{
            fontSize: 26,
            // marginTop: 13,

            fontFamily: "Poppins-Medium",
            // fontWeight:"bold",
            color: "black",
          }}
        >
          Services
        </Text>
        {imageUri ? (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Poppins-SemiBold",
            color: "black",
            marginLeft: 14,
            marginTop: 10,
          }}
        >
          Nearby Service Provider
        </Text>
        <FlatList
          style={{ flex: 1, marginLeft: 5, marginTop: 10 }}
          numColumns={2}
          data={services}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={item.onPress}
                style={{
                  backgroundColor: "#f2faff",
                  margin: 10,
                  flex: 1,
                  padding: 20,
                  borderRadius: 15,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins-SemiBold",
                      color: "black",
                    }}
                  >
                    {item.ftext}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins-SemiBold",
                      color: "black",
                    }}
                  >
                    {item.ltext}
                  </Text>
                </View>
                <Image
                  source={item.icon}
                  style={{
                    resizeMode: "contain",
                    width: 90,
                    height: 90,
                    marginLeft: 20,
                    marginRight: -10,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </>
  );
}
