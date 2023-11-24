import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../store/auth-context';
import Background from '../../components/Background';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {ScrollView} from 'react-native-virtualized-view';
import {getVistors} from '../../util/auth';
import {launchCamera} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import storage from '@react-native-firebase/storage';
import {useFocusEffect} from '@react-navigation/native';
import Share from 'react-native-share';
// const storage = getStorage();
export default function Activity({navigation}) {
  const [loading, setloading] = useState(true);
  const authCtx = useContext(AuthContext);
  const [imageUri, setimageUri] = useState();
  const [Vistors, setVistors] = useState(true);
  const [addVistors, setaddVistors] = useState(false);
  const [allVistors, setallVistors] = useState([]);
  const [flatno, setflatno] = useState('Loading..');
  async function getData() {
    setloading(true);
    try {
      const url1 = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Details.json?auth=${authCtx.token}`;
      console.log(url);
      const response1 = await axios.get(url1);
      setflatno(response1.data.flatno);
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Details.json?auth=${authCtx.token}`;
      const data = await getVistors(authCtx.uid, authCtx.token);
      setallVistors(data);
      const response = await axios.get(url);

      setimageUri(response.data.Imageuri);
    } catch (e) {
      console.log(e, 'Hi');
      Alert.alert(
        'Cant Load',
        'Please Try again after some time with better network or logout then login !',
      );
    }
    setloading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );
  if (loading) {
    return (
      <Background>
        <Image
          source={require('../../assets/loading.gif')}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
        <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
          Loading Please wait
        </Text>
      </Background>
    );
  }
  async function deleteVistor(userid, items, item) {
    setloading(true);
    function del(obj) {
      setloading(false);
      return userid != obj.id;
    }

    try {
      if (item.icon) {
        const storageRef = storage().refFromURL(item.icon);
        const imageRef = storage().ref(storageRef.fullPath);
        await imageRef.delete();
        // const desertRef = ref(storage, 'images/desert.jpg');
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Vistors/${userid}.json?auth=${authCtx.token}`;
        const resp = await axios.delete(url);

        const newVistors = items.filter(del);
        setallVistors(newVistors);
      } else {
        const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Vistors/${userid}.json?auth=${authCtx.token}`;
        const resp = await axios.delete(url);

        const newVistors = items.filter(del);
        setallVistors(newVistors);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
      setloading(false);
    }
  }
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: 10,
        }}>
        {/* <Fontisto
          name="bell-alt"
          size={24}
          color="gray"
          style={{
            marginRight: 10,
            marginTop: 5,
          }}
          // style={{marginHorizontal: 18, marginTop: 15}}
        /> */}
        <Text
          style={{
            fontSize: 20,
            marginTop: 5,
            fontFamily: 'Poppins-SemiBold',
            color: 'black',
          }}>
          {flatno}
        </Text>
        <Text
          style={{
            fontSize: 26,
            // marginTop: 13,

            fontFamily: 'Poppins-Medium',
            // fontWeight:"bold",
            color: 'black',
          }}>
          Activity
        </Text>
        {imageUri ? (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              setaddVistors(false);
              setVistors(true);
            }}
            style={{
              marginTop: 25,
            }}>
            <Text
              style={[
                {
                  fontSize: 18,
                  fontFamily: 'Poppins-SemiBold',

                  letterSpacing: 1,
                },
                Vistors ? {color: 'black'} : {color: 'gray'},
              ]}>
              Vistors
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 25,
            }}
            onPress={() => {
              navigation.navigate('AddVistors');
            }}>
            <Text
              style={[
                {
                  fontSize: 18,
                  fontFamily: 'Poppins-SemiBold',

                  letterSpacing: 1,
                },
                addVistors ? {color: 'black'} : {color: 'gray'},
              ]}>
              Add Vistors
            </Text>
          </TouchableOpacity>
        </View>
        {Vistors && (
          <FlatList
          // onEndReached={()=>getData()}
            data={allVistors}
            renderItem={({item}) => {
              const time = new Date(item.time);
              const date = new Date(item.date);

              return (
                <View
                  style={{
                    marginHorizontal: 15,
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#f2faff',
                      padding: 10,
                      paddingVertical: 20,
                    }}>
                    {item.icon ? (
                      <Image
                        source={{uri: item.icon}}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 70 / 2,
                        }}
                      />
                    ) : (
                      <Image
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 70 / 2,
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/allow/allow_guest.png')}
                      />
                    )}
                    <View style={{marginTop: 10, marginLeft: 15}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                            color: 'black',
                          }}>
                          {item.type} | {item.name}
                        </Text>
                        {/* <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                            color: 'black',
                          }}>
                          {item.name}
                        </Text> */}
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 10,
                          marginTop: 4,
                        }}>
                        <MaterialCommunityIcons
                          name="calendar"
                          size={22}
                          color="gray"
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                            color: 'black',
                            marginRight: 2,
                            marginLeft: 2,
                          }}>
                          {date.getDate() < 10
                            ? '0' + date.getDate()
                            : date.getDate()}
                          -
                          {date.getMonth() < 10
                            ? '0' + date.getMonth()
                            : date.getMonth()}
                          -{date.getFullYear()} |
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Poppins-Medium',
                            color: 'black',
                          }}>
                          {time.getHours() < 10
                            ? '0' + time.getHours()
                            : time.getHours()}
                          :
                          {time.getMinutes() < 10
                            ? '0' + time.getMinutes()
                            : time.getMinutes()}
                          {time.getHours() >= 12 ? 'pm' : 'am'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'space-around',
                      backgroundColor: '#EDFCF7',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Ionicons
                        name="call"
                        size={25}
                        color="orange"
                        style={{marginRight: 10, marginLeft: 10}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          fontFamily: 'Poppins-Medium',
                          marginTop: 2,
                          color: 'orange',
                        }}>
                        Call
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => {
                        const title = 'Delete ' + item.name + ' from Vistors';
                        Alert.alert(title, 'If Yes Please Press Ok', [
                          {
                            text: 'Ok',
                            onPress: () => {
                              console.log('hmmm');
                              deleteVistor(item.id, allVistors, item);
                            },
                          },
                          {
                            text: 'Cancel',
                          },
                        ]);
                      }}>
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        style={{marginRight: 10, marginLeft: 40}}
                        color="red"
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          fontFamily: 'Poppins-Medium',
                          marginTop: 2,
                          color: 'red',
                        }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={async () => {
                        const shareoptions = {
                          message: item.type + ' | ' + item.name,
                        };
                        try {
                          const shareResponse = await Share.open({
                            message:
                              item.type +
                                ' | ' +
                                item.name + " | Vistor Detail"
                            // title:"Vistor Detail"
                          });
                        } catch (e) {
                          console.log(e);
                        }
                      }}>
                      <Ionicons
                        name="share-social"
                        size={24}
                        style={{marginRight: 10, marginLeft: 40}}
                        color="green"
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          fontFamily: 'Poppins-Medium',
                          marginTop: 2,
                          color: 'green',
                        }}>
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
        {Vistors && allVistors.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: 250,
                fontSize: 24,
                fontFamily: 'Poppins-Bold',
              }}>
              No Vistor Added{' '}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </>
  );
}
