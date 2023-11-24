import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Pressable, StatusBar, ImageBackground} from 'react-native';
import {
  FlatList,
  View,
  Text,
  Image,
  Modal,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
} from 'react-native';

import {launchCamera} from 'react-native-image-picker';
import BackButton from '../../components/BackButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../../store/auth-context';
import {getDaily} from '../../util/auth';
import {Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from "react-native-vector-icons/Entypo"
import Share from 'react-native-share';
import {ScrollView} from 'react-native-virtualized-view';
export default function ManageHouseHold({navigation}) {
  const [dailyHelp, setdailyHelp] = useState([]);
  const [FrequentGuest, setFrequentGuest] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [Imageuri, setImageuri] = useState('');
  const [Name, setName] = useState('');
  const [FromDate, setFromDate] = useState();
  const [ToDate, setToDate] = useState();

  const [showModal2, setShowModal2] = useState(false);
  const [loading, setloading] = useState(false);

  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function get() {
      setloading(true);
      const url =
        'https://prism-worker-gate-default-rtdb.firebaseio.com/DailyHelper.json?auth=' +
        authCtx.token;
      const ur2 =
        'https://prism-worker-gate-default-rtdb.firebaseio.com/Users/' +
        authCtx.uid +
        '/DailyHelp.json' +
        '?auth=' +
        authCtx.token;
      const url3 =
        'https://prism-worker-gate-default-rtdb.firebaseio.com/Users/' +
        authCtx.uid +
        '/FrequentGuests.json' +
        '?auth=' +
        authCtx.token;

      function del(obj, id) {
        if (obj.key != id) {
          return obj;
        }
      }
      let res = await getDaily(url);
      const res2 = await getDaily(ur2);
      const res3 = await getDaily(url3);
      try {
        var fdata = [];
        res2.map(i => {
          var j = res.map(k => {
            console.log();
            var l = del(k, i.oldkey);
            if (l) {
              fdata.push(l);
            }
          });
        });
        console.log(fdata);
      } catch (error) {
        setloading(false);
        return Alert.alert('Something Went Wrong', 'Please Try Again Later');
      }

      setloading(false);
      if (res2 === 0 || res === 0 || res3 === 0) {
        setloading(false);
        return Alert.alert('Something Went Wrong', 'Please Try Again Later');
      }

      setData(res);
      setdailyHelp(res2);
      setFrequentGuest(res3);
      console.log(FrequentGuest);
    }
    get();
  }, []);

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
  const handleSubmit = async () => {
    if (Name && FromDate && Imageuri && ToDate) {
      setloading(true);
      try {
        const url =
          'https://prism-worker-gate-default-rtdb.firebaseio.com/Users/' +
          authCtx.uid +
          '/FrequentGuests.json' +
          '?auth=' +
          authCtx.token;
        const data = {
          Name: Name,
          FromDate: FromDate,
          ToDate: ToDate,
          Image: Imageuri,
        };
        const res = await axios.post(url, data);
        navigation.replace('ManageHouse');
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

  async function DailySubmit(Name, Type, Image, Mobile, oldkey) {
    try {
      const url =
        'https://prism-worker-gate-default-rtdb.firebaseio.com/Users/' +
        authCtx.uid +
        '/DailyHelp.json' +
        '?auth=' +
        authCtx.token;
      const Fdata = {
        Name: Name,
        Type: Type,
        image: Image,
        Mobile: Mobile,
        oldkey: oldkey,
      };
      const res = await axios.post(url, Fdata);
      navigation.replace('ManageHouse');

      Alert.alert('Successfully', '😁 Details has been save');
    } catch (e) {
      console.log(e);
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
    }
  }
  async function dailyHelpDelete(id, arr) {
    setloading(true);
    try {
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/DailyHelp/${id}.json?auth=${authCtx.token}`;
      console.log(url);
      await axios.delete(url);
      function del(obj) {
        if (obj.key != id) {
          return obj;
        }
        // return id != obj.key
      }
      const neData = arr.filter(del);
      // console.log(neData);
      setdailyHelp(neData);
    } catch (e) {
      console.log(e);
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
    }
    setloading(false);
  }
  function FrequentrenderItem(items) {
    var item = items.item;
    console.log(item);
    return (
      <Pressable
        style={{
          marginVertical: 25,
          marginHorizontal: 5,
          borderWidth: 0.72,
          padding: 10,
          paddingBottom: -10,
          borderRadius: 20,
        }}>
        <Image
          source={{uri: item.Image}}
          style={{width: 105, height: 105, alignSelf: 'center'}}
        />
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 16,
            fontWeight: '800',
          }}>
          {item.Name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 15,
            fontWeight: '800',
          }}>
          From Date :-{item.FromDate}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 15,
            fontWeight: '800',
          }}>
          To Date :-{item.ToDate}
        </Text>
      </Pressable>
    );
  }
  async function shareDetails(item) {
    const shareoptions = {
      message:
        item.Name +
        ' ' +
        '(' +
        item.Type +
        ')' +
        '\nMobile Number :- ' +
        item.Mobile.toString(),
    };
    try {
      const shareResponse = await Share.open(shareoptions);
    } catch (e) {
      console.log(e);
    }
  }
  if (loading) {
    return <LoadingOverlay>Please Wait....</LoadingOverlay>;
  }
  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={{flex: 1}}>
      <View
        style={{
          marginHorizontal: 1,
          marginTop: 15,
          paddingBottom: -5,
          // borderRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>My Daily Help</Text>
          <Text
            style={{color: 'red', fontWeight: 'bold', fontSize: 18}}
            onPress={() => {
              navigation.navigate('AddDailyHelper', data);
            }}>
            ADD +
          </Text>
        </View>
        {dailyHelp.length > 0 && (
          <View style={styles.sectionBody}>
            <FlatList
              horizontal
              // showsHorizontalScrollIndicator={false} 
              keyExtractor={item => {
                item.id;
              }}
              data={dailyHelp}
              renderItem={({item}) => {
                return (
                  <View style={styles.sectionCard}>
                    <Image
                      style={styles.sectionImage}
                      source={{uri: item.image}}
                    />
                    <View style={styles.sectionInfo}>
                      <Text style={styles.sectionLabel}>{item.Name}</Text>
                      <Text style={[styles.sectionLabel]}>{item.Type}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 15,
                          marginTop: 3,
                          borderTopWidth: 0.75,
                          borderTopColor: 'gray',
                        }}>
                        <Pressable
                          onPress={() =>
                            Alert.alert(
                              'Call on Given Number',
                              item.Mobile.toString(),
                            )
                          }
                          style={{marginTop: 3}}>
                          <Icon
                            name="call"
                            size={24}
                            color="green"
                            type="MaterialIcons"
                          />
                        </Pressable>
                        <Pressable
                          onPress={shareDetails.bind(this, item)}
                          style={{marginTop: 3}}>
                          <Icon
                            name="share"
                            size={22}
                            color="green"
                            type="FontAwesome"
                          />
                        </Pressable>
                        <Pressable style={{marginTop: 3}}>
                          <MaterialCommunityIcons
                            name="delete"
                            size={24}
                            color="red"
                            onPress={() => {
                              const title =
                                'Delete ' + item.Name + ' from Daily Help';
                              Alert.alert(title, 'If Yes Please Press Ok', [
                                {
                                  text: 'Ok',
                                  onPress: () => {
                                    dailyHelpDelete(item.key, dailyHelp);
                                  },
                                },
                                {
                                  text: 'Cancel',
                                },
                              ]);
                            }}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              }}
            
            />
            {
            
            }
          </View>
        )}
        {dailyHelp.length == 0 && (
          <View style={[styles.sectionCard,{alignSelf:"center"}]}>
            <Text style={[styles.sectionLabel,{fontSize:18,marginTop:10,marginBottom:10,paddingHorizontal:10}]}>No DailyHelper</Text>
          <View style={styles.sectionInfo}>
            <Text style={[styles.sectionLabel]}>Please add Helper</Text>
          </View>
        </View>
        )}
      </View>
    </ImageBackground>
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
    color: 'white',
  },
  input: {
    borderColor: 'aqua',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    color: 'lime',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
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
    backgroundColor: 'purple',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -52,
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 250,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  section: {
    // paddingHorizontal: 16,
    marginVertical: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
  },
  seeAllButton: {
    backgroundColor: '#A9A9A9',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  seeAllButtonText: {
    color: '#eee',
  },
  // -------------
  sectionBody: {
    flexDirection:"row"
  },
  sectionScroll: {
    paddingBottom: 20,
  },
  sectionCard: {
    margin: 10,
    borderRadius: 10,
    borderRightWidth: 0.75,
    borderLeftWidth: 0.75,
    borderBottomWidth: 0.75,
    width: 140,
    // height: 174,
    borderColor: 'gray',
    backgroundColor: '#d4d4d4',
  },
  sectionImage: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    alignSelf: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  // sectionInfo: {
  // padding: 10,
  // },
  sectionLabel: {
    fontSize: 13,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

{
  /* <View
  style={{
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    paddingBottom: -5,
    borderRadius: 20,
  }}>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
    }}>
    <Text style={{fontWeight: 'bold', fontSize: 18}}>
      Frequent Guests
    </Text>
    <Text
      style={{color: 'red', fontWeight: '300', fontSize: 18}}
      onPress={() => {
        setShowModal2(true);
      }}>
      ADD +
    </Text>
  </View>
  <Modal transparent={true} visible={showModal2} animationType="slide">
    <ScrollView>
      <View style={styles.avatarContainer}>
        {!Imageuri && (
          <Image
            source={require('../../assets/Profile-icon.png')}
            style={styles.avatar}
          />
        )}
        {Imageuri && (
          <Image source={{uri: Imageuri}} style={styles.avatar} />
        )}

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal2(false)}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </Modal>
  {FrequentGuest.length > 0 && (
    <FlatList
      horizontal
      data={FrequentGuest}
      renderItem={FrequentrenderItem}
      showsHorizontalScrollIndicator={false}
    />
  )}
  {FrequentGuest.length === 0 && (
    <View
      style={{
        marginVertical: 25,
        marginHorizontal: 5,
        borderWidth: 0.72,
        padding: 10,
        paddingBottom: -10,
        borderRadius: 20,
        alignSelf: 'center',
      }}>
      <Image
        source={require('../../assets/empty.png')}
        style={{width: 105, height: 105, justifyContent: 'center'}}
      />
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontWeight: '800',
        }}>
        No Daily Helper
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontSize: 15,
          fontWeight: '800',
        }}>
        Please add
      </Text>
    </View>
  )}
</View> */
}
