import { View, Text, Image } from 'react-native'
import React from 'react'

export default function HorizontalWidget({ title, imageUri }) {
    var a = imageUri
    console.log(a)
    
  return (-
    <View style={{ flex:1, borderWidth: 2 ,justifyContent:'center',margin:5,borderRadius:15,width:125,padding:2}}>
      <Image source={a} style={{alignSelf:'center'}} />
      <Text style={{width:120,textAlign:'center',fontSize:14}}>{title}</Text>
    </View>
  )
}
