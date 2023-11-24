import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import { ScrollView } from "react-native-virtualized-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";

const HelpDesk = ({ navigation, route }) => {
  const [loading, setloading] = useState(false);
  const [IssuesData, setIssuesData] = useState([]);
  const authCtx = React.useContext(AuthContext);
  const [refreshing, setrefreshing] = useState(false);
  async function Refersh() {
    setrefreshing(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Issues.json?auth=${authCtx.token}`;
      const response = await axios.get(url);
      var temp = [];
      for (key in response.data) {
        // console.log(key)
        var short = response.data;
        var obj = {
          key: key,
          title: short[key].title,
          desc: short[key].desc,
          date: short[key].date,
          resolved: short[key].resolved,
          by: short[key].by,
          type: short[key].type,
          rejected: short[key].rejected,
        };
        temp.push(obj);
      }
      setIssuesData(temp.reverse());
    } catch (error) {
      console.log(error);
    }

    setrefreshing(false);
  }
  async function getData() {
    setloading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Issues.json?auth=${authCtx.token}`;
      const response = await axios.get(url);
      var temp = [];
      for (key in response.data) {
        // console.log(key)
        var short = response.data;
        var obj = {
          key: key,
          title: short[key].title,
          desc: short[key].desc,
          date: short[key].date,
          resolved: short[key].resolved,
          by: short[key].by,
          type: short[key].type,
          rejected: short[key].rejected,
        };
        temp.push(obj);
      }
      setIssuesData(temp.reverse());
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );
  if (loading) {
    return <LoadingOverlay>Please Wait ...</LoadingOverlay>;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
          <Icon3 name="arrowleft" color="black" size={24} style={{top:11,left:2}} onPress={()=>navigation.goBack()}/>
      <RefreshControl refreshing={refreshing} onRefresh={Refersh} style={{

      }}>
        
        <View style={{ marginLeft: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
              Help Desk
            </Text>

            <Icon2
              onPress={({}) => {
                navigation.navigate("AddHelp", route.params);
              }}
              name="add"
              size={34}
              color={"black"}
              style={{ marginTop: 50, paddingBottom: 10, left: -10 }}
            />
          </View>
        </View>
        </RefreshControl>
        {IssuesData.length === 0 && (
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-SemiBold",
              marginTop: "50%",
              marginHorizontal: "10%",
            }}
          >
            No Issues found. If you have any Issues you can register it by
            pressing add button on the top right corner
          </Text>
        )}
        {IssuesData.length > 0 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={IssuesData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                // console.log(item);
                return (
                  <View
                    style={[
                      {
                        marginHorizontal: 10,
                        // borderWidth: 0.7,
                        borderRadius: 10,
                        borderColor: "gray",
                        elevation: 3,
                        marginBottom: 15,
                      },
                    ]}
                  >
                    <View
                      style={{
                        backgroundColor: "#f2faff",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderBottomWidth: 0.2,
                        borderBottomColor: "gray",
                        borderTopWidth: 0.2,
                        borderTopColor: "gray",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          // padding: 10,
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                            fontFamily: "Poppins-SemiBold",
                            color: "black",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Poppins-SemiBold",
                            color: "white",
                            backgroundColor: "#4ab304",
                            paddingTop: 5,
                            // borderRadius:10,
                            paddingBottom: 0,
                            right: -15,
                            top: -10,
                            borderBottomLeftRadius: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}
                        >
                          • {item.type}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Poppins-Medium",
                          color: "black",
                          marginTop: 5,
                        }}
                      >
                        {item.desc}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderBottomColor: "gray",
                        alignItems: "center",
                        justifyContent:"space-evenly"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Poppins-Medium",
                          color: "gray",
                          marginTop: 5,
                          
                        }}
                      >
                        Raised By{""}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Poppins-Medium",
                          color: "black",
                          marginTop: 5,
                          left:-5
                          
                        }}
                      >
                        {item.by.length < 9 ? item.by : item.by.substring(0,8)+".."}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins-Medium",
                          color: "gray",
                          marginTop: 5,
                          marginLeft: "20%",
                        }}
                      >
                        {item.date}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderBottomColor: "gray",
                      }}
                    >
                      {!item.resolved && !item.rejected && (
                        <>
                          <Icon
                            name="thumbs-down"
                            // type="Feather"
                            size={24}
                            style={{
                              marginTop: 5,
                            }}
                            color={"orange"}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Poppins-SemiBold",
                              color: "orange",
                              marginTop: 5,
                              marginLeft: "10%",
                            }}
                          >
                            Not Seen By Admin
                          </Text>
                        </>
                      )}
                      {item.resolved && (
                        <>
                          <Icon
                            name="thumbs-up"
                            // type="Feather"
                            size={24}
                            style={{
                              marginTop: 5,
                            }}
                            color={"green"}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Poppins-SemiBold",
                              color: "green",
                              marginTop: 5,
                              marginLeft: "10%",
                            }}
                          >
                            Accepted By Admin
                          </Text>
                        </>
                      )}
                      {item.rejected && (
                        <>
                          <Icon
                            name="thumbs-down"
                            // type="Feather"
                            size={24}
                            style={{
                              marginTop: 5,
                            }}
                            color={"red"}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Poppins-SemiBold",
                              color: "red",
                              marginTop: 5,
                              marginLeft: "10%",
                            }}
                          >
                            Rejected By Admin
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                );
              }}
            />
          </ScrollView>
        )}
     
    </View>
  );
};

export default HelpDesk;
