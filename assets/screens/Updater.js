import { startAfter } from 'firebase/firestore';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default function Updater({ navigation, route }) {

  const buttonText = route.params;

  const buttons = useSelector(state=>state.button.buttonText)

  console.log(buttons)
 

  const imageSource = require('../../assets/female.jpg');

  const goToUpdateDetails = () => {
    navigation.navigate('UpdateDetails', {buttonText});
  };


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={imageSource} style={styles.imageStyle} />
        </TouchableOpacity>
        <Text style={styles.nameText}>Muhammad Uzair</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.companyText}>Company Name</Text>
          <Text style={styles.amountText}>$200</Text>
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={goToUpdateDetails}>
          <Text style={{ color: 'white', fontSize: 20 }}>Change {buttons} Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#f7e2a6",
    alignItems: 'center',
    padding: 30,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  nameText: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: '800',
  },
  detailsContainer: {
    backgroundColor: '#f5cb58',
    padding: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: 'white',
    elevation: 10,
    marginTop: 20,
  },
  companyText: {
    fontSize: 30,
    color: '#fff',
  },
  amountText: {
    fontSize: 40,
    color: '#fff',
  },
  updateWrapper: {
    backgroundColor: '#f2bd41',
    marginTop: 30,
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  updateText: {
    fontSize: 15,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    padding: 15,
    margin: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
