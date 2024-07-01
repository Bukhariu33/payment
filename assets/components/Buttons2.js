import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';

export default function Buttons2(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <FontAwesome6 name="add" size={24} color="white" />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container:{
       backgroundColor:'orange',
       width:70,
       height:70,
       borderRadius:10,
       justifyContent:'center',
       alignItems:"center",
       padding:10

    },
    text:{
        color:"#fff",
        fontWeight:'bold'
    }
})