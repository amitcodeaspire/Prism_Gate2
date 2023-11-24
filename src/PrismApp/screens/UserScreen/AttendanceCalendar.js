import {View, Text, Image} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
export default function AttendanceCalendar({navigation, route}) {
  // console.log(route.params.item.Name)
  const Msg =
    route.params.item.Name +
    ' (' +
    route.params.item.Type +
    ') ' +
    'Attendance;';
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Poppins-SemiBold',
          color: 'black',
          textAlign: 'center',
          marginBottom: 50,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          marginHorizontal: 10,
          borderStyle: 'dashed',
          marginTop: -50,
        }}>
        {Msg}
      </Text>
      <Calendar
        enableSwipeMonths
        theme={{
          arrowColor: 'red',
          monthTextColor: 'black',
          textMonthFontFamily: 'Poppins-SemiBold',
          textMonthFontSize: 25,
          calendarBackground: '#f2faff',
          textDayFontFamily: 'Poppins-Medium',
          dayTextColor: '#FF0000',
          textDayFontSize: 20,
        }}
        style={{
          backgroundColor: '#f2faff',
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 10,
          marginHorizontal: 2,

          // height: '68%',
        }}
        hideExtraDays
        markedDates={route.params.Dates}
        markingType="custom"
      />
    </View>
  );
}
