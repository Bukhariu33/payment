import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { addDoc, collection, doc } from "firebase/firestore";
import { db, storage } from '../configuration/Configuration';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../configuration/Configuration';

export default function FinalActivity({ navigation }) {
    const touch = useSelector(state => state.touch.selectedButton);

    const sendDetails = async () => {
        const user = auth.currentUser;

        if (!user) {
            Alert.alert('User not authenticated');
            return;
        }

        const userId = user.uid;
        let imageUri = touch.imgUri;
        let downloadURL = '';

        // Upload image if imageUri is provided
        if (imageUri) {
            try {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                const fileExtension = imageUri.split('.').pop();
                const filename = `images/${Date.now()}.${fileExtension}`;
                const storageRef = ref(storage, filename);
                await uploadBytes(storageRef, blob);
                downloadURL = await getDownloadURL(storageRef);
                Alert.alert('Image has been uploaded as well');
            } catch (error) {
                Alert.alert('Upload Failed', error.message);
                return;
            }
        }

        const dataToSend = {
            companyName: touch.companyName,
            name: touch.name,
            price: touch.price,
            time: touch.time,
            imageUri: downloadURL || '',
            tag: touch.buttons,
            description: touch.description
        };

        try {
            const collectionName = touch.buttons === 'Send' ? 'send' : 'receive';
            const userDocRef = doc(db, 'users', userId);
            const collectionRef = collection(userDocRef, collectionName);
            const docRef = await addDoc(collectionRef, dataToSend);

            console.log("Data sent to Firestore successfully! with ID: ", docRef.id);
            Alert.alert('Success', 'Data sent to Firestore successfully!');
            navigation.navigate('Home');
        } catch (e) {
            console.error("Error adding document: ", e);
            Alert.alert('Error', 'Error sending data to Firestore. Please try again.');
        }
    };

    console.log(touch);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="orange" barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => navigation.navigate('Description')}>
                    <AntDesign name="left" size={24} color="black" />
                    <Text style={styles.heading}>Details</Text>
                </TouchableOpacity>
                <View style={[styles.itemContainer, { backgroundColor: touch.buttons === 'Send' ? '#006442' : '#003171' }]}>
                    <Text style={styles.itemText}>{touch.buttons} Item</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Image source={touch.imgUri ? { uri: touch.imgUri } : require('../../assets/female.jpg')} style={styles.image} />

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>By:</Text>
                        <Text style={styles.infoText}>{touch.name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Amount:</Text>
                        <Text style={styles.infoText}>${touch.price}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Date:</Text>
                        <Text style={styles.infoText}>{touch.time}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Company:</Text>
                        <Text style={styles.infoText}>{touch.companyName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Description:</Text>
                        <Text style={styles.infoText}>
                            {touch.description ? touch.description :
                            `N/A`}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={sendDetails}>
                <Text style={styles.buttonText}>Save Info</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    itemText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: 'black',
        elevation: 10
    },
    infoContainer: {
        marginTop: 20,
        width: '100%',
        backgroundColor: "#fff",
        elevation: 5,
        padding: 10,
        borderRadius: 10
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoLabel: {
        fontWeight: 'bold',
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
    },
    buttonContainer: {
        backgroundColor: 'orange',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
