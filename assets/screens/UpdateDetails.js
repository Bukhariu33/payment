import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { AntDesign, Octicons, Feather, Fontisto } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../redux/sendData/updateDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function UpdateDetails({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (selectedDate) => {
        hideDatePicker();
        const formattedDate = selectedDate.toLocaleDateString();
        setTime(formattedDate);
    };

    const dispatch = useDispatch();
    const buttons = useSelector(state => state.button.buttonText);

    const [imgUri, setImgUri] = useState('');
    const [name, setName] = useState('Dianna Russel');
    const [companyName, setCompanyName] = useState('Shopping');
    const [price, setPrice] = useState('300');
    const [time, setTime] = useState('25 April, 2024');
    const [description, setDescription] = useState('');

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImgUri(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const goToDescription = async () => {
        if (name.trim() === '') {
            Alert.alert('Error', 'Please enter the name');
        } else if (companyName.trim() === '') {
            Alert.alert('Error', 'Please enter the company name');
        } else if (price.trim() === '') {
            Alert.alert('Error', 'Please enter the price');
        } else if (time.trim() === '') {
            Alert.alert('Error', 'Please enter the time in the right format');
        } else {
            try {
                const userData = { name, companyName, price, time, imgUri, buttons, description, price };
                // Store data in AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                console.log('Data stored successfully', userData);
                
                // Dispatch action to update Redux store
                dispatch(addData(userData));
                
                // Navigate to Description screen
                navigation.navigate('Description');
                
                // Clear form fields and image URI
                setName('');
                setCompanyName('');
                setPrice('');
                setTime('');
                setImgUri('');
                setDescription('');
            } catch (error) {
                console.log(error);
                Alert.alert('Error', 'Failed to store data.');
            }
        }
    };

    return (
        <ScrollView>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={pickImageAsync}>
                {imgUri ? <Image source={{ uri: imgUri }} style={styles.userImage} /> : <Image source={require('../../assets/user.png')} style={styles.userImage} />}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <AntDesign name="user" size={24} color="black" style={{ margin: 10 }} />
                <TextInput
                    placeholder='Name'
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Octicons name="organization" size={24} color="black" style={{ margin: 10 }} />
                <TextInput
                    placeholder='Company Name'
                    style={styles.input}
                    value={companyName}
                    onChangeText={(text) => setCompanyName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="dollar-sign" size={24} color="black" style={{ margin: 10 }} />
                <TextInput
                    placeholder='Price'
                    style={styles.input}
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={showDatePicker}>
                    <Fontisto name="date" size={24} color="black" style={{ margin: 10 }} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Date'
                    style={styles.input}
                    value={time}
                    onChangeText={(text) => setTime(text)}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            <Text style={{ marginHorizontal: 20, fontWeight: '600' }}>Description</Text>
            <TextInput
                placeholder='Descriptions'
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={[styles.input, styles.inputContainer]}
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={goToDescription}>
                <Text style={{ color: 'white', fontSize: 20 }}>Change {buttons} Info</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    userImage: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginBottom: 20
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
    input: {
        flex: 1,
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'orange',
        padding: 15,
        margin: 20,
        justifyContent: 'center',
        borderRadius: 20
    },
});
