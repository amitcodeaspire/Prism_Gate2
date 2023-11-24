import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import storage from '@react-native-firebase/storage';
import {launchCamera} from 'react-native-image-picker';
import LoadingOverlay from '../../components/LoadingOverlay';
import {AuthContext} from '../../../store/auth-context';
import axios from 'axios';

export default function EditAll({route, navigation}) {
  const item = route.params;
  const authCtx = useContext(AuthContext);
  const [Name, setName] = useState(item.Name);
  const [Imageuri, setImageuri] = useState(item.image);
  const [Mobile, setMobile] = useState(item.Mobile);
  const [Type, setType] = useState(item.Type);
  const [loading, setloading] = useState(false);
  if (loading)
    return <LoadingOverlay message="Please wait..."></LoadingOverlay>;
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
        const task = await storage()
          .ref('DailyHelper/' + filename)
          .putFile(uploadUri);
        const url = await storage()
          .ref('DailyHelper/' + filename)
          .getDownloadURL();
        console.log(url);
        setImageuri(url);
        setloading(false);
      } catch (e) {
        console.log(e);
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
  async function onSubmit() {
    if (Name && Type && Imageuri && Mobile.length === 10) {
      try {
        setloading(true);
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Societies/${authCtx.Society}/DailyHelper/${item.key}.json?auth=${authCtx.token}`;
        const data = {
          Name: Name,
          Type: Type,
          image: Imageuri,
          Mobile: Mobile,
        };
        const res = await axios.put(url, data);
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Cant Save at this moment please try again later');
        console.log(error);
      }
      setloading(false);
    } else {
      Alert.alert('Incomplete ', 'Please Fill All the options');
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {!Imageuri && (
            <Image
              source={require('../../../../PrismApp/assets/Profile-icon.png')}
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
            placeholderTextColor="white"
            value={Name}
            onChangeText={n => setName(n)}
          />
          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            value={Type}
            onChangeText={n => setType(n)}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
            placeholderTextColor="white"
            value={Mobile}
            onChangeText={n => setMobile(n)}
          />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'black',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
  input: {
    // borderColor: 'aqua',
    // borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#F2FEDB',
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'gray',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
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
    backgroundColor: '#DBF0FE',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -52,
  },
});
