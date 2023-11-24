import {View, Text, FlatList, Pressable,Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Calendar } from 'react-native-calendars';

export default function AttendanceYear({route, navigation}) {
  const item = route.params;
  const authCtx = useContext(AuthContext);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState();
  useEffect(() => {
    async function get() {
      setloading(true);
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/DailyHelper/${item.oldkey}/Attendance.json?auth=${authCtx.token}`;
      console.log(url);
      try {
        const res = await axios.get(url);
        const newArr = [];
        for (var i in res.data) {
          var obj = {
            key: i,
            year: i,
          };
          newArr.push(obj);
        }

        setdata(newArr);
      } catch (error) {
        Alert.alert("Something Went Wrong","Please try again later")
      }
      setloading(false);
    }
    get();
  }, []);
  if (loading) {
    return <LoadingOverlay>Please wait...</LoadingOverlay>;
  }
  function renderYears(item) {
    let routeData = route.params;
    routeData['curryear'] = item.item.year;
    return (
      <Pressable
        onPress={() => navigation.navigate('AttendanceMonth', routeData)}
        style={{
          alignSelf: 'center',
          borderWidth: 1,
          paddingHorizontal: 150,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
          {item.item.year}
        </Text>
      </Pressable>
    );
  }
  return (
    <View>

      <Calendar/>
      {/* {!data && <Text style={{fontSize: 30}}>No Attendance Mark</Text>}
      {data.length > 0 ? (
        <FlatList data={data} renderItem={renderYears} />
      ) : (
        
        <Text style={{fontSize: 30,alignSelf:"center",marginTop:200,color:"black",fontFamily:"Poppins-Bold"}}>No Attendance Mark</Text>
      )} */}
    </View>
  );
}
