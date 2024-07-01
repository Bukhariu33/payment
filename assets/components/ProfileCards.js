import { View, Text } from 'react-native'
import React from 'react'

export default function ProfileCards(props) {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontWeight:'bold', color:'grey'}}>${props.numbers}</Text>
      <Text style={{fontWeight:"800"}}>{props.title}</Text>
    </View>
  )
}