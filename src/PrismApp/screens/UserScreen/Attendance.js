import {View, Text, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';

export default function Attendance({route}) {
  const data = route.params;
  const [days, setdays] = React.useState([]);
  var symbol = '(' + data.Type + ')';
  const authCtx = React.useContext(AuthContext);
  React.useEffect(() => {
    async function get() {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/DailyHelper/${data.oldkey}/Attendance/${data.curryear}/${data.curmonth}.json?auth=${authCtx.token}`;
      const res = await axios.get(url);
      const newArr = [];
      for (var i in res.data) {
        var tempObj = {key: i, value: res.data[i].date, temp: res.data[i].temp};
        newArr.push(tempObj);
      }
      setdays(newArr);
    }
    get();
  }, []);
  function renderDays(item) {
    var date = new Date(item.item.value);
    const display =
      date.getUTCDate().toString() +
      '-' +
      (date.getMonth() + 1).toString() +
      '-' +
      date.getFullYear().toString();
    console.log(display);
    return (
      <Pressable
        style={{
          borderWidth: 1,
          justifyContent: 'flex-start',
          margin: 15,
          flexDirection: 'row',
          borderRadius:10,
          paddingHorizontal:15,
          backgroundColor:"#f2faff"
        }}>
        <Text
          style={{
            fontSize: 16,
            // fontWeight: 'bold',
            color: 'black',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
            fontFamily:"Poppins-Medium"
          }}>
          Date :- {display}
        </Text>
        <Text
          style={{
            fontSize: 16,
            // fontWeight: 'bold',
            color: 'black',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 2,
            fontFamily:"Poppins-Medium"
          }}>
          | Temperature :- {item.item.temp}°C
        </Text>
      </Pressable>
    );
  }
  return (
    <View style={{
      flex:1,
      backgroundColor:"white"
    }}>
      {/* <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: 'black',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          paddingTop: 5,
          paddingBottom: 5,
          fontFamily:"Poppins-Bold"
        }}>
        Dates
      </Text> */}
      {days && <FlatList data={days} renderItem={renderDays} />}
    </View>
  );
}

// 14640548VimalPandey
