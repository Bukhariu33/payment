import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

function Button(props) {
  return (
    <TouchableOpacity style={styles.signInButton} onPress={props.onPress}>
          <Text style={styles.signInText}>{props.title}</Text>
    </TouchableOpacity>

  )
}


const updateButton = (props)=>{
  return(
    <TouchableOpacity style={styles.updButton} onPress={props.onPress}>
      <Text style={styles.signInText}>{props.title}</Text>
    </TouchableOpacity>
  )

}


const styles = StyleSheet.create({
    signInButton:{
        backgroundColor: 'orange',
        padding: 10, 
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        margin:20
      },
      signInText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      updButton:{
        backgroundColor: 'orange',
        padding: 10, 
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        margin:20
      }
})


export {Button, updateButton}