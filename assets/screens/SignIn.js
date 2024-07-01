import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {AntDesign, FontAwesome, Fontisto} from '@expo/vector-icons';
import {Button} from '../components/Button';
import { auth } from '../configuration/Configuration';
import {signInWithEmailAndPassword} from "firebase/auth";

export default function SignIn({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const setLogin = () =>{
    // if (email.trim() !== '' && password.trim() !== ''){
    //   navigation.navigate('Home')
    // }

    navigation.navigate('Home')
  }


  const onSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        alert('Login Successful');
        navigation.navigate('Home'); // Navigate only when login is successful
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In to Your Account</Text>
      <Image source={require('../../assets/login.png')} style={styles.logoImage}/>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
        <Fontisto name="email" size={24} color="black"style={{margin:10}}/>
          <TextInput placeholder='Email' style={styles.input} onChangeText={(text)=>setEmail(text)} value={email}/>
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="unlock" size={24} color="black" style={{ margin: 10 }}/>
          <TextInput placeholder='Password' style={styles.input} secureTextEntry={!showPassword} onChangeText={(text)=>setPassword(text)} value={password}/>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="black" style={{ margin: 10 }}/>
          </TouchableOpacity>
        </View>
        
        <Button title={'Login'} onPress={onSubmit}/>

        <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={()=>navigation.navigate('Register')}>
          <Text>Not an Account?<Text style={{ color: 'red' }}> Register</Text></Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7faf8",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "600",
  },
  logoImage:{
    width:100,
    height:100,
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  inputContainer:{
    flexDirection:'row',
    borderWidth:1,
    padding:10,
    marginVertical: 10,
    borderRadius:10,
    backgroundColor:'#fff',
    alignItems:'center'
  },
  input: {
    flex: 1,
    marginLeft: 10,
  }
});
