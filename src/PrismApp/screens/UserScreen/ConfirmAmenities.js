import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import BackButton from "../../components/BackButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DatePicker from "react-native-date-picker";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import Icon3 from "../../core/exports";
const ConfirmAmenities = ({ route, navigation }) => {
  const User = route.params.userInfo;
  const AmenityInfo = route.params.Amenity;
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 6);
  var from = new Date();
  from.setDate(from.getDate() + 3);
  var time = new Date()
  time.setMinutes(time.getMinutes()+16)
  // console.log(time.getMinutes())
  const [FromopenDate, setFromopenDate] = useState(false);
  const [FromopenTime, setFromopenTime] = useState(false);
  const [ToopenDate, setToopenDate] = useState(false);
  const [ToopenTime, setToopenTime] = useState(false);
  const [Fromtime, setFromtime] = useState(new Date());
  const [Fromdate, setFromdate] = useState(from);
  const [Totime, setTotime] = useState(new Date());
  const [Todate, setTodate] = useState(currentDate);
  const [loading, setloading] = useState(loading);
  const authCtx = useContext(AuthContext);

  async function onSumbit() {
    if (Fromdate.getTime() === Todate.getTime()) {
      Alert.alert("Invalid Date", "Both the Booking Dates Cant Be Same !!!");
    } else if (Fromdate.getTime() < Todate.getTime()) {
      var differenceInMilliseconds = Todate.getTime() - Fromdate.getTime();
      var differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

      if (differenceInDays >= 3) {
        function checkTimeDifference(date1, date2) {
          const time1 = date1.getTime();
          const time2 = date2.getTime();
        
          const minutesDifference = Math.abs(time2 - time1) / (1000 * 60);
        
          return minutesDifference > 15;
        }
        const bol = checkTimeDifference(Fromtime,Totime)
        // console.log(bol)
        if (bol) {
          // console.log("The time difference is at least 15 minutes or more.");
          setloading(true)
          try {
            const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Amenities.json?auth=${authCtx.token}`;
            const data = {
              Totime: Totime,
              Fromtime: Fromtime,
              Todate: Todate,
              Fromdate: Fromdate,
              Society: authCtx.Society,
              Amenity: AmenityInfo.Amenity,
              accepted: false,
              uid: authCtx.uid,
              by: route.params.userInfo.Name,
              flatno: route.params.userInfo.flatno,
              rejected: false,
            };
            await axios.post(url, data);
            navigation.replace("Dashboard");
          } catch (error) {
            console.log(error);
            Alert.alert("Something Went Wrong", "Please Try after Some Time");
          }
          setloading(false)
        } else {
          Alert.alert("Invaild Time","The time difference is less than 16 minutes.");
        }
      } else {
        Alert.alert("Invalid Date", "Book Atleast For 3 Days");
      }
    } else {
      Alert.alert(
        "Invalid Dates",
        "Starting Date Should be before the booking date"
      );
    }
  }
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", { month: "long" });
  }
  if (loading) {
    return <LoadingOverlay>Please Wait ..</LoadingOverlay>;
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
        Book Amenity
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins-SemiBold",
            color: "black",
          }}
        >
          {AmenityInfo.Amenity}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              color: "#C1BEBE",
              fontFamily: "Poppins-SemiBold",
              fontSize: 13,
            }}
          >
            Maximum Capacity{" "}
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins-SemiBold",
              fontSize: 13,
            }}
          >
            {AmenityInfo.Capacity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#C1BEBE",
              fontFamily: "Poppins-SemiBold",
              fontSize: 13,
            }}
          >
            Book for Atleast{" "}
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins-SemiBold",
              fontSize: 13,
            }}
          >
            3 Days
          </Text>
        </View>
        <Text
          style={{
            color: "gray",
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
            marginTop: 50,
          }}
        >
          Select Date
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 0.5,
            }}
          >
            <MaterialIcons
              name="date-range"
              color="#C1BEBE"
              size={24}
              style={{ marginRight: 10 }}
            />
            <Text
              onPress={() => setFromopenDate(true)}
              style={{
                color: "black",
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
              }}
            >
              {Fromdate.getDate()} {getMonthName(Fromdate.getMonth())}{" "}
              {Fromdate.getFullYear()}
            </Text>
            <DatePicker
              modal
              mode="date"
              theme="auto"
              title="From"
              minimumDate={from}
              open={FromopenDate}
              date={Fromdate}
              onConfirm={(value) => {
                setFromopenDate(false);
                setFromdate(value);
              }}
              onCancel={() => setFromopenDate(false)}
            />
          </View>
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
            }}
          >
            To
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 0.5,
            }}
          >
            <MaterialIcons name="date-range" color="#C1BEBE" size={24} />
            <Text
              onPress={() => setToopenDate(true)}
              style={{
                color: "black",
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,

                marginLeft: 10,
              }}
            >
              {Todate.getDate()} {getMonthName(Todate.getMonth())}{" "}
              {Todate.getFullYear()}
            </Text>
            <DatePicker
              theme="auto"
              modal
              title="To"
              mode="date"
              minimumDate={currentDate}
              open={ToopenDate}
              date={Todate}
              onConfirm={(value) => {
                setToopenDate(false);
                setTodate(value);
              }}
              onCancel={() => setToopenDate(false)}
            />
          </View>
        </View>
        <Text
          style={{
            color: "gray",
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
            marginTop: 70,
          }}
        >
          Select Time
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 0.5,
            }}
          >
            <MaterialIcons
              name="access-time"
              color="#C1BEBE"
              size={24}
              style={{ marginRight: 10 }}
            />
            <Text
              onPress={() => setFromopenTime(true)}
              style={{
                color: "black",
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
              }}
            >
              {Fromtime.getHours() < 10
                ? "0" + Fromtime.getHours()
                : Fromtime.getHours()}
              {":"}
              {Fromtime.getMinutes() < 10
                ? "0" + Fromtime.getMinutes()
                : Fromtime.getMinutes()}{" "}
              {Fromtime.getHours() >= 12 ? "pm" : "am"}
            </Text>
            <DatePicker
              modal
              mode="time"
              title="From"
              // minimumDate={new Date()}
              open={FromopenTime}
              date={Fromtime}
              onConfirm={(value) => {
                setFromopenTime(false);
                setFromtime(value);
              }}
              onCancel={() => setFromopenTime(false)}
            />
          </View>
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
            }}
          >
            To
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 0.5,
            }}
          >
            <MaterialIcons name="access-time" color="#C1BEBE" size={24} />
            <Text
              onPress={() => setToopenTime(!ToopenTime)}
              style={{
                color: "black",
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,

                marginLeft: 10,
              }}
            >
              {Totime.getHours() < 10
                ? "0" + Totime.getHours()
                : Totime.getHours()}
              {":"}
              {Totime.getMinutes() < 10
                ? "0" + Totime.getMinutes()
                : Totime.getMinutes()}{" "}
              {Totime.getHours() >= 12 ? "pm" : "am"}
            </Text>
            <DatePicker
              modal
              mode="time"
              title="To"
              // minimumDate={new Date()}
              open={ToopenTime}
              date={Totime}
              onConfirm={(value) => {
                setToopenTime(false);
                setTotime(value);
              }}
              onCancel={() => setToopenTime(false)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onSumbit}
        style={{
          // marginTop: "40%",
          // marginBottom: 10,

          marginHorizontal: 15,
          justifyContent: "flex-end",
          flex: 1,
          marginBottom: "10%",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontFamily: "Poppins-Medium",
            textAlignVertical: "center",
            textAlign: "center",
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "black",
            borderRadius: 10,
          }}
        >
          Request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmAmenities;
