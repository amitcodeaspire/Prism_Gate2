import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import LoadingOverlay from '../../components/LoadingOverlay';
import {AuthContext} from '../../store/auth-context';
import Header from '../../components/Header';
import {CommonActions, StackActions} from '@react-navigation/native';
import Background from '../../components/Background';
export default AddDailyHelper = ({navigation, route}) => {
  var a = route.params
  
  const [users, setUsers] = useState(route.params);
  const [loading, setloading] = useState(false);
  const authCtx = React.useContext(AuthContext);
  // setUsers(a)
  async function DailySubmit(Name, Type, Image, Mobile, oldkey) {
    // console.log(Name,Type, Image,Mobile,oldkey)
    setloading(true);
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
      navigation.goBack();
    } catch (e) {
      console.log(e);
      setloading(false);
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
    }
    setloading(false);
  }
  if (loading) {
    return (
      <Background>
        <Image
          source={require('../../assets/loading.gif')}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20}}>
          Loading Please wait...
        </Text>
      </Background>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={{}}>Daily Helper</Text> */}
      {users.length > 0 && (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={users}
          horizontal={false}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <Image style={styles.userImage} source={{uri: item.image}} />
                <View style={styles.cardFooter}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.name}>{item.Name}</Text>
                    <Text style={styles.position}>{item.Type}</Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() =>
                        DailySubmit(
                          item.Name,
                          item.Type,
                          item.image,
                          item.Mobile,
                          item.key,
                        )
                      }
                      // onPress={()=>{authCtx.setreload(true);navigation.navigate(z)}}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Poppins-Medium',
                          fontSize: 15,
                        }}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
      {users.length ===0 && (
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            marginTop: 200,
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
          }}>
          No Daily Helper if requried please tell Guard to add them
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 60,
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'black',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
});
