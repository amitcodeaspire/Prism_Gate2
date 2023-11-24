import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Alert,
  Text,
  ImageBackground,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
// import TextInput from '../../components/TextInput';
import Background from '../../components/Background';
import PhoneInput from 'react-native-phone-number-input';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import {nameValidator} from '../../helpers/nameValidator';
import {theme} from '../../core/theme';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

const SignUpPhone = ({navigation, route}) => {
  const [user, setUser] = useState(null);
  const authCtx = useContext(AuthContext);
  const [ShowMobile, setShowMobile] = useState(true);
  const [mobile, setMobile] = useState('');
  const [ShowCaseMobile, setShowCaseMobile] = useState('');
  const [Loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const phoneInput = React.useRef(null);
  const [code, setCode] = useState('');

  const onAuthStateChanged = async userAuth => {
    if (!userAuth) {
      return;
    }

    if (userAuth) {
      const uid = userAuth.uid;
      const token = await auth().currentUser.getIdToken(true);
      console.log(uid);
      navigation.replace('PhoneDetails', {
        uid: uid,
        token: token,
        mobile: mobile,
      });
    }

    return () => userReference();
  };
  const signInWithMobileNumber = async () => {
    setLoading(true);

    if (ShowCaseMobile.length === 10) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(mobile);
        setConfirm(confirmation);
        let message = `OTP has been send to Your ${mobile} Please Check it !!!!`;
        // Alert.alert('OTP Send', message);
      } catch (error) {
        // Alert.alert('Invalid Code','Please Check The OTP')
        console.log(error);
        Alert.alert(
          'Failed',
          'This Number is alreday register or Please Check OTP or Or invalid number' + error.toString(),
        );
      }
    } else {
      Alert.alert(
        'Invalid Number',
        'Please Enter Correct Mobile number and make sure it is of 10 digits only',
      );
    }
    setLoading(false);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      console.log('Yoooo');
      return () => {
        subscriber;
      };
    } catch (error) {
      Alert.alert('Invalid Code', 'Please re-verfiy your self for new otp');
      console.log('Invalid code.', error);
    }
  };

  if (Loading) {
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

  return (
    <View
      style={{
        alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Logo sty={{width: 200, height: 200, alignSelf: 'center'}} />
      <View
        style={{
          // marginHorizontal: 40,
          width: '90%',
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'gray',
            fontFamily: 'Poppins-Medium',
          }}>
          Hey Mate,
        </Text>
        {confirm === null && (
          <>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
                marginTop: -5,
                marginBottom: 5,
              }}>
              Sign Up With Mobile Number
            </Text>

            <View
              style={{
                width: '100%',
              }}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={ShowCaseMobile}
                defaultCode="IN"
                layout="first"
                withShadow
                autoFocus
                codeTextStyle={{fontSize: 0}}
                containerStyle={styleSheet.phoneNumberView}
                textContainerStyle={{paddingVertical: 0}}
                onChangeFormattedText={text => {
                  setMobile(text);
                }}
                onChangeText={text => {
                  setShowCaseMobile(text);
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginPhone')}
                style={{
                  marginTop: 20,
                  marginBottom: -10,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'gray',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Have an account ? SignIn Now
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={signInWithMobileNumber}
              style={{
                backgroundColor: 'black',
                padding: 10,
                borderRadius: 20,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'center',
                }}>
                Send Verfication
              </Text>
            </TouchableOpacity>

            <View
              style={{
                padding: 10,
                borderRadius: 20,
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'center',
                }}>
                Or Continue With
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 200,
                justifyContent:"space-around"
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'black',
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  paddingRight: 15,
                  marginRight: 14,
                  borderRadius: 10,
                  // width: '40%',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/icons/google.png')}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    color: 'black',
                    marginLeft: 15,
                    marginRight: 20,
                    // textAlign:"center"
                  }}>
                  Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginEmail')}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  // paddingRight: 15,
                  marginRight: 20,
                  borderRadius: 10,
                  // width: '40%',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/icons/mail.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    color: 'black',
                    marginLeft: 15,
                    marginRight: 20,
                  }}>
                  Email Id
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {confirm !== null && (
          <>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
                marginTop: -5,
                marginBottom: 5,
              }}>
              Enter The OTP
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setCode('');
                  setConfirm(null);
                }}>
                <Text
                  style={{
                    borderBottomWidth: 0.5,
                    width: '50%',
                    borderRadius: 5,

                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {mobile} Edit ?
                </Text>
              </TouchableOpacity>
              <TextInput
                maxLength={6}
                value={code}
                placeholder="OTP"
                keyboardType="number-pad"
                onChangeText={e => setCode(e)}
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                  borderBottomWidth: 1,
                  marginBottom: 40,
                  marginTop: 40,
                }}
              />
              <TouchableOpacity
                onPress={confirmCode}
                style={{
                  backgroundColor: 'black',
                  padding: 10,
                  borderRadius: 20,
                  marginTop: 0,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                  }}>
                  Confirm OTP
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
export default SignUpPhone;

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
    color: 'black',
  },

  phoneNumberView: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '80%',
    padding: 8,
    backgroundColor: '#00B8D4',
  },

  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    marginTop: -30,
    borderColor: 'black',
    // borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: 'red',
  },
});
