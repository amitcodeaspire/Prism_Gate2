import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import React, {useState, useRef} from 'react';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {theme} from '../../core/theme';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../store/auth-context';
import messaging from '@react-native-firebase/messaging';
import Feather from 'react-native-vector-icons/Feather';
import Background from '../../components/Background';
import axios from 'axios';
import {postData} from '../../../../PrismApp/util/auth';
import { useFocusEffect } from '@react-navigation/native';
const SendNoti = () => {
  const [Title, setTitle] = useState('');
  const value = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const [Description, setDescription] = useState('');
  const [imageUri, setimageuri] = useState();
  const [loading, setloading] = useState(false);
  const authctx = React.useContext(AuthContext);
  async function sendNotification(message, token) {
    console.log('Sending');

    const Ftoken = await messaging().getToken();
    const atoken = value.current.split('Break');
    const messaGe = {
      to: atoken[0],
      data: {Worker_Token: Ftoken},
      notification: {
        title: message.title,
        body: message.body,
      },
    };
    try {
      await postData('https://fcm.googleapis.com/fcm/send', messaGe);
      Alert.alert(
        'Sent Successfully',
        'Notification has been send successfully Response Will Come',
      );
    } catch (error) {
      Alert.alert(
        'Something Went Wrong ',
        'Cant Send The Notification please Try Again later or Re-Login',
      );
      console.log(error);
    }

    // const resp = await fetch(url, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(messaGe),
    // });
  }

  async function test() {
    if (!Title || !Description) {
      return Alert.alert(
        'Please Fill The Details',
        'The Given Details are mandatory ',
      );
    }

    const message = {
      title: Title,
      body: Description,
    };

    await sendNotification(message, value.current);
  }
  return (
        <View style={[styles.background]}>
           <View
            style={{
              flexDirection: 'row',
              // backgroundColor: '#f2faff',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
            {imageUri ? (
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Image
                  source={{uri: imageUri}}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    // marginLeft: windowWidth / 6,
                    // marginTop: 8,
                    borderWidth: 1,
                    borderColor: 'black',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Image
                  source={require('../../assets/Profile-icon.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    // marginLeft: windowWidth / 6,
                    // marginTop: 8,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                    // alignItems: 'flex-end',
                  }}
                />
              </TouchableOpacity>
            )}
            <Text
              onPress={async () => console.log(await messaging().getToken())}
              style={{
                fontSize: 20,
                // marginTop: 13,
    
                fontFamily: 'Poppins-Medium',
                // fontWeight:"bold",
                color: 'black',
                textAlignVertical: 'center',
              }}>
              Worker Gate
            </Text>
            <Feather
              name="log-out"
              size={34}
              color="gray"
              style={{
                marginRight: 10,
                marginTop: 5,
              }}
              onPress={() => authctx.logout()}
              // style={{marginHorizontal: 18, marginTop: 15}}
            />
          </View>
          <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}r
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={authctx.userArray}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Name' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                value.current = item.value;
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="person"
                  size={20}
                />
              )}
            />
            <TextInput
              label="Title"
              style={{width: 300}}
              value={Title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              multiline
              label="Description"
              style={{width: 300}}
              value={Description}
              onChangeText={text => setDescription(text)}
            />
            <TouchableOpacity
            onPress={()=>alert("This feature is under development")}
              style={{
    
                // alignItems: "center",
                backgroundColor: "black",
                paddingVertical: 8,
                paddingHorizontal: 11,
                borderRadius: 10,
                marginTop: 25,
                // justifyContent:"center",
                flexDirection:"row"
             
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 20,
                  color: "white",
                  alignSelf:"center",
                  left:"320%"
                }}
              >
                Send
              </Text>
              {loading &&<ActivityIndicator
              style={{left:"600%"}}
              size={24}
              color="white"
              />}
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default SendNoti
// export default function SendNoti({navigation, route}) {


//   async function get() {
//     setloading(true);
//     try {
//       const response = await axios.get(
//         'https://prism-worker-gate-default-rtdb.firebaseio.com/' +
//           'Worker/' +
//           authctx.uid +
//           '/Details.json' +
//           '?auth=' +
//           authctx.token,
//       );

//       setimageuri(response.data.Imageuri);
//     } catch (error) {
//       setloading(false);
//       console.log(error);
//       Alert.alert(
//         'Something Went Wrong',
//         'Please Try again later of logout and then login',
//       );
//     }
//     // const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/DailyHelper.json?auth=${authCtx.token}`;

//     setloading(false);
//   }
//   // useFocusEffect(React.useCallback(()=>{
//   //   setTitle("")
//   //   setDescription("")
//     console.log(authctx.userArray)
//   //   // get();
//   // },[]))

//   if (loading) {
//     return (
//       <Background>
//         <Image
//           source={require('../../assets/loading.gif')}
//           style={{width: 100, height: 100, alignSelf: 'center'}}
//         />
//         <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
//           Loading Please wait
//         </Text>
//       </Background>
//     );
//   }

//   return 
// }

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    fontSize: 16,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
