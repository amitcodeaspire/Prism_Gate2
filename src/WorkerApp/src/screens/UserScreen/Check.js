import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {AuthContext} from '../../../store/auth-context';
import axios from 'axios';

export default function Check({navigation, route}) {
  const item = route.params;
  console.log(route);
  const header = item.Name + ' (' + item.Type + ')';
  const authCtx = useContext(AuthContext);
  const [temp, settemp] = useState();
  function GetTodaysdate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
  }
  async function onClick() {
    if (temp) {
      const date = GetTodaysdate();
      console.log(date);
      try {
        var a = item.key;
        console.log(a);
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/DailyHelper/${a}/Attendance.json?auth=${authCtx.token}`;
        const response = await axios.post(url, {date: date,temp:temp});
        Alert.alert(
          'Attendance Has Been Recorded',
          'Attention💥 Dont Re-Mark The worker otherwise it leads to incorrect attendance and if it found then you will be responsible',
        );
        navigation.goBack();
      } catch (e) {
        console.log(e);
        Alert.alert(
          'Failed',
          'Cant mark the attendance please try with better network or logout and then login ',
        );
      }

      
    } else {
      Alert.alert('Please fill the form', 'Incomplete Detail');
    }
  }
  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%',
      }}>
      <Text
        style={{
          fontSize: 18,
          color: 'black',
          fontFamily: 'Poppins-BoldItalic',
          textAlign: 'center',
        }}>
        {header}
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>Temperature in °C</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Enter Temperature"
          value={temp}
          onChangeText={n => settemp(n)}
        />
      </View>
      <TouchableOpacity
        onPress={onClick}
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          width: '100%',
          borderColor: 'black',
          backgroundColor: 'black',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontFamily: 'Poppins-Medium',
            textAlignVertical: 'center',
            textAlign: 'center',
          }}>
          Check In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  label: {
    marginTop: 20,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
});
