import { View, Text } from 'react-native'
import React from 'react'

export default function RowText() {
  return (
    <View style={{flexDirection:"row",flex:1}}>
      <Text>RowText</Text>
      <Text>RowText</Text>
    </View>
  )
}