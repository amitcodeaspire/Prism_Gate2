import { ActivityIndicator, StyleSheet, Text, View,Image } from 'react-native';
import Background from './Background';

function LoadingOverlay({ children }) {
  return (
    <Background>
    <Image
      source={require('../assets/loading.gif')}
      style={{width: 100, height: 100, alignSelf: 'center'}}
    />
    <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
    {children}
    </Text>
  </Background>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
