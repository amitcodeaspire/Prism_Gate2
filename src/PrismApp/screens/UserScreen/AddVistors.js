import React, {useState, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BackButton from '../../components/BackButton';
import Background from '../../components/Background';
import Button from '../../components/Button';
import {AuthContext} from '../../store/auth-context';
import {Dropdown} from 'react-native-element-dropdown';
import storage from '@react-native-firebase/storage';
import LoadingOverlay from '../../components/LoadingOverlay';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {Modal} from 'react-native';
import {askForMultiplyPermission} from '../../../Permissions/AppPermissions';
import {PERMISSIONS} from 'react-native-permissions';
export default AddVistors = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const authctx = React.useContext(AuthContext);
  const [name, setName] = useState();
  const [Imageuri, setiImageuri] = useState(false);
  const [transferred, settransferred] = useState(0);
  const [type, settype] = useState();
  const [uploading, setuploading] = useState(false);
  const [openDate, setopenDate] = useState(false);
  const [openTime, setopenTime] = useState(false);
  const [Visable, setVisable] = useState(false);
  const [time, settime] = useState(new Date());
  const [date, setdate] = useState(new Date());
  const openSetting = useCallback(async () => {
    await Linking.openSettings();
  }, []);
  const openCamera = async () => {
    setVisable(false);
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera({quality: 0.5});
        console.log(result.assets[0].uri);
        setiImageuri(result.assets[0].uri);
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert(
        'Denied Permission',
        'This Permission is Important Please Allow Prism Gate For Camera',
        [
          {
            text: 'Allow',
            onPress: openSetting,
            style: 'destructive',
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setVisable(false),
          },
        ],
      );
    }
  };
  const openGallery = async () => {
    setVisable(false);
    try {
      const result = await launchImageLibrary({quality: 0.5});
      console.log(result.assets[0].uri);
      setiImageuri(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };
  async function submit() {
    if (name && type && time && date) {
      if (!Imageuri) {
        try {
          setuploading(true);

          const Backend_Url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authctx.uid}`;
          const obj = {
            name: name,
            type: type,
            time: time,
            date: date,
            icon: false,
          };
          const response = await axios.post(
            Backend_Url + '/Vistors.json?auth=' + authctx.token,
            obj,
          );
          navigation.goBack()
          // Alert.alert('Vistor Added', 'Vistor Added Successfully');
        } catch (error) {
          console.log(error);
          Alert.alert(
            'Something Went Wrong Please Try After Some Time',
            'Vistor not Added',
          );
        }
        setuploading(false);
      }
      if (Imageuri) {
        const uploadUri = Imageuri;
        console.log(uploadUri);
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const extension = filename.split('.').pop();
        const fname = filename.split('.').slice(0, -1).join('.');
        filename = fname + Date.now() + '.' + extension;

        setuploading(true);
        settransferred(0);

        const task = storage()
          .ref('User/' + authctx.uid + '/Vistors/' + filename)
          .putFile(uploadUri);
        task.on('state_changed', taskSnapshot => {
          settransferred(
            Math.round(
              taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
            ) * 100,
          );
        });
        try {
          await task;
          setuploading(false);
          const url = await storage()
            .ref('User/' + authctx.uid + '/Vistors/' + filename)
            .getDownloadURL();

          const Backend_Url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authctx.uid}`;
          const obj = {
            icon: url,
            name: name,
            type: type,
            time: time,
            date: date,
          };
          const response = await axios.post(
            Backend_Url + '/Vistors.json?auth=' + authctx.token,
            obj,
          );
          navigation.replace('Dashboard');
          Alert.alert('Vistor Added', 'Vistor Added Successfully');
        } catch (error) {
          console.log(error);
          Alert.alert(
            'Something Went Wrong Please Try After Some Time',
            'Vistor not Added',
          );
        }
      }
    } else {
      return Alert.alert('Incomplete', 'Please Fill The Details');
    }
  }
  if (uploading) {
    if (Imageuri) {
      return (
        <Background>
          <Image
            source={require('../../assets/loading.gif')}
            style={{width: 100, height: 100, alignSelf: 'center'}}
          />
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
            {transferred} % Completed
          </Text>
        </Background>
      );
    } else {
      return (
        <Background>
          <Image
            source={require('../../assets/loading.gif')}
            style={{width: 100, height: 100, alignSelf: 'center'}}
          />
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
            Please wait...
          </Text>
        </Background>
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: '80%',
          // height: '50%',
          borderRadius: 10,
          padding: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
          <Image
            source={require('../../assets/x.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
              color: 'black',
              marginTop: 15,
            }}>
            Add Vistor
          </Text>
          <TouchableOpacity onPress={() => setVisable(true)}>
            {Imageuri ? (
              <Image
                source={{uri: Imageuri}}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90 / 2,
                  resizeMode: 'contain',
                  marginTop: -10,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/person.png')}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90 / 2,
                  resizeMode: 'contain',
                  marginTop: -10,
                  // backgroundColor: 'gray',
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <Modal visible={Visable} transparent={true} animationType="fade">
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,.9)',
              width: width,
              height: height,
              position: 'absolute',
              top: 10,
            }}>
            <View
              style={{
                // width:"50%",.
                // height:200,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 50,
                  paddingVertical: 30,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => setVisable(false)}
                  style={{
                    left: -40,
                    top: -20,
                  }}>
                  <Image
                    source={require('../../assets/x.png')}
                    // resizeMethod='resize'
                    resizeMode="contain"
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openGallery}
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'black',
                    borderRadius: 60,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 18,
                      color: 'white',
                      paddingHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    Open Gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openCamera} style={{}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 18,
                      color: 'black',
                      textAlign: 'center',
                    }}>
                    Open Camera
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{}}>
          <TextInput
            placeholder="Vistors Name"
            placeholderTextColor="gray"
            sty
            value={name}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              fontFamily: 'Poppins-Medium',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={e => setName(e)}
          />
          <TextInput
            placeholder="Vistors Type"
            placeholderTextColor="gray"
            sty
            value={type}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              fontFamily: 'Poppins-Medium',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={e => settype(e)}
          />
          <Text
            onPress={() => setopenDate(true)}
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              color: 'black',
              marginTop: 15,
              marginBottom: 15,
              borderBottomWidth: 0.5,
            }}>
            {date.getDate()} - {date.getMonth()} - {date.getFullYear()}
          </Text>
          <Text
            onPress={() => setopenTime(true)}
            style={{
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
              color: 'black',
              marginTop: 15,
              marginBottom: 15,
              borderBottomWidth: 0.5,
            }}>
            {time.getHours()} : {time.getMinutes()} :{' '}
            {time.getHours() >= 12 ? 'pm' : 'am'}
          </Text>
        </View>
        <DatePicker
          modal
          mode="date"
          open={openDate}
          date={date}
          onConfirm={value => {
            setopenDate(false);
            setdate(value);
          }}
          onCancel={() => setopenDate(false)}
        />
        <DatePicker
          modal
          mode="time"
          open={openTime}
          date={time}
          onConfirm={value => {
            setopenTime(false);
            settime(value);
          }}
          onCancel={() => setopenTime(false)}
        />
        <TouchableOpacity
          onPress={submit}
          style={{
            backgroundColor: 'black',
            borderRadius: 30,
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Bold',
              color: 'white',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
