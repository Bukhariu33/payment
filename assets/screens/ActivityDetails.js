import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../configuration/Configuration'; // Assuming storage is correctly imported
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'; // Updated import

export default function ImagePickerComponent() {
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

  const uploadImageToFirebase = async () => {
    if (!imageUri) {
      Alert.alert('No image selected', 'Please select an image first');
      return;
    }

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      console.log(blob)

      // Extract the file extension from the image URI
      const fileExtension = imageUri.split('.').pop();
      // Create a unique filename based on the current timestamp
      const filename = `${Date.now()}.${fileExtension}`;

      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      Alert.alert('Upload Successful', `Image uploaded to Firebase: ${downloadURL}`);
    } catch (error) {
      Alert.alert('Upload Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Select Image" onPress={selectImage} />
      <Button title="Upload to Firebase" onPress={uploadImageToFirebase} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
