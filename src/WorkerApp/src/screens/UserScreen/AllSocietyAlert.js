import {
  View,
  Text,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function AllSocietyAlert({ navigation }) {
  const authCtx = React.useContext(AuthContext);
  const [Allalerts, setAllalerts] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [imageUri, setimageuri] = React.useState();
  const [isFotterloading, setisFotterloading] = React.useState(false);
  const [limit, setlimit] = React.useState(4);
  async function get() {
    setloading(true);
    try {
      const apiKey = "AIzaSyCCG4gkyhr0crG0738BaICZOeJsgbhBRsg";
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${
        authCtx.Society
      }/SocietyAlerts.json?orderBy="$key"&limitToFirst=${5}&apiKey=${apiKey}?auth=${
        authCtx.token
      }`;
      const response = await axios.get(
        "https://prism-worker-gate-default-rtdb.firebaseio.com/" +
          "Worker/" +
          authCtx.uid +
          "/Details.json" +
          "?auth=" +
          authCtx.token
      );

      setimageuri(response.data.Imageuri);
      // setimageuri(response.data.Image);
      const resp = await axios.get(url);
      const newArr = [];
for (var i in resp.data) {
  var objtemp = {
    key: i,
    title: resp.data[i].DescriptionTitle,
    desc: resp.data[i].Description,
    fromTime: resp.data[i].fromTime,
    toTime: resp.data[i].toTime,
    accepted: resp.data[i].accepted,
    rejected: resp.data[i].rejected,
  };
  newArr.push(objtemp);
}
// console.log(newArr)
setAllalerts(newArr);
    } catch (error) {
      Alert.alert("Something went wrong", "Please Try agin later");
    }
    setloading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      // alert("Enter");
      get();
      return () => {};
    }, [])
  );
  React.useEffect(() => {
    async function getMore() {
      setisFotterloading(true);
      try {
        const apiKey = "AIzaSyCCG4gkyhr0crG0738BaICZOeJsgbhBRsg";
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/SocietyAlerts.json?orderBy="$key"&limitToFirst=${limit}&apiKey=${apiKey}?auth=${authCtx.token}`;
        const response = await axios.get(
          "https://prism-worker-gate-default-rtdb.firebaseio.com/" +
            "Worker/" +
            authCtx.uid +
            "/Details.json" +
            "?auth=" +
            authCtx.token
        );

        setimageuri(response.data.Imageuri);
        // setimageuri(response.data.Image);
        const resp = await axios.get(url);
        const newArr = [];
        for (var i in resp.data) {
          var objtemp = {
            key: i,
            title: resp.data[i].DescriptionTitle,
            desc: resp.data[i].Description,
            fromTime: resp.data[i].fromTime,
            toTime: resp.data[i].toTime,
            accepted: resp.data[i].accepted,
            rejected: resp.data[i].rejected,
          };
          newArr.push(objtemp);
        }
        // console.log(newArr)
        setAllalerts(Allalerts.concat(newArr));
      } catch (error) {
        Alert.alert("Something went wrong", "Please Try agin later");
      }
      setisFotterloading(false);
    }
    getMore();
  }, [limit]);
  async function deleteAlert(id, data) {
    setloading(true);
    console.log(id + data);
    function del(obj) {
      setloading(false);
      return id != obj.key;
    }
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/SocietyAlerts/${id}.json?auth=${authCtx.token}`;
      const resp = await axios.delete(url);
      const newAlerts = data.filter(del);
      setAllalerts(newAlerts);
    } catch (e) {
      console.log(e);
      Alert.alert("Something Went Wrong", "Please Try Again Later");
      setloading(false);
    }
    setloading(false);
  }
function renderAlerts(item) {
  var item = item.item;
  var fromTime = new Date(item.fromTime);
  var toTime = new Date(item.toTime);
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#DBF0FE",
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        elevation: 5,
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
            fontSize: 18,
            color: "red",
            fontFamily: "Poppins-SemiBold",
          }}
        >
          {item.title}
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="ios-trash-bin-outline"
            color="red"
            size={24}
            onPress={() => {
              deleteAlert(item.key, Allalerts);
            }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Medium",
          color: "black",
          marginTop: 15,
          marginBottom: 1,
          // borderBottomWidth: 0.5,
        }}
      >
        {"From : " + fromTime.getDate()} - {fromTime.getMonth()} -{" "}
        {fromTime.getFullYear()} {fromTime.getHours()} :{" "}
        {fromTime.getMinutes()} : {fromTime.getHours() >= 12 ? "pm" : "am"}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Medium",
          color: "black",
          marginTop: 15,
          marginBottom: 15,
          // borderBottomWidth: 0.5,
        }}
      >
        {"To :   " + toTime.getDate()} - {toTime.getMonth()} -{" "}
        {toTime.getFullYear()} {toTime.getHours()} : {toTime.getMinutes()} :{" "}
        {toTime.getHours() >= 12 ? "pm" : "am"}
      </Text>
      {!item.accepted && !item.rejected && (
        <Text
          style={{
            fontSize: 18,
            color: "red",
            fontFamily: "Poppins-Mediums",
            marginBottom: 5,
          }}
        >
          {"Not Seen By Admin"}
        </Text>
      )}

      {item.accepted && (
        <Text
          style={{
            fontSize: 18,
            color: "red",
            fontFamily: "Poppins-Mediums",
            marginBottom: 5,
          }}
        >
          Accepted By Admin
        </Text>
      )}
      {item.rejected && (
        <Text
          style={{
            fontSize: 18,
            color: "red",
            fontFamily: "Poppins-Mediums",
            marginBottom: 5,
          }}
        >
          Rejected By Admin
        </Text>
      )}
      <Text
        style={{
          fontSize: 16,
          color: "black",
          fontFamily: "Poppins-Medium",
        }}
      >
        {item.desc}
      </Text>
    </View>
  );
}
  if (loading) {
    return <LoadingOverlay>Please wait....</LoadingOverlay>;
  }
  function toLoadMore() {
    setlimit((prevItem) => prevItem + 5);
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 5,
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
        <Ionicons
          name="add"
          size={34}
          color="gray"
          style={{
            marginRight: 10,
            marginTop: 5,
          }}
          onPress={() => navigation.navigate("AddAlert")}
          // style={{marginHorizontal: 18, marginTop: 15}}
        />
      </View>
      {Allalerts.length > 0 ? (
        <FlatList data={Allalerts} renderItem={renderAlerts} />
      ) : (
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            marginTop: 200,
            fontSize: 30,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          No Alerts if requried please add them
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

// import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { ActivityIndicator, MD2Colors } from "react-native-paper";
// import axios from "axios";
// const AllSocietyAlert = ({ navigation }) => {
//   const [data, setData] = useState([]);
//   const [lastKey, setLastKey] = useState(null);
//   async function get() {
//     try {
//       const response = await axios.get(
//         "https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/Krishna%20Society/SocietyAlerts.json?orderBy=$key&limitToFirst=100",
//         {
//           params: {
//             auth: "AIzaSyCCG4gkyhr0crG0738BaICZOeJsgbhBRsg",
//           },
//         }
//       );
//       console.log(await response.data);
//       const resp = await response.data;
//       const newArr = [];

//       for (var i in resp) {
//         var onj = {
//           key: i,
//           DescriptionTitle: resp[i].DescriptionTitle,
//           Description: resp[i].Description,
//           fromTime: resp[i].fromTime,
//           toTime: resp[i].toTime,
//           rejected: resp[i].rejected,
//           accepted: resp[i].accepted,
//         };
//         newArr.push(onj);
//       }

//       if (data.length > 0) {
//         setData(data.concat(data));
//       } else {
//         setData(newArr);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   useEffect(() => {
//     get();
//   }, []);
//   function renderAlerts({ item, index }) {
//     var fromTime = new Date(item.fromTime);
//     var toTime = new Date(item.toTime);
//     return (
//       <View
//         style={{
//           paddingVertical: 10,
//           paddingHorizontal: 20,
//           backgroundColor: "#DBF0FE",
//           marginTop: 10,
//           marginHorizontal: 15,
//           borderRadius: 10,
//           elevation: 5,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 18,
//               color: "red",
//               fontFamily: "Poppins-SemiBold",
//             }}
//           >
//             {item.DescriptionTitle}
//           </Text>
//           <TouchableOpacity>
//             <Ionicons
//               name="ios-trash-bin-outline"
//               color="red"
//               size={24}
//               onPress={() => {
//                 deleteAlert(item.key, Allalerts);
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//         <Text
//           style={{
//             fontSize: 16,
//             fontFamily: "Poppins-Medium",
//             color: "black",
//             marginTop: 15,
//             marginBottom: 1,
//             // borderBottomWidth: 0.5,
//           }}
//         >
//           {"From : " + fromTime.getDate()} - {fromTime.getMonth()} -{" "}
//           {fromTime.getFullYear()} {fromTime.getHours()} :{" "}
//           {fromTime.getMinutes()} : {fromTime.getHours() >= 12 ? "pm" : "am"}
//         </Text>
//         <Text
//           style={{
//             fontSize: 16,
//             fontFamily: "Poppins-Medium",
//             color: "black",
//             marginTop: 15,
//             marginBottom: 15,
//             // borderBottomWidth: 0.5,
//           }}
//         >
//           {"To :   " + toTime.getDate()} - {toTime.getMonth()} -{" "}
//           {toTime.getFullYear()} {toTime.getHours()} : {toTime.getMinutes()} :{" "}
//           {toTime.getHours() >= 12 ? "pm" : "am"}
//         </Text>
//         {!item.accepted && !item.rejected && (
//           <Text
//             style={{
//               fontSize: 18,
//               color: "red",
//               fontFamily: "Poppins-Mediums",
//               marginBottom: 5,
//             }}
//           >
//             {"Not Seen By Admin"}
//           </Text>
//         )}

//         {item.accepted && (
//           <Text
//             style={{
//               fontSize: 18,
//               color: "red",
//               fontFamily: "Poppins-Mediums",
//               marginBottom: 5,
//             }}
//           >
//             Accepted By Admin
//           </Text>
//         )}
//         {item.rejected && (
//           <Text
//             style={{
//               fontSize: 18,
//               color: "red",
//               fontFamily: "Poppins-Mediums",
//               marginBottom: 5,
//             }}
//           >
//             Rejected By Admin
//           </Text>
//         )}
//         <Text
//           style={{
//             fontSize: 16,
//             color: "black",
//             fontFamily: "Poppins-Medium",
//           }}
//         >
//           {item.DescriptionTitle}
//         </Text>
//       </View>
//     );
//   }
//   const loadMoreData = () => {
//     // Fetch more data from the API
//     get();
//   };

//   return (
//     <>
//       <Text onPress={() => navigation.navigate("AddAlert")}>Add+</Text>
//       <FlatList
//         data={data}
//         renderItem={renderAlerts}
//         keyExtractor={(item, index) => index.toString()}
//         onEndReached={loadMoreData}
//         ListFooterComponent={() => {
//           return (
//             <ActivityIndicator
//               color={MD2Colors.red600}
//               animating
//               size={24}
//               style={{ alignSelf: "center", marginVertical: 20 }}
//             />
//           );
//         }}
//         onEndReachedThreshold={0.5}
//       />
//     </>
//   );
// };
// export default AllSocietyAlert;
