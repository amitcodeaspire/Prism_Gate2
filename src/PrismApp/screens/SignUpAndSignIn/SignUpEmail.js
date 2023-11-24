import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import {AuthContext} from '../../store/auth-context';
import {ScrollView} from 'react-native';
import TextInput from '../../components/TextInput';
import {emailValidator} from '../../helpers/emailValidator';
import {passwordValidator} from '../../helpers/passwordValidator';


function SignUpEmail({route, navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [Loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const onSignUp = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    try {
      setLoading(true);
      navigation.reset({
        index: 0,
        routes: [
          {name: 'EmailDetails', email: email.value, password: password.value},
        ],
      });
    } catch (e) {
      console.log(e);
      Alert.alert(
        'Already Registered',
        'This Account is already been registered !!',
      );
    }
    setLoading(false);
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
    <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:"white"}}>
      <View
        style={{
          alignItems: 'center',
          // justifyContent: 'center',
          flexGrow: 1,
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

          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontFamily: 'Poppins-SemiBold',
              marginTop: -5,
              marginBottom: 5,
            }}>
            Sign Up With Email
          </Text>

          <View
            style={{
              width: '100%',
            }}>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={text => setEmail({value: text, error: ''})}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({value: text, error: ''})}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginEmail')}
              style={{
                marginTop: 10,
                marginBottom: -10,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'gray',
                  fontFamily: 'Poppins-Medium',
                }}>
                Have a account ? SignIn Now
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={onSignUp}
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
              Sign Up
            </Text>
          </TouchableOpacity>

         
        </View>
      </View>
    </ScrollView>
  );
}
export default SignUpEmail;

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
