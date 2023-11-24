import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import axios from 'axios';
import LoadingOverlay from '../../components/LoadingOverlay';
import {launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { AuthContext } from '../../store/auth-context';
const AddGuest = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [Imageuri, setImageuri] = useState('');
  const [Name, setName] = useState('');
  const [FromDate, setFromDate] = useState();
  const [ToDate, setToDate] = useState();

  const authCtx = useContext(AuthContext);

  if (loading) {
    return <LoadingOverlay>Please Wait...</LoadingOverlay>;
  }

  const openCamera = async () => {
    console.log('HIi');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera({});
        setloading(true);
        const uploadUri = result.assets[0].uri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const fname = filename.split('.').slice(0, -1).join('.');
        filename = fname + Date.now() + '.' + extension;
        const uid = authCtx.uid;
        const task = await storage()
          .ref('User/' + uid + '/Guests/' + filename)
          .putFile(uploadUri);
        const url = await storage()
          .ref('User/' + uid + '/Guests/' + filename)
          .getDownloadURL();
          console.log(url)
        setImageuri(url);
        setloading(false);
      } catch (e) {
        Alert.alert('Cant Upload', 'Please Try after some time');
      }
      setloading(false);
      setloading(false);
    } else {
      Alert.alert(
        'Denied',
        'This Permission is Important Please Allow Prism Gate For Camera',
      );
    }
  };
  const handleSubmit = async () => {
    if (Name && FromDate && Imageuri && ToDate) {
      setloading(true);
      try {
        
        Alert.alert('Done', 'Data has Been saved');
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Error',
          'Please Try After Some Time or Log Out and then login',
        );
      }
      setloading(false);
      return;
    } else {
      Alert.alert('Fill The Details', 'Incomplete Details');
      return;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {!Imageuri && (
            <Image
              source={require('../../assets/Profile-icon.png')}
              style={styles.avatar}
            />
          )}
          {Imageuri && <Image source={{uri: Imageuri}} style={styles.avatar} />}

          <TouchableOpacity
            style={styles.changeAvatarButton}
            onPress={openCamera}>
            <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor="white"
            value={Name}
            onChangeText={n => setName(n)}
          />
          <Text style={styles.label}>From Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter From Date"
            placeholderTextColor="white"
            value={FromDate}
            onChangeText={n => setFromDate(n)}
          />
          <Text style={styles.label}>To Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Finally Date"
            value={ToDate}
            placeholderTextColor="white"
            onChangeText={n => setToDate(n)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
    color:"white"
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    color:"white"
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor:"black",
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -52,
  },
});

export default AddGuest;
