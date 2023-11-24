import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
// import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack,style }) {
  return (
    <TouchableOpacity onPress={goBack} style={[styles.container,style]}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 ,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
