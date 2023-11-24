import React, {useState} from 'react';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {emailValidator} from '../../../PrismApp/helpers/emailValidator';
import {ResetPassword} from '../../util/auth';
import {Alert, TouchableOpacity, Text} from 'react-native';
import LoadingOverlay from '../../components/LoadingOverlay';
export default function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [loading, setloading] = useState(false);
  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    setloading(true);
    const value = await ResetPassword(email.value);
    if (value === 1) {
      Alert.alert(
        'Try Again',
        'Please Enter a Registered Email or Please Try After some time :)',
      );
    } else if (value === 0) {
      Alert.alert(
        'Successfully',
        'Email Has Been successfully sent to your  ' +
          email.value +
          '  Please Check the mails ',
        [{text: 'Ok', onPress: () => navigation.goBack(), style: 'cancel'}],
      );
      navigation.replace('LoginEmail');
    }
    setloading(false);
  };
  if (loading) {
    return <LoadingOverlay children="Please Wait ..." />;
  }
  return (
    <Background>
      <Logo />
      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontFamily: 'Poppins-Bold',
          color: 'black',
        }}>
        Reset Password
      </Text>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />

      <TouchableOpacity
        onPress={sendResetPasswordEmail}
        style={{
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 20,
          marginTop: 20,
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
          }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </Background>
  );
}
