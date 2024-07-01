import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Update(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Ionicons name={props.name} size={50} color="black" />
        <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'orange',
        width:200,
        height:200,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginBottom:50
    },

    buttonText:{
        color:'black',
        fontSize:20,
        fontWeight:'800'
    }

})