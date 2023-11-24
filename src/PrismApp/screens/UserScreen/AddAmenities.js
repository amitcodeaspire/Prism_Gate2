import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import BackButton from "../../components/BackButton";
import LoadingOverlay from "../../components/LoadingOverlay";
import Icon3 from "../../core/exports";

const AddAmenities = ({ route, navigation }) => {
  const [allAmenities, setallAmenities] = useState([]);
  const authCtx = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  // console.log(route.params)
  async function get() {
    try {
      setloading(true);
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/AllAmenities.json?auth=${authCtx.token}`;
      const response = await axios.get(url);
      if (response.data != null) {
        var keysArr = Object.keys(response.data);
        var temp = [];
        for (var i = 0; i < keysArr.length; i++) {
          var obj = {
            key: keysArr[i],
            value: response.data[keysArr[i]],
          };
          temp.push(obj);
        }
        setallAmenities(temp);
      }

      setloading(false);
    } catch (error) {
      setloading(false);
      Alert.alert("Cant Load At This Moment", "Please Try After Some Time");
      console.log(error);
    }
  }

  useEffect(() => {
    // setloading(true)
    get();
    // setloading(false)
  }, []);

  if (loading) {
    return <LoadingOverlay>Please Wait ....</LoadingOverlay>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Icon3
        name="arrowleft"
        color="black"
        size={24}
        style={{ top: 11, left: 2 }}
        onPress={() => navigation.goBack()}
      />
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
        All Amenities
      </Text>
      <FlatList
        style={
          {
            // width:"100%"
          }
        }
        data={allAmenities}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ConfirmAmenities", {
                  Amenity: item.value,
                  userInfo: route.params,
                })
              }
              style={{
                marginTop: 20,
                marginHorizontal: 20,
                // width:"100%",
                backgroundColor: "#faf3c3",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    // textAlign: "center",
                    padding: 10,
                    // borderRadius: 10,
                    fontFamily: "Poppins-SemiBold",
                    color: "black",
                    fontSize: 17,
                    left: 5,
                  }}
                >
                  {item.value.Amenity.length < 12
                    ? item.value.Amenity
                    : item.value.Amenity.substring(0, 10) + "..."}
                </Text>
                <Text
                  style={{
                    // textAlign: "center",
                    padding: 10,
                    // borderRadius: 10,
                    fontFamily: "Poppins-SemiBold",
                    color: "green",
                    fontSize: 17,
                  }}
                >
                  {item.value.Capacity}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AddAmenities;
