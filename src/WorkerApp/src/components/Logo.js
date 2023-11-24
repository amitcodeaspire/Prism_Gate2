import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo({sty}) {
  return <Image source={require('../assets/icon.png')} style={[styles.image,sty]} />
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 120 ,
    
   },
})

