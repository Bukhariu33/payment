import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ProfileCards2() {
  return (
    <TouchableOpacity style={{flexDirection:'row', alignItems:"center", backgroundColor:"#fff", padding:10, margin:10,elevation:5, borderRadius:10, marginBottom:10}}>
      <Image source={require('../../assets/sky.jpg')} style={{width:80, height:80}}/>
      <View style={{justifyContent:'center'}}>
      <Text>Dangling Train</Text>
      <Text>Great things happens when you try</Text>
      </View>
    </TouchableOpacity>
  )
}