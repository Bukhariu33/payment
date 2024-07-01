import { ScrollView, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../configuration/Configuration';
import * as ImagePicker from 'expo-image-picker';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const selectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileExtension = uri.split('.').pop();
    const filename = `${userId}.${fileExtension}`;
    const storageRef = ref(storage, `users/${userId}/${filename}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const SignUpAccount = async () => {
    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }

    if (email.trim() === '') {
      alert('Please enter your email.');
      return;
    }

    if (password.trim() === '') {
      alert('Please enter your password.');
      return;
    }

    if (confirmPassword.trim() === '') {
      alert('Please confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      let imageURL = '';

      if (imageUri) {
        imageURL = await uploadImage(imageUri, userId);
      }

      await setDoc(doc(db, "users", userId), {
        name,
        email,
        imageUrl: imageURL,
      });

      alert('Your email and password are registered successfully.');
      navigation.navigate('Home');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={selectImage}>
        <Image source={imageUri ? { uri: imageUri } : require('../../assets/user.png')} style={styles.userImage} />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="black" style={{ margin: 10 }} />
        <TextInput placeholder='Name' style={styles.input} onChangeText={(text) => setName(text)} value={name} />
      </View>
      <View style={styles.inputContainer}>
        <Fontisto name="email" size={24} color="black" style={{ margin: 10 }} />
        <TextInput placeholder='Email' style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
      </View>

      <View style={styles.inputContainer}>
        <AntDesign name="lock1" size={24} color="black" style={{ margin: 10 }} />
        <TextInput placeholder='Password' style={styles.input} onChangeText={(text) => setPassword(text)} secureTextEntry={true} value={password} />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock1" size={24} color="black" style={{ margin: 10 }} />
        <TextInput placeholder='Confirm Password' style={styles.input} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} value={confirmPassword} />
      </View>

      <Button title={'Sign Up'} onPress={SignUpAccount} />

      <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={() => navigation.navigate('SignIn')}>
        <Text style={{ color: 'blue' }}>Already Have an Account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center'
  },

  userImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    flex: 1,
    marginLeft: 10,
  }
});
