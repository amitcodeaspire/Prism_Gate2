import {View, Text, StatusBar, PermissionsAndroid,Alert} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {TextInput} from 'react-native';
import {ScrollView} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import Button from '../../components/Button';

export default function AddVehicles({navigation}) {
  const [VehicleNumber, setVehicleNumber] = useState();
  const [VehicleModel, setVehicleModel] = useState();
  const [VehicleColor, setVehicleColor] = useState();
  const [imageuri, setimageuri] = useState();
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera({});
        const uploadUri = result.assets[0].uri;

        setimageuri(uploadUri);
      } catch (e) {
        Alert.alert('Cant Upload', 'Please Try after some time');
      }
    } else {
      Alert.alert(
        'Denied',
        'This Permission is Important Please Allow Prism Gate For Camera',
      );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        alignItems:"center",
        justifyContent:"center"
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: '80%',
          // height: '50%',
          borderRadius: 10,
          padding: 20,
        
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            Add My Vehicles
          </Text>
          <TouchableOpacity onPress={openCamera}>
            {imageuri ? (
              <Image
                source={{uri: imageuri}}
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
                source={require('../../assets/car.png')}
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
        <View
        style={{
        }}>
          <TextInput
            placeholder="Vehicle Number"
            placeholderTextColor="gray"
            sty
            value={VehicleNumber}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              fontFamily: 'Poppins-Medium',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={e => setVehicleNumber(e)}
          />
          <TextInput
            placeholder="Vehicle Model"
            placeholderTextColor="gray"
            sty
            value={VehicleModel}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              fontFamily: 'Poppins-Medium',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={e => setVehicleModel(e)}
          />
          <TextInput
            placeholder="Vehicle Color"
            placeholderTextColor="gray"
            sty
            value={VehicleColor}
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              fontFamily: 'Poppins-Medium',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
            onChangeText={e => setVehicleColor(e)}
          />
        </View>
        <TouchableOpacity
        onPress={()=>{
          if (VehicleColor && VehicleModel && VehicleNumber && imageuri){
          Alert.alert(
            'This feature is under developement',
            'Under Developing Phase soon it will come',
          )}
          else{
            Alert.alert("Incomplete Details","Please Fill the form")
          }
        }}
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
}
