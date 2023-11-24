import {View, Text, Alert} from 'react-native';
import React from 'react';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Background from '../../components/Background';

export default function NotificationResponse({route,navigation}) {
  const [Comment, setComment] = React.useState('');
  const [Decison, setDecison] = React.useState('');
  async function sendResponse() {
    if (!Comment || !Decison) {
      return Alert.alert('All the Fields Are Mandatory', 'Fill The Form');
    }

    const url = 'https://9610-110-235-233-89.in.ngrok.io/send-noti';
    const message = {
      token: route.params.Worker_Token,
      notification: {
        title: Comment,
        body: Decison,
      },
    };
    Alert.alert(
      'Sent Successfully',
      'Notification has been send successfully ',
    );
    navigation.navigate("Dashboard")
    const resp = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  return (
    <Background>
      <Logo />
      <TextInput
        label="Comment"
        value={Comment}
        onChangeText={text => setComment(text)}
      />
      <TextInput
        label="Accept or Decline"
        value={Decison}
        onChangeText={text => setDecison(text)}
      />
      <Button mode="contained" onPress={sendResponse}>
        Submit
      </Button>
    </Background>
  );
}
