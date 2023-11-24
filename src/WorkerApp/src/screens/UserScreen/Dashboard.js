import {View, ImageBackground, StyleSheet, Alert, Text} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {AuthContext} from '../../../store/auth-context';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import {fetchAuthUsers, getName} from '../../../util/auth';
import LoadingOverlay from '../../components/LoadingOverlay';
import {theme} from '../../core/theme';
import axios from 'axios';

export default function Dashboard({navigation}) {
  const authCtx = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const [userName, setuserName] = useState('Loading...');
  const [FcmToken, setFcmToken] = useState();
  const DropArray = useRef();

  function Logout() {
    setLoading(true);
    try {
      authCtx.logout();
      console.log('Successfully Log Out !!');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function test() {
      try {
        const response = await axios.get(
          'https://prism-worker-gate-default-rtdb.firebaseio.com/' +
            '/Worker/' +
            authCtx.uid +
            '/Details.json' +
            '?auth=' +
            authCtx.token,
        );
        setuserName('Hi ' + response.data.Name);
        const res = await fetchAuthUsers(authCtx.token);
        setFcmToken(res.fcm);
        authCtx.setuserArray(res.drop);
      } catch (error) {
        Alert.alert(
          'Cant Login',
          'Please logout and then login cause your validation token has expire',
        );
        console.log(error);
      }
    }
    test();
  }, [authCtx.token, authCtx.uid]);

  if (Loading) {
    return <LoadingOverlay>Please Wait....</LoadingOverlay>;
  }

  return (
    <View>
      <Text>YOo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
});
