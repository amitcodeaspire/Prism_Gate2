import {View, Text,FlatList,Pressable} from 'react-native';
import React from 'react';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';

export default function AttendanceMonth({navigation, route}) {
  const Data = route.params;
  const [months, setmonths] = React.useState([]);
  const month = {
    1: 'Janauary',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  const authCtx = React.useContext(AuthContext);
  React.useEffect(() => {
    async function get() {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/DailyHelper/${Data.oldkey}/Attendance/${Data.curryear}.json?auth=${authCtx.token}`;
      try {
        const resp = await axios.get(url);
        const newArr = [];
        for (var i in resp.data) {
          for (var j in month) {
            if (i === j) {
              newArr.push({key: j, value: month[j]});
            }
          }
        }
        setmonths(newArr);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);
  function renderMonths(item) {
    let routeData = route.params;
    routeData["curmonth"] = item.item.key
    
    return (
      <Pressable
        onPress={()=>navigation.navigate("Attendance",routeData)}
        style={{
          alignSelf: 'center',
          borderWidth: 1,
          paddingHorizontal: 150,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
          {item.item.value}
        </Text>
      </Pressable>
    );
  }
  return (
    <View>{ months && <FlatList data={months} renderItem={renderMonths} />}</View>
  );
}
