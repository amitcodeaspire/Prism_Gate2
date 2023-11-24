import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Pressable,
} from 'react-native';
import LoadingOverlay from '../../components/LoadingOverlay';
import {AuthContext} from '../../store/auth-context';
import { Transition, set } from 'react-native-reanimated';

export default Vistors = () => {
  const authCtx = useContext(AuthContext);
  const [loading,setloading] = useState(false)
  async function deleteuser(userid, items) {
    console.log(userid)
    setloading(true)
    function del(obj) {
      setloading(false)
      return userid != obj.id;
    }
    try{
      const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Vistors/${userid}.json?auth=${authCtx.token}`
      const resp = await axios.delete(url)
      console.log(url)
      const newVistors = items.filter(del);
      authCtx.setVistors(newVistors);
    }
    catch (e) {
      console.log(e)
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
      setloading(false)

     }
  }

  var render;
  if(loading) {
    return <LoadingOverlay>Please wait....</LoadingOverlay>
  }
  if (authCtx.Vistors.length > 0) {
    render = (
      <FlatList
        style={styles.root}
        data={authCtx.Vistors}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={item => {
                
          return (
            <Pressable
              onPress={() => {
                const title = 'Delete ' + item.item.name + ' from Vistors';
                Alert.alert(title, 'If Yes Please Press Ok', [
                  {
                    text: 'Ok',
                    onPress: () => {
                      console.log('hmmm');
                      deleteuser(item.item.id, authCtx.Vistors);
                    },
                  },
                  {
                    text: 'Cancel',
                  },
                ]);
              }}
              style={styles.container}>
              <TouchableOpacity>
                <Image
                  style={[styles.image, {marginLeft: -5}]}
                  source={{uri: item.item.icon}}
                />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{item.item.name}</Text>
                  <Text style={styles.time}>{item.item.time}</Text>
                </View>
                <Text rkType="primary3 mediumLine">{item.item.type}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    );
  } else {
    render = (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>
          No Vistors Please Add Vistors{' '}
        </Text>
      </View>
    );
  }
  return <>{render}</>;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// import axios from 'axios';

// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Pressable,
//   FlatList,
//   Alert,
// } from 'react-native';

// const ProfileCards = () => {

  // async function deleteuser(userid, items) {
  //   function del(obj) {
  //     return userid != obj.id;
  //   }
  //   try{
  //     const url = `https://prism-worker-gate-default-rtdb.firebaseio.com/Users/${authCtx.uid}/Vistors/${userid}.json?auth=${authCtx.token}`
  //     await axios.delete(url)
  //   }
  //   catch (e) {
  //     console.log(e)
  //    }

  //   const newVistors = items.filter(del);
  //   authCtx.setVistors(newVistors);
  // }

//   const renderItem = ({item}) => {
// const title = 'Delete ' + item.name + ' from Vistors';

//     return (
//       <Pressable
//         style={styles.itemContainer}
//         onPress={() =>
//           Alert.alert(title, 'If Yes Please Press Ok', [
//             {
//               text: 'Ok',
//               onPress: () => deleteuser(item.id, authCtx.Vistors),
//             },
//             {
//               text: 'Cancel',
//             },
//           ])
//         }>
//         <Image
//           source={{uri: 'https://www.bootdey.com/image/280x280/008B8B/008B8B'}}
//           style={styles.coverPhoto}
//         />
//         <View style={styles.avatarContainer}>
//           <Image
//             source={{uri:item.icon}}
//             style={styles.avatar}
//           />
//           <Text  style={styles.name}>Name :- {item.name}</Text>
//           <Text  style={styles.name}>Type :- {item.type}</Text>
//         </View>
//       </Pressable>
//     );
//   };

// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     shadowColor: '#cccccc',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//     marginHorizontal: 20,
//     backgroundColor: '#E1D9D1',
//     borderRadius: 10,
//     paddingBottom: 5,
//     marginTop: 20,
//   },
//   coverPhoto: {
//     width: '100%',
//     height: 60,
//     resizeMode: 'cover',
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginTop: -40,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 30,
//     borderWidth: 5,
//     borderColor: 'white',
//   },
//   name: {
//     marginTop: 5,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileCards;
