import { View, Text } from 'react-native'
import React from 'react'

export default function Custimize() {
  return (
    <View style={style.header}>
    <Text style={{fontSize:20,color:'white',fontWeight:'bold',marginTop:40,marginLeft:5}}>TownD 093</Text>
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 260,
        flex: 1,
        width: '100%',
      }}
    >
      <Pressable style={style.icon}>
        <Ionicons
          name="search"
          size={26}
          color="white"
          onPress={() => console.log('Search')}
        />
      </Pressable>
      <Pressable style={style.icon}>
        <Ionicons
          name="chatbox-ellipses"
          size={26}
          color="white"
          onPress={() => console.log('Chat')}
        />
      </Pressable>
      <Pressable style={style.icon}>
        <Ionicons
          name="person-add-outline"
          size={26}
          color="white"
          onPress={() => console.log('Profile')}
        />
      </Pressable>
    </View>
    </View>

  )
}